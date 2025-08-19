import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FranchisorProfile = () => {
  const scrollViewRef = useRef(null);
  const { width: screenWidth } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../../assets/Chatime1.jpg'),
    require('../../assets/Chatime2.jpg'),
    require('../../assets/Chatime3.jpg'),
  ];
  
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * (screenWidth * 0.7), animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollViewRef.current.scrollTo({ x: prevIndex * (screenWidth * 0.7), animated: true });
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <Text style={styles.title}>My Franchise</Text>
        <View style={styles.headerBox}>
          <Image source={require('../../assets/krustykrab.webp')} style={styles.logo} />
          <View style={styles.franchiseDetails}>
            <Text style={styles.franchiseInfo}>Krusty Krab</Text>
            <View style={styles.row}>
              <Image
                source={require('../../assets/starhalf.png')}
                style={styles.DateIcon}
              /> 
              <Text>4.6</Text><Text style={styles.dot}>|</Text><Text>1945</Text>
            </View>
            <View style={styles.row}>
              <Image
                source={require('../../assets/datecommenced.png')}
                style={styles.DateIcon}
              />
              <Text style={styles.infoText}> Date Franchising Commenced : 2023</Text>
            </View>
            <View style={styles.row}>
              <Image
                source={require('../../assets/outlet.png')}
                style={styles.DateIcon}
              />
              <Text style={styles.infoText}> Number of Outlets : 460</Text>
            </View>
          </View>
        </View>
        <Text style={styles.description}>
          Chatime is a brewed tea drinks provider that uses the best, high-quality, and halal-certified tea leaves. Available in Indonesia since 2011 under F&B ID (PT Foods Beverages Indonesia), currently Chatime has managed more than 420 stores spread across over 60 cities, with dine-in, take away, and online delivery services. With the intention to provide convenient experience when ordering through mobile phone, Chatime developed My F&B ID mobile app which can be downloaded from Google Play Store or App Store.
        </Text>
        
        {/* Horizontal Carousel with full-width images and local arrows */}
        <View style={styles.carouselContainer}>
          <TouchableOpacity 
            style={styles.arrow} 
            onPress={handlePrev} 
            disabled={currentIndex === 0}
            activeOpacity={0.5}
          >
            <Image
              source={require('../../assets/left.png')}
              style={[styles.arrowIcon, currentIndex === 0 && styles.disabledArrow]}
            />
          </TouchableOpacity>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.storeImage}
            onMomentumScrollEnd={(event) => {
              const slideSize = event.nativeEvent.layoutMeasurement.width;
              const index = event.nativeEvent.contentOffset.x / slideSize;
              setCurrentIndex(Math.round(index));
            }}
            scrollEventThrottle={16}
          >
            {images.map((image, index) => (
              <View key={index} style={styles.carouselItem}>
                <Image source={image} style={styles.carouselImage} />
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity 
            style={styles.arrow} 
            onPress={handleNext} 
            disabled={currentIndex === images.length - 1}
            activeOpacity={0.5}
          >
            <Image
              source={require('../../assets/right.png')}
              style={[styles.arrowIcon, currentIndex === images.length - 1 && styles.disabledArrow]}
            />
          </TouchableOpacity>
        </View>
        
        {/* Indicators */}
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.indicator, currentIndex === index && styles.activeIndicator]}
            />
          ))}
        </View>
        <Text style={styles.investorText}>
          For prospective investors interested in the Chatime brand within Indonesia, it is imperative to understand our operational framework. PT Foods Beverages Indonesia maintains the sole and exclusive master license for Chatime throughout Indonesia. Consequently, all Chatime outlets within the country are directly owned and managed by F&B ID. This centralized operational model is integral to upholding our stringent quality controls, ensuring consistent brand standards, and driving continuous innovation across our expansive network. Therefore, direct individual franchising opportunities are not available in Indonesia.
        </Text>
        <View style={styles.middle}>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfileFranchisor')}>
            <Text style={styles.editText}>Edit Franchise Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Image
              source={require('../../assets/logout.png')}
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fef8ee' },
  content: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'left', color: '#000' },
  headerBox: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, padding: 10, borderRadius: 5 },
  logo: { width: 50, height: 50, marginRight: 10 },
  franchiseDetails: { flex: 1 },
  franchiseInfo: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32' },
  description: { fontSize: 14, marginVertical: 10, color: '#333', textAlign: 'justify' },
  
  // Refactored Carousel Styles
  carouselContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginVertical: 10, 
  },
  storeImage: { 
    width: '70%', 
    height: 200,
  },
  carouselItem: { 
    width: Dimensions.get('window').width * 0.7, 
    height: 200, 
  },
  carouselImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain', // Set to 'contain' to show the full image without cropping
    // Removed borderRadius to make the image a normal rectangle
  },
  arrow: { 
    paddingHorizontal: 10,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#2E7D32',
  },
  disabledArrow: {
    opacity: 0.3,
  },
  
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 5 },
  activeIndicator: { backgroundColor: '#2E7D32' },
  investorText: { fontSize: 14, marginVertical: 10, color: '#333', textAlign: 'justify' },
  editButton: { backgroundColor: '#355843', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20, height: 40, width: 200, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, },
  middle: { width: '100%', alignItems: 'center' },
  editText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, marginTop: 10 },
  logoutText: { color: '#355843', marginLeft: 5 },
  logoutIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    marginHorizontal: 10,
  },
  DateIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 8
  },
});

export default FranchisorProfile;