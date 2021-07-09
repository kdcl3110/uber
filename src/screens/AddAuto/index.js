import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import * as auth from '../../services/auth'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageView = ({url}) =>(
   <Image 
      source={{
         uri: url
      }}
      style={{
         width: 70,
         height: 70,
         borderRadius: 10,
      }}
   />
)

const SignIn = ({
    params,
}) =>{ 
   const navigation = useNavigation()
   const goToPage = (page) =>{
      navigation.navigate(page)
   }

   const [immatriculation, setImmatriculation] = useState('')
   const [marque, setMarque] = useState('')
   const [images, setImages] = useState([])
   
   const signIn = async () => {
      if(email !='' && password != ''){
         let res = await auth.signIn(email, password, navigation)
         if(res){
            setEmail('')
            setPassword('')
            navigation.navigate('Home')
         }
      }else{
         window.alert('identifiants invalide')
      }
   }

   const AddAuto = async () =>{
      const result = JSON.parse(await AsyncStorage.getItem('user'))
      const refImage = images.map((e, i) => `Autos/${result.uid}/`+ i)

      firestore()
         .doc(`drivers/${result.uid}`)
         .get()
         .then(
            res => {
               const val = res.data()
               val.autos.push({
                  images: refImage,
                  immatriculation: immatriculation,
                  marque: marque
               })
               firestore()
                  .doc(`drivers/${result.uid}`)
                  .set(val, {merge: true})
                  .then(()=>{
                     images.forEach((e, i) =>{
                        console.log(e)
                        let ref = `Autos/${result.uid}/`+ i
                        storage().ref(ref).putFile(e).then(()=>{
                           navigation.goBack()
                        })  
                     })
                  })
            }
      )
   }

   const takePhotoFromLibrary = () =>{
      ImagePicker.openPicker({
         width: 300,
         height: 300,
         cropping: true
      }).then(image => {
         if(images.length < 3){
            setImages([...images, image.path])
            console.log(images)
         }else{
            window.alert("vous ne pouvez choisir que 3 images")
         }
         //setImageIsSend(true)
      });
   }


   return (
    <View style={styles.container}>
         <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-around'}}>
         {images.map((img, index) =>(
            <ImageView url={img} key={index}/>
         ) )}
         </View>
         <View style={styles.group}>
            <Text style={{color: '#000'}}>imatriculation*</Text>
            <TextInput
               value={immatriculation}
               style={styles.input}
               placeholder={'CE-805'}
               onChangeText={setImmatriculation}/>
         </View>
         
         <View style={styles.group}>
            <Text style={{color: '#000'}}>marque*</Text>
            <TextInput
               value={marque}
               style={styles.input}
               placeholder={'marque de la voiture'}
               onChangeText={setMarque}/>
         </View>
         
         <TouchableOpacity
            style={styles.button}
            onPress={takePhotoFromLibrary}>
            <Text style={{color: '#fff'}}>Ajouter une image</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={styles.button}
            onPress={AddAuto}>
            <Text style={{color: '#fff'}}>Ajouter</Text>
         </TouchableOpacity>

         
    </View>
   );
}

export default SignIn;

