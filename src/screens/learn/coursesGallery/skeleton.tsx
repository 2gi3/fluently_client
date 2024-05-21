import React, { View } from "react-native"
import { Skeleton } from "@rneui/themed"

import { sizes } from "../../../styles/variables/measures"
import styles from "./styles"
import { Card } from "@rneui/base"
import colors from "../../../styles/variables/colors"

const CoursesGallerySkeleton = () => {
    return (
        <View>
            <Card containerStyle={{ maxWidth: sizes.XXXL }}>

                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Skeleton
                        animation="wave" width={sizes.S} height={sizes.S}
                        style={{
                            flex: 1,
                            height: 150
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <Skeleton animation="wave" style={{ marginBottom: sizes.XS, borderRadius: 18, width: 96, height: 19 }} />
                        <Skeleton animation="wave" style={{ flex: 1, maxHeight: 22, marginBottom: sizes.S }}
                        />


                        <Skeleton animation="wave" style={{ marginBottom: sizes.XS, height: 14 }} />
                        <Skeleton animation="wave" style={{ marginBottom: sizes.XS, height: 14 }} />

                        <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                            <Skeleton animation="wave" style={{ marginRight: 4, height: 14, width: 34 }} />
                            <Skeleton animation="wave" style={{ width: 4, height: 4, marginBottom: -2 }} />
                            <Skeleton animation="wave" style={{ width: 4, height: 6, marginBottom: -2 }} />
                            <Skeleton animation="wave" style={{ width: 4, height: 8, marginBottom: -2 }} />
                            <Skeleton animation="wave" style={{ width: 4, height: 10, marginBottom: -2 }} />
                            <Skeleton animation="wave" style={{ width: 4, height: 12, marginBottom: -2 }} />
                        </View>
                    </View>
                </View>
            </Card>
        </View>
        // <View style={[styles.container, { margin: 'auto', marginBottom: sizes.S }]}>
        //     <Card containerStyle={{ borderRadius: sizes.S }} >
        //         <Skeleton
        //             circle
        //             animation="wave" width={sizes.S} height={sizes.S}
        //             style={{
        //                 position: 'absolute',
        //                 top: sizes.XS,
        //                 right: sizes.XS,
        //                 zIndex: 2,
        //                 margin: 0,
        //                 marginRight: 2,
        //                 backgroundColor: colors.primary
        //             }}
        //         />
        //         <Skeleton animation="wave" width={sizes.XXL} height={sizes.XL} style={{ marginBottom: sizes.XS, borderRadius: sizes.XS }} />
        //         <Skeleton animation="wave" width={sizes.XXL} height={sizes.S} style={{ marginTop: sizes.XS, marginBottom: sizes.XS, }} />
        //         <View style={{ marginBottom: sizes.S, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>
        //             <Skeleton
        //                 circle
        //                 animation="wave" width={sizes.M} height={sizes.M}
        //             // style={{
        //             //     position: 'absolute',
        //             //     top: sizes.XS,
        //             //     right: sizes.XS,
        //             //     zIndex: 2,
        //             //     margin: 0,
        //             //     marginRight: 2,
        //             // }}
        //             />

        //             <Skeleton animation="wave" width={sizes.L} height={sizes.S} style={{ marginTop: sizes.XS, marginBottom: sizes.XS, }} />

        //         </View>

        //         <View>

        //             <View style={{ marginBottom: 11, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center', gap: sizes.S }}>

        //                 <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: sizes.XS }}>

        //                     <Skeleton animation="wave" width={sizes.M} height={sizes.S} />
        //                 </View>

        //             </View>

        //         </View>

        //         <Skeleton animation="wave" width={sizes.XXL} height={sizes.M} style={{ marginBottom: sizes.S, borderRadius: sizes.XS }} />


        //     </Card>
        // </View>
    )
}
export default CoursesGallerySkeleton