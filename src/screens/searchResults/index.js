import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
//import HomeMap from '../../components/HomeMap'
import UberTypes from '../../components/UberTypes';
import RouteMap from '../../components/RouteMap';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/core';

const SearchResults = (props) => {
    const navigation = useNavigation()
    const route = useRoute()
    const typeState = useState(null)
    const {originPlace, destinationPlace} = route.params

    return( 
        <View style={{display: 'flex'}} >
            <View style={{height: 400}}>
                <RouteMap origin={originPlace} destination={destinationPlace}/>
            </View>
            <UberTypes typeState={typeState}/>
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={[styles.roundButton, {top: 10, left: 10}]}>
                <Entypo name={"menu"} size={24} color="#4a4a4a"/>
            </TouchableOpacity> 
        </View>
    )
};

const styles = StyleSheet.create({
    roundButton: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
    },
})

export default SearchResults;
