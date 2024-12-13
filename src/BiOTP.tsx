import React, { useRef, useState, useEffect } from 'react';
import { OTPInputProps } from './BiOTP.types';
import {
    View,
    TextInput,
    StyleSheet,
    Keyboard,
    Text,
    KeyboardTypeOptions,
    Modal,
    TouchableOpacity,
    useColorScheme,
    Dimensions,
} from 'react-native';



const { width } = Dimensions.get('window');
const INPUT_WIDTH = (width - 120) / 6; // Adjusting input width based on screen size

const BioOTP: React.FC<OTPInputProps> = ({
    length = 6,
    variant = 'box',
    dark = false,
    onTextChange = () => {},
    onFilled,
    onSubmit,
    focusColor = '#007AFF',
    type = 'numeric',
    placeholder = '0',
    visible = false,
    onClose,
    title = 'Enter Verification Code',
    onVerify,
    buttonStyle = 'primary',
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        if (visible) {
            setOtp(Array(length).fill(''));
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [visible, length]);

    const handleTextChange = (text: string, index: number) => {
        if (text.length > 1) {
            const pastedText = text.split('').slice(0, length);
            const newOtp = [...otp];
            pastedText.forEach((char, i) => {
                if (index + i < length) {
                    newOtp[index + i] = char;
                }
            });
            setOtp(newOtp);
            onTextChange?.(newOtp.join(''));
            if (newOtp.join('').length === length) {
                onFilled?.(newOtp.join(''));
                Keyboard.dismiss();
            }
            const lastIndex = Math.min(index + pastedText.length, length - 1);
            inputRefs.current[lastIndex]?.focus();
        } else {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            onTextChange?.(newOtp.join(''));

            if (text && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            if (newOtp.join('').length === length) {
                onFilled?.(newOtp.join(''));
                Keyboard.dismiss();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
            onTextChange?.(newOtp.join(''));
        }
    };

    const handleVerify = () => {
        const code = otp.join('');
        if (code.length === length) {
            onVerify?.(code);
            onSubmit?.(code);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View
                    style={[
                        styles.modalContent,
                        { backgroundColor: dark ? '#1A1A1A' : '#FFFFFF' },
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.closeButton,
                            { backgroundColor: dark ? '#404040' : '#FFFFFF' },
                        ]}
                        onPress={onClose}
                    >
                        <Text style={[styles.closeButtonText, { color: dark ? '#FFFFFF' : '#000000' }]}>
                            ✕
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.title,
                            { color: dark ? '#FFFFFF' : '#000000' },
                        ]}
                    >
                        {title}
                    </Text>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: dark ? '#CCCCCC' : '#666666' },
                        ]}
                    >
                        Please enter the verification code
                    </Text>
                    <View style={styles.container}>
                        {Array(length)
                            .fill(0)
                            .map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        if (ref) inputRefs.current[index] = ref;
                                    }}
                                    style={[
                                        styles.input,
                                        variant === 'box' ? styles.boxInput : styles.underlineInput,
                                        {
                                            borderColor:
                                                focusedIndex === index ? focusColor : dark ? '#404040' : '#E5E5E5',
                                            backgroundColor: dark ? '#2A2A2A' : '#FFFFFF',
                                            color: dark ? '#FFFFFF' : '#000000',
                                            width: INPUT_WIDTH,
                                        },
                                    ]}
                                    maxLength={1}
                                    value={otp[index]}
                                    onChangeText={(text) => handleTextChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType={type}
                                    onFocus={() => setFocusedIndex(index)}
                                    onBlur={() => setFocusedIndex(-1)}
                                    placeholder={placeholder}
                                    placeholderTextColor={dark ? '#404040' : '#A0A0A0'}
                                    selectionColor={focusColor}
                                />
                            ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                buttonStyle === 'primary' ? styles.verifyButtonContained : styles.verifyButtonOutlined,
                                { borderColor: dark ? '#404040' : '#F7F7F7F' },
                            ]}
                            onPress={handleVerify}
                        >
                            <Text style={[styles.buttonText, { color: buttonStyle === 'primary' ? '#FFFFFF' : '#007AFF' }]}>
                                Verify
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: -8,
        top: -8,
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    input: {
        height: 56,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        marginHorizontal: 4,
    },
    boxInput: {
        borderWidth: 1.5,
        borderRadius: 16,
       borderStyle: 'solid',
    //    borderBlockColor: '#CCEABB',
    //     borderTopColor: "#FDCB9E",
    //    borderBottomColor: "#FFE8DF"
    },
    underlineInput: {
        borderBottomWidth: 2,
        // borderBottomColor: '#FFE8DF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingHorizontal: 20,
    },
    button: {
        flex: 1,
        height: 38,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    verifyButtonContained: {
        backgroundColor: '#007AFF',
    },
    verifyButtonOutlined: {
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BioOTP;