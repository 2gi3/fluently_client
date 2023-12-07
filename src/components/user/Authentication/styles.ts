import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";

const { XS, S, M, L, XL } = sizes;
const { secondary, tertiary } = colors
const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: sizes.S,
    },
    cardContainer: {
        maxWidth: 420,
        marginHorizontal: 'auto',
        marginVertical: sizes.L,
    },
    authInputContainer: {
        marginVertical: sizes.M,
    },
    remainingAttempts: {
        margin: 'auto',
    },

    cardDivider: {
        marginBottom: sizes.M,
    },
    text: {
        marginBottom: sizes.S,
    },
    overlay: {
        backgroundColor: secondary,
        padding: sizes.M,
    },
});

export default styles;
