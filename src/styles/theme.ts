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
                fontSize: 18,
                fontWeight: "600"
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
                marginBottom: S,
                marginTop: - 6,
                color: secondaryFont,
                fontSize: 18,
                fontWeight: "600"
            }
        },
        CardImage: {
            style: {
                borderRadius: XS,
                marginBottom: S + 6
            }
        },
        Badge: {
            badgeStyle: {
                backgroundColor: secondaryFont,
                paddingHorizontal: XS,
                paddingTop: 2,
                paddingBottom: 3,
                borderRadius: S
            }
        }
    },
});