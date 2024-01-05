import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '@rneui/base';
import { sizes } from '../../../styles/variables/measures';
import colors from '../../../styles/variables/colors';

const ChatsListSkeleton = () => {
    return (
        <>
            <View style={{ backgroundColor: colors.secondary, display: 'flex', flexDirection: 'row', gap: sizes.S, padding: sizes.S, marginTop: sizes.S }} >
                <Skeleton circle={true} animation="wave" width={60} height={60} />
                <View style={{
                    display: 'flex',
                    gap: sizes.S
                }}>
                    <Skeleton animation="wave" width={80} height={24} />
                    <Skeleton animation="wave" width={180} height={16} />
                </View>
            </View>
            <View style={{ backgroundColor: colors.secondary, display: 'flex', flexDirection: 'row', gap: sizes.S, padding: sizes.S, marginTop: sizes.S }} >
                <Skeleton circle={true} animation="wave" width={60} height={60} />
                <View style={{
                    display: 'flex',
                    gap: sizes.S
                }}>
                    <Skeleton animation="wave" width={80} height={24} />
                    <Skeleton animation="wave" width={180} height={16} />
                </View>
            </View>
            <View style={{ backgroundColor: colors.secondary, display: 'flex', flexDirection: 'row', gap: sizes.S, padding: sizes.S, marginTop: sizes.S }} >
                <Skeleton circle={true} animation="wave" width={60} height={60} />
                <View style={{
                    display: 'flex',
                    gap: sizes.S
                }}>
                    <Skeleton animation="wave" width={80} height={24} />
                    <Skeleton animation="wave" width={180} height={16} />
                </View>
            </View>
            <View style={{ backgroundColor: colors.secondary, display: 'flex', flexDirection: 'row', gap: sizes.S, padding: sizes.S, marginTop: sizes.S }} >
                <Skeleton circle={true} animation="wave" width={60} height={60} />
                <View style={{
                    display: 'flex',
                    gap: sizes.S
                }}>
                    <Skeleton animation="wave" width={80} height={24} />
                    <Skeleton animation="wave" width={180} height={16} />
                </View>
            </View>
        </>
    )
}

export default ChatsListSkeleton