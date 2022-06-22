import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Loader from "./Loader";
import { Input } from "@ui-kitten/components";
import QuestionDetail from "./QuestionDetail";
import { getCategory, Question, SidebarItem } from "../data-contracts";
import { observer } from "mobx-react-lite";
import QuestionList from "./QuestionList";
import { isItMobile } from "../utils";
import { StoreContext } from "../../App";

let searchTimer;

export const QuestionContainer = observer(() => {
  const store = useContext(StoreContext);

  const {
    menuStore: { selectedMenu },
    authStore: { user, setShowLoginModal },
    questionStore: {
      isLoading,
      getQuestions,
      toggleFavorite,
      searchQuestion,
      filteredList,
      setFilteredList,
      react,
      javascript,
    },
  } = store;

  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const { height: screenHeight, width } = useWindowDimensions();

  const [value, setValue] = useState("");

  // On Load
  useEffect(() => {
    (async () => {
      getQuestions(SidebarItem.JAVASCRIPT, user?.id);
    })();
  }, [user?.id]);

  const onFavToggle = (item: Question, category: SidebarItem) => {
    // Allow fav only if user is loggedIn
    if (user) {
      toggleFavorite(item, category, user?.id);
      // Otherwise show login modal
    } else {
      setShowLoginModal(true);
    }
  };

  // On Menu change
  useEffect(() => {
    // set list data based on menu selection
    const selectedCategory = getCategory(selectedMenu);
    console.log("selectedCategory => ", selectedCategory);
    if (selectedCategory === SidebarItem.JAVASCRIPT) {
      setFilteredList(javascript.data);
    } else if (selectedCategory === SidebarItem.JAVASCRIPT_FAVORITE) {
      setFilteredList(javascript.favs);
    } else if (selectedCategory === SidebarItem.REACT) {
      if (react.data.length) {
        setFilteredList(react.data);
      } else {
        getQuestions(SidebarItem.REACT);
      }
    } else if (selectedCategory === SidebarItem.REACT_FAVORITE) {
      setFilteredList(react.favs);
    }
  }, [selectedMenu]);

  const onSearch = (value: string) => {
    setValue(value);

    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuestion(value, getCategory(selectedMenu));
    }, 500);
  };

  const renderList = () => {
    return (
      <>
        {isLoading && <Loader />}
        <View style={styles.panel}>
          <View
            style={[
              styles.panelLeft,
              {
                height: `${screenHeight - 90}px`,
              },
            ]}
          >
            <Input
              placeholder="Search"
              size="small"
              value={value}
              onChangeText={onSearch}
            />

            <QuestionList
              listData={filteredList}
              toggleFavorite={onFavToggle}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              selectedMenu={selectedMenu}
            />
          </View>
          {!isItMobile && (
            <View
              style={[
                styles.panelRight,
                {
                  height: `${screenHeight - 90}px`,
                },
              ]}
            >
              <QuestionDetail selected={selectedQuestion} />
            </View>
          )}
        </View>
      </>
    );
  };

  return renderList();
});

const styles = StyleSheet.create({
  panel: {
    display: "flex",
    flexDirection: "row",
  },
  panelLeft: {
    width: `${isItMobile ? "100%" : "40%"}`,
    overflow: "scroll",
  },
  panelRight: {
    width: `60%`,
    overflow: "scroll",
    padding: 16,
    paddingRight: 32,
  },
});
