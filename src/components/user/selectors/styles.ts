import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";

const { XS, S, M, L, XL } = sizes;
const { secondary, tertiary, secondaryFont } = colors
const styles = StyleSheet.create({
    selectorTitle: {
        marginBottom: sizes.S,
        paddingHorizontal:
            sizes.XS
    },

});

export default styles;
