import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('request'); // 'request' or 'accepted'

    // Dummy data for demonstration
    const requests = [
        { id: 1, title: 'Request 1', desc: 'Details for request 1' },
        { id: 2, title: 'Request 2', desc: 'Details for request 2' },
    ];
    const accepted = [
        { id: 3, title: 'Accepted 1', desc: 'Details for accepted 1' },
        { id: 4, title: 'Accepted 2', desc: 'Details for accepted 2' },
    ];

    const renderCards = (data) => (
        data.map(item => (
            <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
        ))
    );

    return (
        <ScrollView contentContainerstyle={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            {/* search bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search.."
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="#888"
                />
            </View>

            {/* request & accepted */}
            <View style={styles.requestAndAccepted}>
                <Text style={styles.requestAndAcceptedLabel}>Request</Text>
                <Text style={styles.requestAndAcceptedLabel}>Accepted</Text>
            </View>
            <View style={styles.progressBar}>
                <View style={styles.progress} />
            </View>


        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFCF0',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        marginTop: 50,
        marginLeft: 25,
    },
    searchContainer: {
        width: '85%',
        position: 'relative',
        marginBottom: 16,
        marginLeft: 23,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: 10,
        zIndex: 1,
    },
    searchBar: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        paddingLeft: 40, // space for the icon
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000',
    },
    requestAndAccepted: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f0',
    },
    requestAndAcceptedLabel: {
        fontSize: 16,
    },
    progressBar: {
        height: 5,
        width: '70%',
        backgroundColor: '#ccc',
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignContent: 'center',
        alignSelf: 'center', 
    },
    progress: {
        height: '100%',
        width: '50%', // Adjust this value to change the progress length
        backgroundColor: '#355E3B',
        borderRadius: 10,
    },
})

export default AdminDashboard;