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
        padding: 15,
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    messageS: {
        backgroundColor: "#E4F4FF",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 0,
    },
    messageR: {
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 15,
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
        color: "#6A515E",
        fontSize: 20,
        fontWeight: "100",
    },
    msgTextR: {
        color: "#6A515E",
        fontSize: 20,
        fontWeight: "100",
    },
    msgTimeS: {
        color: "#ffffff",
        fontSize: 8,
        fontWeight: "bold",
        lineHeight: 12,
    },
    msgTimeR: {
        color: "#536185",
        fontSize: 8,
        fontWeight: "bold",
        lineHeight: 24,
        letterSpacing: 24,
    },
})

export default styles;