
import React, { useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Home, Search } from './screens';
import AuthContext from './auth-context';
import EncryptedStorage from 'react-native-encrypted-storage';
const Stack = createStackNavigator();

const AppNavigation = () => {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        loggedIn: action.loggedIn,
                    };
            }
        }, { loggedIn: false }
    );

    const authContext = useMemo(() => ({
        signIn: (username, password) => {
            // api call => response => token
            const token = 'secret_token';
            storeUser(username, token);
        }
    }), []);

    async function storeUser(username, token) {
        try {
            await EncryptedStorage.setItem(
                "user",
                JSON.stringify({
                    token: token,
                    username: username,
                })
            );
            dispatch({ type: 'SIGN_IN', loggedIn: true })
        } catch (error) { }
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {
                        state.loggedIn ?
                            <>
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="Search" component={Search} />
                            </> :
                            <Stack.Screen name="Login" component={Login} />
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default AppNavigation;