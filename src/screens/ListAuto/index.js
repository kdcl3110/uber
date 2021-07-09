import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { Card} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderAuto = ({auto}) =>(
   <TouchableOpacity>
      <Card
         containerStyle={{
            height: 300
         }}
      >
         <Card.Title>{auto.immatriculation}</Card.Title>
         <Card.Divider/>
         <View style={{alignItems: 'center'}}>
            <Image style={{width: '100%', height:'75%'}}
               source={require('../../assets/images/taxi.jpg')}
            />
            <Text style={{fontSize: 25}}>{auto.marque}</Text>
         </View>
      </Card>
   </TouchableOpacity>
)

const ListAuto = (params) => {
   const navigation = useNavigation()

   const [autos, setAutos] = useState([])

   useEffect(()=>{
      recupAuto()
   }, [])
   const recupAuto = async () =>{
      const result = JSON.parse(await AsyncStorage.getItem('user'))
      firestore()
         .doc(`drivers/${result.uid}`)
         .onSnapshot((res) =>{
            console.log(res.data().autos);
            setAutos(res.data().autos)
         })
   }

   return (
      <View>
         <ScrollView>
            
            {autos.map((e, i)=>(
               <RenderAuto auto={e} key={i} />
            ))}
         </ScrollView>
         <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => navigation.navigate('AddAuto')}
         />
      </View>
      
   )
}

export default ListAuto;
