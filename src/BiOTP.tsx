import React, { useRef, useState, useEffect, useCallback } from 'react';
import { OTPInputProps } from './BiOTP.types';
import {
    View,
    TextInput,
    StyleSheet,
    Keyboard,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    Animated,
    Platform,
    Vibration,
    ActivityIndicator,
} from 'react-native';



const { width } = Dimensions.get('window');

const BioOTP: React.FC<OTPInputProps> = ({
    // Core Props
    length = 6,
    variant = 'box',
    type = 'numeric',
    placeholder = '0',
    
    // Rendering Mode
    renderMode = 'modal',
    
    // Modal Props
    visible = false,
    onClose,
    title = 'Enter Verification Code',
    
    // State Management
    loading = false,
    disabled = false,
    error,
    isSuccess = false,
    
    // Callbacks
    onTextChange,
    onFilled,
    onSubmit,
    onVerify,
    
    // Timer & Resend
    timer,
    onTimerExpire,
    showTimer = true,
    resendEnabled = false,
    onResend,
    resendText = 'Resend Code',
    resendCooldown = 30,
    
    // Styling
    dark = false,
    focusColor = '#007AFF',
    errorColor = '#FF3B30',
    successColor = '#34C759',
    buttonStyle = 'primary',
    
    // Custom Styles
    containerStyle,
    inputStyle,
    inputTextStyle,
    errorTextStyle,
    titleStyle,
    buttonTextStyle,
    inputSpacing = 4,
    inputSize,
    
    // Animation
    animationEnabled = true,
    animationDuration = 300,
    
    // Security & Validation
    secureTextEntry = false,
    autoSubmit = false,
    allowedCharacters,
    clearOnFill = false,
    
    // Accessibility
    accessibilityLabel = 'OTP Input',
    accessibilityHint = 'Enter the verification code',
    
    // Additional Features
    autoFocus = true,
    hapticFeedback = false,
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number | undefined>(timer);
    const [canResend, setCanResend] = useState<boolean>(false);
    const [resendCountdown, setResendCountdown] = useState<number>(0);
    
    const inputRefs = useRef<TextInput[]>([]);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const successAnimation = useRef(new Animated.Value(0)).current;

    // Calculate input width
    const calculatedInputSize = inputSize || (width - 120) / length;

    // Initialize timer
    useEffect(() => {
        if (timer) {
            setTimeLeft(timer);
        }
    }, [timer]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev && prev > 1) {
                        return prev - 1;
                    } else {
                        onTimerExpire?.();
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeLeft, onTimerExpire]);

    // Resend cooldown
    useEffect(() => {
        if (resendCountdown > 0) {
            const interval = setInterval(() => {
                setResendCountdown((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        setCanResend(true);
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendCountdown]);

    // Reset on visibility change (for modal mode)
    useEffect(() => {
        if (renderMode === 'modal' && visible) {
            setOtp(Array(length).fill(''));
            if (timer) setTimeLeft(timer);
            if (autoFocus) {
                setTimeout(() => {
                    inputRefs.current[0]?.focus();
                }, 100);
            }
        }
    }, [visible, length, renderMode, timer, autoFocus]);

    // Auto focus for inline mode
    useEffect(() => {
        if (renderMode === 'inline' && autoFocus) {
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [renderMode, autoFocus]);

    // Trigger shake animation
    const triggerShakeAnimation = useCallback(() => {
        if (!animationEnabled) return;
        
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, [animationEnabled, shakeAnimation]);

    // Trigger success animation
    const triggerSuccessAnimation = useCallback(() => {
        if (!animationEnabled) return;
        
        Animated.spring(successAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animationEnabled, successAnimation]);

    // Trigger error animation
    useEffect(() => {
        if (error) {
            triggerShakeAnimation();
            if (hapticFeedback && Platform.OS !== 'web') {
                Vibration.vibrate(100);
            }
        }
    }, [error, triggerShakeAnimation, hapticFeedback]);

    // Trigger success animation
    useEffect(() => {
        if (isSuccess) {
            triggerSuccessAnimation();
            if (hapticFeedback && Platform.OS !== 'web') {
                Vibration.vibrate([0, 50]);
            }
        }
    }, [isSuccess, triggerSuccessAnimation, hapticFeedback]);

    // Validate character
    const isValidCharacter = useCallback((char: string): boolean => {
        if (allowedCharacters) {
            return allowedCharacters.test(char);
        }
        return true;
    }, [allowedCharacters]);

    const handleTextChange = useCallback((text: string, index: number) => {
        if (disabled || loading) return;

        // Validate character
        if (text && !isValidCharacter(text)) {
            return;
        }

        // Haptic feedback
        if (hapticFeedback && text && Platform.OS !== 'web') {
            Vibration.vibrate(10);
        }

        if (text.length > 1) {
            // Paste operation
            const pastedText = text.split('').filter(char => isValidCharacter(char)).slice(0, length);
            const newOtp = [...otp];
            pastedText.forEach((char, i) => {
                if (index + i < length) {
                    newOtp[index + i] = char;
                }
            });
            setOtp(newOtp);
            onTextChange?.(newOtp.join(''));
            
            const fullCode = newOtp.join('');
            if (fullCode.length === length) {
                onFilled?.(fullCode);
                if (autoSubmit) {
                    onVerify?.(fullCode);
                    onSubmit?.(fullCode);
                }
                if (clearOnFill) {
                    setTimeout(() => setOtp(Array(length).fill('')), 500);
                }
                Keyboard.dismiss();
            }
            const lastIndex = Math.min(index + pastedText.length, length - 1);
            inputRefs.current[lastIndex]?.focus();
        } else {
            // Single character input
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            onTextChange?.(newOtp.join(''));

            if (text && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            const fullCode = newOtp.join('');
            if (fullCode.length === length) {
                onFilled?.(fullCode);
                if (autoSubmit) {
                    onVerify?.(fullCode);
                    onSubmit?.(fullCode);
                }
                if (clearOnFill) {
                    setTimeout(() => setOtp(Array(length).fill('')), 500);
                }
                Keyboard.dismiss();
            }
        }
    }, [disabled, loading, otp, length, onTextChange, onFilled, onVerify, onSubmit, autoSubmit, clearOnFill, isValidCharacter, hapticFeedback]);

    const handleKeyPress = useCallback((e: any, index: number) => {
        if (disabled || loading) return;
        
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
            onTextChange?.(newOtp.join(''));
        }
    }, [disabled, loading, otp, onTextChange]);

    const handleVerify = useCallback(() => {
        const code = otp.join('');
        if (code.length === length && !loading) {
            onVerify?.(code);
            onSubmit?.(code);
        }
    }, [otp, length, loading, onVerify, onSubmit]);

    const handleResend = useCallback(() => {
        if (canResend || resendCountdown === 0) {
            onResend?.();
            setCanResend(false);
            setResendCountdown(resendCooldown);
            setOtp(Array(length).fill(''));
            if (timer) setTimeLeft(timer);
            inputRefs.current[0]?.focus();
        }
    }, [canResend, resendCountdown, onResend, resendCooldown, length, timer]);

    // Get border color based on state
    const getBorderColor = useCallback((index: number) => {
        if (error) return errorColor;
        if (isSuccess) return successColor;
        if (focusedIndex === index) return focusColor;
        return dark ? '#404040' : '#E5E5E5';
    }, [error, isSuccess, focusedIndex, errorColor, successColor, focusColor, dark]);

    // Format timer display
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Render OTP inputs
    const renderInputs = () => (
        <Animated.View 
            style={[
                styles.container,
                containerStyle,
                { transform: [{ translateX: shakeAnimation }] },
            ]}
            accessible
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityRole="none"
        >
            {Array(length)
                .fill(0)
                .map((_, index) => {
                    const inputBorderColor = getBorderColor(index);
                    const variantStyle = variant === 'box' 
                        ? styles.boxInput 
                        : variant === 'circle'
                        ? styles.circleInput
                        : styles.underlineInput;

                    return (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                if (ref) inputRefs.current[index] = ref;
                            }}
                            style={[
                                styles.input,
                                variantStyle,
                                {
                                    borderColor: inputBorderColor,
                                    backgroundColor: dark ? '#2A2A2A' : '#FFFFFF',
                                    color: dark ? '#FFFFFF' : '#000000',
                                    width: calculatedInputSize,
                                    height: calculatedInputSize,
                                    marginHorizontal: inputSpacing,
                                },
                                inputStyle,
                            ]}
                            textContentType={Platform.OS === 'ios' ? 'oneTimeCode' : 'none'}
                            autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'off'}
                            maxLength={1}
                            value={secureTextEntry && otp[index] ? '•' : otp[index]}
                            onChangeText={(text) => handleTextChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType={type}
                            onFocus={() => setFocusedIndex(index)}
                            onBlur={() => setFocusedIndex(-1)}
                            placeholder={placeholder}
                            placeholderTextColor={dark ? '#404040' : '#A0A0A0'}
                            selectionColor={focusColor}
                            editable={!disabled && !loading && (!timer || !timeLeft || timeLeft > 0)}
                            accessibilityLabel={`Digit ${index + 1} of ${length}`}
                            accessible
                        />
                    );
                })}
        </Animated.View>
    );

    // Render content
    const renderContent = () => (
        <View style={[styles.contentWrapper, renderMode === 'inline' && containerStyle]}>
            {renderMode === 'modal' && (
                <TouchableOpacity
                    style={[
                        styles.closeButton,
                        { backgroundColor: dark ? '#404040' : '#FFFFFF' },
                    ]}
                    onPress={onClose}
                    accessibilityLabel="Close"
                    accessibilityRole="button"
                >
                    <Text style={[styles.closeButtonText, { color: dark ? '#FFFFFF' : '#000000' }]}>
                        ✕
                    </Text>
                </TouchableOpacity>
            )}
            
            {title && renderMode === 'modal' && (
                <Text
                    style={[
                        styles.title,
                        { color: dark ? '#FFFFFF' : '#000000' },
                        titleStyle,
                    ]}
                >
                    {title}
                </Text>
            )}
            
            <Text
                style={[
                    styles.subtitle,
                    { color: dark ? '#CCCCCC' : '#666666' },
                ]}
            >
                Please enter the verification code
            </Text>

            {/* Timer Display */}
            {timer && showTimer && timeLeft !== undefined && (
                <Text
                    style={[
                        styles.timerText,
                        { color: timeLeft < 10 ? errorColor : (dark ? '#CCCCCC' : '#666666') },
                    ]}
                >
                    {timeLeft > 0 ? formatTime(timeLeft) : 'Expired'}
                </Text>
            )}

            {/* OTP Inputs */}
            {renderInputs()}

            {/* Error Message */}
            {error && typeof error === 'string' && (
                <Text
                    style={[
                        styles.errorText,
                        { color: errorColor },
                        errorTextStyle,
                    ]}
                    accessibilityLiveRegion="polite"
                    accessibilityRole="alert"
                >
                    {error}
                </Text>
            )}

            {/* Buttons Container */}
            <View style={styles.buttonContainer}>
                {/* Verify Button */}
                {!autoSubmit && (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            buttonStyle === 'primary' ? styles.verifyButtonContained : styles.verifyButtonOutlined,
                            { borderColor: dark ? '#404040' : '#F7F7F7F' },
                            (disabled || loading) && styles.buttonDisabled,
                        ]}
                        onPress={handleVerify}
                        disabled={disabled || loading || otp.join('').length !== length}
                        accessibilityLabel="Verify code"
                        accessibilityRole="button"
                    >
                        {loading ? (
                            <ActivityIndicator color={buttonStyle === 'primary' ? '#FFFFFF' : '#007AFF'} />
                        ) : (
                            <Text style={[
                                styles.buttonText,
                                { color: buttonStyle === 'primary' ? '#FFFFFF' : '#007AFF' },
                                buttonTextStyle,
                            ]}>
                                Verify
                            </Text>
                        )}
                    </TouchableOpacity>
                )}

                {/* Resend Button */}
                {resendEnabled && onResend && (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.resendButton,
                            resendCountdown > 0 && styles.buttonDisabled,
                        ]}
                        onPress={handleResend}
                        disabled={resendCountdown > 0}
                        accessibilityLabel="Resend code"
                        accessibilityRole="button"
                    >
                        <Text style={[
                            styles.resendButtonText,
                            { color: resendCountdown > 0 ? (dark ? '#666666' : '#CCCCCC') : '#007AFF' },
                        ]}>
                            {resendCountdown > 0 ? `${resendText} (${resendCountdown}s)` : resendText}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    // Render based on mode
    if (renderMode === 'inline') {
        return renderContent();
    }

    // Modal mode
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
                <TouchableOpacity
                    activeOpacity={1}
                    style={[
                        styles.modalContent,
                        { backgroundColor: dark ? '#1A1A1A' : '#FFFFFF' },
                    ]}
                >
                    {renderContent()}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxWidth: 400,
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
    contentWrapper: {
        width: '100%',
        alignItems: 'center',
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
        marginBottom: 16,
        textAlign: 'center',
    },
    timerText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
    },
    boxInput: {
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: 'solid',
    },
    underlineInput: {
        borderBottomWidth: 2,
        borderRadius: 0,
    },
    circleInput: {
        borderWidth: 2,
        borderRadius: 999,
        borderStyle: 'solid',
    },
    errorText: {
        fontSize: 14,
        marginTop: 8,
        marginBottom: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
        gap: 12,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
    },
    verifyButtonContained: {
        backgroundColor: '#007AFF',
    },
    verifyButtonOutlined: {
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
    },
    resendButton: {
        backgroundColor: 'transparent',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    resendButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default BioOTP;