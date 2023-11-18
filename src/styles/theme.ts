import { createTheme } from "@rneui/themed";
import colors from "./variables/colors";
import { sizes } from "./variables/measures";

const { secondary, tertiary } = colors
const { XS } = sizes

export const theme = createTheme({
    // lightColors: {
    //   primary: colors.tertiary,
    //   warning: colors.danger
    // },
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
        Button: {
            buttonStyle: {
                borderColor: tertiary,
                borderRadius: XS
            }
        },
    },
});