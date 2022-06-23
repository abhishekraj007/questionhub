import { Icon, Spinner } from "@ui-kitten/components";
import { AppTheme } from "../../data-contracts/contracts";

export const iconColor = (theme) => ({
  fill: theme === AppTheme.DARK ? "#ffffff" : "#222b45",
});

export const BookOpen = (props) => <Icon {...props} name="book-open-outline" />;

export const StarIcon = (props) => <Icon {...props} name="star-outline" />;

export const HamBurgerIcon = (props) => (
  <Icon {...props} style={{ width: 28, height: 28 }} name="menu-2-outline" />
);

export const CloseIcon = (props) => <Icon {...props} name="close-outline" />;

export const Ellipsis = (props) => (
  <Icon
    {...props}
    name="more-vertical-outline"
    style={{ width: 24, height: 24 }}
  />
);

export const GoogleIcon = (props) => (
  <Icon {...props} name="google" style={{ width: 16, height: 16 }} />
);

export const NoteIcon = (props) => <Icon {...props} name="plus-outline" />;

export const LoadingIndicator = () => <Spinner size="small" />;
