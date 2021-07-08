import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import * as authi from '../auth'
import auth from '@react-native-firebase/auth'

export const getUserImage = async (url) => {
   return await storage().ref(url).getDownloadURL()
}

export const updateUser = (user) =>{
   let urlImage = 'Profils/' + (new Date()).getTime() + '.jpg'
   console.log(user.image)
   
   firestore().doc(`users/${user.uid}`).update({
      displayName: user.displayName,
      photoURL: urlImage,
      phoneNumber: user.phoneNumber
   }).then(res => {
      console.log(res)
      uploadImage(user.image, urlImage)
      
      auth().currentUser.updateProfile({
         displayName: user.displayName,
         phoneNumber: user.phoneNumber,
         photoURL: urlImage
      }).then(() => {
         updateStorage(user, urlImage)
      })
      authi.showToast("vos informations ont été mis a jours")
   })
}

const updateStorage = async(user, urlImage) =>{
   try{
      console.log(await auth().currentUser)
      AsyncStorage.setItem('user', JSON.stringify({...user, urlImage}))
   }catch(e){
      console.log(e.message)
   }
}

const uploadImage = async (image, url) => {
   try{
      await storage().ref(url).putFile(image)
   }catch(e){
      window.alert(e.message)
   }
}

export const getUser = async () =>{
  try{
      return JSON.parse(await AsyncStorage.getItem('user'))
  }catch(e){
     return null
  }
}

export const showAmount = async () =>{
   const cource = await AsyncStorage.getItem('newCourse')
   const user = await AsyncStorage.getItem('user')
   const duration = await AsyncStorage.getItem('duration')
   const distance =  await AsyncStorage.getItem('distance')
}
