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
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const imageMap = {
  latte: require('../../assets/latte.jpg'),
  cappuccino: require('../../assets/cappucino.jpg'),
  icedlatte: require('../../assets/iced latte.jpg'),
};

const ProductsCatalog = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Latte', price: 'Rp10.000', imageKey: 'latte' },
    { id: 2, name: 'Iced Latte', price: 'Rp14.500', imageKey: 'icedlatte' },
    { id: 3, name: 'Cappuccino', price: 'Rp14.500', imageKey: 'cappuccino' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImageUri, setNewProductImageUri] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      const fileName = pickedUri.split('/').pop();
      const newPath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.copyAsync({
        from: pickedUri,
        to: newPath,
      });

      setNewProductImageUri(newPath);
    }
  };

  const handleAddProduct = () => {
    const validationErrors = {};
    if (!newProductName.trim()) validationErrors.name = 'Name is required';
    if (!newProductPrice.trim()) validationErrors.price = 'Price is required';
    if (!newProductImageUri.trim()) {
      validationErrors.image = 'Image is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: newProductName.trim(),
      price: newProductPrice.trim(),
      imageUri: newProductImageUri.trim(),
    };

    setProducts([...products, newProduct]);
    setModalVisible(false);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductImageUri('');
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products Catalog</Text>

      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/searchproduct.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search.."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={
                product.imageUri
                  ? { uri: product.imageUri }
                  : imageMap[product.imageKey]
              }
              style={styles.productImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteProduct(product.id)}>
              <Image
                source={require('../../assets/deleteproduct.jpg')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addProductButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addProductText}>Add new product</Text>
          <Image
            source={require('../../assets/addproduct.png')}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Product</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={newProductName}
              onChangeText={setNewProductName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={newProductPrice}
              onChangeText={setNewProductPrice}
              keyboardType="numeric"
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

            <Text style={styles.label}>Image</Text>
            <Pressable onPress={handleImagePick} style={styles.imagePickerBox}>
              <Image
                source={require('../../assets/plusbtn.png')}
                style={styles.plusBtn}
              />
              <Text style={{ fontSize: 16 }}>
                {newProductImageUri ? `Selected` : 'Add Image'}
              </Text>
            </Pressable>
            {errors.image && (
              <Text style={styles.errorText}>{errors.image}</Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.6}
              >
                <Text style={styles.modalButtonTextDark}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal]}
                onPress={handleAddProduct}
                activeOpacity={0.6}
              >
                <Text style={styles.modalButtonTextDark2}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef8ee',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingTop: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white'
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#355843',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addProductText: {
    fontSize: 14,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fef8ee',
    borderRadius: 16,
    padding: 20,
    width: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#333',
    width: '100%',
    paddingBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: 250,
    backgroundColor: 'white',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 8,
    fontWeight: '500',
  },
  imagePickerBox: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    width: 250,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: '#dcdcdc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonModal: {
    backgroundColor: '#355843',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalButtonTextDark: {
    color: '#333',
    fontWeight: 'bold',
  },
  modalButtonTextDark2: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  plusBtn: {
    width: 18,
    height: 18
  },
});

export default ProductsCatalog;
