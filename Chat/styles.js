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
        padding: 16,
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 24,
    },
    messageS: {
        backgroundColor: "#0075FF",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    messageR: {
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
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
    // },
    // noBreakR: {
    //     marginBottom: 0,
    //     borderRadius: 15,
    // },
    msgTextS: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "100",
    },
    msgTextR: {
        color: "#4F4F4F",
        fontSize: 18,
        fontWeight: "100",
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