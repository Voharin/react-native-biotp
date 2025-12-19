# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

react-native-biotp is a React Native OTP (One-Time Password) input component library. It's a TypeScript-based npm package that exports a single modal-based OTP input component with customizable styling and behavior.

## Commands

### Build
```bash
npm run build
```
Compiles TypeScript source files from `src/` to JavaScript in `dist/` using the TypeScript compiler. This is required before publishing or testing the package locally.

### Development Workflow
Since this is a library without an example app:
1. Make changes to source files in `src/`
2. Run `npm run build` to compile
3. Test locally using `npm pack` to create a tarball, then install it in a test React Native app:
   ```bash
   npm pack
   # In your test app:
   npm install /path/to/react-native-biotp-1.0.0.tgz
   ```

### Prepare Hook
The `prepare` script runs automatically before publishing and after `npm install`:
```bash
npm run prepare
```
This ensures the package is always built before being published or installed from a local directory.

## Architecture

### Component Structure
The library has a focused architecture with extensive customization:

- **BiOTP.tsx**: Main component implementation (v1.1.0+)
  - Supports both Modal and Inline rendering modes
  - Manages OTP state, timer, and resend logic using React hooks
  - Handles text input, focus management, and paste operations
  - Supports 'box', 'underline', and 'circle' visual variants
  - Responsive design that adapts to screen width
  - Built-in animations (shake on error, success animation)
  - Error state management with visual feedback
  - Platform-specific features (iOS autofill, Android SMS API)
  
- **BiOTP.types.ts**: TypeScript interface definitions
  - `OTPInputProps`: Comprehensive interface with 40+ props organized by category
  - Type-safe definitions for callbacks, styling, and behavior options
  
- **index.ts**: Package entry point
  - Exports the BiOTP component as default
  - Re-exports all types

### Key Design Patterns

1. **Dual Rendering Modes**: Component can render as modal overlay or inline component
2. **Controlled inputs with refs**: Uses an array of TextInput refs for focus management
3. **Auto-advance**: Automatically focuses the next input when a digit is entered
4. **Paste support**: Handles pasting multiple digits at once with validation
5. **Backspace navigation**: Moves to previous input on backspace when current is empty
6. **Dynamic sizing**: Input width calculated based on screen dimensions or custom size
7. **Timer Management**: Built-in countdown timer with expiry callbacks
8. **Error Handling**: Visual feedback with shake animation and customizable error messages
9. **Accessibility First**: Comprehensive ARIA labels and screen reader support
10. **Performance Optimized**: Uses useCallback and React.memo to minimize re-renders

### Component Props Categories
See `BiOTP.types.ts` for the complete interface. Props are organized into:

**Core Props:**
- `length`, `variant`, `type`, `placeholder`

**Rendering Mode:**
- `renderMode`: 'modal' | 'inline'

**State Management:**
- `loading`, `disabled`, `error`, `isSuccess`

**Timer & Resend:**
- `timer`, `onTimerExpire`, `resendEnabled`, `onResend`, `resendCooldown`

**Styling:**
- `dark`, `focusColor`, `errorColor`, `successColor`
- Custom styles: `containerStyle`, `inputStyle`, `inputTextStyle`, etc.

**Security:**
- `secureTextEntry`, `autoSubmit`, `allowedCharacters`, `clearOnFill`

**Accessibility:**
- `accessibilityLabel`, `accessibilityHint`

**Platform Features:**
- `autoFocus`, `hapticFeedback` (iOS/Android specific)

### State Flow
1. User opens modal or inline component loads
2. First input auto-focuses (if enabled)
3. User enters digits with auto-advance
4. Timer counts down (if enabled)
5. On fill: `onFilled` callback fires
6. On verify: `onVerify`/`onSubmit` callbacks fire
7. Error state triggers shake animation
8. Success state shows visual feedback
9. Resend button becomes available after cooldown

## TypeScript Configuration

The project uses strict TypeScript compilation:
- **Target**: ESNext with CommonJS modules
- **Output**: `dist/` directory with declaration files (.d.ts)
- **Strict mode**: Enabled for type safety

## Package Distribution

- **Entry point**: `dist/index.js`
- **Types**: `dist/index.d.ts`
- **Published files**: Only `dist/` and `README.md` are included in the npm package
- **Peer dependencies**: React >=16.8.0 and React Native >=0.60.0

## Code Style Notes

- Uses React hooks (functional components)
- Optional chaining (`?.`) for callback safety
- TypeScript interfaces for prop types
- React Native's built-in StyleSheet for styling
- No external dependencies beyond React Native core
