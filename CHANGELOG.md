# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-19

### Added
- **Rendering Modes**: Support for both `modal` and `inline` display modes
- **Timer Functionality**: Built-in countdown timer with customizable duration
- **Resend Feature**: Resend button with cooldown period
- **Error Handling**: Error state with visual feedback and custom error messages
- **Success State**: Success state with visual indicators
- **Animations**: 
  - Shake animation on error
  - Success animation
  - Smooth transitions
- **Circle Variant**: New circular input style option
- **Advanced Styling Options**:
  - `containerStyle` - Custom container styling
  - `inputStyle` - Custom input box styling
  - `inputTextStyle` - Custom input text styling
  - `errorTextStyle` - Custom error message styling
  - `titleStyle` - Custom title styling
  - `buttonTextStyle` - Custom button text styling
  - `inputSpacing` - Configurable spacing between inputs
  - `inputSize` - Custom input dimensions
- **Security Features**:
  - `secureTextEntry` - Hide OTP characters
  - `autoSubmit` - Automatically submit when filled
  - `allowedCharacters` - Regex-based input validation
  - `clearOnFill` - Clear inputs after filling
- **Accessibility**:
  - Comprehensive accessibility labels and hints
  - Screen reader support
  - WCAG compliance
  - Proper accessibility roles
- **Platform-Specific Features**:
  - iOS: `textContentType="oneTimeCode"` for SMS autofill
  - Android: SMS autofill support
  - Haptic feedback option
- **State Management**:
  - Loading state with spinner
  - Disabled state
  - Success/error color customization
- **Additional Props**:
  - `autoFocus` - Auto focus first input
  - `hapticFeedback` - Optional vibration feedback
  - `animationEnabled` - Toggle animations
  - `animationDuration` - Customize animation timing

### Changed
- Improved TypeScript type definitions with better organization
- Enhanced input focus management
- Better keyboard handling and paste support
- Optimized component performance with `useCallback` and `useMemo`
- Updated default styles for better visual consistency
- Improved dark mode support

### Fixed
- Fixed paste functionality for multiple digits
- Fixed backspace navigation between inputs
- Fixed timer reset on visibility change
- Fixed editable state when timer expires

## [1.0.0] - 2024

### Added
- Initial release
- Basic OTP input functionality
- Modal display mode
- Box and underline variants
- Dark mode support
- Auto-focus and paste support
- TypeScript support
