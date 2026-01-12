# Contributing to Nia LeSane

Welcome to the Nia LeSane project! 🎷✨ We're building a world-class CEO application, and your contributions help make it extraordinary.

## 🎯 Development Philosophy

**Nia LeSane is CEO-level software.** Every contribution should reflect:
- **Soulful**: Intentional, meaningful, and elegant
- **Flawless**: Well-tested, type-safe, and production-ready
- **Powerful**: Leverages cutting-edge technology (quantum computing, biometrics, haptics)
- **Premium**: Best-in-class UX and code quality

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.19.0 (check with `.nvmrc`)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI**: `npm install -g eas-cli` (for builds)

### Setup

```bash
# Clone the repository
git clone https://github.com/jazzu72/nia-lesane.git
cd nia-lesane

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Start development server
npm start
```

## 📋 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

Follow our code quality standards:

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all validations
npm run validate
```

### 3. Write Tests

- **Every new feature** needs tests
- **Every bug fix** needs a regression test
- Aim for **70%+ coverage**

```bash
# Run tests
npm test

# Watch mode (during development)
npm run test:watch

# Coverage report
npm run test:coverage
```

### 4. Commit Your Changes

We use conventional commits:

```bash
git commit -m "feat: add biometric authentication"
git commit -m "fix: resolve quantum state calculation bug"
git commit -m "docs: update README with new setup steps"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:
- **Clear title**: `[NIA-EVOLUTION] Add biometric authentication`
- **Description**: What changed and why
- **Screenshots**: For UI changes
- **Testing**: How you verified it works

## 🎨 Code Style Guidelines

### TypeScript

- **No `any` types** - Use proper typing
- **Strict mode** - All strict TypeScript checks enabled
- **Interfaces over types** - For object shapes
- **Explicit return types** - On all functions

```typescript
// ✅ Good
export const fetchQuantumState = async (): Promise<QuantumState> => {
    // implementation
};

// ❌ Bad
export const fetchQuantumState = async () => {
    // implementation
};
```

### React Native

- **Functional components** with hooks
- **No inline styles** - Use StyleSheet.create()
- **Haptic feedback** for all interactive elements
- **Accessibility** - Always add accessible labels

```typescript
// ✅ Good
const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // action
};

// ❌ Bad
const handlePress = () => {
    // action without haptics
};
```

### File Organization

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen-level components
├── services/        # Business logic and API calls
├── config/          # Configuration files
├── styles/          # Theme and shared styles
└── tests/           # Test files
```

## 🧪 Testing Standards

### Unit Tests

Test all services and utilities:

```typescript
describe('QuantumService', () => {
    it('should fetch quantum state successfully', async () => {
        const state = await fetchQuantumState();
        expect(state.coherence).toBeGreaterThan(0);
    });
});
```

### Component Tests

Use React Native Testing Library:

```typescript
import { render, fireEvent } from '@testing-library/react-native';

test('button triggers haptic feedback', async () => {
    const { getByText } = render(<MyButton />);
    const button = getByText('Press Me');
    fireEvent.press(button);
    // assertions
});
```

## 🔐 Security

- **Never commit secrets** - Use `.env` files
- **No hardcoded credentials** - Always use environment variables
- **Secure storage** - Use `expo-secure-store` for sensitive data
- **API security** - All backend calls should be authenticated

## 📦 Dependencies

### Adding Dependencies

```bash
# For runtime dependencies
npm install package-name

# For dev dependencies
npm install -D package-name
```

Always document WHY you're adding a dependency in the PR.

## 🚢 Deployment

### iOS

```bash
eas build --platform ios
eas submit -p ios
```

### Android

```bash
eas build --platform android
eas submit -p android
```

## 🐛 Reporting Issues

Use GitHub Issues with the following template:

**Bug Report:**
- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment (iOS/Android, device)

**Feature Request:**
- Use case
- Proposed solution
- Alternative solutions considered

## 💬 Getting Help

- **Documentation**: Check `DOCUMENTATION.md`
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions

## 🎷 Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Celebrate each other's contributions
- Remember: We're building something soulful and powerful together

---

**Thank you for contributing to Nia LeSane!** 🎷✨

*House of Jazzu*
