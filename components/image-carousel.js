import React, { useState } from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

export default function ImageCarousel(props) {

    const [active, setActive] = useState(0);
    const _onScroll = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide != active) setActive(slide);
    };

    return (
        <>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={_onScroll}
                scrollEnabled={props.images.length > 1}>
                {
                    props.images.map((item, index) => (
                        <Image
                            key={index}
                            style={styles.image}
                            source={{ uri: 'https://biozzo.com/app-assets/images/' + item.uri }}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.indicators}>
                {
                    props.images.length > 1 ?
                        props.images.map((item, index) => (
                            <View key={index} style={[styles.indicator, { backgroundColor: index == active ? COLORS.primary : COLORS.lightGray }]} />
                        )) : null
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: SIZES.width,
        minHeight: 300,
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.base / 2
    },
    indicator: {
        width: SIZES.base / 2,
        height: SIZES.base / 2,
        borderRadius: SIZES.base / 2,
        marginHorizontal: 2
    }
})

