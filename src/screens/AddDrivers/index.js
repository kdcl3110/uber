import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import * as auth from '../../services/auth'



const SignIn = ({
    params,
}) =>{ 
   const navigation = useNavigation()
   const goToPage = (page) =>{
      navigation.navigate(page)
   }

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   
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

   return (
    <View style={styles.container}>
         <View style={styles.group}>
            <Text style={{color: '#000'}}>telephone*</Text>
            <TextInput
               value={email}
               style={styles.input}
               placeholder={'Email'}
               onChangeText={setEmail}/>
         </View>
         
         <View style={styles.group}>
            <Text style={{color: '#000'}}>nom*</Text>
            <TextInput
               value={email}
               style={styles.input}
               placeholder={'Email'}
               onChangeText={setEmail}/>
         </View>

         <View style={styles.group}>
            <Text style={{color: '#000'}}>email*</Text>
            <TextInput
               value={password}
               style={styles.input}
               placeholder={'Mot de passe'}
               secureTextEntry={true}
               onChangeText={setPassword}/>
         </View>

         <TouchableOpacity
            style={styles.button}
            onPress={() => signIn(email, password)}>
            <Text style={{color: '#fff'}}>Connexion</Text>
         </TouchableOpacity>
         
         <View style={styles.foot}>
            <TouchableOpacity onPress={ () => goToPage('Forgot') } >
               <Text style={styles.text}>Mot de passe oublié</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => goToPage('Register') }>
               <Text style={styles.text}>Inscription</Text>
            </TouchableOpacity>
         </View>
    </View>
   );
}

export default SignIn;

