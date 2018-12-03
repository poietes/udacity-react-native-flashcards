import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, setDecks } from "./data";

export function getDecks() {
  // AsyncStorage.clear();
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(setDecks);
}

export function getDeck(key) {
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results[key];
  });
}

export function asAddDeck(deck) {
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}

export function addCardToDeck(id, card) {
  AsyncStorage.getItem(DECK_STORAGE_KEY, (err, results) => {
    const parsedResult = JSON.parse(results);
    let data = {
      ...parsedResult,
      [id]: {
        ...parsedResult[id],
        questions: [...parsedResult[id].questions, card]
      }
    };
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}
