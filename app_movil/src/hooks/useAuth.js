import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export const useAuth = (navigation) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false);
    const [isBiometricActive, setIsBiometricActive] = useState(false);
    
    const [alertConfig, setAlertConfig] = useState({
        visible: false,
        type: 'success',
        title: '',
        message: '',
        showCancel: false,
        onCancel: null,
        onConfirm: null,
        okText: 'OK',
        cancelText: 'Cancelar'
    });

    useEffect(() => {
        checkBiometricStatus();
    }, []);

    const checkBiometricStatus = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        const isActive = await SecureStore.getItemAsync('isBiometricActive');
        
        setIsBiometricSupported(hasHardware);
        setIsBiometricEnrolled(isEnrolled);
        setIsBiometricActive(isActive === 'true');
    };

    const saveSessionToken = async (user) => {
        const token = `session_${user}_${Date.now()}`;
        await SecureStore.setItemAsync('user_session_token', token);
        await SecureStore.setItemAsync('saved_username', user);
    };

    const handleLogin = async () => {
        if (username.toLowerCase() === 'juan' && password === '123') {
            await saveSessionToken(username.toLowerCase());
            
            // Si el hardware es compatible pero no está activo, preguntamos
            if (isBiometricSupported && isBiometricEnrolled && !isBiometricActive) {
                const hasAsked = await SecureStore.getItemAsync('hasAskedBiometrics');
                if (!hasAsked) {
                    setAlertConfig({
                        visible: true,
                        type: 'info',
                        title: '¿Activar Biometría?',
                        message: '¿Deseas usar tu huella o rostro para ingresar la próxima vez?',
                        showCancel: true,
                        okText: 'Sí, activar',
                        cancelText: 'Ahora no',
                        onCancel: async () => {
                            await SecureStore.setItemAsync('hasAskedBiometrics', 'true');
                            await SecureStore.setItemAsync('isBiometricActive', 'false');
                            closeAlert();
                            navigation.replace('SelectChild');
                        },
                        onConfirm: async () => {
                            await SecureStore.setItemAsync('hasAskedBiometrics', 'true');
                            await SecureStore.setItemAsync('isBiometricActive', 'true');
                            setIsBiometricActive(true);
                            closeAlert();
                            navigation.replace('SelectChild');
                        }
                    });
                    return;
                }
            }

            setAlertConfig({
                visible: true,
                type: 'success',
                title: 'Inicio de sesión exitoso',
                message: 'Bienvenido al sistema de gestión académica.',
                showCancel: false
            });

            setTimeout(() => {
                setAlertConfig(prev => ({ ...prev, visible: false }));
                navigation.replace('SelectChild');
            }, 1500);
        } else {
            setAlertConfig({
                visible: true,
                type: 'error',
                title: 'Credenciales no válidas',
                message: 'Por favor intente nuevamente.',
                showCancel: false
            });
        }
    };

    const handleBiometricAuth = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Inicia sesión con tu biometría',
            fallbackLabel: 'Usar contraseña',
            disableDeviceFallback: false,
        });

        if (result.success) {
            const token = await SecureStore.getItemAsync('user_session_token');
            if (token) {
                setAlertConfig({
                    visible: true,
                    type: 'success',
                    title: 'Autenticación exitosa',
                    message: 'Ingresando mediante biometría...',
                    showCancel: false
                });
                
                setTimeout(() => {
                    closeAlert();
                    navigation.replace('SelectChild');
                }, 1000);
            } else {
                setAlertConfig({
                    visible: true,
                    type: 'error',
                    title: 'Error de Sesión',
                    message: 'Debes iniciar sesión manualmente una vez primero.',
                    showCancel: false
                });
            }
        }
    };

    const closeAlert = () => {
        setAlertConfig(prev => ({ ...prev, visible: false }));
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        isBiometricActive: isBiometricSupported && isBiometricEnrolled && isBiometricActive,
        alertConfig,
        handleLogin,
        handleBiometricAuth,
        closeAlert
    };
};
