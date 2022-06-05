import React, { memo } from "react";
import { Question } from "../data-contracts";
import { Button, Icon, ListItem } from "@ui-kitten/components";

interface QuestionItemWebProps {
  item: Question;
  selectedItem: Question;
  index: number;
  setSlected: (item: Question) => void;
  onFavPress: (item: Question) => void;
}

const QuestionItemWeb = ({
  item,
  setSlected,
  index,
  onFavPress,
  selectedItem,
}: QuestionItemWebProps) => {
  const onItemClick = () => {
    setSlected(item);
  };

  const toggleFav = () => {
    onFavPress({
      ...item,
      bookmarked: !item.bookmarked,
    });
  };

  const StarIcon = (props) => (
    <Icon {...props} name={item?.bookmarked ? "star" : "star-outline"} />
  );

  const favButton = () => {
    return (
      <Button
        size="tiny"
        appearance="ghost"
        onPress={toggleFav}
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
