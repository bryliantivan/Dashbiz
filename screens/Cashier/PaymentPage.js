import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  ScrollView // Import ScrollView
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const PaymentPage = ({ navigation, route }) => {
  // Destructure the items from route.params and use them to initialize the state
  const { items = [], table, customer } = route.params;
  const [orders, setOrders] = useState(items);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // State for dynamic subtotal
  const [subtotal, setSubtotal] = useState(0);

  // Recalculate subtotal whenever the orders array changes
  useEffect(() => {
    const newSubtotal = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [orders]);

  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  // Function to handle quantity changes and item removal
  const handleQuantityChange = (id, change) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0); // Remove item if quantity is 0
      return updatedOrders;
    });
  };

  const handlePay = () => {
    setSuccessModalVisible(true);
  };

  const handleDone = () => {
    setSuccessModalVisible(false);
    navigation.navigate('AssignedFranchise');
  };

  return (
    <View style={styles.container}>
      {/* Header - This will stay fixed at the top */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.BackIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Order #1225</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Scrollable content area - All other components are placed inside this ScrollView */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Table</Text>
          <Text style={styles.value}>{table || 'Outdoor, 7'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Customer's Name</Text>
          <View style={styles.rowSpace}>
            <Text style={styles.value}>{customer || 'Budi'}</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.goBack()}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders Section */}
        <View style={styles.ordersContainer}>
          <Text style={styles.sectionTitle}>Orders</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.orderCard}>
                <Image source={item.image} style={styles.orderImage} />
                <View style={styles.orderDetails}>
                  <Text style={styles.orderName}>{item.name}</Text>
                  <Text style={styles.orderPrice}>Rp{item.price.toLocaleString()}</Text>
                </View>
                <View style={styles.orderQuantityControl}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                    <Image source={require('../../assets/minbtn.png')} style={styles.AddMinIcon} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                    <Image source={require('../../assets/plusbtn.png')} style={styles.AddMinIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            // FlatList has its own scrolling, but wrapping it in a ScrollView is fine for this layout
            style={{ maxHeight: 200 }} 
          />
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment</Text>
        {['Cash', 'Debit Card/Credit Card', 'QRIS'].map((method) => (
          <TouchableOpacity
            key={method}
            style={styles.paymentOption}
            onPress={() => setPaymentMethod(method)}
          >
            <View style={styles.iconWrap}>
              {method === 'Cash' ? (
                <Image source={require('../../assets/cash.png')} />
              ) : method === 'QRIS' ? (
                <Image source={require('../../assets/qris.png')} />
              ) : (
                <Image source={require('../../assets/debit.png')} />
              )}
            </View>
            <Text style={styles.paymentText}>{method}</Text>
            <View style={{ flex: 1 }} />
            <View
              style={[
                styles.radio,
                paymentMethod === method && styles.radioSelected,
              ]}
            />
          </TouchableOpacity>
        ))}

        {/* Payment Detail */}
        <View style={styles.paymentDetail}>
          <Text style={styles.sectionTitle}>Payment Detail</Text>
          <View style={styles.detailRow}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text>Tax 11%</Text>
            <Text>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={{ fontWeight: 'bold' }}>Total</Text>
            <Text style={{ fontWeight: 'bold' }}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Pay Button - Now this will scroll with the content */}
        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payText}>Pay →</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal - This should be outside of the ScrollView to overlay the entire screen */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.successIcon}>
              <Image
                source={require('../../assets/success.png')}
                style={styles.SuccessIcon}
              />
            </View>
            <Text style={styles.modalTitle}>Payment Success</Text>

            <View style={styles.modalDetail}>
              <Text>Payment Method</Text>
              <Text>{paymentMethod}</Text>
            </View>
            <View style={styles.modalDetail}>
              <Text>Total Price</Text>
              <Text>{formatCurrency(total)}</Text>
            </View>
            <View style={styles.modalDetail}>
              <Text>Payment</Text>
              <Text>{formatCurrency(total)}</Text>
            </View>
            <View style={styles.modalDetail}>
              <Text>Transaction Time</Text>
              <Text>23 Feb, 10:00</Text>
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
                <Text style={{ color: 'white' }}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.printBtn}>
                <Text>Print</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 16, // Use horizontal padding here
    backgroundColor: '#FFFCF0' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 40
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  infoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  label: { fontSize: 12, color: '#888' },
  value: { fontWeight: 'bold' },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sectionTitle: { marginVertical: 10, fontWeight: 'bold' },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  iconWrap: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 30,
    marginRight: 12,
  },
  paymentText: { fontSize: 14 },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  radioSelected: {
    backgroundColor: '#000',
  },
  paymentDetail: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  payBtn: {
    backgroundColor: '#2f4f2f',
    padding: 14,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20, // Add bottom margin to the button
  },
  payText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    padding: 12,
    borderRadius: 30,
    marginBottom: 10,
  },
  modalTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  modalDetail: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  doneBtn: {
    backgroundColor: '#355843',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  printBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  BackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  SuccessIcon: {
    width: 50,
    height: 50,
  },
  ordersContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderPrice: {
    fontSize: 14,
    color: '#555',
  },
  orderQuantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  AddMinIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});