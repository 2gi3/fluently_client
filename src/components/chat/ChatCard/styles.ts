import { StyleSheet, ViewStyle } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";


const { XS, S, M, L, XL } = sizes
const { secondary, secondaryFont } = colors




interface ChatCardStyles {
    container: ViewStyle;
    listItemContainer: (backgroundColor: string) => ViewStyle;
    avatarContainer: ViewStyle;
    badgeContainer: ViewStyle;
    listItemContent: ViewStyle;
    subtitle: ViewStyle;
    listItemContentSubtitle: ViewStyle;
}

export const styles = StyleSheet.create<any>({
    container: {
        maxWidth: 440,
        maxHeight: 108,
        minWidth: 260,
    },
    listItemContainer: (backgroundColor) => ({
        backgroundColor,
        // elevation: 5
    }),
    avatarContainer: {
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        right: 0,
    },
    listItemContent: {
        height: '100%',
        gap: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '8e8e8f',
    },
    listItemContentSubtitle: {
        maxWidth: 74,
        marginTop: 7,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        gap: 17,
    },
});
