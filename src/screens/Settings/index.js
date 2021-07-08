import React, {useEffect} from 'react';
import { Text, View } from 'react-native';
        

const Settings = ({data, width, height}) => {
    
    useEffect(()=>{

    }, [data])

    const drawChar = () =>{
        
    }


    return(
        <View style={{justifyContent: 'center', alignItems:'center'}}>
            <Text>Settings</Text>
        </View>
    )
};

export default Settings;
