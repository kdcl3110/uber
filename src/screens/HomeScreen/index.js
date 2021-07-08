import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo";
import HomeMap from '../../components/HomeMap'
import Covidmessge from '../../components/CovidMessage'
import HomeSearch from '../../components/HomeSearch'
import { useNavigation } from '@react-navigation/core';

const HomeScreen = (props) => {
    const navigation = useNavigation()
    return (
        <View>
            <View style={{height: 400}}>
                <HomeMap/>
            </View>
            <Covidmessge/>
            <HomeSearch/>
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={[styles.roundButton, {top: 10, left: 10}]}>
                <Entypo name={"menu"} size={24} color="#4a4a4a"/>
            </TouchableOpacity>           
        </View>
        
    )
}

const styles = StyleSheet.create({
    roundButton: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
    },
})

export default HomeScreen