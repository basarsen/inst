import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Platform, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AuthContext from '../auth-context';
import { SIZES } from '../constants';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={(Platform.OS === 'ios') ? "padding" : null}>
            <TextInput
                style={styles.input}
                placeholder="Kullanıcı adınız"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Parolanız"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.btn} onPress={() => signIn({ username, password })}>
                <Text style={{ color: '#fff' }}>Giriş Yap</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 16,
        width: '100%'
    },
    btn: {
        padding: 12,
        backgroundColor: '#888',
        borderRadius: 4,
        marginTop: 12,
        width: '100%',
        alignItems: 'center'
    }
})

