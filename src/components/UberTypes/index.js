import React from 'react';
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

import UberTypeRow from '../UberTypeRow'

const UberTypes = ({typeState}) => {
    
    const [selectType, setSelectType] = typeState

    const confirm = () =>{
        console.warn("conforù")
    }
    return(
        <View>
            <UberTypeRow 
                source={'UberX'} 
                type={"Dépot"} 
                description={"Vous ramene à votre destination"} key={0}
                isSelected = {"Dépot" === selectType}
                onPress={()=>{
                    setSelectType("Dépot")
                    try{
                        AsyncStorage.setItem("newCourse", JSON.stringify({type: 'depot', heure: new Date().getHours()}))
                    }catch(e){}
                }}
            />
            <UberTypeRow 
                source={'UberXL'} 
                type={"course"} 
                description={"Vous conduira jusqu'à votre destination"} key={1}
                isSelected = {"course" === selectType}
                onPress={()=>{
                    setSelectType("course")
                    try{
                        AsyncStorage.setItem("newCourse", JSON.stringify({type: 'cource', heure: new Date().getHours()}))
                    }catch(e){}
                }}
            />
            <TouchableOpacity onPress={() =>confirm()} style={{
                backgroundColor: '#018786',
                padding: 15,
                margin: 10,
                alignItems: 'center',
                borderRadius: 5
            }}>
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold'
                }}>Cofirmer votre Choix</Text>
            </TouchableOpacity>
        </View>
    )
};

export default UberTypes;
