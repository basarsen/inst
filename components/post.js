import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SIZES, icons } from '../constants';
import ImageCarousel from './image-carousel';
import Videom from './video';

export default function Post(props) {
    return (
        <View style={styles.container}>
            {/* HEAD */}
            <View style={styles.head}>
                <View style={styles.userInfo}>
                    <Image style={styles.avatar} source={{ uri: props.data.avatar }} />
                    <Text style={styles.username}>{props.data.username}</Text>
                </View>
            </View>
            {/* CONTENT */}
            <View style={styles.contentContainer}>
                {
                    props.data.content.type === 'img' ?
                        <ImageCarousel images={props.data.content.list} /> :
                        <Videom videoUri={props.data.content.list[0].uri} isVisible={props.isVisible} />
                }
            </View>
            {/* ACTIONS */}
            <View style={styles.actionBtns}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.btnIcon}>
                        <Image source={icons.like} style={styles.icon} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcon}>
                        <Image source={icons.comment} style={styles.icon} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcon}>
                        <Image source={icons.message} style={styles.icon} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* POST INFO */}
            <View style={{ paddingHorizontal: SIZES.padding }}>
                <Text style={{ fontWeight: 'bold' }}>2344 beğenme</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', marginRight: 4 }}>{props.data.username}</Text>
                    <Text>Lorem ipsum dolor...</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SIZES.base / 2,
        maxHeight: 400,
        overflow: 'hidden'
    },
    contentContainer: {
        maxHeight: 240,
        marginBottom: SIZES.base
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 32,
        marginRight: SIZES.base / 2
    },
    username: {
        fontWeight: 'bold'
    },
    icon: {
        width: SIZES.base * 2,
        height: SIZES.base * 2,
    },
    btnIcon: {
        marginRight: SIZES.base
    },
    actionBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding,
        paddingTop: 0
    }
})

