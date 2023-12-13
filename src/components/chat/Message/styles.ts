import { StyleSheet, ViewStyle } from "react-native";
import { sizes } from "../../../styles/variables/measures";
import colors from "../../../styles/variables/colors";


const { XS, S, M, L, XL } = sizes
const { secondary, secondaryFont, tertiary } = colors






export const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    messageText: {
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#8e8e8f',
    },
    myMessage: {
        alignSelf: 'flex-end',
    },
    otherMessage: {
        alignSelf: 'flex-start',
    },
    icon: {
        position: 'absolute',
        bottom: -3,
        right: -14,
    }
});
