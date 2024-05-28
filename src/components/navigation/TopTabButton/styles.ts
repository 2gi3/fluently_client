import { StyleSheet } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";


const { XS, S, M, L, XL } = sizes
const { secondary, secondaryFont, tertiary } = colors



export const styles = StyleSheet.create({
    container: {
        marginRight: S,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: tertiary
    },
    label: {
        // marginRight: XS
    },
    activityIndicator: {
        marginRight: 12
    }
});
