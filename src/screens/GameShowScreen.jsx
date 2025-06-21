import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const GameShowScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { game } = route.params || {};

  const calculateCompletionStatus = (gameData) => {
    if (!gameData?.categories) return { categoriesCompleted: 0, questionsCompleted: 0, isFullyCompleted: false };
    
    let categoriesCompleted = 0;
    let questionsCompleted = 0;
    
    gameData.categories.forEach(category => {
      if (category.name && category.image && Object.keys(category.questions || {}).length > 0) {
        categoriesCompleted++;
      }
      questionsCompleted += Object.keys(category.questions || {}).length;
    });
    
    return {
      categoriesCompleted,
      questionsCompleted,
      isFullyCompleted: categoriesCompleted === 6 && questionsCompleted === 36
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text style={styles.errorText}>لم يتم العثور على تفاصيل اللعبة</Text>
        </View>
      </SafeAreaView>
    );
  }

  const completionStatus = calculateCompletionStatus(game);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {game.name || game.title || 'لعبة بدون عنوان'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Game Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>وصف اللعبة</Text>
          <Text style={styles.descriptionText}>
            {game.description || 'لا يوجد وصف للعبة'}
          </Text>
        </View>

        {/* Completion Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>حالة الإكمال</Text>
          <View style={styles.completionContainer}>
            <View style={styles.completionItem}>
              <Ionicons name="layers-outline" size={24} color="#60a5fa" />
              <View style={styles.completionInfo}>
                <Text style={styles.completionLabel}>الفئات المكتملة</Text>
                <Text style={styles.completionValue}>
                  {completionStatus.categoriesCompleted}/6
                </Text>
              </View>
            </View>
            
            <View style={styles.completionItem}>
              <Ionicons name="help-circle-outline" size={24} color="#10b981" />
              <View style={styles.completionInfo}>
                <Text style={styles.completionLabel}>الأسئلة المكتملة</Text>
                <Text style={styles.completionValue}>
                  {completionStatus.questionsCompleted}/36
                </Text>
              </View>
            </View>
          </View>
          
          {completionStatus.isFullyCompleted && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.completedText}>اللعبة مكتملة بالكامل</Text>
            </View>
          )}
        </View>

        {/* Game Metadata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات اللعبة</Text>
          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
              <Text style={styles.metadataText}>
                تاريخ الإنشاء: {formatDate(game.createdAt || game.createdDate)}
              </Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="people-outline" size={20} color="#6b7280" />
              <Text style={styles.metadataText}>
                اللاعبون: {game.players || 0}
              </Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="eye-outline" size={20} color="#6b7280" />
              <Text style={styles.metadataText}>
                المشاهدات: {game.views || 0}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    flex: 1,
    fontFamily: 'System',
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 16,
    fontFamily: 'System',
  },
  descriptionText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    fontFamily: 'System',
  },
  completionContainer: {
    gap: 16,
  },
  completionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  completionLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'System',
  },
  completionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    fontFamily: 'System',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  completedText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'System',
  },
  metadataContainer: {
    gap: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
    fontFamily: 'System',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'System',
  },
});

export default GameShowScreen;
