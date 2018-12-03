import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import { connect } from "react-redux";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then(results => dispatch(receiveDecks(results)));
  }

  render() {
    const { decks, navigation } = this.props;

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(key => {
          const { title, questions } = decks[key];
          return (
            <TouchableOpacity
              key={key}
              onPress={() => navigation.navigate("Deck", { id: key })}
              style={styles.item}
            >
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.smallText}>{questions.length} cards</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#eabda9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 1,
    paddingTop: 30,
    paddingBottom: 30
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  smallText: {
    fontSize: 12
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
