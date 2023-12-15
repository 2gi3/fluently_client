import { createTheme } from "@rneui/themed";
import colors from "./variables/colors";
import { sizes } from "./variables/measures";

const { primary, primaryFont, secondary, secondaryFont, tertiary } = colors
const { XS, S, M, L, XL } = sizes

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
        Card: {
            containerStyle: {
                maxWidth: 400,
                borderRadius: 24,
                padding: S
            }
        },
        CardTitle: {
            style: {
                textAlign: 'left',
                // marginTop: 15,
                marginBottom: 7
            }
        },
        CardImage: {
            style: {
                borderRadius: XS,
                marginBottom: S
            }
        },
        Badge: {
            badgeStyle: {
                backgroundColor: secondaryFont,
                paddingHorizontal: XS
            }
        }
    },
});