import { StyleSheet, } from "react-native";
import { sizes } from "../variables/measures";

const { XS, S, M, L, XL, XXXL } = sizes

export const chatStyles = StyleSheet.create({
    message: {
        marginHorizontal: S,
        marginVertical: XS,
        borderRadius: S,
        maxWidth: XXXL,
        padding: S,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        // elevation: 5, 


    },

});
