import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuCard from '../components/MenuCard';
import CustomAlert from '../components/CustomAlert';
import { studentInfo, generalAverage } from '../models/subjectsData';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

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
                                onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('SelectChild')}
                                style={styles.backButton}
                            >
                                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
                            </TouchableOpacity>
                            <View style={styles.logoContainer}>
                                <MaterialCommunityIcons name="shield-check" size={28} color={colors.white} />
                                <Text style={styles.logoText}>Portal Académico</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setLogoutAlertVisible(true)}
                                style={styles.logoutButton}
                            >
                                <MaterialCommunityIcons name="logout" size={24} color={colors.white} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeSection}>
                            <Text style={styles.greeting}>Hola,</Text>
                            <Text style={styles.studentName}>{studentInfo.name}</Text>
                            <Text style={styles.studentGrade}>{studentInfo.grade}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.statsRow}
                            onPress={() => navigation.navigate('Notas')}
                        >
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{generalAverage}</Text>
                                <Text style={styles.statLabel}>Promedio Gral.</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>100%</Text>
                                <Text style={styles.statLabel}>Asistencia</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Gestión Escolar</Text>

                <View style={styles.menuGrid}>
                    <MenuCard
                        title="Materias"
                        icon="book-open-page-variant"
                        color="#D32F2F"
                        description="Vista general académica"
                        onPress={() => navigation.navigate('Home')}
                    />
                    <MenuCard
                        title="Seguimiento"
                        icon="clipboard-text-clock-outline"
                        color="#1976D2"
                        description="Control de actividades"
                        onPress={() => navigation.navigate('Seguimiento')}
                    />
                    <MenuCard
                        title="Horario"
                        icon="calendar-clock"
                        color="#388E3C"
                        description="Mis clases"
                        onPress={() => navigation.navigate('Horario')}
                    />
                    <MenuCard
                        title="Mensajes"
                        icon="message-text-outline"
                        color="#FBC02D"
                        description="Comunicación"
                        onPress={() => navigation.navigate('Mensajes')}
                    />
                </View>

                <View style={styles.announcementCard}>
                    <View style={styles.announcementIcon}>
                        <MaterialCommunityIcons name="bullhorn-outline" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle}>Próximo Evento</Text>
                        <Text style={styles.announcementText}>Entrega de boletines: Próximo viernes.</Text>
                    </View>
                </View>
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
        paddingBottom: 25,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    headerContent: {
        paddingHorizontal: 25,
        paddingTop: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 10,
        letterSpacing: 0.5,
    },
    logoutButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
    },
    welcomeSection: {
        marginBottom: 25,
    },
    greeting: {
        fontSize: 18,
        color: colors.textSecondary,
    },
    studentName: {
        fontSize: 32,
        fontWeight: '900',
        color: colors.white,
        marginTop: 5,
    },
    studentGrade: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: 2,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 20,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.primary,
    },
    statLabel: {
        fontSize: 13,
        color: colors.textMuted,
        marginTop: 3,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border,
    },
    scrollContent: {
        padding: 25,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 20,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    announcementCard: {
        flexDirection: 'row',
        backgroundColor: '#FFE0E0',
        borderRadius: 20,
        padding: 20,
        marginTop: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    announcementIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    announcementContent: {
        flex: 1,
    },
    announcementTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    announcementText: {
        fontSize: 14,
        color: colors.text,
        marginTop: 2,
    },
});

export default DashboardScreen;
