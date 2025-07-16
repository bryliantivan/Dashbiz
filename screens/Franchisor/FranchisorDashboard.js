import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FranchisorDashboard = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Franchise Info Box */}
      <View style={styles.franchiseBox}>
        <Image source={require('../../assets/ChatimeLogo.png')} style={styles.logo} />
        <View style={styles.franchiseInfo}>
          <Text style={styles.franchiseLabel}>FRANCHISE</Text>
          <View style={styles.row}>
            <Text>★ 4.6</Text>
            <Text style={styles.dot}>|</Text>
            <Text>1945</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="calendar" size={16} />
            <Text style={styles.infoText}> Date Franchising Commenced : 2023</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="store" size={16} />
            <Text style={styles.infoText}> Number of Outlets : 460</Text>
          </View>
        </View>
      </View>

      {/* Revenue Box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Revenue from One-Time Purchased</Text>
        <View style={styles.revenueBox}>
          <Text style={styles.revenueText}>RpXXXXXXX</Text>
        </View>
      </View>

      {/* Franchise Type Box */}
      <View style={styles.card}>
        <View style={styles.franchiseTypeRow}>
          <Image source={require('../../assets/ChatimeLogo.png')} style={styles.typeImage} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.franchiseLabel}>FRANCHISE TYPE</Text>
            <Text>Total outlets : XX</Text>
          </View>
        </View>
      </View>
        <TouchableOpacity style={styles.addTypeButton} onPress={() => navigation.navigate('AddNewType')}>
          <Text style={styles.addTypeText}>Add franchise type</Text>
          <Ionicons name="add-circle" size={16} color="#000" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFCF2',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  franchiseBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
  },
  franchiseInfo: {
    marginLeft: 16,
    flex: 1,
  },
  franchiseLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  revenueBox: {
    backgroundColor: '#D9D9D9',
    height: 100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  franchiseTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeImage: {
    width: 60,
    height: 60,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
  },
  addTypeButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addTypeText: {
    fontSize: 14,
  },
});

export default FranchisorDashboard;
