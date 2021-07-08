import React from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import styles from '../Register/styles';

const Forgot = (props) => (
      <View>
         <View>
            <Text>Reinitialisation</Text>
            <Text>Veulller entre votre adresse email pour demander une reinitialisation de mot de passe</Text>
         </View>
        
         <TextInput
            style={styles.input}
         />
         
         <Pressable style={styles.button}>
            <Text>reinitialiser</Text>
         </Pressable>

         <View>
            <Text style={styles.text}>revenir à connexion</Text>
         </View>
      </View>
);

export default Forgot;
