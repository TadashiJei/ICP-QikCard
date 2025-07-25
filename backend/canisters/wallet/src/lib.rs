use candid::{CandidType, Deserialize, Principal};
use ic_cdk_macros::*;
use ic_ledger_types::{AccountIdentifier, Subaccount, Tokens, TransferArgs, TransferError};
use serde::{Deserialize as SerdeDeserialize, Serialize};
use std::collections::HashMap;
use std::str::FromStr;

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct Wallet {
    pub address: String,
    pub balance: u64,
    pub currency: String,
    pub created_at: u64,
    pub last_activity: u64,
    pub is_active: bool,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct Transaction {
    pub id: String,
    pub from: Principal,
    pub to: Principal,
    pub amount: u64,
    pub currency: String,
    pub status: TransactionStatus,
    pub timestamp: u64,
    pub tx_hash: Option<String>,
    pub metadata: HashMap<String, String>,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub enum TransactionStatus {
    Pending,
    Confirmed,
    Failed,
    Cancelled,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct KeyPair {
    pub public_key: String,
    pub encrypted_private_key: String,
    pub derivation_path: String,
    pub created_at: u64,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct CreateWalletRequest {
    pub currency: String,
    pub user_principal: Principal,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct TransferRequest {
    pub from: Principal,
    pub to: Principal,
    pub amount: u64,
    pub currency: String,
    pub memo: Option<String>,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct BalanceResponse {
    pub balance: u64,
    pub currency: String,
    pub last_updated: u64,
}

#[derive(CandidType, Clone, Debug, Deserialize, Serialize)]
pub struct WalletInfo {
    pub address: String,
    pub balance: u64,
    pub currency: String,
    pub created_at: u64,
    pub transaction_count: u64,
}

// State management
thread_local! {
    static WALLETS: std::cell::RefCell<HashMap<Principal, HashMap<String, Wallet>>> = 
        std::cell::RefCell::new(HashMap::new());
    static TRANSACTIONS: std::cell::RefCell<HashMap<String, Transaction>> = 
        std::cell::RefCell::new(HashMap::new());
    static KEY_PAIRS: std::cell::RefCell<HashMap<Principal, KeyPair>> = 
        std::cell::RefCell::new(HashMap::new());
    static USER_TRANSACTIONS: std::cell::RefCell<HashMap<Principal, Vec<String>>> = 
        std::cell::RefCell::new(HashMap::new());
}

// Helper functions
fn generate_address(user_principal: &Principal, currency: &str) -> String {
    let subaccount = Subaccount::from(&user_principal.to_bytes());
    let account_identifier = AccountIdentifier::new(&ic_cdk::id(), &subaccount);
    
    match currency {
        "ICP" => account_identifier.to_string(),
        "BTC" => format!("bc1q{:x}", account_identifier),
        "ETH" => format!("0x{:x}", account_identifier),
        _ => account_identifier.to_string(),
    }
}

fn generate_transaction_id(from: &Principal, to: &Principal, amount: u64, timestamp: u64) -> String {
    use sha2::{Digest, Sha256};
    
    let mut hasher = Sha256::new();
    hasher.update(from.to_string());
    hasher.update(to.to_string());
    hasher.update(amount.to_be_bytes());
    hasher.update(timestamp.to_be_bytes());
    
    let result = hasher.finalize();
    hex::encode(result)
}

fn get_current_timestamp() -> u64 {
    ic_cdk::api::time() / 1_000_000
}

// Canister endpoints
#[update]
async fn create_wallet(request: CreateWalletRequest) -> Result<Wallet, String> {
    let user_principal = request.user_principal;
    let currency = request.currency.to_uppercase();
    
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        
        let user_wallets = wallets.entry(user_principal).or_insert_with(HashMap::new);
        
        if user_wallets.contains_key(&currency) {
            return Err("Wallet already exists for this currency".to_string());
        }
        
        let address = generate_address(&user_principal, &currency);
        let now = get_current_timestamp();
        
        let wallet = Wallet {
            address: address.clone(),
            balance: 0,
            currency: currency.clone(),
            created_at: now,
            last_activity: now,
            is_active: true,
        };
        
        // Generate key pair
        let key_pair = KeyPair {
            public_key: address.clone(),
            encrypted_private_key: format!("encrypted_{}", address),
            derivation_path: format!("m/44'/0'/0'/0/0"),
            created_at: now,
        };
        
        KEY_PAIRS.with(|keys| {
            keys.borrow_mut().insert(user_principal, key_pair);
        });
        
        user_wallets.insert(currency.clone(), wallet.clone());
        
        Ok(wallet)
    })
}

#[update]
async fn transfer(request: TransferRequest) -> Result<String, String> {
    let from_principal = request.from;
    let to_principal = request.to;
    let amount = request.amount;
    let currency = request.currency.to_uppercase();
    
    // Validate principals
    if from_principal == to_principal {
        return Err("Cannot transfer to yourself".to_string());
    }
    
    if amount == 0 {
        return Err("Transfer amount must be greater than 0".to_string());
    }
    
    // Check sender's balance
    let sender_balance = balance(from_principal, currency.clone()).await?;
    if sender_balance.balance < amount {
        return Err("Insufficient balance".to_string());
    }
    
    let now = get_current_timestamp();
    let tx_id = generate_transaction_id(&from_principal, &to_principal, amount, now);
    
    // Create transaction
    let transaction = Transaction {
        id: tx_id.clone(),
        from: from_principal,
        to: to_principal,
        amount,
        currency: currency.clone(),
        status: TransactionStatus::Pending,
        timestamp: now,
        tx_hash: None,
        metadata: HashMap::new(),
    };
    
    // Store transaction
    TRANSACTIONS.with(|txs| {
        txs.borrow_mut().insert(tx_id.clone(), transaction.clone());
    });
    
    // Add to user transaction lists
    USER_TRANSACTIONS.with(|user_txs| {
        let mut user_txs = user_txs.borrow_mut();
        
        let sender_list = user_txs.entry(from_principal).or_insert_with(Vec::new);
        sender_list.push(tx_id.clone());
        
        let receiver_list = user_txs.entry(to_principal).or_insert_with(Vec::new);
        receiver_list.push(tx_id.clone());
    });
    
    // Update balances (simplified - in real implementation, this would use ledger canister)
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        
        if let Some(sender_wallets) = wallets.get_mut(&from_principal) {
            if let Some(sender_wallet) = sender_wallets.get_mut(&currency) {
                sender_wallet.balance -= amount;
                sender_wallet.last_activity = now;
            }
        }
        
        if let Some(receiver_wallets) = wallets.get_mut(&to_principal) {
            if let Some(receiver_wallet) = receiver_wallets.get_mut(&currency) {
                receiver_wallet.balance += amount;
                receiver_wallet.last_activity = now;
            }
        }
    });
    
    // Update transaction status
    TRANSACTIONS.with(|txs| {
        if let Some(tx) = txs.borrow_mut().get_mut(&tx_id) {
            tx.status = TransactionStatus::Confirmed;
        }
    });
    
    Ok(tx_id)
}

#[query]
async fn balance(user_principal: Principal, currency: String) -> Result<BalanceResponse, String> {
    let currency = currency.to_uppercase();
    
    WALLETS.with(|wallets| {
        let wallets = wallets.borrow();
        
        if let Some(user_wallets) = wallets.get(&user_principal) {
            if let Some(wallet) = user_wallets.get(&currency) {
                Ok(BalanceResponse {
                    balance: wallet.balance,
                    currency: wallet.currency.clone(),
                    last_updated: wallet.last_activity,
                })
            } else {
                Err("Wallet not found for currency".to_string())
            }
        } else {
            Err("No wallets found for user".to_string())
        }
    })
}

#[query]
async fn get_wallet_info(user_principal: Principal, currency: String) -> Result<WalletInfo, String> {
    let currency = currency.to_uppercase();
    
    WALLETS.with(|wallets| {
        let wallets = wallets.borrow();
        
        if let Some(user_wallets) = wallets.get(&user_principal) {
            if let Some(wallet) = user_wallets.get(&currency) {
                let transaction_count = USER_TRANSACTIONS.with(|user_txs| {
                    user_txs.borrow()
                        .get(&user_principal)
                        .map(|txs| txs.len() as u64)
                        .unwrap_or(0)
                });
                
                Ok(WalletInfo {
                    address: wallet.address.clone(),
                    balance: wallet.balance,
                    currency: wallet.currency.clone(),
                    created_at: wallet.created_at,
                    transaction_count,
                })
            } else {
                Err("Wallet not found for currency".to_string())
            }
        } else {
            Err("No wallets found for user".to_string())
        }
    })
}

#[query]
async fn get_user_wallets(user_principal: Principal) -> Result<Vec<Wallet>, String> {
    WALLETS.with(|wallets| {
        let wallets = wallets.borrow();
        
        if let Some(user_wallets) = wallets.get(&user_principal) {
            Ok(user_wallets.values().cloned().collect())
        } else {
            Ok(Vec::new())
        }
    })
}

#[query]
async fn get_transaction(tx_id: String) -> Result<Transaction, String> {
    TRANSACTIONS.with(|txs| {
        let txs = txs.borrow();
        
        txs.get(&tx_id)
            .cloned()
            .ok_or_else(|| "Transaction not found".to_string())
    })
}

#[query]
async fn get_user_transactions(user_principal: Principal) -> Result<Vec<Transaction>, String> {
    USER_TRANSACTIONS.with(|user_txs| {
        let user_txs = user_txs.borrow();
        
        if let Some(tx_ids) = user_txs.get(&user_principal) {
            let mut transactions = Vec::new();
            
            TRANSACTIONS.with(|txs| {
                let txs = txs.borrow();
                
                for tx_id in tx_ids {
                    if let Some(tx) = txs.get(tx_id) {
                        transactions.push(tx.clone());
                    }
                }
            });
            
            // Sort by timestamp (newest first)
            transactions.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));
            
            Ok(transactions)
        } else {
            Ok(Vec::new())
        }
    })
}

#[query]
async fn get_key_pair(user_principal: Principal) -> Result<KeyPair, String> {
    KEY_PAIRS.with(|keys| {
        let keys = keys.borrow();
        
        keys.get(&user_principal)
            .cloned()
            .ok_or_else(|| "Key pair not found".to_string())
    })
}

// Initialization
#[init]
fn init() {
    ic_cdk::println!("Wallet canister initialized");
}

// Pre-upgrade and post-upgrade hooks
#[pre_upgrade]
fn pre_upgrade() {
    // Save state before upgrade
}

#[post_upgrade]
fn post_upgrade() {
    // Restore state after upgrade
}
