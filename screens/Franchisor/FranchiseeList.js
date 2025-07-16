import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FranchiseeList = () => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const franchisees = Array(5).fill({
    name: 'Franchisee Name',
    joined: 'XXX',
    category: 'Category',
    location: 'Location',
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>List of Franchisee</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>

        {franchisees.map((f, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.franchiseeName}>{f.name}</Text>
            <Text>🗓 Joined : {f.joined}</Text>
            <Text>{f.category}</Text>
            <Text>{f.location}</Text>
            <TouchableOpacity
              onPress={() => setRemoveModalVisible(true)}
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
          <Ionicons name="add-circle" size={16} style={{ marginLeft: 5 }} />
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
                onPress={() => setRemoveModalVisible(false)}
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
            <TextInput style={styles.input} placeholder="Franchisee Name" />
            <TextInput style={styles.input} placeholder="Franchise Type" />
            <TextInput style={styles.input} placeholder="Franchise Location" />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => setAddModalVisible(false)}
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
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#444', marginBottom: 20 },
  card: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  franchiseeName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  removeTextContainer: { marginTop: 10 },
  removeText: { color: 'red', fontWeight: '500' },

  addButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 20,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: { fontSize: 14 },

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
    marginBottom: 14,
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
  },
  removeBtn: {
    backgroundColor: '#D3F276',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  removeConfirmText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
