import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";


const { XS, S, M, L, XL } = sizes
const { secondary, secondaryFont, tertiary } = colors



export const styles = StyleSheet.create({
    overlay: {
        backgroundColor: colors.secondary,
        padding: sizes.M,
    },
    warningText: {
        marginBottom: sizes.M,
    },
    inputContainer: {
        marginBottom: sizes.M,
    },
    input: {
        paddingHorizontal: sizes.XS,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});