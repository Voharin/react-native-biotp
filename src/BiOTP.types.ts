import { KeyboardTypeOptions} from 'react-native';


export interface OTPInputProps {
    loading?: boolean;
    length?: number;
    variant?: 'box' | 'underline';
    dark?: boolean;
    onTextChange?: (text: string) => void;
    onFilled?: (code: string) => void;
    onSubmit?: (code: string) => void;
    focusColor?: string;
    type?: KeyboardTypeOptions;
    placeholder?: string;
    visible?: boolean;
    onClose?: () => void;
    title?: string;
    onVerify?: (code: string) => void;
    buttonStyle?: 'primary' | 'secondary';
}