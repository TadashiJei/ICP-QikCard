# QikCard Platform — Official Experience Provider for WCHL 2025

[![ICP](https://img.shields.io/badge/ICP-Powered-blue)](https://internetcomputer.org/)
[![WCHL2025](https://img.shields.io/badge/WCHL-2025-green)](https://theqikcard.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **QikCard Experience** — Your All-in-One Event Pass, Digital Identity, and ICP Hardwallet

## Overview

QikCard brings the traditional "stamp rally" to the Web3 era. Participants tap their QikCard on QikPoint devices to:

- Earn digital collectibles, NFT stamps, and exclusive rewards
- Track achievements on their personal QikProfile
- Use their QikProfile as a digital calling card within the community
- Secure ICP-powered hardware wallet functionality
- Gateway to blockchain interactions

## Core Features

### For Events — Interactive Engagement
- Seamless booth check-ins, activity logs, and session entries via QikPoint Scanners
- Track real-time participant engagement and venue analytics
- Manage exclusive giveaways, polls, and live voting sessions

### For Crypto Life — Your Secure ICP Hardwallet
- Securely store credentials, NFTs, and tokens with ICP integration
- Sign and authenticate transactions with your QikCard
- Portable, secure, and always within your control

### For Community — Your Public Crypto Portfolio
- Display achievements, NFTs, and credentials via your QikProfile
- Network with fellow participants and builders in the QikCommunity Platform
- Share your digital identity — LinkedIn meets Web3

## QikPoint Scanner Roles

| Device Type | Purpose | Use Case |
|-------------|---------|----------|
| **BoothTag** | Booth check-ins | Digital reward claims |
| **TimeMark** | Entry/exit tracking | Event flow monitoring |
| **ClaimTag** | Controlled distribution | Exclusive merchandise |
| **VoteMark** | Secure polling | Community votes |

## Architecture

```
QikCard Platform
├── Frontend (React/Next.js)
├── Backend (ICP Canisters)
├── Hardware (ESP32 + NFC)
├── QikHub (Management Platform)
└── Documentation
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/tadashijei/icp-qikcard.git
cd icp-qikcard

# Install dependencies
npm install

# Start local development
npm run dev
```

For detailed setup instructions, see [docs/BUILD.md](docs/BUILD.md)

## Project Structure

```
ICP-QikCard/
├── docs/                    # Comprehensive documentation
├── frontend/                # React/Next.js application
├── backend/                 # ICP canisters and smart contracts
├── hardware/                # ESP32 firmware and schematics
├── qikhub/                  # Management platform
├── mobile/                  # Mobile app (optional)
├── tests/                   # Test suites and PocketIC tests
├── scripts/                 # Deployment and utility scripts
├── assets/                  # Images, icons, and media
└── infrastructure/          # DevOps and deployment configs
```

## WCHL 2025 Compliance

This project addresses all judging criteria:

- **Uniqueness**: Novel Web3 event engagement + ICP hardwallet integration
- **Revenue Model**: Clear monetization through event partnerships and premium features
- **Full-Stack**: Complete end-to-end functionality
- **Presentation**: Professional documentation and demo materials
- **Utility & Value**: Solves real event engagement and digital identity needs
- **Demo Quality**: Comprehensive video walkthrough
- **Code Quality**: Well-structured, maintainable codebase
- **Documentation**: Thorough docs covering all requirements
- **Technical Difficulty**: Advanced ICP features (HTTP outcalls, timers, t-ECDSA)

## Live Demo

- **Website**: [theqikcard.com](https://theqikcard.com)
- **Mainnet Canister ID**: `rdmx6-jaaaa-aaaah-qcaiq-cai`
- **Demo Video**: [Watch Demo](https://youtu.be/demo-link)

## ICP Features Used

- **Internet Identity**: Secure authentication
- **HTTP Outcalls**: External API integration
- **Timers**: Automated event management
- **t-ECDSA**: Hardware wallet signatures
- **Bitcoin API**: Cross-chain functionality
- **Asset Canister**: NFT management

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Contact

- **Team**: QikCard Development Team
- **Website**: [theqikcard.com](https://theqikcard.com)
- **Email**: team@theqikcard.com

---

*Built for WCHL 2025 on the Internet Computer Protocol*
