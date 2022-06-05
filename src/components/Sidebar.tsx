import {
  Menu,
  MenuGroup,
  MenuItem,
  Icon,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { getCategory } from "../data-contracts";
import { IStore } from "../stores";

interface Props {
  store: IStore;
}

export const Sidebar = observer(
  ({ store: { menuStore, questionStore } }: Props) => {
    const { javasctiptFavorites } = questionStore;
    const theme = useTheme();

    const StarIcon = (props) => (
      <Icon {...props} style={{ width: 16, height: 16 }} name="star-outline" />
    );

    const FavCount = () => (
      <View
        style={{
          backgroundColor: theme["border-basic-color-4"],
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <Text category="label" appearance="hint" status="primary">
          {javasctiptFavorites.length}
        </Text>
      </View>
    );

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
        {javasctiptFavorites?.length ? (
          <MenuGroup title="Javascript">
            <MenuItem title="All" accessoryLeft={BookOpen} />
            <MenuItem
              title="Favorites"
              accessoryLeft={StarIcon}
              accessoryRight={FavCount}
            />
          </MenuGroup>
        ) : (
          <MenuItem title="Javascript" />
        )}

        <MenuItem title="React" />
        <MenuItem title="HTML"></MenuItem>
        <MenuItem title="CSS"></MenuItem>
        <MenuItem title="Accessibility"></MenuItem>
      </Menu>
    );
  }
);
