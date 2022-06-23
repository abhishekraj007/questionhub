import React, { useContext, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Button, Card, Icon, Input, Text } from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../App";
import { isItMobile } from "../../utils";
import { CloseIcon, LoadingIndicator } from "../Icons/Icons";
import { v4 as uuid } from "uuid";
import { apiUpdateUser } from "../../apis";
import { Question } from "../../data-contracts/contracts";

const CreateNoteModal = observer(() => {
  const {
    notesStore,
    authStore: { user },
    questionStore,
  } = useContext(StoreContext);

  const { showNoteModal, setShowNoteModal } = notesStore;
  const { setNotes, notes } = questionStore;
  const { width } = useWindowDimensions();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isMakingCall, setIsMakingCall] = useState(false);

  const onAddNote = async () => {
    const item: Question = {
      bookmarked: false,
      title,
      content: [description],
      id: uuid(),
      type: "NOTES",
    };

    const { data = [] } = notes;

    const newNotes = [item, ...data];

    try {
      setIsMakingCall(true);
      await apiUpdateUser(user.id, { notes: newNotes });
      setNotes({
        ...notes,
        data: newNotes,
      });
      setShowNoteModal(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsMakingCall(false);
    }
  };

  const Header = (props) => (
    <View
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 24,
        alignItems: "center",
      }}
    >
      <Text category="h6">Create New Note</Text>
      <Button
        onPress={() => setShowNoteModal(false)}
        size="medium"
        appearance="ghost"
        accessoryLeft={CloseIcon}
      />
    </View>
  );

  if (!showNoteModal) {
    return <View />;
  }

  return (
    <View
      style={{
        minHeight: 220,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: width,
          width: isItMobile ? 320 : 620,
        }}
        disabled={true}
        header={Header}
      >
        <View
          style={{
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <Input
            placeholder="Title"
            value={title}
            onChangeText={(nextValue) => setTitle(nextValue)}
            style={{
              marginBottom: 16,
            }}
          />
          <Input
            multiline={true}
            textStyle={{ minHeight: 120 }}
            placeholder="Description"
            value={description}
            onChangeText={(nextValue) => setDescription(nextValue)}
            style={{
              marginBottom: 16,
            }}
          />
          <Button
            onPress={onAddNote}
            disabled={isMakingCall}
            accessoryLeft={isMakingCall ? LoadingIndicator : null}
          >
            Submit
          </Button>
        </View>
      </Card>
    </View>
  );
});

export default CreateNoteModal;
