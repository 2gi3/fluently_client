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

export const styles = StyleSheet.create({
    container: {
        maxWidth: 440,
        maxHeight: 108,
        minWidth: 260,
    },
    avatarContainer: {
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        right: 0,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    subtitleContainer: {
        height: '100%',
        gap: 8,
    },
    metadataContainer: {
        maxWidth: 74,
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        gap: 8,
    },
    divider: {
        marginLeft: 108,
    },
});
