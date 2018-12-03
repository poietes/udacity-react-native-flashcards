import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    const { navigation, deck, id } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{deck.title}</Text>
        <Text style={styles.smallText}>{deck.questions.length} cards</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quiz", { id })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CardAdd", { id })}
          style={[styles.button, styles.buttonDark]}
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5
  },
  smallText: {
    fontSize: 12,
    marginBottom: 30
  },
  button: {
    backgroundColor: "#fd4e03",
    borderRadius: 3,
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    minWidth: 200
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    color: "#fff"
  },
  buttonDark: {
    backgroundColor: "#333"
  }
});

function mapStateToProps(decks, props) {
  const { id } = props.navigation.state.params;

  return {
    id,
    deck: decks[id]
  };
}

export default connect(mapStateToProps)(Deck);
