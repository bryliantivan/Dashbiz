// screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('Owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (selectedRole === 'Owner') {
      navigation.navigate('OwnerMainTabs');
    } else if (selectedRole === 'Cashier') {
      console.warn('Login sebagai Cashier - Navigasi belum diimplementasikan.');
      navigation.navigate('CashierDashboard');
    } else if (selectedRole === 'Franchisor') {
      navigation.navigate('RegisterFranchise');
    } else if (selectedRole === 'Admin') {
      console.warn('Login sebagai Admin - Navigasi belum diimplementasikan.');
      navigation.navigate('Admin');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/Logo Dashbiz.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.loginText}>LOGIN</Text>

        {/* Role buttons */}
        <View style={styles.roleButtonsContainer}>
          {['Owner', 'Cashier', 'Franchisor', 'Admin'].map((role) => (
            <TouchableOpacity
              key={role}
              style={[styles.roleButton, selectedRole === role && styles.roleButtonFocused]}
              onPress={() => setSelectedRole(role)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  selectedRole === role && styles.roleButtonTextFocused,
                ]}
              >
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Email input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/email.png')}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/lock.png')}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <Image
              source={
                showPassword
                  ? require('../../assets/eyeclosed.png')
                  : require('../../assets/togglepassword.png')
              }
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Register link */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.notRegisteredText}>I'm not registered yet</Text>
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
    paddingTop: height * 0.1,
    backgroundColor: '#FFFCF0',
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    width: '80%',
  },
  roleButton: {
    width: '45%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonFocused: {
    backgroundColor: '#355843',
    borderColor: '#355843',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  roleButtonTextFocused: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 5,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    width: '80%',
    marginBottom: 20,
    marginLeft: '10%',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'left',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#355843',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  notRegisteredText: {
    fontSize: 14,
    color: '#888',
  },
});

export default LoginScreen;
