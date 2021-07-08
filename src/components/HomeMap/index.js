import React from 'react'
import { View, Text, Image } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'


const HomeMap = (props) => {
    return (
        <MapView
            style={{width:'100%', height:'100%'}}
            provider= {PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={{
                latitude: 3.866667                ,
                longitude: 11.516667,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
            /* <Marker coordinate={{ latitude : 3.866667 , longitude : 11.516667 }}>
                <Image 
                    style={{width: 70, height: 70, resizeMode: 'contain'}} 
                    source={require('../../assets/images/top-UberX.png')}/>
            </Marker>  */
        //</MapView>
    )
}

export default HomeMap