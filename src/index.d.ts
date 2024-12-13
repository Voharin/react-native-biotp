import { KeyboardTypeOptions } from 'react-native';
import { FC } from 'react';

export interface OTPInputProps {
    /**
     * Loading state of the OTP input
     */
    loading?: boolean;

    /**
     * Length of the OTP code
     * @default 6
     */
    length?: number;

    /**
     * Visual style variant of the OTP input
     * @default 'box'
     */
    variant?: 'box' | 'underline';

    /**
     * Enable dark mode
     * @default false
     */
    dark?: boolean;

    /**
     * Callback fired when text changes
     */
    onTextChange?: (text: string) => void;

    /**
     * Callback fired when all digits are filled
     */
    onFilled?: (code: string) => void;

    /**
     * Callback fired when submit button is pressed
     */
    onSubmit?: (code: string) => void;

    /**
     * Color of the focused input
     * @default '#007AFF'
     */
    focusColor?: string;

    /**
     * Keyboard type for the input
     * @default 'numeric'
     */
    type?: KeyboardTypeOptions;

    /**
     * Placeholder character for empty inputs
     * @default '0'
     */
    placeholder?: string;

    /**
     * Control visibility of the OTP input
     * @default false
     */
    visible?: boolean;

    /**
     * Callback fired when modal is closed
     */
    onClose?: () => void;

    /**
     * Title text for the OTP input
     * @default 'Enter Verification Code'
     */
    title?: string;

    /**
     * Callback fired when verification is attempted
     */
    onVerify?: (code: string) => void;

    /**
     * Style variant for the button
     * @default 'primary'
     */
    buttonStyle?: 'primary' | 'secondary';
}

export declare const BioOTP: FC<OTPInputProps>;

// Export the component as default
export default BioOTP;
