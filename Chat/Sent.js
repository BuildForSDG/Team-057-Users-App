import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import styles from './styles';

const Sent = (props) => {
    return (
        <View style={styles.msgHolderS}>
            <View style={{...styles.message, ...styles.messageS, ...(props.break) ? styles.breakS : styles.noBreakS }}>
                <Text style={styles.msgTextS}>{props.message}</Text>
                {/* <Text style={styles.msgTimeS}>{props.createdAt}</Text> */}
            </View>
        </View>
    )
}

export default Sent;