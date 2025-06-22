import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const GameShowScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { game } = route.params || {};

  const calculateCompletionStatus = (gameData) => {
    if (!gameData?.categories) return { categoriesCompleted: 0, questionsCompleted: 0, isFullyCompleted: false };
    
    let categoriesCompleted = 0;
    let questionsCompleted = 0;
    
    gameData.categories.forEach(category => {
      const hasName = category.name && category.name.trim() !== '';
      const hasQuestions = category.questions && (
        (typeof category.questions === 'object' && Object.keys(category.questions).length > 0) ||
        (Array.isArray(category.questions) && category.questions.length > 0)
      );
      
      if (hasName && hasQuestions) {
        categoriesCompleted++;
      }
      
      if (category.questions) {
        if (typeof category.questions === 'object' && !Array.isArray(category.questions)) {
          questionsCompleted += Object.keys(category.questions).length;
        } else if (Array.isArray(category.questions)) {
          questionsCompleted += category.questions.length;
        }
      }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشطة': return '#10b981';
      case 'مسودة': return '#f59e0b';
      case 'متوقفة': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'سهل': return '#10b981';
      case 'متوسط': return '#f59e0b';
      case 'صعب': return '#ef4444';
      default: return '#6b7280';
    }
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
      <LinearGradient
        colors={['#2563eb', '#1d4ed8', '#1e40af']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {game.name || game.title || 'لعبة بدون عنوان'}
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Game Image */}
        {game.image && (
          <View style={styles.imageSection}>
            <Image 
              source={typeof game.image === 'string' ? { uri: game.image } : game.image}
              style={styles.gameImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Game Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>وصف اللعبة</Text>
          <Text style={styles.descriptionText}>
            {game.description || 'لا يوجد وصف للعبة'}
          </Text>
        </View>

        {/* Game Status and Difficulty */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات اللعبة</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(game.status) }]}>
              <Text style={styles.statusText}>الحالة: {game.status || 'غير محدد'}</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(game.difficulty) }]}>
              <Text style={styles.difficultyText}>المستوى: {game.difficulty || 'متوسط'}</Text>
            </View>
          </View>
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

        {/* Categories with Images */}
        {game.categories && game.categories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>الفئات المضافة</Text>
            <View style={styles.categoriesContainer}>
              {game.categories.map((category, index) => (
                <View key={index} style={styles.categoryCard}>
                  <View style={styles.categoryHeader}>
                    {category.image && (
                      <Image 
                        source={typeof category.image === 'string' ? { uri: category.image } : category.image}
                        style={styles.categoryImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryQuestions}>
                        {(() => {
                          if (!category.questions) return '0 سؤال';
                          if (typeof category.questions === 'object' && !Array.isArray(category.questions)) {
                            return `${Object.keys(category.questions).length} سؤال`;
                          }
                          if (Array.isArray(category.questions)) {
                            return `${category.questions.length} سؤال`;
                          }
                          return '0 سؤال';
                        })()}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Questions in this category */}
                  {category.questions && (
                    <View style={styles.questionsContainer}>
                      <Text style={styles.questionsTitle}>الأسئلة:</Text>
                      {(() => {
                        let questions = [];
                        if (typeof category.questions === 'object' && !Array.isArray(category.questions)) {
                          questions = Object.keys(category.questions).map(key => ({
                            key,
                            ...category.questions[key]
                          }));
                        } else if (Array.isArray(category.questions)) {
                          questions = category.questions.map((q, idx) => ({
                            key: idx,
                            ...q
                          }));
                        }
                        
                        return questions.map((question, qIndex) => (
                          <View key={qIndex} style={styles.questionCard}>
                            <View style={styles.questionHeader}>
                              <Text style={styles.questionNumber}>سؤال {qIndex + 1}</Text>
                              {question.image && (
                                <Image 
                                  source={typeof question.image === 'string' ? { uri: question.image } : question.image}
                                  style={styles.questionImage}
                                  resizeMode="cover"
                                />
                              )}
                            </View>
                            <Text style={styles.questionText}>
                              {question.question || question.text || 'سؤال بدون نص'}
                            </Text>
                            <View style={styles.answerContainer}>
                              <Text style={styles.answerLabel}>الإجابة:</Text>
                              <Text style={styles.answerText}>
                                {question.answer || question.correctAnswer || 'غير محدد'}
                              </Text>
                            </View>
                          </View>
                        ));
                      })()}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Game Metadata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إحصائيات اللعبة</Text>
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
  imageSection: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 24,
    marginBottom: 0,
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'System',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'System',
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  categoryImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
    fontFamily: 'System',
  },
  categoryQuestions: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'System',
  },
  questionsContainer: {
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  questionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
    fontFamily: 'System',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#60a5fa',
    marginRight: 8,
    fontFamily: 'System',
  },
  questionImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: 'System',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
  },
  answerLabel: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: '600',
    marginRight: 8,
    fontFamily: 'System',
  },
  answerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    flex: 1,
    fontFamily: 'System',
  },
});

export default GameShowScreen;
