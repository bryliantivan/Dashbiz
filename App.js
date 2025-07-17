import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FranchisorProfile from './screens/Franchisor/FranchisorProfile';
import EditProfileFranchisor from './screens/Franchisor/EditProfileFranchisor';
import FranchisorDashboard from './screens/Franchisor/FranchisorDashboard';
import AddNewType from './screens/Franchisor/AddNewType';
import FranchiseeList from './screens/Franchisor/FranchiseeList';
import ProductsCatalog from './screens/Franchisor/ProductsCatalog';
import AdminDashboard from './screens/Admin/AdminDashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#355843',
            height: 60,
            paddingTop: 8,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Dashboard') iconName = focused ? 'grid' : 'grid-outline';
            else if (route.name === 'Franchise') iconName = focused ? 'storefront' : 'storefront-outline';
            else if (route.name === 'Products') iconName = focused ? 'archive' : 'archive-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

            return <Ionicons name={iconName} size={24} color="#fff" />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={FranchisorDashboard} />
        <Tab.Screen name="Franchise" component={FranchiseeList} />
        <Tab.Screen name="Products" component={ProductsCatalog} />
        <Tab.Screen name="Profile" component={FranchisorProfile} />
      </Tab.Navigator>
);
export default function App() {
  return (
    <NavigationContainer>
      {/*  pls dont delete the comments */}
       {/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Admin"> */}
       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
         <Stack.Screen name="Main" component={TabNavigator} />
         
         <Stack.Screen name="FranchisorProfile" component={FranchisorProfile} />
         <Stack.Screen name="AddNewType" component={AddNewType} />
         <Stack.Screen name="EditProfileFranchisor" component={EditProfileFranchisor} />
         <Stack.Screen name="FranchisorDashboard" component={FranchisorDashboard} />

        {/* admin */}
        {/* tolong jangan hapus comment dibawah, ini mau dipakai kalo mau nunjukkin admin karena di navbar gaada caranya */}
        {/* <Stack.Screen name="Admin" component={AdminDashboard} /> */}


       </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
