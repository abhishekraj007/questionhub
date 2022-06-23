import {
  Menu,
  MenuGroup,
  MenuItem,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { View } from "react-native";
import { StoreContext } from "../../App";
import { getCategory } from "../data-contracts/contracts";
import { BookOpen, StarIcon } from "./Icons/Icons";

export const Sidebar = observer(() => {
  const store = useContext(StoreContext);
  const { questionStore, menuStore } = store;
  const { selectedMenu, setSelectedMenu } = menuStore;

  const { javascript, react, notes, userFavs } = questionStore;
  const theme = useTheme();

  return (
    <Menu
      selectedIndex={selectedMenu}
      onSelect={(index) => {
        setSelectedMenu(index);
        questionStore.clearFilter(getCategory(index));
      }}
    >
      {javascript?.favs?.length ? (
        <MenuGroup title="Javascript">
          <MenuItem
            title="All"
            accessoryLeft={BookOpen}
            accessoryRight={FavCount(theme, javascript.data)}
            style={{
              paddingRight: 24,
            }}
          />
          <MenuItem
            title="Favorites"
            accessoryLeft={StarIcon}
            accessoryRight={FavCount(theme, javascript.favs)}
            style={{
              paddingRight: 24,
            }}
          />
        </MenuGroup>
      ) : (
        <MenuItem
          title="Javascript"
          accessoryRight={FavCount(theme, javascript.data)}
          style={{
            paddingRight: 24,
          }}
        />
      )}

      {react?.favs?.length ? (
        <MenuGroup title="React">
          <MenuItem
            title="All"
            accessoryLeft={BookOpen}
            accessoryRight={FavCount(theme, react.data)}
            style={{
              paddingRight: 24,
            }}
          />
          <MenuItem
            title="Favorites"
            accessoryLeft={StarIcon}
            accessoryRight={FavCount(theme, react.favs)}
            style={{
              paddingRight: 24,
            }}
          />
        </MenuGroup>
      ) : (
        <MenuItem
          title="React"
          accessoryRight={FavCount(theme, react.data)}
          style={{
            paddingRight: 24,
          }}
        />
      )}

      {notes?.favs?.length ? (
        <MenuGroup title="My Notes">
          <MenuItem
            title="All"
            accessoryLeft={BookOpen}
            accessoryRight={FavCount(theme, notes.data)}
            style={{
              paddingRight: 24,
            }}
          />
          <MenuItem
            title="Favorites"
            accessoryLeft={StarIcon}
            accessoryRight={FavCount(theme, notes.favs)}
            style={{
              paddingRight: 24,
            }}
          />
        </MenuGroup>
      ) : (
        <MenuItem
          title="My Notes"
          accessoryRight={FavCount(theme, notes.data)}
          style={{
            paddingRight: 24,
          }}
        />
      )}

      <MenuItem
        title="All Favorites"
        accessoryRight={FavCount(theme, userFavs)}
        style={{
          paddingRight: 24,
        }}
      ></MenuItem>
    </Menu>
  );
});

const FavCount = (theme, data) => {
  if (data?.length) {
    return (
      <View>
        <Text
          style={{
            backgroundColor: theme["color-primary-transparent-200"],
            width: 40,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            fontSize: 10,
          }}
          category="label"
          appearance="hint"
          status="primary"
        >
          {data?.length}
        </Text>
      </View>
    );
  }

  return null;
};
