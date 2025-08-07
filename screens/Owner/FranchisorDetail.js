// screens/Owner/FranchisorDetail.js
import React, { useState, useRef, useEffect } from 'react'; // Import useEffect
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const FranchisorDetail = ({ navigation, route }) => {
  const franchiseName = route.params?.name || 'CHATIME'; // Default ke CHATIME
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Data dummy untuk detail franchise
  const franchiseData = {
    name: 'CHATIME',
    rating: '4.6',
    year: '2005',
    dateFranchising: '2023',
    numOutlets: '460',
    description: `Chatime is a brewed tea drinks provider that uses the best, high-quality, and halal-certified tea leaves. Available in Indonesia since 2011 under F&B ID (PT Foods Beverages Indonesia) currently Chatime has managed to more than 420 stores spread across over 60 cities, with dine-in, take away, and online delivery services. With the intention to provide convenient experience when ordering through mobile phone, Chatime developed My F&B ID mobile app which can be downloaded from Google Play Store or App Store.`,
    longDescription: `For prospective investors in Indonesia, it's important to understand Chatime's unique operational framework. PT Foods Beverages Indonesia holds the sole and exclusive master license for Chatime across the entire country. This means all Chatime outlets in Indonesia are directly owned and managed by F&B ID. This centralized model is crucial for maintaining our stringent quality controls and ensuring consistent brand standards. Consequently, direct individual franchising opportunities for Chatime are not available in Indonesia. We recommend exploring other local investment avenues in the dynamic Indonesian food and beverage sector or contacting PT Foods Beverages Indonesia directly for any official inquiries.`,
    carouselImages: [
      require('../../assets/ChatimeLogo.png'), // Placeholder
      require('../../assets/ChatimeLogo.png'), // Placeholder
      require('../../assets/ChatimeLogo.png'), // Placeholder
      require('../../assets/ChatimeLogo.png'), // Placeholder
    ],
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item} style={styles.carouselImage} resizeMode="cover" />
    </View>
  );

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  // Logika auto-scroll
  useEffect(() => {
    let interval;
    const startAutoScroll = () => {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % franchiseData.carouselImages.length;
          if (carouselRef.current) {
            carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
          }
          return nextIndex;
        });
      }, 2000); // Ganti gambar setiap 2 detik
    };

    startAutoScroll();

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, [franchiseData.carouselImages.length]); // Dependensi agar interval direset jika jumlah gambar berubah

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header dengan tombol Back */}
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FRANCHISE DETAILS</Text>
        </View>

        {/* Bagian Atas: Logo dan Info Franchise */}
        <View style={styles.franchiseInfoContainer}>
          <Image
            source={require('../../assets/ChatimeLogo.png')} // Logo utama
            style={styles.mainLogo}
            resizeMode="contain"
          />
          <View style={styles.franchiseTextInfo}>
            <Text style={styles.franchiseMainName}>{franchiseData.name}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.infoText}>{franchiseData.rating}</Text>
              <Text style={styles.infoSeparator}>|</Text>
              <Ionicons name="calendar-outline" size={16} color="#555" />
              <Text style={styles.infoText}>Since {franchiseData.dateFranchising}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#555" />
              <Text style={styles.infoText}>Number Of Outlets : {franchiseData.numOutlets}</Text>
            </View>
          </View>
        </View>

        {/* Deskripsi Singkat */}
        <Text style={styles.descriptionText}>{franchiseData.description}</Text>

        {/* Carousel Gambar */}
        <View style={styles.carouselWrapper}>
          <FlatList
            ref={carouselRef}
            data={franchiseData.carouselImages}
            renderItem={renderCarouselItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />
          {/* Indikator Carousel */}
          <View style={styles.pagination}>
            {franchiseData.carouselImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex ? styles.paginationDotActive : styles.paginationDotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Deskripsi Panjang */}
        <Text style={styles.longDescriptionText}>{franchiseData.longDescription}</Text>

        {/* Tombol Contact */}
        <View style={styles.contactButtonContainer}>
          <Text style={styles.contactButtonLabel}>Reach out to our franchise team for details and opportunities.</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>CONTACT</Text>
          </TouchableOpacity>
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
    paddingBottom: 80, // Ruang untuk bottom tab navigator
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFCF0', // Pastikan header memiliki warna latar belakang
  },
  backButton: {
    marginRight: 15,
    padding: 5,
    marginTop: '10%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: '10%',
  },
  franchiseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mainLogo: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
    marginRight: 15,
  },
  franchiseTextInfo: {
    flex: 1,
  },
  franchiseMainName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  infoSeparator: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 20,
    lineHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  carouselWrapper: {
    width: '100%',
    height: height * 0.25, // Tinggi carousel
    marginBottom: 20,
    position: 'relative',
  },
  carouselItem: {
    width: width, // Lebar item carousel sama dengan lebar layar
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Warna latar belakang saat gambar loading/tidak ada
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#355843', // Warna dot aktif
  },
  paginationDotInactive: {
    backgroundColor: '#D3D3D3', // Warna dot tidak aktif
  },
  carouselNavButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -15 }],
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5,
  },
  longDescriptionText: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 20,
    lineHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  contactButtonContainer: {
    backgroundColor: '#355843', // Warna hijau gelap
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  contactButtonLabel: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  contactButton: {
    backgroundColor: '#fff', // Tombol putih
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#355843', // Teks hijau gelap
  },
});

export default FranchisorDetail;
