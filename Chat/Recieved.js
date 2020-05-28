import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

const Recieved = (props) => {
    return (
        <View style={styles.msgHolderR}>
            <View style={{...styles.message, ...styles.messageR, ...(props.break) ? styles.breakR : styles.noBreakR }}>
                <Text style={styles.msgTextR}>{props.message}</Text>
                {/* <Text style={styles.msgTimeR}>{props.createdAt}</Text> */}
            </View>
        </View>
    )
}

export default Recieved;