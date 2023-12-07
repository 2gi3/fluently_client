import { createTheme } from "@rneui/themed";
import colors from "./variables/colors";
import { sizes } from "./variables/measures";

const { primaryFont, secondary, secondaryFont, tertiary } = colors
const { XS } = sizes

export const theme = createTheme({
    lightColors: {
        primary: colors.tertiary,
        warning: colors.danger
    },
    // darkColors: {
    //   primary: '#000',
    // },
    // mode: 'light',
    components: {
        ListItem: {
            containerStyle: {
                backgroundColor: secondary
            }
        },
        ListItemTitle: {
            style: {
                color: secondaryFont,
                fontSize: 18
            }
        },
        Button: {
            buttonStyle: {
                borderColor: tertiary,
                borderRadius: XS
            },
            titleStyle: {
                color: primaryFont
            },
        },
    },
});