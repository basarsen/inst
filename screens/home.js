import React, { useState, useRef } from 'react';
import { Text, SafeAreaView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Post from '../components/post';
import { COLORS, icons, SIZES } from '../constants';
import feedData from '../feed-data.json';

export default function Home(props) {

    const [viewableItemKey, setViewableItemKey] = useState(null);
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const onViewRef = useRef((viewableItems) => {
        setViewableItemKey(viewableItems.viewableItems[0].key);
    });

    const renderPostItem = ({ item }) => (
        <Post data={item} isVisible={item.id == viewableItemKey} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Search')}
                activeOpacity={1}
                style={styles.searchBar}>
                <Image source={icons.search} style={styles.searchIcon} resizeMode="contain" />
                <Text style={{ color: COLORS.gray, marginLeft: SIZES.base / 2 }}>Ara</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.container}
                keyExtractor={data => data.id}
                data={feedData}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                showsVerticalScrollIndicator={false}
                renderItem={renderPostItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchIcon: {
        width: SIZES.base,
        height: SIZES.base,
        tintColor: COLORS.gray
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SIZES.base,
        backgroundColor: COLORS.lightGray,
        paddingVertical: SIZES.padding / 2,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        margin: SIZES.base
    }
});

