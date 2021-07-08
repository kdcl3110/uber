import React, { useState, useEffect } from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   ImageBackground, 
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import * as auth from '../../services/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated, { defined } from 'react-native-reanimated'
import ImagePicker from 'react-native-image-crop-picker'
// import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import * as gesUser from '../../services/GestionUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage'

const EditProfil = ({ user }) => {
   const [uid, setUid] = useState('')
   const [displayName, setDisplayName] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [image, setImage] = useState('https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png')
   const [email, setEmail] = useState()
   const [photoURL, setPhotoURL] = useState()
   const [emailVerified, setEmailVerified] = useState()


   const bs = React.useRef(null)
   const fall = new Animated.Value(1)

   useEffect(() => {
      getUser()
   }, [])

   const getUser = async () => {
      const result = JSON.parse(await AsyncStorage.getItem('user'))
      console.log(result)
      if (result != null) {
         setDisplayName(result.displayName)
         setPhoneNumber(result.phoneNumber)
         setUid(result.uid)
         setEmail(result.email)
         setPhotoURL(result.photoURL)
         setEmailVerified(result.emailVerified)
         getUserImage(result.photoURL)
      }
   }

   const getUserImage = async (url) => {
      setImage(await storage().ref(url).getDownloadURL())
      console.log(image)
   }

   const update = () => {
      console.log('test')
      if (displayName != ''
         && phoneNumber != ''
      ) {
         gesUser.updateUser({
            uid,
            displayName,
            phoneNumber,
            image,
            email,
            photoURL,
            emailVerified
         })
      } else {
         window.alert('toutes les donnée doivent être définies')
      }
   }

   const navigation = useNavigation()

   const takePhotoFromCamera = async () => {
      await ImagePicker.openCamera({
         width: 300,
         height: 300,
         cropping: true,
      }).then(image => {
         setImage(image.path)
         bs.current.snapTo(1)
         console.log(image)
         //setImageIsSend(true)
      });
   }

   const takePhotoFromLibrary = () => {
      ImagePicker.openPicker({
         width: 300,
         height: 300,
         cropping: true
      }).then(image => {
         setImage(image.path)
         bs.current.snapTo(1)
         console.log(image)
         //setImageIsSend(true)
      });
   }

   const renderInner = () => (
      <View style={styles.panel}>
         <View style={{ alignItems: 'center' }}>
            <Text style={styles.panelTitle}>Upload photo</Text>
            <Text style={styles.panelSubtitle}>choisissez votre photo de profil</Text>
         </View>
         <TouchableOpacity
            style={styles.button}
            onPress={takePhotoFromCamera}
         >
            <Text style={{ color: '#fff' }}>Prendre photo</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={styles.button}
            onPress={takePhotoFromLibrary}
         >
            <Text style={{ color: '#fff' }}>Choisir dans la galerie</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={styles.button}
            onPress={() => bs.current.snapTo(1)}>
            <Text style={{ color: '#fff' }}>annuler</Text>
         </TouchableOpacity>
      </View>
   )

   const renderHead = () => (
      <View style={styles.header}>
         <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
         </View>
      </View>
   )

   return (
      <View style={styles.container}>
         <BottomSheet
            ref={bs}
            snapPoints={[330, 0]}
            renderContent={renderInner}
            renderHeader={renderHead}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
         />
         <Animated.View style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)), }}>
            <View>
               <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { bs.current.snapTo(0) }}>
                     <View style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                     }}>
                        <ImageBackground
                           source={{
                              uri: image
                           }}
                           style={{
                              height: 100,
                              width: 100
                           }}
                           imageStyle={{ borderRadius: 15 }}
                        >
                           <View style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center'
                           }}>
                              <Icon
                                 name="camera"
                                 size={35}
                                 color="#fff"
                                 style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 10
                                 }}
                              ></Icon>
                           </View>
                        </ImageBackground>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={styles.group}>
               <Text>Nom</Text>
               <TextInput
                  value={displayName}
                  style={styles.input}
                  placeholder={'nom'}
                  onChangeText={setDisplayName}
               />
            </View>

            <View style={styles.group}>
               <Text>Telephone</Text>
               <TextInput
                  value={phoneNumber}
                  style={styles.input}
                  placeholder={'telephone'}
                  keyboardType='numeric'
                  onChangeText={setPhoneNumber}
               />
            </View>

            <TouchableOpacity
               style={styles.button}
               onPress={update} >
               <Text style={{ color: '#fff' }}>Modifier</Text>
            </TouchableOpacity>
         </Animated.View>
      </View>
   );
}


export default EditProfil;

