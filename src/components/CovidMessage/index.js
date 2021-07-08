import React from 'react'
import { View, Text } from 'react-native'

import HomeMap from '../../components/HomeMap'

import styles from './style'

const Covidmessge = (props) => {
    return (
        <View style={styles.constainer}>
            <Text style={styles.title}>Bienvienue sur uber </Text>
            <Text style={styles.text}>Pour commencer une course veullez cliquer sur le boutton en dessous</Text>
            <Text style={styles.learnMore}>allez-y</Text>
        </View>
        
    )
}

export default Covidmessge