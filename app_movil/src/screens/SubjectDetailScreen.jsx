import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradeItem from '../components/GradeItem';
import colors from '../styles/colors';

const SubjectDetailScreen = ({ route, navigation }) => {
    const { subject } = route.params;

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
                            style={styles.backButton}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
                        </TouchableOpacity>

                        <View style={styles.subjectHeader}>
                            <View style={styles.iconContainer}>
                                <MaterialCommunityIcons name={subject.icon} size={40} color={colors.primary} />
                            </View>
                            <Text style={styles.subjectName}>{subject.name}</Text>
                            <View style={styles.averageBadge}>
                                <Text style={styles.averageLabel}>Promedio: </Text>
                                <Text style={styles.averageValue}>{subject.average}</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollPadding}
            >
                <Text style={styles.sectionTitle}>Detalle de Calificaciones</Text>

                {[...subject.grades]
                    .sort((a, b) => parseFloat(a.grade) - parseFloat(b.grade))
                    .map((grade) => (
                    <GradeItem
                        key={grade.id}
                        activity={grade.activity}
                        grade={grade.grade}
                    />
                ))}

                <View style={styles.infoCard}>
                    <MaterialCommunityIcons name="information-outline" size={24} color={colors.primary} />
                    <Text style={styles.infoText}>
                        Estas notas corresponden al periodo actual. Si tienes alguna duda, contacta al docente.
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
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        padding: 10,
        marginLeft: -10,
    },
    subjectHeader: {
        alignItems: 'center',
        marginTop: 5,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    subjectName: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.white,
        marginTop: 15,
    },
    averageBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 10,
    },
    averageLabel: {
        color: colors.white,
        fontSize: 14,
    },
    averageValue: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        marginTop: -10,
    },
    scrollPadding: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 5,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FD',
        padding: 20,
        borderRadius: 18,
        marginTop: 20,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 14,
        color: '#1976D2',
        lineHeight: 20,
    },
});

export default SubjectDetailScreen;
