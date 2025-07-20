# 🤝 Contributing to QikCard Platform

## Welcome Contributors!

We're excited that you're interested in contributing to QikCard Platform! This document provides guidelines for contributing to our Web3 event engagement platform built on the Internet Computer Protocol.

## 🎯 Ways to Contribute

### Code Contributions
- **Bug Fixes**: Help us squash bugs and improve stability
- **Feature Development**: Implement new features from our roadmap
- **Performance Optimization**: Improve platform performance and efficiency
- **Testing**: Add test coverage and improve test quality
- **Documentation**: Enhance documentation and tutorials

### Non-Code Contributions
- **Bug Reports**: Report issues you encounter
- **Feature Requests**: Suggest new features and improvements
- **Documentation**: Improve guides, tutorials, and API docs
- **Design**: Contribute to UI/UX improvements
- **Community Support**: Help other users in discussions

## 🚀 Getting Started

### Prerequisites
```bash
# Required tools
Node.js >= 18.0.0
Rust >= 1.70.0
DFX >= 0.15.0
Git >= 2.30.0
```

### Development Setup
```bash
# 1. Fork and clone the repository
git clone https://github.com/your-username/icp-qikcard.git
cd icp-qikcard

# 2. Run the setup script
./scripts/development/setup-dev.sh

# 3. Start local development
dfx start --background
dfx deploy
cd frontend && npm run dev
```

## 📋 Contribution Process

### 1. Choose Your Contribution
- Check [open issues](https://github.com/qikcard/icp-qikcard/issues) for bug reports and feature requests
- Look for issues labeled `good first issue` for beginners
- Review our [project roadmap](docs/FUTURE_PLANS.md) for upcoming features
- Join our [Discord](https://discord.gg/qikcard) to discuss ideas

### 2. Set Up Your Environment
```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 3. Make Your Changes
- Follow our [coding standards](#coding-standards)
- Write tests for your changes
- Update documentation as needed
- Ensure all tests pass

### 4. Submit Your Contribution
```bash
# Add and commit your changes
git add .
git commit -m "feat: add new feature" # Use conventional commits

# Push to your fork
git push origin feature/your-feature-name

# Create a Pull Request
```

## 🎨 Coding Standards

### TypeScript/JavaScript (Frontend & QikHub)
```typescript
// Use descriptive variable names
const userInteractionData = await fetchUserData();

// Prefer async/await over promises
async function processEvent(eventId: string): Promise<EventResult> {
  try {
    const event = await getEvent(eventId);
    return await processEventData(event);
  } catch (error) {
    console.error('Error processing event:', error);
    throw error;
  }
}

// Use TypeScript interfaces for type safety
interface EventData {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}
```

### Rust (Backend Canisters)
```rust
// Use descriptive function names and add documentation
/// Authenticates a user using Internet Identity
/// 
/// # Arguments
/// * `principal` - The user's Internet Identity principal
/// 
/// # Returns
/// * `Result<AuthSession, String>` - Authentication session or error
#[update]
async fn authenticate_user(principal: Principal) -> Result<AuthSession, String> {
    validate_principal(&principal)?;
    
    let session = create_user_session(principal).await?;
    store_session(&session)?;
    
    Ok(session)
}

// Use proper error handling
fn validate_event_data(data: &EventData) -> Result<(), String> {
    if data.name.is_empty() {
        return Err("Event name cannot be empty".to_string());
    }
    
    if data.start_time >= data.end_time {
        return Err("Event start time must be before end time".to_string());
    }
    
    Ok(())
}
```

### Hardware (C++/Arduino)
```cpp
// Use clear class and method names
class NFCManager {
private:
    Adafruit_PN532 nfc_module;
    
public:
    // Document complex methods
    /**
     * Reads NFC card data and validates signature
     * @return NFCData struct containing card information
     */
    NFCData readAndValidateCard();
    
    // Use meaningful constants
    static const uint8_t NFC_READ_TIMEOUT_MS = 1000;
    static const uint8_t MAX_RETRY_ATTEMPTS = 3;
};

// Handle errors gracefully
bool NFCManager::initializeNFC() {
    if (!nfc_module.begin()) {
        Serial.println("ERROR: NFC module initialization failed");
        return false;
    }
    
    nfc_module.setPassiveActivationRetries(0xFF);
    Serial.println("INFO: NFC module initialized successfully");
    return true;
}
```

## 🧪 Testing Guidelines

### Frontend Testing
```typescript
// Test components thoroughly
describe('EventCard Component', () => {
  test('should render event information correctly', () => {
    const mockEvent = createMockEvent();
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
  });
  
  test('should handle click events', async () => {
    const mockOnClick = jest.fn();
    const mockEvent = createMockEvent();
    
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledWith(mockEvent.id);
  });
});
```

### Backend Testing (Rust)
```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_user_authentication() {
        let principal = Principal::from_text("rdmx6-jaaaa-aaaah-qcaiq-cai").unwrap();
        let result = validate_principal(&principal);
        assert!(result.is_ok());
    }
    
    #[tokio::test]
    async fn test_event_creation() {
        let event_data = create_test_event_data();
        let result = create_event(event_data).await;
        
        assert!(result.is_ok());
        let event_id = result.unwrap();
        assert!(!event_id.is_empty());
    }
}
```

## 📝 Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and consistent commit messages:

```bash
# Format: type(scope): description

# Examples:
git commit -m "feat(auth): add Internet Identity integration"
git commit -m "fix(nfc): resolve card reading timeout issue" 
git commit -m "docs(api): update authentication endpoint documentation"
git commit -m "test(events): add integration tests for event creation"
git commit -m "refactor(wallet): optimize transaction processing"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `style`: Code style changes
- `chore`: Maintenance tasks

## 📖 Pull Request Guidelines

### PR Title Format
```
feat(component): brief description of change

# Examples:
feat(auth): implement session management
fix(nfc): resolve communication timeout
docs(api): add wallet endpoint documentation
```

### PR Description Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] New tests added (if applicable)

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS, Windows, Ubuntu]
 - Browser [e.g. chrome, safari] (if applicable)
 - Version [e.g. 22]
 - DFX Version [e.g. 0.15.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

**Implementation Ideas**
If you have ideas about how this could be implemented, please share them.
```

## 🏆 Recognition

### Contributor Recognition
- All contributors are listed in our [CONTRIBUTORS.md](CONTRIBUTORS.md) file
- Significant contributors get special recognition in release notes
- Top contributors may be invited to join our core team
- Contributors get early access to new features and beta testing

### Contribution Levels
- **First-time Contributors**: Welcome package and mentorship
- **Regular Contributors**: Access to contributor Discord channels
- **Core Contributors**: Voting rights on major decisions
- **Maintainers**: Full repository access and review permissions

## 🤔 Questions?

### Getting Help
- **Discord**: Join our [Discord server](https://discord.gg/qikcard) for real-time help
- **GitHub Discussions**: Use [GitHub Discussions](https://github.com/qikcard/icp-qikcard/discussions) for longer conversations
- **Email**: Contact us at contributors@qikcard.com for private inquiries

### Code of Conduct
Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## 📄 License

By contributing to QikCard Platform, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to QikCard Platform! 🚀**

*Together, we're building the future of Web3 event engagement.*
