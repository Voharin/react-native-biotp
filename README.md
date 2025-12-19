# React Native BiOTP

A powerful and customizable OTP (One-Time Password) input component for React Native applications with advanced features including timer, error handling, animations, and accessibility support.

## Features

✨ **Dual Rendering Modes** - Modal or Inline display
⏱️ **Timer & Resend** - Built-in countdown timer with resend functionality
🎨 **Multiple Variants** - Box, Underline, or Circle styles
🌗 **Dark Mode** - Full dark mode support
⚡ **Animations** - Shake on error, success animations
♿ **Accessibility** - WCAG compliant with screen reader support
📱 **Platform Optimized** - iOS autofill & Android SMS autofill
🔒 **Security** - Secure text entry, input validation
🎯 **Haptic Feedback** - Optional vibration feedback
💪 **TypeScript** - Full type definitions

## Installation

```bash
npm install react-native-biotp
# or
yarn add react-native-biotp
```

## Quick Start

### Modal Mode (Default)
```jsx
import React, { useState } from 'react';
import BiOTP from 'react-native-biotp';

const App = () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <BiOTP
      visible={visible}
      onClose={() => setVisible(false)}
      onFilled={(code) => console.log('OTP:', code)}
      length={6}
      variant="box"
    />
  );
};
```

### Inline Mode
```jsx
import BiOTP from 'react-native-biotp';

const App = () => {
  return (
    <BiOTP
      renderMode="inline"
      onFilled={(code) => console.log('OTP:', code)}
      length={6}
    />
  );
};
```

## Advanced Usage

### With Timer and Resend
```jsx
<BiOTP
  visible={visible}
  timer={60}
  showTimer={true}
  resendEnabled={true}
  onResend={() => console.log('Resend code')}
  resendCooldown={30}
  onTimerExpire={() => console.log('Timer expired')}
  onFilled={(code) => verifyCode(code)}
/>
```

### With Error Handling
```jsx
const [error, setError] = useState('');

<BiOTP
  visible={visible}
  error={error}
  errorColor="#FF3B30"
  onVerify={(code) => {
    if (code !== '123456') {
      setError('Invalid code. Please try again.');
    }
  }}
/>
```

### With Auto Submit
```jsx
<BiOTP
  visible={visible}
  autoSubmit={true}
  loading={isVerifying}
  onFilled={async (code) => {
    setIsVerifying(true);
    await verifyOTP(code);
    setIsVerifying(false);
  }}
/>
```

### Circle Variant with Security
```jsx
<BiOTP
  variant="circle"
  secureTextEntry={true}
  hapticFeedback={true}
  onFilled={(code) => console.log('Secure OTP entered')}
/>
```

### Custom Styling
```jsx
<BiOTP
  visible={visible}
  inputStyle={{ borderWidth: 3, borderRadius: 8 }}
  inputTextStyle={{ fontSize: 28, fontWeight: 'bold' }}
  containerStyle={{ gap: 12 }}
  inputSize={60}
  inputSpacing={8}
  focusColor="#00D4FF"
  errorColor="#FF006E"
/>
```

### Input Validation
```jsx
<BiOTP
  visible={visible}
  allowedCharacters={/^[0-9]$/}
  clearOnFill={false}
  onTextChange={(text) => console.log('Current input:', text)}
  onFilled={(code) => console.log('Complete code:', code)}
/>
```

## Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of OTP digits |
| `variant` | `'box' \| 'underline' \| 'circle'` | `'box'` | Visual style of inputs |
| `type` | `KeyboardTypeOptions` | `'numeric'` | Keyboard type |
| `placeholder` | `string` | `'0'` | Placeholder text |

### Rendering Mode

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `renderMode` | `'modal' \| 'inline'` | `'modal'` | Display mode |

### Modal Props (Modal mode only)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Show/hide modal |
| `onClose` | `() => void` | - | Close callback |
| `title` | `string` | `'Enter Verification Code'` | Modal title |

### State Management

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable inputs |
| `error` | `string \| boolean` | - | Error state/message |
| `isSuccess` | `boolean` | `false` | Success state |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onTextChange` | `(text: string) => void` | Called on each input change |
| `onFilled` | `(code: string) => void` | Called when all digits filled |
| `onSubmit` | `(code: string) => void` | Called on verify button press |
| `onVerify` | `(code: string) => void` | Called on verification |

### Timer & Resend

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `timer` | `number` | - | Countdown timer in seconds |
| `onTimerExpire` | `() => void` | - | Called when timer reaches 0 |
| `showTimer` | `boolean` | `true` | Show timer display |
| `resendEnabled` | `boolean` | `false` | Show resend button |
| `onResend` | `() => void` | - | Resend code callback |
| `resendText` | `string` | `'Resend Code'` | Resend button text |
| `resendCooldown` | `number` | `30` | Cooldown time in seconds |

### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dark` | `boolean` | `false` | Dark mode |
| `focusColor` | `string` | `'#007AFF'` | Focus border color |
| `errorColor` | `string` | `'#FF3B30'` | Error color |
| `successColor` | `string` | `'#34C759'` | Success color |
| `buttonStyle` | `'primary' \| 'secondary'` | `'primary'` | Button variant |

### Custom Styles

| Prop | Type | Description |
|------|------|-------------|
| `containerStyle` | `StyleProp<ViewStyle>` | Container style |
| `inputStyle` | `StyleProp<ViewStyle>` | Input box style |
| `inputTextStyle` | `StyleProp<TextStyle>` | Input text style |
| `errorTextStyle` | `StyleProp<TextStyle>` | Error text style |
| `titleStyle` | `StyleProp<TextStyle>` | Title text style |
| `buttonTextStyle` | `StyleProp<TextStyle>` | Button text style |
| `inputSpacing` | `number` | `4` | Space between inputs |
| `inputSize` | `number` | auto | Input width/height |

### Animation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animationEnabled` | `boolean` | `true` | Enable animations |
| `animationDuration` | `number` | `300` | Animation duration (ms) |

### Security & Validation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `secureTextEntry` | `boolean` | `false` | Hide OTP digits |
| `autoSubmit` | `boolean` | `false` | Auto submit when filled |
| `allowedCharacters` | `RegExp` | - | Regex for validation |
| `clearOnFill` | `boolean` | `false` | Clear after filling |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accessibilityLabel` | `string` | `'OTP Input'` | Accessibility label |
| `accessibilityHint` | `string` | `'Enter the verification code'` | Accessibility hint |

### Additional Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoFocus` | `boolean` | `true` | Auto focus first input |
| `hapticFeedback` | `boolean` | `false` | Enable vibration |

## Platform-Specific Features

### iOS
- **Auto-fill Support**: Automatically reads OTP from SMS (iOS 12+)
- **Haptic Feedback**: Native vibration feedback

### Android
- **SMS Auto-fill**: Google Play Services SMS verification API
- **Material Design**: Native ripple effects

## TypeScript Support

Full TypeScript definitions included:

```typescript
import BiOTP, { OTPInputProps } from 'react-native-biotp';

const props: OTPInputProps = {
  length: 6,
  onFilled: (code: string) => console.log(code),
};
```

## Examples

Check out the [examples](https://github.com/Voharin/react-native-biotp/tree/main/examples) directory for more use cases.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © Cuneyt Zerenuz

## Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/Voharin/react-native-biotp)!
