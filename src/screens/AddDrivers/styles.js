import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      margin: 10,
      flex: 1
   },

   input:{
      padding: 15,
      borderWidth: 1,
      borderColor: '#c0c0c0',
      borderRadius: 5
   },

   group: {
      paddingTop: 10,
      paddingBottom: 10
   },

   button: {
      marginTop: 10,
      padding: 15,
      backgroundColor: '#018786',
      marginLeft: 5,
      marginRight: 5,
      alignItems: 'center',
      borderRadius: 5
   },

   foot: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 15
   },

   text:{
      color: '#018786'
   }
})

export default styles