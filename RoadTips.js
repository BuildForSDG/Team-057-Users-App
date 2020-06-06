import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions
} from "react-native";

import tips from "./tips";

const { width, height } = Dimensions.get("screen");

const rand = Math.round(Math.random() * tips.length) - 1;

class RoadTips extends Component {
  constructor (props) {
    super(props);
  }

  state = {
    // modalVisible: this.props.visible,
    tipI: rand,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    // const { modalVisible } = this.state;
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.onClose}
        >
          <View style={[styles.centeredView, styles.modalBg]}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalHText}>{tips[this.state.tipI].title}</Text>
              </View>
              <View>
                <Text style={styles.modalText}>{tips[this.state.tipI].content}</Text>
              </View>
              <View style={{ flex: 0, flexDirection: "row" }}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "red" }}
                  onPress={this.props.onClose}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setState({ tipI: Math.round(Math.random() * tips.length) - 1 });
                  }}
                >
                  <Text style={styles.textStyle}>Next Tip</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalBg: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    // margin: 20,
    width: width - 80,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    width: 120,
    margin: 10,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: "#888888",
  }
});

export default RoadTips;
