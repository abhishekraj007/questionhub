import React from "react";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";
import { SidebarItem } from "../data-contracts";

interface Props {
  selectedMenu: IndexPath;
  setSelectedMenu: (selectedMenu: IndexPath) => void;
}

export const Sidebar = ({ selectedMenu, setSelectedMenu }: Props) => {
  return (
    <Drawer
      selectedIndex={new IndexPath(selectedMenu.row)}
      onSelect={(index) => setSelectedMenu(index)}
    >
      <DrawerItem title="Javascript" />
      <DrawerItem title="React" />
    </Drawer>
  );
};
