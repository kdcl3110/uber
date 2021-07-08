
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';

import styles from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons'

const HuberTypeRow = ({source, type, description, onPress, isSelected}) => {
    
    const getImage = ()=>{
        if(source === 'UberX'){
            return require('../../assets/images/UberX.jpeg')
        }

        if(source === 'UberXL'){
            return require('../../assets/images/UberXL.jpeg')
        }
    }

    return(
        <Pressable 
            onPress={onPress} 
            style={[styles.container, {backgroundColor: isSelected ? '#efefef' : 'white'}]}>
            {/* image */}
            <Image 
                style={styles.image}
                source={ getImage() }
            />

            <View style={ styles.middelContainer }>
                <Text style={styles.type}>
                    { type }
                    <Ionicons name={'person'} size={12}/>
                </Text>
                <Text style={styles.desc}>{description}</Text>
            </View>

        </Pressable>
    )
};

export default HuberTypeRow;
