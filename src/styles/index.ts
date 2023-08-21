import { StatusBar, StyleSheet } from "react-native";
import { sizes } from "./variables/measures";

const { XS, S, M, L, XL } = sizes

export const styles = StyleSheet.create({
    wrapper: {
        marginTop: StatusBar.currentHeight || 0,
        marginHorizontal: 'auto',
        flex: 1,
        maxWidth: 800,
        backgroundColor: '#f1f1f1'
    },
    container: {
        padding: M
    }
});


