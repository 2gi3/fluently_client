import React from 'react'
import { Skeleton } from "@rneui/themed"
import { View } from "react-native"
import { sizes } from '../../../styles/variables/measures'

const ChatCardSkeleton = () => {
    return (
        <View>
            <Skeleton animation="wave" width={220} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.M }} />
        </View>
    )
}

export default ChatCardSkeleton