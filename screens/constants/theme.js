import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#0095f6',
    gray: '#888',
    lightGray: '#ddd'
}

export const SIZES = {
    base: 12,
    radius: 4,
    padding: 12,
    width,
    height
}

const appTheme = {
    COLORS,
    SIZES
}

export default appTheme;