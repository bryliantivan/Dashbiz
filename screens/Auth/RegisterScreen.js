// screens/Auth/RegisterScreen.js
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

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (password === confirmPassword) {
      console.log('Registering user:', { name, email, password });
      navigation.navigate('Login');
    } else {
      console.warn('Password and Confirm Password do not match!');
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

        {/* Register Text */}
        <Text style={styles.registerText}>REGISTER</Text>

        {/* Name Input */}
        <Text style={styles.inputLabel}>Name</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/usericon.png')}
            style={styles.inputIconImg}
          />
          <TextInput
            style={styles.input}
            placeholder="name"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/email.png')}
            style={styles.inputIconImg}
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

        {/* Password Input */}
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/lock.png')}
            style={styles.inputIconImg}
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
                  ? require('../../assets/eyeclosed.png') // <- your "eye-off" image
                  : require('../../assets/togglepassword.png')     // <- your "eye" image
              }
              style={{ width: 20, height: 20, tintColor: '#888' }}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/lock.png')}
            style={styles.inputIconImg}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.passwordToggle}
          >
            <Image
              source={
                showConfirmPassword
                  ? require('../../assets/eyeclosed.png')
                  : require('../../assets/togglepassword.png')
              }
              style={{ width: 20, height: 20, tintColor: '#888' }}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Already Registered */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.alreadyRegisteredText}>I'm already registered</Text>
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
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  registerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 50,
  },
  inputIconImg: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#888',
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 5,
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#355843',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  alreadyRegisteredText: {
    fontSize: 14,
    color: '#888',
  },
});

export default RegisterScreen;
