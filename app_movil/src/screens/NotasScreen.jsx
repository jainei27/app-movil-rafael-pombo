import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { semesterAverages, generalAverage } from '../models/subjectsData';
import colors from '../styles/colors';

const NotasScreen = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTop}>
                            <TouchableOpacity
                                onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Dashboard')}
                                style={styles.backButton}
                            >
                                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Reporte Académico</Text>
                            <View style={{ width: 44 }} />
                        </View>

                        <View style={styles.gpaContainer}>
                            <Text style={styles.gpaLabel}>Promedio Acumulado</Text>
                            <Text style={styles.gpaValue}>{generalAverage}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollPadding}
            >
                <Text style={styles.sectionTitle}>Resumen por Periodo</Text>

                {semesterAverages.map((item, index) => (
                    <View key={index} style={styles.periodCard}>
                        <View style={styles.periodInfo}>
                            <Text style={styles.periodTitle}>{item.period}</Text>
                            <Text style={styles.periodStatus}>
                                {item.average === '--' ? 'En progreso' : 'Finalizado'}
                            </Text>
                        </View>
                        <View style={[
                            styles.gradeBadge,
                            { backgroundColor: item.average === '--' ? '#F5F5F5' : '#E3F2FD' }
                        ]}>
                            <Text style={[
                                styles.gradeText,
                                { color: item.average === '--' ? '#9E9E9E' : colors.primary }
                            ]}>
                                {item.average}
                            </Text>
                        </View>
                    </View>
                ))}

                <View style={styles.footerInfo}>
                    <MaterialCommunityIcons name="information" size={20} color={colors.textMuted} />
                    <Text style={styles.footerText}>
                        Este reporte es un resumen general. Para ver el detalle por materia, dirígete a la sección de Materias.
                    </Text>
                </View>
            </ScrollView>
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
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.white,
    },
    gpaContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    gpaLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 5,
    },
    gpaValue: {
        fontSize: 48,
        fontWeight: '900',
        color: colors.white,
    },
    content: {
        flex: 1,
    },
    scrollPadding: {
        padding: 25,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 20,
    },
    periodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    periodInfo: {
        flex: 1,
    },
    periodTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    periodStatus: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 4,
    },
    gradeBadge: {
        width: 60,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradeText: {
        fontSize: 18,
        fontWeight: '900',
    },
    footerInfo: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
    },
    footerText: {
        flex: 1,
        fontSize: 13,
        color: colors.textMuted,
        marginLeft: 10,
        lineHeight: 18,
    },
});

export default NotasScreen;
