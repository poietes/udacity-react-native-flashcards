import { AsyncStorage } from "react-native";

export const DECK_STORAGE_KEY = "poietes::flashcards";

function setDefaultDeck() {
  const defaultDeck = {
    internet: {
      title: "Internet",
      questions: [
        {
          question: "URL",
          answer:
            "web address, usually beginning with http:// and means 'uniform resource locator'blog"
        },
        {
          question: "bookmark",
          answer: "a shortcut to a web address, sometimes called a 'favorite'"
        },
        {
          question: "browser",
          answer:
            "software that allows a user to access and view the World Wide Web"
        },
        {
          question: "HTML",
          answer:
            "Hyper Text Markup Language, the programming language of a web page"
        },
        {
          question: "HTTP",
          answer: "Hypertext Transfer Protocol - the language of URLS"
        },
        {
          question: "hyperlink",
          answer: "highlighted words that take you to another page."
        }
      ]
    },
    americahistory: {
      title: "America History",
      questions: [
        {
          question: "Stamp Act",
          answer:
            "Law passed by Parliament in 1765 to raise revenue in America by requiring taxed, stamped paper for legal documents, publications and playing cards"
        },
        {
          question: "Thomas Jefferson",
          answer:
            "Plantation owner and lawyer from Virginia, Nominated George Washington to be Chief at the second continental congress, Co-wrote the Deceleration of the Causes and Necessities."
        },
        {
          question: "Ben Franklin",
          answer:
            "Statesmen and advisor throughout the Revolutionary era. He was active in all the pre-Revolutionary congresses and helped to secure the French alliance of 1778 and the Treaty of Paris, which formally ended the Revolution in 1783, Invented bifocals, odometer, and elecrtricity experiments.Published Poor Richard's Almanac."
        }
      ]
    }
  };
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(defaultDeck));

  return defaultDeck;
}

export function setDecks(results) {
  return results === null ? setDefaultDeck() : JSON.parse(results);
}
