import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity } from 'react-native';

// Import screens Auth
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import VerifyCodeScreen from './screens/Auth/VerifyCodeScreen';
import ResetPasswordScreen from './screens/Auth/ResetPasswordScreen';

// Import screens Franchisor
import RegisterFranchise from './screens/Franchisor/RegisterFranchise';
import FranchisorProfile from './screens/Franchisor/FranchisorProfile';
import EditProfileFranchisor from './screens/Franchisor/EditProfileFranchisor';
import FranchisorDashboard from './screens/Franchisor/FranchisorDashboard';
import FranchiseeList from './screens/Franchisor/FranchiseeList';
import ProductsCatalog from './screens/Franchisor/ProductsCatalog';

// Import screens Admin
import AdminDashboard from './screens/Admin/AdminDashboard';
import RequestedFrDetail from './screens/Admin/RequestedFrDetail';

// Import screens Owner
import OwnerDashboard from './screens/Owner/OwnerDashboard';
import FranchiseDetail from './screens/Owner/FranchiseDetail';
import FranchiseCatalog from './screens/Owner/FranchiseCatalog';
import CashierManagement from './screens/Owner/CashierManagement';
import OwnerProfile from './screens/Owner/OwnerProfile';
import FranchisorDetail from './screens/Owner/FranchisorDetail';
import EditCashierScreen from './screens/Owner/EditCashierScreen';

// Import screens Cashier (NEW)
import CashierDashboard from './screens/Cashier/CashierDashboard';
import AssignedFranchise from './screens/Cashier/AssignedFranchise';
import PaymentPage from './screens/Cashier/PaymentPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Franchisor Tab Navigator
const FranchisorDashboardStack = createStackNavigator();
const FranchisorProfileStack = createStackNavigator();

const FranchisorDashboardStackScreen = () => (
  <FranchisorDashboardStack.Navigator screenOptions={{ headerShown: false }}>
    <FranchisorDashboardStack.Screen name="FranchisorDashboardMain" component={FranchisorDashboard} />
  </FranchisorDashboardStack.Navigator>
);

const FranchisorProfileStackScreen = () => (
  <FranchisorProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <FranchisorProfileStack.Screen name="FranchisorProfileMain" component={FranchisorProfile} />
    <FranchisorProfileStack.Screen name="EditProfileFranchisor" component={EditProfileFranchisor} />
  </FranchisorProfileStack.Navigator>
);

const FranchisorTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#355843',
        height: 80,
        paddingTop: 8,
      },
      tabBarButton: (props) => (
        <TouchableOpacity {...props} activeOpacity={0.6} />
      ),
      tabBarIcon: ({ focused }) => {
        let iconSource;

        if (route.name === 'Dashboard')
          iconSource = require('./assets/dashboard.png');
        else if (route.name === 'Franchise')
          iconSource = require('./assets/franchise.png');
        else if (route.name === 'Products')
          iconSource = require('./assets/products.png');
        else if (route.name === 'Profile')
          iconSource = require('./assets/profile.png');

        return (
          <Image
            source={iconSource}
            style={{
              width: 28,
              height: 28,
              opacity: focused ? 1 : 0.5,
              resizeMode: 'contain',
            }}
          />
        );
      },
      tabBarLabelStyle: {
        color: '#fff',
        marginBottom: 5,
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={FranchisorDashboardStackScreen} />
    <Tab.Screen name="Franchise" component={FranchiseeList} />
    <Tab.Screen name="Products" component={ProductsCatalog} />
    <Tab.Screen name="Profile" component={FranchisorProfileStackScreen} />
  </Tab.Navigator>
);

// Owner Tab Navigator
const OwnerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#355843',
        height: 80,
        paddingTop: 8,
      },
      tabBarButton: (props) => (
        <TouchableOpacity
          {...props}
          activeOpacity={0.6} // opacity when pressed
        />
      ),
      tabBarIcon: ({ focused }) => {
        let iconSource;

        if (route.name === 'OwnerDashboardTab')
          iconSource = require('./assets/dashboard.png');
        else if (route.name === 'FranchiseCatalogTab')
          iconSource = require('./assets/franchise.png');
        else if (route.name === 'CashierManagementTab')
          iconSource = require('./assets/cashier.png');
        else if (route.name === 'OwnerProfileTab')
          iconSource = require('./assets/profile.png');

        return (
          <Image
            source={iconSource}
            style={{
              width: 28,
              height: 28,
              opacity: focused ? 1 : 0.5, // high opacity when focused
              resizeMode: 'contain',
            }}
          />
        );
      },
      tabBarLabelStyle: {
        color: '#fff',
        marginBottom: 5,
      }
    })}
  >
    <Tab.Screen
      name="OwnerDashboardTab"
      component={OwnerDashboard}
      options={{ title: 'Dashboard' }}
    />
    <Tab.Screen
      name="FranchiseCatalogTab"
      component={FranchiseCatalog}
      options={{ title: 'Franchise' }}
    />
    <Tab.Screen
      name="CashierManagementTab"
      component={CashierManagement}
      options={{ title: 'Cashier' }}
    />
    <Tab.Screen
      name="OwnerProfileTab"
      component={OwnerProfile}
      options={{ title: 'Profile' }}
    />
  </Tab.Navigator>
);


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        {/* Role Navigators */}
        <Stack.Screen name="OwnerMainTabs" component={OwnerTabNavigator} />
        <Stack.Screen name="FranchisorMainTabs" component={FranchisorTabNavigator} />

        <Stack.Screen name="RegisterFranchise" component={RegisterFranchise} />
        {/* Cashier Routes */}
        <Stack.Screen name="CashierDashboard" component={CashierDashboard} />
        <Stack.Screen name="AssignedFranchise" component={AssignedFranchise} />
        <Stack.Screen name="PaymentPage" component={PaymentPage} />

        {/* Admin + Owner Detail Pages */}
        <Stack.Screen name="Admin" component={AdminDashboard} />
        <Stack.Screen name="RequestedFrDetail" component={RequestedFrDetail} />
        <Stack.Screen name="FranchiseDetail" component={FranchiseDetail} />
        <Stack.Screen name="FranchisorDetail" component={FranchisorDetail} />
        <Stack.Screen name="EditCashier" component={EditCashierScreen} />
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
