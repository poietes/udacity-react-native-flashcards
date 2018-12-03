import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  state = {
    questionId: 1,
    score: 0,
    view: "question"
  };

  onCorrectHandler = () => {
    this.setState(state => {
      return {
        questionId: state.questionId + 1,
        score: state.score + 1,
        view: "question"
      };
    });
  };

  onIncorrectHandler = () => {
    this.setState(state => {
      return { questionId: state.questionId + 1, view: "question" };
    });
  };

  toggleView = () => {
    this.setState(state => {
      return { view: state.view === "question" ? "answer" : "question" };
    });
  };

  clearNotification() {
    clearLocalNotification().then(setLocalNotification);
  }

  restart = () => {
    this.setState(state => {
      return {
        questionId: 1,
        score: 0,
        view: "question"
      };
    });
  };

  navigateToDeck = () => {
    this.props.navigation.navigate("Deck", { id: this.props.id });
  };

  render() {
    const { deck } = this.props;
    const { questionId } = this.state;

    if (questionId > deck.questions.length) {
      this.clearNotification();

      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>You finished your cards!</Text>
          <Text style={styles.score}>
            Your Score: {`${this.state.score}/${deck.questions.length}`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.restart}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonDark]}
            onPress={this.navigateToDeck}
          >
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{deck.title}</Text>
        <Text style={styles.smallText}>
          question {questionId} of {deck.questions.length}
        </Text>
        <View style={styles.card}>
          <View
            style={[
              {
                display: this.state.view === "question" ? "flex" : "none"
              },
              styles.quiz
            ]}
          >
            <Text style={styles.quizText}>
              {deck.questions[questionId - 1].question}
            </Text>
          </View>
          <View
            style={[
              {
                display: this.state.view === "answer" ? "flex" : "none"
              },
              styles.answer
            ]}
          >
            <Text>{deck.questions[questionId - 1].answer}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.toggleView} style={styles.plainButton}>
          <Text style={styles.plainButtonText}>
            {this.state.view === "question" ? `See Answer` : `See Question`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onCorrectHandler} style={styles.button}>
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onIncorrectHandler}
          style={[styles.button, styles.buttonDark]}
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 30,
    alignItems: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  smallText: {
    fontSize: 12
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch"
  },
  quiz: {
    backgroundColor: "#eabda9",
    borderRadius: 3,
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  quizText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  answer: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    padding: 20,
    marginTop: 20,
    marginBottom: 20
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
  },
  plainButton: {
    marginBottom: 20
  },
  plainButtonText: {
    color: "#fd4e03"
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fd4e03",
    marginTop: 20,
    marginBottom: 30
  }
});

function mapStateToProps(decks, props) {
  const { id } = props.navigation.state.params;

  return {
    id,
    deck: decks[id]
  };
}

export default connect(mapStateToProps)(Quiz);
