import {
  Menu,
  MenuGroup,
  MenuItem,
  Icon,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { View, StyleSheet } from "react-native";
import { getCategory } from "../data-contracts";
import { IStore } from "../stores";

interface Props {
  store: IStore;
}

export const Sidebar = observer(
  ({ store: { menuStore, questionStore } }: Props) => {
    const { javascript, react } = questionStore;
    const theme = useTheme();

    const StarIcon = (props) => (
      <Icon {...props} style={{ width: 16, height: 16 }} name="star-outline" />
    );

    const FavCount = (data) => {
      if (data?.length) {
        return (
          <View>
            <Text
              style={{
                backgroundColor: theme["color-primary-transparent-200"],
                marginRight: 40,
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

    const BookOpen = (props) => (
      <Icon
        {...props}
        style={{ width: 16, height: 16 }}
        name="book-open-outline"
      />
    );

    return (
      <Menu
        selectedIndex={menuStore.selectedMenu}
        onSelect={(index) => {
          console.log(index);
          menuStore.setSelectedMenu(index);
          questionStore.clearFilter(getCategory(index));
        }}
      >
        {javascript?.fav?.length ? (
          <MenuGroup title="Javascript">
            <MenuItem
              title="All"
              accessoryLeft={BookOpen}
              accessoryRight={FavCount(javascript.data)}
              style={{
                paddingRight: 40,
              }}
            />
            <MenuItem
              title="Favorites"
              accessoryLeft={StarIcon}
              accessoryRight={FavCount(javascript.fav)}
              style={{
                paddingRight: 40,
              }}
            />
          </MenuGroup>
        ) : (
          <MenuItem
            title="Javascript"
            accessoryRight={FavCount(react.fav)}
            style={{
              paddingRight: 40,
            }}
          />
        )}

        {react?.fav?.length ? (
          <MenuGroup title="React">
            <MenuItem
              title="All"
              accessoryLeft={BookOpen}
              accessoryRight={FavCount(react.data)}
              style={{
                paddingRight: 40,
              }}
            />
            <MenuItem
              title="Favorites"
              accessoryLeft={StarIcon}
              accessoryRight={FavCount(react.fav)}
              style={{
                paddingRight: 40,
              }}
            />
          </MenuGroup>
        ) : (
          <MenuItem
            title="React"
            accessoryRight={FavCount(react.data)}
            style={{
              paddingRight: 40,
            }}
          />
        )}

        <MenuItem title="HTML"></MenuItem>
        <MenuItem title="CSS"></MenuItem>
        <MenuItem title="Accessibility"></MenuItem>
      </Menu>
    );
  }
);

const styles = StyleSheet.create({
  menuItem: {
    paddingRight: 40,
  },
});
