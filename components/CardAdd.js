import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { renderCard } from "../utils/helpers";
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions";
import { connect } from "react-redux";

class CardAdd extends Component {
  state = {
    question: "",
    answer: ""
  };

  submitCard = () => {
    const { id } = this.props.navigation.state.params;

    const card = renderCard(this.state.question, this.state.answer);

    this.props.dispatch(addCard(id, card));

    addCardToDeck(id, card);

    this.setState({ question: "", answer: "" });

    this.navigateToDeck(id);
  };

  navigateToDeck = id => {
    this.props.navigation.navigate("Deck", { id });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.deck.title}</Text>
        <Text style={styles.inputLabel}>Enter your question of the card</Text>
        <TextInput
          style={styles.input}
          onChangeText={question => this.setState({ question })}
        />
        <Text style={[styles.inputLabel, { marginTop: 15 }]}>
          Enter your answer of the card
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
        />
        <TouchableOpacity onPress={this.submitCard} style={styles.button}>
          <Text style={styles.buttonText}>Add Card</Text>
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
    marginBottom: 15
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 5
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
    color: "#fff",
    alignSelf: "center"
  }
});

function mapStateToProps(decks, props) {
  const { id } = props.navigation.state.params;

  return {
    id,
    deck: decks[id]
  };
}

export default connect(mapStateToProps)(CardAdd);
