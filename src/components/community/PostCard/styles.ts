import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";


const { XS, S, M, L, XL, XXL, XXXL } = sizes
const { secondary, secondaryFont, tertiary, primary, danger } = colors



export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        maxWidth: 900,
        margin: 'auto'

    },
    comments: {
        backgroundColor: primary,
        borderRadius: S,
        width: 'auto',
        marginBottom: S,
        marginRight: -S,
        paddingBottom: XS,
        alignItems: 'stretch',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    commemt: {
        backgroundColor: secondary,
        margin: XS,
        marginBottom: 0,
        padding: XS,
        borderRadius: XS,
        fontSize: 12
    },
    sendButton: {
        backgroundColor: tertiary,
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    buttonContainer: {
        margin: XS,
        marginBottom: 0
    },
});
