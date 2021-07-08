import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputBox:{
        backgroundColor: '#d9d9d9',
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    inputText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6e6e6e'
    },
    
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 130,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#dbdbdb'
    },

    iconContainer: {
        backgroundColor: '#b3b3b3',
        padding: 10,
        borderRadius: 25
    },

    destinationText: {
        marginLeft: 15,
        fontWeight: '500',
        fontSize: 16,
    }
})

export default styles