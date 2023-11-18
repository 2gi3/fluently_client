import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";

const { XS, S, M, L, XL } = sizes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: sizes.S,
    },
    skeletonContainer: {
        marginVertical: sizes.XS,
        marginLeft: sizes.M,
    },
    listItemContainer: {
        marginBottom: M,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: S,
    },
    userInfoContainer: {
        marginTop: S,
    },
    userName: {
        marginTop: S,
    },
    countryText: {},
    descriptionContainer: {
        paddingBottom: S,
    },
    descriptionText: {
        marginTop: 5,
        color: '#505050',
    },
    buttonStylePrimary: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: sizes.M,
        marginTop: sizes.M,
        backgroundColor: colors.tertiary
    },
});

export default styles;
