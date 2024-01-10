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
    content: {
        alignItems: 'flex-start',
        padding: S,
        backgroundColor: secondary,
        borderRadius: S,
        margin: S,
        width: 276,
        // maxWidth: XXXL
    },
    avatarContainer: {
        backgroundColor: primary,
        borderColor: 'green',
        borderStyle: 'solid',
        // borderWidth: 1,
    },
    buttonContainer: {
        marginTop: 25,
    },
    dialogOverlay: {
        backgroundColor: secondary,
        width: 'auto',
    },
    dialogInput: {
        padding: XS,
    },
    descriptionSubtitle: {
        marginTop: 5,
    },
    personalDetailsSubtitle: {
        marginTop: 5,
        color: '#666666',
    },
    deleteButton: {
        borderColor: danger,
        marginVertical: M,
        margin: 'auto',
        backgroundColor: secondary,
    },
    overlayContainer: {
        backgroundColor: secondary,
        padding: M,
    },
    overlayText: {
        marginBottom: M,
    },
    overlayInput: {
        paddingHorizontal: XS,
        marginBottom: M,
    },
    overlayButtonContainer: {
        display: 'flex',
        gap: M,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    closeButton: {
        width: 'auto',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteAccountButton: {
        backgroundColor: danger,
    },
});
