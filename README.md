# 🎷 Nia LeSane - CEO Application

> **Autonomous, Soulful, Powerful.** A premium React Native application featuring quantum computing integration, biometric security, and best-in-class UX.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-61dafb.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0-000020.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-UNLICENSED-red.svg)]()

## ✨ Features

- 🔐 **Biometric Authentication** - Secure login with Face ID / Touch ID
- ⚛️ **Quantum Integration** - Azure Quantum backend for advanced computations
- 💳 **Stripe Payments** - Seamless monetization with Stripe integration
- 📱 **Premium UX** - Glassmorphism, haptic feedback, smooth animations
- 🎨 **Dark Mode** - Beautiful dark theme with vibrant gradients
- 📧 **Communication Hub** - Twilio SMS/Voice integration
- 🧪 **Type-Safe** - 100% TypeScript with strict mode enabled
- ✅ **Well-Tested** - Comprehensive test coverage with Jest

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.19.0+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Simulator** (Mac) or **Android Emulator**

### Installation

```bash
# Clone the repository
git clone https://github.com/jazzu72/nia-lesane.git
cd nia-lesane

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm start
```

### Running the App

```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android

# Expo Go (scan QR code)
npm start
```

## 📁 Project Structure

```
nia-lesane/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── QuantumPulsar.tsx
│   ├── screens/          # Application screens
│   │   ├── AuthScreen.tsx
│   │   └── DashboardScreen.tsx
│   ├── services/         # Business logic & API clients
│   │   ├── AuthService.ts
│   │   ├── QuantumService.ts
│   │   ├── AzureQuantumApi.ts
│   │   ├── TwilioService.ts
│   │   ├── LoggerService.ts
│   │   └── PerformanceService.ts
│   ├── config/           # Configuration
│   │   └── secrets.ts
│   ├── styles/           # Theme & styling
│   │   └── theme.ts
│   └── tests/            # Test files
│       ├── E2E/
│       └── *.test.ts
├── .github/workflows/    # CI/CD pipelines
├── integrations/         # External integrations
│   └── azure/           # Azure Quantum Python backend
├── App.tsx              # Application entry point
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
└── jest.config.js       # Test configuration
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm start                 # Start Expo dev server
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator

# Code Quality
npm run type-check       # TypeScript type checking
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
npm run validate         # Run all checks (types + lint + tests)

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### Code Quality Standards

- **TypeScript Strict Mode**: No `any` types allowed
- **ESLint**: Enforced code style and best practices
- **Prettier**: Automatic code formatting
- **70%+ Test Coverage**: All features must be tested
- **Husky Pre-commit Hooks**: Automatic linting and formatting

## 🏗️ Architecture

### Frontend (React Native + Expo)

- **Navigation**: React Navigation with Stack Navigator
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: StyleSheet with theme system
- **Animation**: react-native-reanimated
- **Security**: expo-secure-store, expo-local-authentication

### Backend Integration

- **Azure Quantum**: Python FastAPI backend (see `integrations/azure/`)
- **Stripe**: Payment processing
- **Twilio**: SMS and Voice communication

### Key Services

- **AuthService**: Handles password authentication
- **QuantumService**: Interfaces with Azure Quantum backend
- **TwilioService**: SMS/Voice communication
- **LoggerService**: Centralized logging
- **PerformanceService**: Performance monitoring

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- AuthService.test.ts

# Watch mode (re-runs on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🚢 Deployment

### iOS App Store

```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit -p ios
```

### Android Play Store

```bash
# Build for Android
eas build --platform android

# Submit to Play Store
eas submit -p android
```

See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) for detailed deployment instructions.

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

- `SPECIAL_PASSWORD`: CEO authentication password
- `AZURE_API_BASE_URL`: Azure Quantum backend URL
- `STRIPE_PUBLISHABLE_KEY`: Stripe public key
- `TWILIO_ACCOUNT_SID`: Twilio account identifier
- `TWILIO_AUTH_TOKEN`: Twilio authentication token
- `USER_PHONE`: Target phone number for notifications

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development workflow
- Code style guidelines
- Testing requirements
- Pull request process

## 📚 Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guide
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Technical documentation
- [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - Deployment guide
- [LAUNCH_GUIDE.md](./LAUNCH_GUIDE.md) - Launch checklist

## 🔧 Troubleshooting

### Common Issues

**TypeScript errors after install:**
```bash
npm run type-check
```

**Tests failing:**
```bash
npm run test:coverage
# Check coverage report in coverage/ directory
```

**Expo won't start:**
```bash
rm -rf node_modules .expo
npm install
npm start -- --clear
```

## 📜 License

UNLICENSED - Proprietary software for House of Jazzu

## 🎷 About

**Nia LeSane** is a premium CEO application built with soul, powered by quantum computing, and designed for excellence.

*House of Jazzu* - Where AI meets artistry.

---

**Built with** ❤️ **by the world's top AI engineers**

