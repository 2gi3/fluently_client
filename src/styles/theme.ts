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
        Text: {
            style: {
                lineHeight: 15
            },
            h1Style: {
                color: primaryFont,
                fontSize: 24,
                lineHeight: 29,
                fontWeight: '600',
                marginTop: -XS + 1,
                marginBottom: S
            }
        },
        ListItem: {
            containerStyle: {
                backgroundColor: secondary,
                padding: 0
            }
        },
        ListItemAccordion: {
            containerStyle: {
                padding: 0,
                marginBottom: S
            }
        },
        ListItemTitle: {
            style: {
                color: secondaryFont,
                fontSize: 18,
                fontWeight: "600"
            },
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
                maxWidth: 360,
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
                marginBottom: S + 6,
                height: 226
            }
        },
        Badge: {
            badgeStyle: {
                height: 19,
                backgroundColor: secondaryFont,
                paddingHorizontal: XS,
                paddingTop: 2,
                paddingBottom: 5,
                borderRadius: S,
                alignSelf: 'flex-start',
                borderWidth: 0
            }
        },
        CheckBox: {
            containerStyle: {
                padding: 0,
                margin: 0,
                marginLeft: 0,
                marginRight: 0
            },
            // wrapperStyle: {
            //     margin: 0,
            // },
            // style: {
            //     margin: 0,
            // },
            textStyle: {
                margin: 0,
                color: secondaryFont
            }
        },
        Image: {
            style: {
                margin: 'auto',
                aspectRatio: 1,
                width: '100%',
                maxWidth: 360,
                flex: 1,
                borderRadius: XS
            },
            // containerStyle: {
            //     marginHorizontal: S
            // }
        }
    },
});