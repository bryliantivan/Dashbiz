import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProductsCatalog = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Americano', price: 'Rp10.000' },
    { id: 2, name: 'Iced Latte', price: 'Rp14.500' },
    { id: 3, name: 'Cappuccino', price: 'Rp14.500' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice) return;

    const newProduct = {
      id: Date.now(),
      name: newProductName,
      price: `Rp${parseFloat(newProductPrice).toLocaleString('id-ID')}`,
      image: newProductImage,
    };

    setProducts([...products, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductImage(null);
    setModalVisible(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewProductImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Products Catalog</Text>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={16} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search.."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Product List */}
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.productImagePlaceholder} />
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDelete(product.id)}>
              <Ionicons name="trash" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add new product button */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add new product</Text>
          <Ionicons name="add-circle" size={16} color="black" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </ScrollView>

      {/* Add Product Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Product</Text>

            <TextInput
              placeholder="Name"
              style={styles.input}
              value={newProductName}
              onChangeText={setNewProductName}
            />
            <TextInput
              placeholder="Price"
              style={styles.input}
              value={newProductPrice}
              onChangeText={setNewProductPrice}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Ionicons name="add-circle" size={20} color="black" />
              <Text style={{ marginLeft: 10 }}>Add Image</Text>
            </TouchableOpacity>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductsCatalog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF2',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 13,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingLeft: 35,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productImagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#bbb',
    borderRadius: 4,
    marginRight: 12,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productPrice: {
    fontSize: 13,
  },
  addButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',
  },
  modalBox: {
    backgroundColor: '#FFFCF2',
    padding: 20,
    borderRadius: 12,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  addBtn: {
    backgroundColor: '#D3F276',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  cancelText: {
    fontWeight: 'bold',
  },
  addText: {
    fontWeight: 'bold',
  },
});
