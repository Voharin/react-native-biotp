# React Native BiOTP

A simple yet powerful OTP (One-Time Password) input component for React Native applications.

## Installation

```bash
npm install react-native-biotp
# or
yarn add react-native-biotp
```

## Usage

```jsx
import BiOTP from 'react-native-biotp';

const App = () => {
  return (
    <BiOTP
      length={6}
      onFilled={(code) => console.log('OTP Code:', code)}
      variant="box"
      focusColor="#007AFF"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| length | number | 6 | Length of the OTP code |
| variant | 'box' \| 'underline' | 'box' | Visual style of the input |
| dark | boolean | false | Enable dark mode |
| onTextChange | (text: string) => void | - | Callback when text changes |
| onFilled | (code: string) => void | - | Callback when all digits are filled |
| onSubmit | (code: string) => void | - | Callback when submit button is pressed |
| focusColor | string | '#007AFF' | Color of the focused input |
| type | KeyboardTypeOptions | 'numeric' | Keyboard type for input |
| placeholder | string | '0' | Placeholder for empty inputs |
| visible | boolean | false | Control visibility of OTP input |
| title | string | 'Enter Verification Code' | Title text |
| buttonStyle | 'primary' \| 'secondary' | 'primary' | Style variant for button |

## License

MIT
