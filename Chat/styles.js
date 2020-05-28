import { StyleSheet } from 'react-native';
import values from './common';

const styles = StyleSheet.create({
    msgHolderS: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    msgHolderR: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    message: {
        width: "auto",
        padding: 10,
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    messageS: {
        backgroundColor: "#5579f1",
    },
    messageR: {
        backgroundColor: "#f3f6ff",
    },
    // breakS: {
    //     marginBottom: 5,
    //     borderBottomLeftRadius: 15,
    //     borderBottomRightRadius: 0,
    //     borderTopLeftRadius: 15,
    //     borderTopRightRadius: 15,
    // },
    // noBreakS: {
    //     marginBottom: 0,
    //     borderRadius: 15,
    // },
    // breakR: {
    //     marginBottom: 5,
    //     borderBottomLeftRadius: 0,
    //     borderBottomRightRadius: 15,
    //     borderTopLeftRadius: 15,
    //     borderTopRightRadius: 15,
    // },
    // noBreakR: {
    //     marginBottom: 0,
    //     borderRadius: 15,
    // },
    msgTextS: {
        color: "#ffffff",
        fontSize: 16,
    },
    msgTextR: {
        color: "#536185",
        fontSize: 16,
    },
    msgTimeS: {
        color: "#ffffff",
        fontSize: 8,
        fontWeight: "bold",
    },
    msgTimeR: {
        color: "#536185",
        fontSize: 8,
        fontWeight: "bold",
    },
})

export default styles;