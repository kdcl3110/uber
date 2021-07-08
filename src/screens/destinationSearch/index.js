import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    SafeAreaView
} from 'react-native'
import styles from './styles'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow'
import { useNavigation } from '@react-navigation/core';

const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const DestinationSearch = (props)=>{
    const [originPlace, setOriginPlace] = useState(null)
    const [destinationPlace, setdestinationPlace] = useState(null)

    const navigation = useNavigation()

    const toNavigate = () => {
        if(originPlace && destinationPlace){
            console.warn('rediriger vers le résultat')
            navigation.navigate('SearchResults',{
                originPlace,
                destinationPlace
            })
        }
    }

    useEffect(()=>{
        toNavigate()
    }, [originPlace, destinationPlace])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder='où êtes vous?'
                    onPress={(data, details = null) => {
                        setOriginPlace({data, details})
                        console.log(data, details);
                    }}
                    enablePoweredByContainer = {false}
                    suppressDefaultStyles
                    currentLocation={true}
                    currentLocationLabel='ma position'
                    styles={{
                        textInput: styles.textInput,
                        container: styles.autocompleteContainer,
                        listView: styles.listView,
                        separator: styles.separator,
                    }}

                    fetchDetails
                    query={{
                        key: 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI',
                        language: 'en',
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                    renderDescription={(data) => data.description || data.vicinity}
                    predefinedPlaces={[homePlace, workPlace]}
                />
                
                <GooglePlacesAutocomplete
                    placeholder='où allez vous?'
                    onPress={(data, details = null) => {
                        setdestinationPlace({data, details})
                        console.log(data, details);
                    }}
                    enablePoweredByContainer = {false}
                    suppressDefaultStyles
                    styles={{
                        textInput: styles.textInput,
                        container: {
                          ...styles.autocompleteContainer,
                          top: 55,
                        },
                        separator: styles.separator,
                    }}

                    fetchDetails
                    query={{
                        key: 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI',
                        language: 'en',
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                />
                <View style={styles.circle} />
                <View style={styles.line} />
                <View style={styles.square} />

            </View>
        </SafeAreaView>
    )
}

export default DestinationSearch