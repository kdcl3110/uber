import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo";
import HomeMap from '../../components/HomeMap'
import Covidmessge from '../../components/CovidMessage'
import HomeSearch from '../../components/HomeSearch'
import { useNavigation } from '@react-navigation/core';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';

navigator.geolocation = require('@react-native-community/geolocation');

const Notification = ({course, index, currentUser}) =>{
    const confirmCourse = async(index) =>{
        let tab = course
        tab.driver = JSON.parse(await AsyncStorage.getItem('user'))
        tab.engage = true

        console.log(currentUser)
        

        firestore().doc(`courses/${tab.id}`).set(tab).then(e =>{
            firestore().doc(`drivers/${currentUser.uid}`).update({
                biginCourse: true
            }).then(()=>{
                try{
                    AsyncStorage.setItem("maCourse", JSON.stringify({
                        origin: tab.origin,
                        destination: tab.destination
                    }))
                }catch(e){
                    console.log(e)
                }
            })
        })
    }

    if(!course.engage &&  !currentUser?.biginCourse){
        return(
            <View style={styles.irtemSyle}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    marginBottom: 10,
                    fontWeight: 'bold'
                }}>Nouvelle course</Text>
                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                    }}>
                        <Avatar
                            source={{
                                uri: "https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png"
                            }}
                        />
                        <Text style={{
                            color: '#fff', 
                            fontWeight: 'bold',
                            marginLeft: 15
                            }}>{course?.user?.displayName}</Text>
    
                    </View>
                    <View>
                        <Text style={{color: '#fff'}}>Durée: {Math.ceil(course?.duration)} min</Text>
                        <Text style={{color: '#fff'}}>Distance: {course?.distance} km</Text>
                        <Text style={{color: '#fff'}}>Prix: {course?.amount}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>confirmCourse(index)} >
                    <Text style={{color: '#018786'}}>Accepter la course</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View></View>
    )
}

const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [courses, setCourses] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [maCourse, setMaCourse] = useState()
    const [currentPosition, setCurrentPosition] = useState()

    const GOOGLE_MAPS_APIKEY = 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI';

    const getCourse = async () =>{
        let tab = []
        firestore()
            .collection('courses')
            .onSnapshot(res =>{
                //setCourses([])
                tab = res.docs.map(
                    e => e.data()
                )
                setCourses(tab)
                console.log(courses)
            })
    }

    const findUser = async() =>{
        const user = JSON.parse(await AsyncStorage.getItem('user'))
         
        firestore().doc(`drivers/${user.uid}`).onSnapshot(
            res =>{
                setCurrentUser(res.data())
                console.log(currentUser)
            }
        )
    }


    const getMaCourse = async () =>{
        let val = JSON.parse(await AsyncStorage.getItem('maCourse'))
        setMaCourse(val)
        console.log(maCourse)
    }

    useEffect(()=>{
        getCourse()
        findUser()
        getMaCourse()
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                setCurrentPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                console.log(currentPosition)
            }
        )
    },[])

    const stop = async() => {
        AsyncStorage.removeItem("maCourse")
    }

    if(maCourse){
        return (
            <View>
                <MapView
                    style={{width:'100%', height:'100%'}}
                    provider= {PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapViewDirections
                        origin={currentPosition}
                        destination={maCourse.origin}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="black"
                    />
                    <Marker
                        coordinate={currentPosition}
                        title={'ma position'}
                    />
                    <Marker
                        coordinate={maCourse.origin}
                        title={'position client'}
                    />
                </MapView>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={[styles.roundButton, {top: 10, left: 10}]}>
                    <Entypo name={"menu"} size={24} color="#4a4a4a"/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={stop}
                    style={styles.goButton}>
                    <Text style={styles.goText}>
                        {'STOP'}
                    </Text>
                </TouchableOpacity> 
            </View>
        )
    }

    return (
        <View>
            <View style={{height: '100%'}}>
                <HomeMap/>
            </View>
            {/* <Covidmessge/> */}
            {/* <HomeSearch/> */}
            <ScrollView 
                style={styles.message}
                >
                {courses?.map((e, i) => (<Notification course={e} key={i} index={i} currentUser={currentUser}/>))}
            </ScrollView>
            
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={[styles.roundButton, {top: 10, left: 10}]}>
                <Entypo name={"menu"} size={24} color="#4a4a4a"/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={getMaCourse}
                style={styles.goButton}>
                <Text style={styles.goText}>
                    {'GO'}
                </Text>
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
    goButton: {
        position: 'absolute',
        backgroundColor: '#018786',
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        bottom: 15,
        left: Dimensions.get('window').width / 2 - 37,
    },
    goText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
      
    },

    message: {
        position: 'absolute',
        top: 50,
        width: '90%',
        margin: 15,
        padding: 5,
        height: 500
    },
    irtemSyle: {
        backgroundColor: '#018786',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 10
    },

    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        borderRadius: 5
     },
})

export default HomeScreen