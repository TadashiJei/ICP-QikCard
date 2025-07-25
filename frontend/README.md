# QikCard Frontend Application

## Overview

The QikCard frontend is a modern, responsive web application built with React/Next.js that provides an intuitive interface for event participants, organizers, and administrators to interact with the QikCard ecosystem.

## Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS + HeadlessUI
- **State Management**: Zustand + React Query
- **Authentication**: Internet Identity integration
- **Real-time**: WebSocket connections
- **Mobile**: Progressive Web App (PWA)

### Project Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main dashboard pages
│   ├── events/            # Event-related pages
│   ├── profile/           # User profile pages
│   ├── wallet/            # Wallet functionality
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── charts/           # Data visualization
│   └── layout/           # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── services/              # API services
├── stores/                # Zustand stores
├── styles/                # Global styles
├── types/                 # TypeScript definitions
└── public/                # Static assets
```

## Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run tests
npm test

# Run linting
npm run lint
```

## Key Features

### 1. User Authentication
- **Internet Identity Integration**: Passwordless authentication
- **Multi-device Support**: Seamless cross-device experience
- **Session Management**: Persistent sessions with automatic refresh

### 2. Event Dashboard
- **Event Discovery**: Browse and search upcoming events
- **Real-time Updates**: Live event information and notifications
- **Interactive Maps**: Visual booth and activity locations
- **QR Code Scanner**: Quick check-in functionality

### 3. QikProfile Management
- **Profile Customization**: Personal and professional information
- **Achievement Gallery**: Display earned collectibles and NFTs
- **Social Networking**: Connect with other participants
- **Privacy Controls**: Granular privacy settings

### 4. Crypto Wallet Interface
- **Asset Overview**: View ICP, Bitcoin, and NFT holdings
- **Transaction History**: Complete transaction logs
- **Send/Receive**: Simple transfer functionality
- **QikCard Integration**: Hardware wallet pairing

### 5. Analytics Dashboard
- **Personal Analytics**: Individual engagement metrics
- **Event Insights**: Participation statistics
- **Achievement Tracking**: Progress towards goals
- **Leaderboards**: Community rankings

## Component Architecture

### Base UI Components (`components/ui/`)
```typescript
// Button component with variants
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

// Modal component with portal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

### Form Components (`components/forms/`)
- **EventForm**: Event creation and editing
- **ProfileForm**: User profile management
- **WalletForm**: Wallet operations
- **SearchForm**: Event and user search

### Chart Components (`components/charts/`)
- **EngagementChart**: User engagement visualization
- **AssetChart**: Portfolio performance
- **ActivityChart**: Event activity tracking
- **GrowthChart**: Platform growth metrics

## API Integration

### Service Layer (`services/`)
```typescript
// API service for ICP canister communication
class ICPService {
  async authenticate(identity: Identity): Promise<AuthResult>
  async getEvents(): Promise<Event[]>
  async getUserProfile(principal: string): Promise<UserProfile>
  async mintNFT(data: NFTData): Promise<NFTResult>
}

// WebSocket service for real-time updates
class WebSocketService {
  connect(url: string): void
  subscribe(event: string, callback: Function): void
  emit(event: string, data: any): void
}
```

### State Management (`stores/`)
```typescript
// User store with Zustand
interface UserStore {
  user: User | null
  isAuthenticated: boolean
  login: (identity: Identity) => Promise<void>
  logout: () => void
  updateProfile: (data: ProfileData) => Promise<void>
}

// Event store
interface EventStore {
  events: Event[]
  currentEvent: Event | null
  loading: boolean
  fetchEvents: () => Promise<void>
  selectEvent: (id: string) => void
}
```

## Progressive Web App (PWA)

### PWA Features
- **Offline Support**: Core functionality available offline
- **Push Notifications**: Real-time event updates
- **Home Screen Installation**: Native app-like experience
- **Background Sync**: Automatic data synchronization

### Service Worker
```javascript
// sw.js - Service worker for PWA functionality
const CACHE_NAME = 'qikcard-v1.0.0';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];
```

## Design System

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;
  
  /* Secondary Colors */
  --secondary-50: #f0fdf4;
  --secondary-500: #22c55e;
  --secondary-900: #14532d;
  
  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-500: #6b7280;
  --gray-900: #111827;
}
```

### Typography
- **Headings**: Inter font family
- **Body**: System fonts for optimal performance
- **Code**: JetBrains Mono for technical content

### Component Variants
- **Buttons**: 4 variants × 3 sizes = 12 combinations
- **Cards**: Basic, elevated, interactive variants
- **Inputs**: Text, email, password, search types
- **Navigation**: Sidebar, topbar, breadcrumb styles

## Testing Strategy

### Testing Stack
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress for E2E testing
- **Visual Tests**: Storybook + Chromatic
- **Performance Tests**: Lighthouse CI

### Test Structure
```typescript
// Example component test
describe('EventCard Component', () => {
  test('renders event information correctly', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<EventCard event={mockEvent} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Deployment

### Build Process
```bash
# Production build
npm run build

# Static export (for ICP asset canister)
npm run export

# Bundle analysis
npm run analyze
```

### Environment Configuration
```bash
# Environment variables
NEXT_PUBLIC_DFX_NETWORK=ic
NEXT_PUBLIC_CANISTER_ID_AUTH=rdmx6-jaaaa-aaaah-qcaiq-cai
NEXT_PUBLIC_CANISTER_ID_EVENT=rrkah-fqaaa-aaaah-qcaiq-cai
NEXT_PUBLIC_API_BASE_URL=https://api.theqikcard.com
```

### ICP Asset Canister Deployment
```bash
# Deploy to ICP asset canister
dfx deploy frontend --network ic

# Update asset canister
dfx canister call frontend store '(record { 
  key="/index.html"; 
  content_type="text/html"; 
  content=file("./out/index.html") 
})'
```

## Performance Optimization

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Optimization Techniques
- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: Next.js Image component with WebP
- **Bundle Optimization**: Tree shaking and compression
- **Caching Strategy**: Efficient browser and CDN caching

## Security Considerations

### Security Measures
- **Content Security Policy**: Strict CSP headers
- **HTTPS Only**: All communications encrypted
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user input

### Internet Identity Integration
```typescript
// Secure authentication flow
const authenticateUser = async () => {
  try {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: () => {
        // Handle successful authentication
        const identity = authClient.getIdentity();
        // Store identity securely
      }
    });
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};
```

## Mobile Optimization

### Responsive Design
- **Breakpoints**: Mobile-first responsive design
- **Touch Interactions**: Optimized for touch devices
- **Performance**: Lightweight for mobile networks
- **Accessibility**: WCAG 2.1 AA compliance

### NFC Integration
```typescript
// NFC Web API integration (where supported)
const handleNFCRead = async () => {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.addEventListener('reading', ({ message }) => {
        // Process NFC data
        handleQikCardInteraction(message);
      });
    } catch (error) {
      console.error('NFC not supported:', error);
    }
  }
};
```

---

*The QikCard frontend delivers a world-class user experience that seamlessly bridges physical and digital event interactions through cutting-edge Web3 technology.*
