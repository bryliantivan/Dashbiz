// screens/Auth/ResetPasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Resetting password:', newPassword);
      navigation.navigate('Login');
    } else {
      console.warn('Password baru dan konfirmasi password tidak cocok!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tombol Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
        >
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Judul */}
        <Text style={styles.title}>RESET PASSWORD</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previously used password.
        </Text>

        {/* Input New Password */}
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/lock.png')}
            style={styles.inputIconImage}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            style={styles.passwordToggle}
            activeOpacity={0.6}
          >
            <Image
              source={
                showNewPassword
                  ? require('../../assets/eyeclosed.png')
                  : require('../../assets/togglepassword.png')
              }
              style={styles.toggleIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Input Confirm New Password */}
        <Text style={styles.inputLabel}>Confirm New Password</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/lock.png')}
            style={styles.inputIconImage}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.passwordToggle}
            activeOpacity={0.6}
          >
            <Image
              source={
                showConfirmPassword
                  ? require('../../assets/eyeclosed.png')
                  : require('../../assets/togglepassword.png')
              }
              style={styles.toggleIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Tombol Reset */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset</Text>
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
  inputLabel: {
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 50,
  },
  inputIconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 5,
  },
  toggleIcon: {
    width: 20,
    height: 20,
  },
  resetButton: {
    width: '80%',
    backgroundColor: '#355843',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default ResetPasswordScreen;
