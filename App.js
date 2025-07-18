import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens Auth
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import VerifyCodeScreen from './screens/Auth/VerifyCodeScreen';
import ResetPasswordScreen from './screens/Auth/ResetPasswordScreen';

// Import screens Franchisor (existing)
import FranchisorProfile from './screens/Franchisor/FranchisorProfile';
import EditProfileFranchisor from './screens/Franchisor/EditProfileFranchisor';
import FranchisorDashboard from './screens/Franchisor/FranchisorDashboard';
import AddNewType from './screens/Franchisor/AddNewType';
import FranchiseeList from './screens/Franchisor/FranchiseeList';
import ProductsCatalog from './screens/Franchisor/ProductsCatalog';

// Import screens Admin (existing)
import AdminDashboard from './screens/Admin/AdminDashboard';

// Import screens Owner (existing and new placeholders)
import OwnerDashboard from './screens/Owner/OwnerDashboard';
import FranchiseDetail from './screens/Owner/FranchiseDetail';
import FranchiseCatalog from './screens/Owner/FranchiseCatalog';
import CashierManagement from './screens/Owner/CashierManagement';
import OwnerProfile from './screens/Owner/OwnerProfile';
import FranchisorDetail from './screens/Owner/FranchisorDetail';
import EditCashierScreen from './screens/Owner/EditCashierScreen'; // Import baru

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator untuk peran Franchisor (sudah ada)
const FranchisorTabNavigator = () => (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#355843',
            height: 120,
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
          tabBarLabelStyle: {
            color: '#fff',
            marginBottom: 5,
          }
        })}
      >
        <Tab.Screen name="Dashboard" component={FranchisorDashboard} />
        <Tab.Screen name="Franchise" component={FranchiseeList} />
        <Tab.Screen name="Products" component={ProductsCatalog} />
        <Tab.Screen name="Profile" component={FranchisorProfile} />
      </Tab.Navigator>
);

// Tab Navigator BARU untuk peran Owner
const OwnerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#355843',
        height: 120,
        paddingTop: 8,
      },
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        if (route.name === 'OwnerDashboardTab') {
          iconName = focused ? 'grid' : 'grid-outline';
        } else if (route.name === 'FranchiseCatalogTab') {
          iconName = focused ? 'storefront' : 'storefront-outline';
        } else if (route.name === 'CashierManagementTab') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'OwnerProfileTab') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={24} color="#fff" />;
      },
      tabBarLabelStyle: {
        color: '#fff',
        marginBottom: 5,
      }
    })}
  >
    <Tab.Screen name="OwnerDashboardTab" component={OwnerDashboard} options={{ title: 'Dashboard' }} />
    <Tab.Screen name="FranchiseCatalogTab" component={FranchiseCatalog} options={{ title: 'Franchise' }} />
    <Tab.Screen name="CashierManagementTab" component={CashierManagement} options={{ title: 'Cashier' }} />
    <Tab.Screen name="OwnerProfileTab" component={OwnerProfile} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);


export default function App() {
  return (
    <NavigationContainer>
           <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
               <Stack.Screen name="Login" component={LoginScreen} />
               <Stack.Screen name="Register" component={RegisterScreen} />
               <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
               <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
               <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
               
               <Stack.Screen name="OwnerMainTabs" component={OwnerTabNavigator} />

               <Stack.Screen name="FranchiseDetail" component={FranchiseDetail} />
               <Stack.Screen name="FranchisorDetail" component={FranchisorDetail} />
               <Stack.Screen name="EditCashier" component={EditCashierScreen} /> 

               <Stack.Screen name="FranchisorMainTabs" component={FranchisorTabNavigator} />

               <Stack.Screen name="FranchisorProfile" component={FranchisorProfile} />
               <Stack.Screen name="AddNewType" component={AddNewType} />
               <Stack.Screen name="EditProfileFranchisor" component={EditProfileFranchisor} />
               <Stack.Screen name="FranchisorDashboard" component={FranchisorDashboard} />

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
