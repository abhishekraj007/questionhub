import React, { memo, useEffect, useState } from "react";
import { getCategory, Question, SidebarItem } from "../data-contracts";
import { Button, Icon, IndexPath, ListItem, Text } from "@ui-kitten/components";
import { View } from "react-native";
import QuestionDetail from "./QuestionDetail";
import { isItMobile } from "../utils";

interface QuestionItemProps {
  item: Question;
  selectedItem: Question;
  index: number;
  setSlected: (item: Question) => void;
  toggleFavorite: (item: Question, category: SidebarItem) => void;
  selectedMenu: IndexPath;
}

const QuestionItem = ({
  item,
  setSlected,
  index,
  toggleFavorite,
  selectedItem,
  selectedMenu,
}: QuestionItemProps) => {
  const [showDetail, setShowDetail] = useState(
    item?.id === selectedItem?.id || false
  );

  useEffect(() => {
    if (item?.id === selectedItem?.id && !showDetail) {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [item, selectedItem]);

  const onItemClick = () => {
    setSlected(item);
  };

  const StarIcon = (props) => (
    <Icon {...props} name={item?.bookmarked ? "star" : "star-outline"} />
  );

  const favButton = () => {
    return (
      <Button
        size="tiny"
        appearance="ghost"
        onPress={() => toggleFavorite(item, getCategory(selectedMenu))}
        status={item?.bookmarked ? "danger" : "basic"}
        accessoryLeft={StarIcon}
      />
    );
  };

  const Title = () => {
    return (
      <Text
        category="s1"
        style={{
          fontSize: 16,
          paddingLeft: 8,
        }}
      >{`${index + 1}. ${item?.title}`}</Text>
    );
  };

  return (
    <View>
      <ListItem
        title={Title}
        onPress={onItemClick}
        accessoryRight={favButton}
        style={{
          backgroundColor:
            item?.id === selectedItem?.id ? "rgba(51, 102, 255, 0.08)" : null,
        }}
      />

      {showDetail && isItMobile && <QuestionDetail selected={selectedItem} />}
    </View>
  );
};

export default memo(QuestionItem);
