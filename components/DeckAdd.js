import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { asAddDeck } from "../utils/api";
import { addDeck } from "../actions";
import { connect } from "react-redux";
import { renderDeck } from "../utils/helpers";

class DeckAdd extends Component {
  state = {
    text: ""
  };

  submitDeck = () => {
    const deck = renderDeck(this.state.text);

    this.props.dispatch(addDeck(deck));

    asAddDeck(deck);

    this.setState({ text: "" });

    this.navigateToDeck(Object.keys(deck)[0]);
  };

  navigateToDeck = id => {
    this.props.navigation.navigate("Deck", { id });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>What's the title of your deck?</Text>
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          style={styles.input}
          maxLength={20}
        />
        <TouchableOpacity onPress={this.submitDeck} style={styles.button}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    borderColor: "#444",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 16,
    padding: 10
  },
  button: {
    backgroundColor: "#fd4e03",
    borderRadius: 3,
    padding: 12,
    marginTop: 20
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#fff"
  }
});

export default connect()(DeckAdd);
