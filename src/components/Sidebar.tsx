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
    const { javascript, react } = questionStore;
    const theme = useTheme();

    const StarIcon = (props) => (
      <Icon {...props} style={{ width: 16, height: 16 }} name="star-outline" />
    );

    const FavCount = (data) => (
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
          {data?.length}
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
        {javascript?.fav?.length ? (
          <MenuGroup title="Javascript">
            <MenuItem title="All" accessoryLeft={BookOpen} />
            <MenuItem
              title="Favorites"
              accessoryLeft={StarIcon}
              accessoryRight={FavCount(javascript.fav)}
            />
          </MenuGroup>
        ) : (
          <MenuItem title="Javascript" />
        )}

        {react?.fav?.length ? (
          <MenuGroup title="React">
            <MenuItem title="All" accessoryLeft={BookOpen} />
            <MenuItem
              title="Favorites"
              accessoryLeft={StarIcon}
              accessoryRight={FavCount(react.fav)}
            />
          </MenuGroup>
        ) : (
          <MenuItem title="React" />
        )}

        <MenuItem title="HTML"></MenuItem>
        <MenuItem title="CSS"></MenuItem>
        <MenuItem title="Accessibility"></MenuItem>
      </Menu>
    );
  }
);
