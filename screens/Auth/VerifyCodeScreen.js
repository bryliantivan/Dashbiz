// screens/Auth/VerifyCodeScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const VerifyCodeScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const userEmail = route.params?.email || 'userxxx@gmail.com';

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    if (text === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyCode = () => {
    const fullCode = code.join('');
    console.log('Memverifikasi kode:', fullCode);
    navigation.navigate('ResetPassword');
  };

  const handleResendCode = () => {
    console.log('Mengirim ulang kode ke:', userEmail);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>VERIFY YOUR EMAIL</Text>
        <Text style={styles.subtitle}>Please enter the code that sent to {userEmail}</Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleCodeChange(text, index)}
              value={digit}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && digit === '' && index > 0) {
                  inputRefs.current[index - 1].focus();
                }
              }}
            />
          ))}
        </View>

        <View style={styles.resendCodeContainer}>
          <Text style={styles.resendCodeText}>Don't receive the code? </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendCodeLink}>Resend Code</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.05,
    backgroundColor: '#FFFCF0',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginTop: height * 0.1,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: width * 0.1,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  codeInput: {
    width: width * 0.15,
    height: width * 0.15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
  },
  resendCodeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  resendCodeText: {
    fontSize: 14,
    color: '#888',
  },
  resendCodeLink: {
    fontSize: 14,
    color: '#355843',
    fontWeight: 'bold',
  },
  verifyButton: {
    width: '80%',
    backgroundColor: '#355843',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default VerifyCodeScreen;
