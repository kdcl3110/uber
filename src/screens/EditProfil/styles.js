import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      margin: 10,
      flex: 1,
      marginBottom: 0
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
   },

   panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
})

export default styles