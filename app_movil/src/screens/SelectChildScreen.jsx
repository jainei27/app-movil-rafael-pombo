import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Animated,
    Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomAlert from '../components/CustomAlert';
import colors from '../styles/colors';

// Datos simulados (mock)
const mockedChildren = [
    { id: '1', name: 'Juan Pérez', grade: 'Grado 5°' },
    { id: '2', name: 'María Pérez', grade: 'Grado 8°' },
];

const ChildCard = ({ child, onPress }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={styles.card}
            >
                <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="face-man-profile" size={32} color={colors.primary} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.childName}>{child.name}</Text>
                        <Text style={styles.childGrade}>{child.grade}</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textMuted} />
                </View>
            </Pressable>
        </Animated.View>
    );
};

const SelectChildScreen = ({ navigation }) => {
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

    const handleSelectChild = (child) => {
        navigation.replace('Dashboard');
    };

    const handleLogoutConfirm = () => {
        setLogoutAlertVisible(false);
        navigation.replace('Login');
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <View style={styles.topRow}>
                            <TouchableOpacity
                                onPress={() => navigation.replace('Login')}
                                style={styles.backButton}
                            >
                                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLogoutAlertVisible(true)}
                                style={styles.logoutButton}
                            >
                                <MaterialCommunityIcons name="logout" size={24} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTextContainer}>
                            <MaterialCommunityIcons name="family-tree" size={60} color={colors.white} />
                            <Text style={styles.title}>Selecciona un estudiante</Text>
                            <Text style={styles.subtitle}>
                                Elige al estudiante para ver su información académica.
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollPadding}
            >
                {mockedChildren.map((child) => (
                    <ChildCard
                        key={child.id}
                        child={child}
                        onPress={() => handleSelectChild(child)}
                    />
                ))}
            </ScrollView>

            <CustomAlert
                visible={logoutAlertVisible}
                type="info"
                title="Cerrar sesión"
                message="¿Estás seguro de que deseas volver al inicio de sesión?"
                showCancel={true}
                cancelText="Cancelar"
                okText="Sí, salir"
                onCancel={() => setLogoutAlertVisible(false)}
                onClose={handleLogoutConfirm}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerGradient: {
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backButton: {
        padding: 5,
    },
    logoutButton: {
        padding: 5,
    },
    headerTextContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.white,
        marginTop: 15,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: colors.textSecondary,
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        marginTop: 20,
    },
    scrollPadding: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(211, 47, 47, 0.1)', // primary color with opacity
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    childName: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },
    childGrade: {
        fontSize: 14,
        color: colors.textMuted,
        fontWeight: '500',
    },
});

export default SelectChildScreen;
