import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Image
} from 'react-native';

const initialFranchises = [
  { id: '1', name: 'William', joined: '25 May 2000', category: 'Chatime A', location: 'Mayor Street' },
  { id: '2', name: 'Angjaya', joined: '15 May 2000', category: 'Chatime B', location: 'Jenderal Street' },
  { id: '3', name: "Nicholas", joined: '25 June 2000', category: 'Chatime C', location: 'Bryliant Street' },
  { id: '4', name: 'Ivan', joined: '25 May 2010', category: 'Chatime D', location: 'Angjaya Street' },
  { id: '5', name: 'Patricia', joined: '5 March 2010', category: 'Chatime E', location: 'APT Street' },
  { id: '6', name: 'Mary', joined: '12 May 2013', category: 'Chatime F', location: 'Pat Street' },
  { id: '7', name: 'Defin', joined: '29 July 2020', category: 'Chatime G', location: 'Trick Street' },
  { id: '8', name: 'Amelia', joined: '10 March 2017', category: 'Chatime H', location: 'Ghabena Street' },
];

const FranchiseeList = () => {
  const [franchisees, setFranchisees] = useState(initialFranchises);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedIdToRemove, setSelectedIdToRemove] = useState(null);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newFranchisee, setNewFranchisee] = useState({
    name: '',
    joined: '',
    category: '',
    location: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    Object.entries(newFranchisee).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = `${key} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddFranchisee = () => {
    if (!validateForm()) return;
    const newId = Date.now().toString();
    setFranchisees([...franchisees, { id: newId, ...newFranchisee }]);
    setNewFranchisee({ name: '', joined: '', category: '', location: '' });
    setErrors({});
    setAddModalVisible(false);
  };

  const handleConfirmRemove = () => {
    setFranchisees(prev => prev.filter(f => f.id !== selectedIdToRemove));
    setSelectedIdToRemove(null);
    setRemoveModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>List of Franchisee</Text>
        <Text style={styles.subtitle}>
          See all of the franchise list below
        </Text>

        {franchisees.map((f, index) => (
          <View key={f.id} style={styles.card}>
            <Text style={styles.franchiseeName}>{f.name}</Text>
            <View style = {styles.DateView}>
              <Image
                source={require('../../assets/datebox.png')}
                style={styles.DateIcon}
              />
            <Text>Joined : {f.joined}</Text>
            </View>
            <Text>Category: {f.category}</Text>
            <Text>Location: {f.location}</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedIdToRemove(f.id);
                setRemoveModalVisible(true);
              }}
              style={styles.removeTextContainer}
            >
              <Text style={styles.removeText}>Remove access</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add new franchisee</Text>
            <Image
              source={require('../../assets/addfranchisor.png')}
              style={{ width: 16, height: 16, marginLeft: 5 }}
              resizeMode="contain"
            />
    </TouchableOpacity>

      </ScrollView>

      {/* Remove Access Modal */}
      <Modal
        transparent
        visible={removeModalVisible}
        animationType="fade"
        onRequestClose={() => setRemoveModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>
              Remove granted access for this user?
            </Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setRemoveModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={handleConfirmRemove}
              >
                <Text style={styles.removeConfirmText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add New Franchisee Modal */}
      <Modal
        transparent
        visible={addModalVisible}
        animationType="fade"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.addBox}>
            <Text style={styles.addHeader}>Add New Franchisee</Text>

            {['name', 'joined', 'category', 'location'].map((field) => (
              <View key={field}>
                <TextInput
                  style={styles.input}
                  placeholder={`Franchisee ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={newFranchisee[field]}
                  onChangeText={(text) =>
                    setNewFranchisee({ ...newFranchisee, [field]: text })
                  }
                />
                {errors[field] && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>{errors[field]}</Text>
                )}
              </View>
            ))}

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setAddModalVisible(false);
                  setErrors({});
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={handleAddFranchisee}
              >
                <Text style={styles.removeConfirmText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FranchiseeList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFCF2' },
  scrollContainer: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: 'bold', paddingTop: 20 },
  subtitle: { color: '#444', marginBottom: 20 },
  card: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000', // Efek bayangan
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  franchiseeName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  removeTextContainer: { marginTop: 10 },
  removeText: { color: 'red', fontWeight: '500' },

  addButton: {
    backgroundColor: '#355843',
    padding: 12,
    borderRadius: 20,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: { fontSize: 14, color: 'white' },

  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',
  },

  confirmBox: {
    backgroundColor: '#FFFCF2',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  addBox: {
    backgroundColor: '#FFFCF2',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  addHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  removeBtn: {
    backgroundColor: '#355843',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  removeConfirmText: {
    fontWeight: 'bold',
    color: 'white',
  },
  DateIcon: {
    resizeMode: 'contain',
  },
  DateView: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
