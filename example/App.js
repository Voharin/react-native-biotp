import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import BiOTP from 'react-native-biotp';

export default function App() {
  // Modal Examples
  const [modalVisible, setModalVisible] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [circleModalVisible, setCircleModalVisible] = useState(false);
  
  // Inline Example
  const [inlineCode, setInlineCode] = useState('');
  
  // Error state
  const [error, setError] = useState('');
  
  // Loading state
  const [loading, setLoading] = useState(false);

  const handleVerifyBasic = (code) => {
    Alert.alert('Success', `OTP Code: ${code}`);
    setModalVisible(false);
  };

  const handleVerifyWithError = (code) => {
    if (code === '123456') {
      Alert.alert('Success', 'Correct OTP!');
      setErrorModalVisible(false);
      setError('');
    } else {
      setError('Invalid code. Try 123456');
    }
  };

  const handleVerifyWithLoading = async (code) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', `Verified: ${code}`);
      setTimerModalVisible(false);
    }, 2000);
  };

  const handleResend = () => {
    Alert.alert('Resent', 'Verification code sent again!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>🔐 BiOTP Demo</Text>
          <Text style={styles.subtitle}>Test all features</Text>
        </View>

        {/* Modal Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal Examples</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Basic Modal</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => setTimerModalVisible(true)}
          >
            <Text style={styles.buttonText}>Timer + Resend</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonDanger]}
            onPress={() => {
              setError('');
              setErrorModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Error Handling</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonSuccess]}
            onPress={() => setCircleModalVisible(true)}
          >
            <Text style={styles.buttonText}>Circle + Security</Text>
          </TouchableOpacity>
        </View>

        {/* Inline Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inline Mode</Text>
          <View style={styles.inlineContainer}>
            <BiOTP
              renderMode="inline"
              length={6}
              variant="box"
              onTextChange={(text) => setInlineCode(text)}
              onFilled={(code) => {
                Alert.alert('Inline OTP', `Code: ${code}`);
              }}
              focusColor="#6366F1"
              hapticFeedback={true}
            />
            <Text style={styles.codeDisplay}>
              Current: {inlineCode || '------'}
            </Text>
          </View>
        </View>

        {/* Inline Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style Variants</Text>
          
          <Text style={styles.variantLabel}>Underline</Text>
          <BiOTP
            renderMode="inline"
            length={4}
            variant="underline"
            focusColor="#10B981"
            inputSpacing={12}
            onFilled={(code) => Alert.alert('Underline', code)}
          />

          <Text style={styles.variantLabel}>Circle</Text>
          <BiOTP
            renderMode="inline"
            length={4}
            variant="circle"
            focusColor="#F59E0B"
            inputSize={50}
            onFilled={(code) => Alert.alert('Circle', code)}
          />
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Features Tested:</Text>
          <Text style={styles.infoText}>✅ Modal & Inline modes</Text>
          <Text style={styles.infoText}>✅ Timer & Resend</Text>
          <Text style={styles.infoText}>✅ Error handling & animations</Text>
          <Text style={styles.infoText}>✅ Security (secureTextEntry)</Text>
          <Text style={styles.infoText}>✅ 3 style variants</Text>
          <Text style={styles.infoText}>✅ Haptic feedback</Text>
          <Text style={styles.infoText}>✅ Custom styling</Text>
        </View>
      </ScrollView>

      {/* Basic Modal */}
      <BiOTP
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerifyBasic}
        length={6}
        variant="box"
        title="Enter Code"
        focusColor="#6366F1"
      />

      {/* Timer + Resend Modal */}
      <BiOTP
        visible={timerModalVisible}
        onClose={() => setTimerModalVisible(false)}
        onVerify={handleVerifyWithLoading}
        length={6}
        timer={60}
        showTimer={true}
        resendEnabled={true}
        onResend={handleResend}
        resendCooldown={30}
        loading={loading}
        title="Verify with Timer"
        focusColor="#8B5CF6"
      />

      {/* Error Modal */}
      <BiOTP
        visible={errorModalVisible}
        onClose={() => {
          setErrorModalVisible(false);
          setError('');
        }}
        onVerify={handleVerifyWithError}
        length={6}
        error={error}
        errorColor="#EF4444"
        title="Try: 123456"
        focusColor="#10B981"
        animationEnabled={true}
      />

      {/* Circle + Security Modal */}
      <BiOTP
        visible={circleModalVisible}
        onClose={() => setCircleModalVisible(false)}
        onVerify={(code) => {
          Alert.alert('Secure Code', `Verified: ${code}`);
          setCircleModalVisible(false);
        }}
        length={4}
        variant="circle"
        secureTextEntry={true}
        hapticFeedback={true}
        autoSubmit={true}
        title="Secure Entry"
        focusColor="#EC4899"
        inputSize={60}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: '#8B5CF6',
  },
  buttonDanger: {
    backgroundColor: '#EF4444',
  },
  buttonSuccess: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inlineContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  codeDisplay: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  variantLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    marginTop: 16,
  },
  infoBox: {
    backgroundColor: '#EEF2FF',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4338CA',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4338CA',
    marginBottom: 4,
    lineHeight: 20,
  },
});
