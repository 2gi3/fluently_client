import { StyleSheet, } from "react-native";
import { sizes } from "../variables/measures";

const { XS, S, M, L, XL } = sizes

export const chatStyles = StyleSheet.create({
    message: {
        marginHorizontal: S,
        marginVertical: XS,
        borderRadius: S,
        maxWidth: "80%",
        padding: S,

    },

});
