# BiOTP Demo App

This is a comprehensive demo application for `react-native-biotp` v1.1.0.

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- OR iOS Simulator / Android Emulator

### Running the App

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on your device:**
   - Scan the QR code with Expo Go app
   - OR press `i` for iOS simulator
   - OR press `a` for Android emulator

## 📱 What's Included

### Modal Examples
1. **Basic Modal** - Simple OTP input with 6 digits
2. **Timer + Resend** - 60-second countdown with resend button (30s cooldown)
3. **Error Handling** - Try entering wrong code to see error animation (correct code: 123456)
4. **Circle + Security** - 4-digit secure entry with auto-submit

### Inline Examples
- **Inline Mode** - Directly embedded OTP input
- **Underline Variant** - 4 digits with underline style
- **Circle Variant** - 4 digits with circular inputs

## ✨ Features Demonstrated

- ✅ **Dual Rendering Modes**: Modal & Inline
- ✅ **Timer & Resend**: Countdown timer with resend functionality
- ✅ **Error Handling**: Error messages with shake animation
- ✅ **Security**: Secure text entry (masked digits)
- ✅ **3 Variants**: Box, Underline, Circle
- ✅ **Haptic Feedback**: Vibration on input
- ✅ **Loading State**: Spinner during verification
- ✅ **Custom Styling**: Different colors and sizes
- ✅ **Auto Submit**: Automatic verification when filled

## 🎯 Try These

1. **Test Timer**: Open "Timer + Resend", wait for timer to expire, then try resend
2. **Test Error**: Open "Error Handling", enter wrong code (anything except 123456)
3. **Test Security**: Open "Circle + Security", notice digits are masked
4. **Test Inline**: Use the inline input at the bottom
5. **Test Paste**: Copy "123456" and paste into any OTP field

## 📝 Code Examples

Check `App.js` to see how each feature is implemented!

## 🐛 Known Issues

- Haptic feedback may not work in Expo Go (works in standalone builds)
- iOS SMS autofill requires native code (not available in Expo Go)

## 📚 Documentation

See main [README.md](../README.md) for full API documentation.
