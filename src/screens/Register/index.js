import React, { useState, useEffect } from 'react';
import { 
   Text, 
   View, 
   TextInput, 
   TouchableOpacity, 
   ImageBackground} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import * as auth from '../../services/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import ImagePicker from 'react-native-image-crop-picker'


const Register = ({user}) =>{ 
   
   const [displayName, setDisplayName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [image,  setImage] = useState('https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png')
   
   const [imageIsSend, setImageIsSend] = useState(false)

   bs = React.createRef(null)
   fall = new Animated.Value(1)
   
   // useEffect(() =>{
   //    setImageIsSend(true)
   //    console.log(imageIsSend)
   //    //return ('')
   // }, [image])

   const takePhotoFromCamera = async () =>{
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

   const takePhotoFromLibrary = () =>{
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

   const renderInner = () =>(
      <View style={styles.panel}>
         <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload photo</Text>
            <Text style={styles.panelSubtitle}>choisissez votre photo de profil</Text>
         </View>
         <TouchableOpacity 
            style={styles.button}
            onPress={takePhotoFromCamera}
         >
            <Text style={{color: '#fff'}}>Prendre photo</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={styles.button}
            onPress={takePhotoFromLibrary}   
         >
            <Text style={{color: '#fff'}}>Choisir dans la galerie</Text>
         </TouchableOpacity>

         <TouchableOpacity 
            style={styles.button} 
            onPress={() => bs.current.snapTo(1)}>
            <Text style={{color: '#fff'}}>annuler</Text>
         </TouchableOpacity>
      </View>
   )

   const renderHead = () =>(
      <View style={styles.header}>
         <View style={styles.panelHeader}>
            <View style={styles.panelHandle}/>
         </View>
      </View>
   )
   
   const sinUp = async () =>{
      console.log('test')
      if(displayName != '' 
         && email != '' 
         && password != ''
         && image != 'https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png'
      ){
         let result = auth.signUp({displayName, email, password}, image)
         if(result){
            navigation.goBack()
            setDisplayName('')
            setEmail('')
            setPassword('')
         }
      }else{
         window.alert('toutes les donnée doivent être définies')
      }
   }

   const navigation = useNavigation()

   const goToPage = (page) =>{
      navigation.navigate(page)
   }


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
       <Animated.View style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),}}>
         <View>
            <View style={{alignItems: 'center'}}>
               <TouchableOpacity onPress={()=>{bs.current.snapTo(0)}}>
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
                        imageStyle={{borderRadius: 15}}
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
            <Text>Nom*</Text>
            <TextInput
               value={displayName}
               style={styles.input}
               placeholder={'nom'}
               onChangeText={setDisplayName}
            />
         </View>

         <View style={styles.group}>
            <Text>email*</Text>
            <TextInput
               value={email}
               style={styles.input}
               placeholder={'Email'}
               keyboardType='email-address'
               onChangeText={setEmail}
            />
         </View>
         
         <View style={styles.group}>
            <Text>Mot de passe*</Text>
            <TextInput
               value={password}
               style={styles.input}
               placeholder={'Mot de passe'}
               secureTextEntry={true}
               onChangeText={setPassword}
            />
         </View>

         <TouchableOpacity
            style={styles.button}
            onPress={sinUp} >
            <Text style={{color: '#fff'}}>S'inscrire</Text>
         </TouchableOpacity>
         
         <View style={styles.foot}>
            <TouchableOpacity
               onPress={() => goToPage('ForgotPasseword')}>
               <Text style={styles.text}>Mot de passe oublié</Text>
            </TouchableOpacity>
            
               <TouchableOpacity 
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.text}>Connexion</Text>
               </TouchableOpacity>
         

         </View>
      </Animated.View>
    </View>
   );
}


export default Register;

