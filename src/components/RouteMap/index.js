import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RouteMap = ({origin, destination}) => {

    //const origin = {latitude: 37.3318456, longitude: -122.0296002};
    //const destination = {latitude: 37.771707, longitude: -122.4053769};

    const [time, setTime] = useState()
    const [distance, setDistance] = useState()
    
    const originLoc = {
        latitude: origin.details.geometry.location.lat,
        longitude: origin.details.geometry.location.lng
    }
    const destLoc = {
        latitude: destination.details.geometry.location.lat,
        longitude: destination.details.geometry.location.lng,
    }
    
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI';

    return (
        <MapView
            style={{width:'100%', height:'100%'}}
            provider= {PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 3.866667,
                longitude: 11.516667,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <MapViewDirections
                origin={originLoc}
                destination={destLoc}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="black"
                onReady = {result =>{
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)
                    setTime(result.duration)
                    setDistance(result.distance)
                    try{
                        AsyncStorage.setItem("duration", result.duration)
                        AsyncStorage.setItem("distance", result.distance)
                    }catch(e){
                        console.log(e.messase)
                    }
                }}
            />
            <Marker
                coordinate={originLoc}
                title={'origin'}
            />
            <Marker
                coordinate={destLoc}
                title={'destination'}
            />
        </MapView>
    )
}

export default RouteMap