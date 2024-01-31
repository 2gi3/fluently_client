import { StyleSheet, ViewStyle } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";


const { XS, S, M, L, XL } = sizes
const { primary, secondary, secondaryFont, tertiary } = colors






export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: sizes.S,
        position: 'relative'
    },
    addButton: {
        backgroundColor: 'transparent',
        padding: 0,
        paddingHorizontal: 0,
    },
    input: {
        flex: 1,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        height: 32,
        alignSelf: 'center',
        marginRight: sizes.S,
        marginLeft: sizes.S,
        paddingHorizontal: sizes.S,
    },
    sendButton: {
        backgroundColor: tertiary,
    },
    microphoneButton: {
        backgroundColor: secondary
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});
