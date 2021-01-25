import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { COLORS, SIZES } from '../constants';
import Video from '../components/video';
import searchData from '../search-data.json';

export default function Search(props) {

    const [dataSource, setDataSource] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [viewableItemsKeys, setViewablesItemKeys] = useState([]);

    const onViewRef = useRef((vI) => {
        const vItems = vI.viewableItems.map(i => i.key);
        setViewablesItemKeys(vItems);
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        setDataSource(searchData);
    }, []);

    const data = () => dataSource.filter(i => i.id.toString().includes(filterText));

    const renderThumbnailItem = ({ item }) => (
        <View style={styles.thumbnail}>
            {
                item.type == 'img' ?
                    <Image style={styles.imageThumbnail}
                        source={{ uri: 'https://biozzo.com/app-assets/images/' + item.src }} />
                    : <Video videoUri={item.src} isVisible={viewableItemsKeys.indexOf(parseInt(item.id)) !== -1} />
            }
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <TouchableOpacity style={styles.btnCancel} onPress={() => props.navigation.goBack()}>
                    <Text style={{ color: COLORS.primary }}>Vazgeç</Text>
                </TouchableOpacity>
                <TextInput
                    autoCorrect={false}
                    placeholder="Ara..."
                    autoFocus
                    clearButtonMode="always"
                    onChangeText={setFilterText}
                    style={styles.search} />
            </View>

            <FlatList
                keyboardDismissMode="on-drag"
                data={data()}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                showsVerticalScrollIndicator={false}
                renderItem={renderThumbnailItem}
                numColumns={3}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    thumbnail: {
        width: SIZES.width / 3,
        height: SIZES.width / 3
    },
    imageThumbnail: {
        height: '100%',
    },
    search: {
        flex: 1,
        margin: SIZES.base,
        backgroundColor: COLORS.lightGray,
        paddingVertical: SIZES.padding / 2,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius
    },
    btnCancel: {
        paddingVertical: SIZES.base / 2,
        paddingLeft: SIZES.base
    }
});

