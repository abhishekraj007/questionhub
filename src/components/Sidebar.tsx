import {
  Drawer,
  DrawerGroup,
  DrawerItem,
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

  console.log(menuStore);

  // const [selectedMenu, setSelectedMenu] = useMenuContext();

  const starIcon = (props) => (
    <Icon
      {...props}
      style={{ width: 12, height: 12, tintColor: theme["color-danger-500"] }}
      name="star"
    />
  );

  return (
    <Drawer
      selectedIndex={menuStore.selectedMenu}
      onSelect={(index) => {
        console.log(index);
        menuStore.setSelectedMenu(index);
      }}
    >
      <DrawerGroup title="Javascript">
        <DrawerItem title="Favorites" accessoryLeft={starIcon} />
      </DrawerGroup>
      <DrawerItem title="React" />
      <DrawerItem title="HTML"></DrawerItem>
      <DrawerItem title="CSS"></DrawerItem>
      <DrawerItem title="Accessibility"></DrawerItem>
    </Drawer>
  );
});

// export const Sidebar = Observer()
