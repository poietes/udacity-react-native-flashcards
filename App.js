import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import CardAdd from "./components/CardAdd";
import Deck from "./components/Deck";
import DeckAdd from "./components/DeckAdd";
import DeckList from "./components/DeckList";
import Quiz from "./components/Quiz";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Constants } from "expo";
import { setLocalNotification } from "./utils/helpers";
import { Ionicons } from "@expo/vector-icons";

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list-box" size={28} color={tintColor} />
        )
      }
    },
    DeckAdd: {
      screen: DeckAdd,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle-outline" size={28} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: "#fd4e03",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: 14
      },
      style: {
        backgroundColor: "#222"
      }
    },
    animationEnabled: true,
    swipeEnabled: false
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerBackTitle: "Home",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerBackTitle: "Deck",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerBackTitle: "Quiz",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#000",
              height: Constants.statusBarHeight
            }}
          >
            <StatusBar barStyle="light-content" backgroundColor="#000" />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
