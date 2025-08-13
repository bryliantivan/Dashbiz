import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialMenus = [
  {
    id: '1',
    name: 'Cappuccino',
    price: 14500,
    category: 'Coffee',
    image: require('../../assets/cappucino.jpg'),
  },
  {
    id: '2',
    name: 'Iced Latte',
    price: 14500,
    category: 'Coffee',
    image: require('../../assets/iced latte.jpg'),
  },
  {
    id: '3',
    name: 'Americano',
    price: 10000,
    category: 'Coffee',
    image: require('../../assets/latte.jpg'),
  },
  {
    id: '4',
    name: 'Thai Tea',
    price: 12000,
    category: 'Tea',
    image: require('../../assets/thaitea.jpg'),
  },
  {
    id: '5',
    name: 'Thai Tea',
    price: 12000,
    category: 'Tea',
    image: require('../../assets/thaitea.jpg'),
  },
  {
    id: '6',
    name: 'Thai Tea',
    price: 12000,
    category: 'Tea',
    image: require('../../assets/thaitea.jpg'),
  },
  {
    id: '7',
    name: 'Donut',
    price: 8000,
    category: 'Light',
    image: require('../../assets/donut.jpg'),
  },
  {
    id: '8',
    name: 'Donut',
    price: 8000,
    category: 'Light',
    image: require('../../assets/donut.jpg'),
  },
  {
    id: '9',
    name: 'Donut',
    price: 8000,
    category: 'Light',
    image: require('../../assets/donut.jpg'),
  },
];

const categories = ['Coffee', 'Tea', 'Light'];

export default function AssignedFranchise() {
  const navigation = useNavigation();
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Coffee');

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + change);
      return { ...prev, [id]: updated };
    });
  };

  const filteredMenus = initialMenus.filter((menu) => menu.category === selectedCategory);

  const total = initialMenus.reduce((sum, item) => {
        const qty = quantities[item.id] || 0;
        return sum + qty * item.price;
}, 0);


  return (
    
    <View style={styles.container}>
      <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.navigate('CashierDashboard')}>
        <Image
            source={require('../../assets/back.png')}
            style={styles.BackIcon}
        />
      </TouchableOpacity>
      <Text style={styles.topBarTitle}>Franchise</Text>
      <View style={{ width: 24 }} />
    </View>

      {/* Profile Section */}
      <View style={styles.profile}>
        <Image
            source={require('../../assets/Chatime3.jpg')} // Change to your image path
            style={styles.avatar}
            />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>Nicholas Defin</Text>
          <Text style={styles.role}>Cashier</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Image
            source={require('../../assets/searchproduct.png')}
            style={styles.SearchIcon}
        />
        <TextInput
          placeholder="Search Menu"
          placeholderTextColor="#aaa"
          style={{ marginLeft: 8, flex: 1 }}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, selectedCategory === cat && styles.categorySelected]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextSelected]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu List */}
      <FlatList
        data={filteredMenus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
            const qty = quantities[item.id] || 0;
            return (
            <View style={[styles.menuCard, qty > 0 && styles.menuCardSelected]}>
                <Image source={item.image} style={styles.menuImage} />
                <View style={{ flex: 1 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>Rp{item.price.toLocaleString()}</Text>
                </View>
                <View style={styles.qtyBox}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                    <Image
                        source={require('../../assets/minbtn.png')}
                        style={styles.AddMinIcon}
                    />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>{qty}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                    <Image
                        source={require('../../assets/plusbtn.png')}
                        style={styles.AddMinIcon}
                    />
                </TouchableOpacity>
                </View>
            </View>
            );
        }}
        contentContainerStyle={{ paddingBottom: 280, paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
        />


      {/* Footer Total */}
      <View style={styles.footer}>
        <TouchableOpacity
        style={styles.orderBtn}
        onPress={() => {
            const selectedItems = initialMenus
            .filter((item) => (quantities[item.id] || 0) > 0)
            .map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: quantities[item.id],
                subtotal: item.price * quantities[item.id],
                image: item.image,
            }));

            navigation.navigate('PaymentPage', {
            items: selectedItems,
            total: total,
            });
        }}
        >
        <Text style={styles.orderText}>Proceed Order →</Text>
        <Text style={styles.orderPrice}>Rp{total.toLocaleString()}</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 24, // aligns the title in the center by compensating arrow width
  },
  container: {
    flex: 1,
    backgroundColor: '#fefbea',
    padding: 16,
    paddingTop:50
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    backgroundColor: '#ffeb3b',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 2,
    fontSize: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  categoryScroll: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  categoryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 10,
    backgroundColor: '#eee',
    height:32,
    alignItems: 'center'
  },
  categorySelected: {
    backgroundColor: '#cfe5c0',
  },
  categoryText: {
    fontWeight: '600',
    color: '#444',
    fontSize:16,
    alignItems:'center'
  },
  categoryTextSelected: {
    color: '#000',
  },
  menuCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#eee',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuCardSelected: {
    borderColor: 'lightgreen',
    borderWidth: 1.5,
  },
  menuImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  menuName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  menuPrice: {
    fontSize: 13,
    color: '#555',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#fefbea',
    paddingVertical: 10,
  },
  orderBtn: {
    backgroundColor: '#cfe5c0',
    padding: 14,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontWeight: 'bold',
  },
  orderPrice: {
    fontWeight: 'bold',
  },
  BackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  SearchIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  AddMinIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
