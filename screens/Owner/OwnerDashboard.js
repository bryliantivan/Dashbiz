// screens/Owner/OwnerDashboard.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Data dummy untuk daftar franchise dengan logo yang diperbarui
const franchises = [
  { id: '1', name: 'Chatime', monthlySales: 'Rp12.345.678', logo: require('../../assets/ChatimeLogo.png') },
  { id: '2', name: 'Tomoro Coffee', monthlySales: 'Rp9.876.543', logo: require('../../assets/CFCLogo.png') }, // Placeholder, as per your input
  { id: '3', name: "Domino's Pizza", monthlySales: 'Rp5.678.901', logo: require('../../assets/ForeLogo.png') }, // Placeholder, as per your input
  { id: '4', name: 'Subway', monthlySales: 'Rp2.345.678', logo: require('../../assets/JCOLogo.png') }, // Placeholder, as per your input
  { id: '5', name: 'Fore', monthlySales: 'Rp7.890.123', logo: require('../../assets/KrispyKremeLogo.png') }, // Placeholder, as per your input
  { id: '6', name: 'Pagi Sore', monthlySales: 'Rp4.567.890', logo: require('../../assets/PizzaHutLogo.png') }, // Placeholder, as per your input
  { id: '7', name: 'Mixue', monthlySales: 'Rp3.123.456', logo: require('../../assets/RedDogLogo.png') }, // Contoh tambahan, monthlySales ditambahkan
  { id: '8', name: 'Kopi Kenangan', monthlySales: 'Rp6.543.210', logo: require('../../assets/SubwayLogo.png') }, // Contoh tambahan, monthlySales ditambahkan
];

const OwnerDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Dashboard */}
        <Text style={styles.headerTitle}>Dashboard</Text>

        {/* Monthly Revenue Section */}
        <View style={styles.monthlyRevenueCard}>
          <Text style={styles.monthlyRevenueLabel}>Monthly Revenue</Text>
          <View style={styles.revenueBox}>
            <Text style={styles.revenueAmount}>Rp63.802.584</Text>
          </View>
        </View>

        {/* Franchise's Sales Section */}
        <Text style={styles.sectionTitle}>Franchise's Sales</Text>

        <View style={styles.franchiseGrid}>
          {franchises.map((franchise) => (
            <TouchableOpacity
              key={franchise.id}
              style={styles.franchiseCard}
              onPress={() => navigation.navigate('FranchiseDetail', { name: franchise.name })}
            >
              <View style={styles.franchiseLogoContainer}>
                <Image
                  source={franchise.logo} // Menggunakan logo dinamis dari data franchise
                  style={styles.franchiseLogo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.franchiseName}>{franchise.name}</Text>
              <Text style={styles.franchiseSalesLabel}>Monthly Sales</Text>
              <Text style={styles.franchiseSalesAmount}>{franchise.monthlySales}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0', // Warna latar belakang sesuai gambar
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingHorizontal: width * 0.05, // Padding horizontal untuk konten
    alignItems: 'center', // Pusatkan konten secara horizontal
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Rata kiri
    marginBottom: 20,
    color: '#000',
  },
  monthlyRevenueCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000', // Efek bayangan
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthlyRevenueLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  revenueBox: {
    backgroundColor: '#E0E0E0', // Warna abu-abu untuk kotak pendapatan
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Rata kiri
    marginBottom: 20,
    color: '#000',
  },
  franchiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Untuk menempatkan item di dua kolom
    width: '100%',
  },
  franchiseCard: {
    width: '48%', // Sekitar setengah lebar untuk dua kolom, dengan sedikit ruang antar kartu
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  franchiseLogoContainer: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  franchiseLogo: {
    width: '80%', 
    height: '80%',
  },
  franchiseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  franchiseSalesLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  franchiseSalesAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default OwnerDashboard;
