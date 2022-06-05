import React, { memo } from "react";
import { getCategory, Question, SidebarItem } from "../data-contracts";
import { Button, Icon, IndexPath, ListItem } from "@ui-kitten/components";

interface QuestionItemWebProps {
  item: Question;
  selectedItem: Question;
  index: number;
  setSlected: (item: Question) => void;
  toggleFavorite: (item: Question, category: SidebarItem) => void;
  selectedMenu: IndexPath;
}

const QuestionItemWeb = ({
  item,
  setSlected,
  index,
  toggleFavorite,
  selectedItem,
  selectedMenu,
}: QuestionItemWebProps) => {
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

  return (
    <ListItem
      title={`${index + 1}. ${item?.title}`}
      onPress={onItemClick}
      accessoryRight={favButton}
      style={{
        backgroundColor:
          item?.id === selectedItem?.id ? "rgba(51, 102, 255, 0.08)" : null,
      }}
    />
  );
};

export default memo(QuestionItemWeb);
