import { StatusBar, StyleSheet } from "react-native";
import { sizes } from "./variables/measures";
import colors from "./variables/colors";

const { XS, S, M, L, XL } = sizes
const { secondary } = colors


export const styles = StyleSheet.create({
    wrapper: {
        marginTop: StatusBar.currentHeight || 0,
        marginHorizontal: 'auto',
        flex: 1,
        maxWidth: 800,
        backgroundColor: secondary
    },
    container: {
        padding: M
    }
});



