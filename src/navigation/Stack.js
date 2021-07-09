import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DestinationSearch from '../screens/destinationSearch';
import SearchResults from '../screens/searchResults';
import Register from '../screens/Register';
import SignIn from '../screens/SingIn';
import EditProfil from '../screens/EditProfil'
import AddAuto from  '../screens/AddAuto'
import ListAuto from '../screens/ListAuto'

const Stack = createStackNavigator();

export default function HomeNavigation() {
   return (
      <Stack.Navigator>
         <Stack.Screen name="SingIn" component={SignIn}/>
         <Stack.Screen name="Register" component={Register}/>
         <Stack.Screen name="Profile" component={EditProfil}/>
         <Stack.Screen name="AddAuto" component={AddAuto}/>
         <Stack.Screen name="ListAuto" component={ListAuto}/>
         <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
         <Stack.Screen options={{headerShown: false}} name="DestinationSearch" component={DestinationSearch}/>
         <Stack.Screen options={{headerShown: false}} name="SearchResults" component={SearchResults}/>
      </Stack.Navigator>      
   )
}
