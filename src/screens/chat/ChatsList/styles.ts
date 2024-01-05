import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";

const { XS, S, M, L, XL } = sizes;

export const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'flex-start',
        // backgroundColor: 'yellow',
        width: sizes.XXL,
        marginLeft: 'auto',
        marginRight: sizes.M,
        // marginTop: - sizes.XS
    },
    triangle: {
        width: 0,
        height: 0,
        marginLeft: 'auto',
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: sizes.S,
        borderRightWidth: sizes.S,
        borderStyle: 'solid',
        borderRightColor: colors.tertiary,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: colors.tertiary,
        // backgroundColor: 'green',
        // transform: [{ rotate: '45deg' }]
    },
    contentContainer: {
        backgroundColor: colors.secondary,
        borderColor: colors.tertiary,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: sizes.S,
        borderRadius: sizes.XS,
        borderTopRightRadius: 0

    }
})