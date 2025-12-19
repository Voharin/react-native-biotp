import { KeyboardTypeOptions, StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface OTPInputProps {
    // Core Props
    length?: number;
    variant?: 'box' | 'underline' | 'circle';
    type?: KeyboardTypeOptions;
    placeholder?: string;
    
    // Rendering Mode
    renderMode?: 'modal' | 'inline';
    
    // Modal Props (only used when renderMode='modal')
    visible?: boolean;
    onClose?: () => void;
    title?: string;
    
    // State Management
    loading?: boolean;
    disabled?: boolean;
    error?: string | boolean;
    isSuccess?: boolean;
    
    // Callbacks
    onTextChange?: (text: string) => void;
    onFilled?: (code: string) => void;
    onSubmit?: (code: string) => void;
    onVerify?: (code: string) => void;
    
    // Timer & Resend
    timer?: number;
    onTimerExpire?: () => void;
    showTimer?: boolean;
    resendEnabled?: boolean;
    onResend?: () => void;
    resendText?: string;
    resendCooldown?: number;
    
    // Styling
    dark?: boolean;
    focusColor?: string;
    errorColor?: string;
    successColor?: string;
    buttonStyle?: 'primary' | 'secondary';
    
    // Custom Styles
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    inputTextStyle?: StyleProp<TextStyle>;
    errorTextStyle?: StyleProp<TextStyle>;
    titleStyle?: StyleProp<TextStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    inputSpacing?: number;
    inputSize?: number;
    
    // Animation
    animationEnabled?: boolean;
    animationDuration?: number;
    
    // Security & Validation
    secureTextEntry?: boolean;
    autoSubmit?: boolean;
    allowedCharacters?: RegExp;
    clearOnFill?: boolean;
    
    // Accessibility
    accessibilityLabel?: string;
    accessibilityHint?: string;
    
    // Additional Features
    autoFocus?: boolean;
    hapticFeedback?: boolean;
}
