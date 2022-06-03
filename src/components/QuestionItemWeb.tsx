import React, { memo } from "react";
import { Question } from "../data-contracts";
import { Button, Icon, ListItem } from "@ui-kitten/components";

interface QuestionItemWebProps {
  item: Question;
  index: number;
  setSlected: (item: Question) => void;
  onFavPress: (item: Question) => void;
}

const QuestionItemWeb = ({
  item,
  setSlected,
  index,
  onFavPress,
}: QuestionItemWebProps) => {
  const onItemClick = () => {
    setSlected(item);
  };

  const toggleFav = () => {
    onFavPress({
      ...item,
      bookmarked: !item.bookmarked,
    });
    console.log(item);
  };

  const StarIcon = (props) => <Icon {...props} name="star" />;

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
    />
  );
};

export default memo(QuestionItemWeb);
