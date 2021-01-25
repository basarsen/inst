import React, { useState } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

export default function VideoContainer(props) {
    return (
        <>
            {
                props.isVisible ?
                    <Video source={{ uri: 'https://biozzo.com/app-assets/videos/' + props.videoUri }}
                        repeat={true}
                        resizeMode="cover"
                        style={{ height: '100%', maxHeight: 360 }}
                        onVideoBuffer={() => console.log(123)}
                    />
                    : <View style={{ height: '100%', backgroundColor: '#000', maxHeight: 360 }} />
            }
        </>
    )
}
