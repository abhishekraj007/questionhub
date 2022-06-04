import {
  Menu,
  MenuGroup,
  MenuItem,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { observer } from "mobx-react-lite";
import { IStore } from "../stores";

interface Props {
  store: IStore;
}

export const Sidebar = observer(({ store: { menuStore } }: Props) => {
  const theme = useTheme();

  const StarIcon = (props) => (
    <Icon
      {...props}
      style={{ width: 16, height: 16, tintColor: theme["color-danger-500"] }}
      name="star-outline"
    />
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
        menuStore.setSelectedMenu(index);
      }}
    >
      <MenuGroup title="Javascript">
        <MenuItem title="All" accessoryLeft={BookOpen} />
        <MenuItem title="Favorites" accessoryLeft={StarIcon} />
      </MenuGroup>
      <MenuItem title="React" />
      <MenuItem title="HTML"></MenuItem>
      <MenuItem title="CSS"></MenuItem>
      <MenuItem title="Accessibility"></MenuItem>
    </Menu>
  );
});
