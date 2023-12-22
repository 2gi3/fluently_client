import { StatusBar, StyleSheet } from "react-native";
import { sizes } from "./variables/measures";
import colors from "./variables/colors";

const { XS, S, M, L, XL } = sizes
const { secondary, secondaryFont } = colors



export const globalStyles = StyleSheet.create({
    wrapper: {
        marginTop: StatusBar.currentHeight || 0,
        marginHorizontal: 'auto',
        flex: 1,
        // maxWidth: 800,
        backgroundColor: secondary
    },
    container: {
        paddingHorizontal: S,
        paddingVertical: M,
        backgroundColor: secondary
    },
    tagsListContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: XS
    },
    elementContainer: {
        padding: S,
        // backgroundColor: secondary
    },
    whideButton: {
        marginLeft: 0,
        marginRight: 0,
        // marginBottom: S,
        marginTop: 0,
        maxWidth: 400
    },
    elementTitle: {
        color: secondaryFont,
        fontSize: 18,
        fontWeight: "600"
    }
});
