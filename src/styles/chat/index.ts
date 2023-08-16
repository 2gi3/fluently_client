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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // This is for Android shadow


    },

});
