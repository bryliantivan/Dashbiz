// screens/Auth/ForgotPasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Anda sudah menginstal @expo/vector-icons

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    // Logika untuk mengirim kode verifikasi
    console.log('Mengirim kode verifikasi ke:', email);
    // Navigasi ke halaman verifikasi
    navigation.navigate('VerifyCode');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tombol Back */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Judul */}
        <Text style={styles.title}>FORGOT PASSWORD</Text>
        <Text style={styles.subtitle}>Please enter your email to receive verification code</Text>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Tombol Send Code */}
        <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode}>
          <Text style={styles.sendCodeButtonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0', // Warna latar belakang sesuai gambar
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.05, // Sesuaikan padding atas
    backgroundColor: '#FFFCF0',
  },
  backButton: {
    position: 'absolute',
    top: 20, // Sesuaikan posisi vertikal
    left: 20, // Sesuaikan posisi horizontal
    zIndex: 1, // Pastikan tombol di atas elemen lain
    padding: 10, // Area sentuh yang lebih besar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginTop: height * 0.1, // Sesuaikan jarak dari atas
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: width * 0.1, // Agar teks tidak terlalu lebar
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30, // Jarak ke tombol Send Code
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 50, // Tinggi input
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendCodeButton: {
    width: '80%',
    backgroundColor: '#355843', // Warna tombol sesuai tema
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendCodeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ForgotPasswordScreen;
