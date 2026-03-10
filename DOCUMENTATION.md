# 📚 Nia LeSane Technical Documentation

## 📡 API Reference

### Quantum Service (`src/services/QuantumService.ts`)
The primary interface for quantum operations.

- `fetchQuantumState()`: Fetches the current system state (coherence, resonance, etc.).
- `submitOptimizationJob(circuit: string)`: Submits a QASM circuit for optimization.

### Twilio Service (`src/services/TwilioService.ts`)
- `sendSms(message: string)`: Sends a status report via SMS.
- `initiateCall(script: string)`: Initiates a voice call placeholder.

---

## 🚀 Deployment Guide

### Twilio Configuration
1. Create a free Twilio account at [twilio.com](https://www.twilio.com).
2. Get your **Account SID**, **Auth Token**, and a **Twilio Phone Number**.
3. Update `src/config/secrets.ts` with these values.
4. Update `USER_PHONE` with your personal number (current: 757-339-9245).

### Prerequisites
- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

### Local Development
1. Clone the repository.
2. Run `npm install`.
3. Start the dev server: `npx expo start`.

### Production Build (iOS/Android)
1. Configure `eas.json` with your credentials.
2. Run `eas build --platform all`.
3. For iOS App Store: `eas submit -p ios`.

---

## 🤝 Contributing Guide

### Principles
- **Soulful Design**: Every component should feel premium and intentional.
- **Type Safety**: No `any` types. Use interfaces for all data structures.
- **Test First**: Add unit tests for every new service or screen.

### Workflow
1. Create a feature branch.
2. Implement changes.
3. Run `npm test` and `npm run type-check`.
4. Open a Pull Request with the prefix `[NIA-EVOLUTION]`.

---

## 🔐 Security Policy
- Never commit `src/config/secrets.ts` if it contains real keys.
- Use Environment Variables in CI/CD.
- All API communication must be over HTTPS.
