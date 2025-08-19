import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For logout icon

const AdminDashboard = () => {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('request');
    const navigation = useNavigation();

    const [requests, setRequests] = useState([
        { id: 1, title: 'CFC', requestedBy: 'kilesa', image: require('../../assets/CFCLogo.png'), description: 'CFC adalah ayam terenak termantap teruwawaw' },
        { id: 2, title: 'Fore', requestedBy: 'vorti', image: require('../../assets/ForeLogo.png'), description: 'Fore adalah franchise kopi yang milo dinonya enak' },
        { id: 3, title: 'JCO', requestedBy: 'lema', image: require('../../assets/JCONoTextLogo.png'), description: 'JCO adalah franchise yang jual donat almond enak'},
        { id: 4, title: 'Krispy Kreme', requestedBy: 'aicirtap', image: require('../../assets/KrispyKremeLogo.png'), description: 'Krispy Kreme adalah franchise yang glaze nya enak bet'},
        { id: 5, title: 'Pizza Hut', requestedBy: 'snoozie', image: require('../../assets/PizzaHutLogo.png'), description: 'Pizza Hut adalah franchise pizza yang lebih enak dari Domino' },
        { id: 6, title: 'Red Dog', requestedBy: 'waaw', image: require('../../assets/RedDogNoHangulLogo.png'), description: 'Red Dog adalah franchise yang jualan sosis mozza seharga ci mehong' },
        { id: 13, title: 'Krusty Krab', requestedBy: 'mrKrabs', image: require('../../assets/krustykrab.webp'), description: 'Krusty Krab adalah franchise jualan petti terenak' },
        { id: 14, title: 'Chumb Bucket', requestedBy: 'mrPlankton', image: require('../../assets/chumb.jpg'), description: 'Chumb Bucket adalah franchise jualan chum chum' },
    ]);
    const [accepted, setAccepted] = useState([
        { id: 7, title: 'Krispy Kreme', requestedBy: 'incenzee', image: require('../../assets/KrispyKremeLogo.png'), description: 'Krispy Kreme adalah franchise yang glaze nya enak bet'},
        { id: 8, title: 'Pizza Hut', requestedBy: 'yawara', image: require('../../assets/PizzaHutLogo.png'), description: 'Pizza Hut adalah franchise pizza yang lebih enak dari Domino' },
        { id: 9, title: 'CFC', requestedBy: 'r2d2', image: require('../../assets/CFCLogo.png'), description: 'CFC adalah ayam terenak termantap teruwawaw' },
        { id: 10, title: 'Red Dog', requestedBy: 'chinerisme', image: require('../../assets/RedDogNoHangulLogo.png'), description: 'Red Dog adalah franchise yang jualan sosis mozza seharga ci mehong' },
        { id: 11, title: 'Fore', requestedBy: 'xerocool', image: require('../../assets/ForeLogo.png'), description: 'Fore adalah franchise kopi yang milo dinonya enak' },
        { id: 12, title: 'JCO', requestedBy: 'waleswhoosh', image: require('../../assets/JCONoTextLogo.png'), description: 'JCO adalah franchise yang jual donat almond enak'},
    ]);

    // Accept handler: move from requests to accepted
    const handleAccept = useCallback((item) => {
        setRequests(prev => prev.filter(req => req.id !== item.id));
        setAccepted(prev => [{ ...item }, ...prev]);
    }, []);

    // Reject handler: remove from requests
    const handleReject = useCallback((item) => {
        setRequests(prev => prev.filter(req => req.id !== item.id));
    }, []);

    const renderCards = (data) =>
        data.map((item, idx) => (
            <View
                key={item.id}
                style={[
                    styles.card,
                    idx === data.length - 1 && { marginBottom: 32 }
                ]}
            >
                <View style={styles.cardRow}>
                    {item.image ? (
                        <Image source={ item.image } style={styles.imagePlaceholder} />
                    ) : (
                        <View style={styles.imagePlaceholder} />
                    )}
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSub}>Requested by : {item.requestedBy}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (activeTab === 'accepted') {
                            navigation.navigate('FranchisorDetail', { item });
                        } else {
                            navigation.navigate('RequestedFrDetail', {
                                item,
                                description: item.description,
                                onAccept: handleAccept,
                                onReject: handleReject,
                            });
                        }
                    }}
                >
                    <Text style={styles.cardDetails}>See details ›</Text>
                </TouchableOpacity>
            </View>
        ));

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Image
                        source={require('../../assets/logout.png')}
                        style={styles.logoutIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Image
                        source={require('../../assets/searchproduct.png')}
                        style={styles.searchIcon}
                    />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search.."
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="#888"
                />
            </View>

            {/* Tabs */}
            <View style={styles.requestAndAccepted}>
                <TouchableOpacity style={styles.tabWrapper} onPress={() => setActiveTab('request')}>
                    <Text style={[styles.requestAndAcceptedLabel, activeTab === 'request' && styles.activeTabLabel]}>
                        Request
                    </Text>
                    {activeTab === 'request' && <View style={styles.activeTabLine} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabWrapper} onPress={() => setActiveTab('accepted')}>
                    <Text style={[styles.requestAndAcceptedLabel, activeTab === 'accepted' && styles.activeTabLabel]}>
                        Accepted
                    </Text>
                    {activeTab === 'accepted' && <View style={styles.activeTabLine} />}
                </TouchableOpacity>
            </View>
            <View style={styles.tabUnderline} />

            {/* Cards */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardContainer}
            >
                {renderCards(activeTab === 'request' ? requests : accepted)}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFCF0',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        marginLeft: 23,
        marginTop: 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        marginTop: 50,
        marginLeft: 25,
    },
    logoutButton: {
        padding: 5,
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
        width:20,
        height:20
    },
    searchBar: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        paddingLeft: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000',
    },
    requestAndAccepted: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },
    requestAndAcceptedLabel: {
        fontSize: 16,
    },
    tabWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 4,
    },
    activeTabLabel: {
        color: '#355E3B',
        fontWeight: 'bold',
    },
    activeTabLine: {
        height: 3,
        width: '55%',
        backgroundColor: '#355E3B',
        borderRadius: 2,
        marginTop: 2,
    },
    tabUnderline: {
        width: '85%',
        height: 1,
        backgroundColor: '#bbb',
        alignSelf: 'center',
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '85%',
        alignSelf: 'center',
        paddingLeft: 37.5,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        width: Dimensions.get('window').width * 0.8,
        minHeight: 120,
    },
    cardRow: {
        flexDirection: 'row',
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        marginRight: 12,
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    cardSub: {
        fontSize: 14,
        color: '#444',
        marginTop: 4,
    },
    cardDetails: {
        textAlign: 'right',
        color: '#888',
        fontSize: 14,
    },
    logoutIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});

export default AdminDashboard;