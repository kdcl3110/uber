import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import * as authi from '../auth'
import auth from '@react-native-firebase/auth'


export const addDrivers = (driver) => {
   firestore().collection('Drivers').add(driver).then(()=>{
      showToast("vous avez ajouté un nouveau chauffeur")
   })
}

export const showToast = (message) => {
   ToastAndroid.show(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
   )
}