import React, { View } from "react-native"
import { Skeleton } from "@rneui/themed"

import { sizes } from "../../../styles/variables/measures"
import styles from "./styles"

const PostsGallerySkeleton = () => {
    return (
        <View style={styles.container}>
            <Skeleton animation="wave" width={220} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.M }} />
            <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
            <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
            <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
            <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
        </View>
    )
}
export default PostsGallerySkeleton