import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from './Stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from '../screens/Settings'
import Profil from './Profil';


const Drawer = createDrawerNavigator()

const Stack = createStackNavigator();

   export default function Root() {
   return (
      <Drawer.Navigator drawerContent ={
         (props)=> (<Profil {...props} />)
      }>
         <Drawer.Screen name="home" component={HomeNavigation}/>
         <Drawer.Screen name="settings" component={Settings}/>
      </Drawer.Navigator>
   )
}
