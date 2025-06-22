import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CreatedGamesContext } from '../context/CreatedGamesContext';
import { apiService } from '../services/api'; // Uncomment when you have a real API
import { USE_MOCK_API } from '../config/api';

const { width, height } = Dimensions.get('window');

// Mock data for user statistics
const mockUserStats = {
  users: 1250,
  views: 8900,
  currentBalance: 150.50,
  currency: '$'
};

// Mock data for created games
const mockCreatedGames = [
  {
    id: '1',
    name: 'لعبة الرياضيات',
    title: 'لعبة الرياضيات',
    description: 'لعبة تعليمية للرياضيات للمرحلة الابتدائية',
    status: 'نشطة',
    createdAt: '2024-01-15T10:30:00Z',
    categories: [
      {
        id: 1,
        name: 'الجمع والطرح',
        image: { uri: 'test' },
        questions: {
          100: { question: 'ما هو ناتج 5 + 3؟', answer: '8' },
          200: { question: 'ما هو ناتج 10 - 4؟', answer: '6' },
          300: { question: 'ما هو ناتج 7 + 8؟', answer: '15' },
          400: { question: 'ما هو ناتج 15 - 7؟', answer: '8' },
          500: { question: 'ما هو ناتج 12 + 9؟', answer: '21' },
          600: { question: 'ما هو ناتج 20 - 11؟', answer: '9' }
        }
      },
      {
        id: 2,
        name: 'الضرب والقسمة',
        image: { uri: 'test' },
        questions: {
          100: { question: 'ما هو ناتج 4 × 3؟', answer: '12' },
          200: { question: 'ما هو ناتج 15 ÷ 3؟', answer: '5' },
          300: { question: 'ما هو ناتج 6 × 7؟', answer: '42' },
          400: { question: 'ما هو ناتج 24 ÷ 4؟', answer: '6' },
          500: { question: 'ما هو ناتج 8 × 9؟', answer: '72' },
          600: { question: 'ما هو ناتج 36 ÷ 6؟', answer: '6' }
        }
      },
      {
        id: 3,
        name: 'الأعداد',
        image: { uri: 'test' },
        questions: {
          100: { question: 'اكتب العدد 25 بالكلمات', answer: 'خمسة وعشرون' },
          200: { question: 'ما هو العدد الذي يلي 99؟', answer: '100' },
          300: { question: 'اكتب العدد 150 بالكلمات', answer: 'مائة وخمسون' },
          400: { question: 'ما هو العدد الذي يسبق 1000؟', answer: '999' },
          500: { question: 'اكتب العدد 500 بالكلمات', answer: 'خمسمائة' },
          600: { question: 'ما هو العدد الذي يلي 999؟', answer: '1000' }
        }
      },
      {
        id: 4,
        name: 'الهندسة',
        image: { uri: 'test' },
        questions: {
          100: { question: 'كم ضلع للمربع؟', answer: '4' },
          200: { question: 'كم ضلع للمثلث؟', answer: '3' },
          300: { question: 'ما هو محيط المربع الذي طول ضلعه 5 سم؟', answer: '20 سم' },
          400: { question: 'كم ضلع للدائرة؟', answer: 'لا يوجد' },
          500: { question: 'ما هو محيط المستطيل الذي طوله 6 سم وعرضه 4 سم؟', answer: '20 سم' },
          600: { question: 'كم ضلع للخماسي؟', answer: '5' }
        }
      },
      {
        id: 5,
        name: 'القياسات',
        image: { uri: 'test' },
        questions: {
          100: { question: 'كم سنتيمتر في المتر؟', answer: '100' },
          200: { question: 'كم كيلوجرام في الطن؟', answer: '1000' },
          300: { question: 'كم لتر في الكوب؟', answer: '250 مل' },
          400: { question: 'كم دقيقة في الساعة؟', answer: '60' },
          500: { question: 'كم سنتيمتر في الكيلومتر؟', answer: '100000' },
          600: { question: 'كم ثانية في الدقيقة؟', answer: '60' }
        }
      },
      {
        id: 6,
        name: 'الكسور',
        image: { uri: 'test' },
        questions: {
          100: { question: 'ما هو الكسر المكافئ لـ 1/2؟', answer: '2/4' },
          200: { question: 'ما هو ناتج 1/4 + 1/4؟', answer: '1/2' },
          300: { question: 'ما هو الكسر المكافئ لـ 2/3؟', answer: '4/6' },
          400: { question: 'ما هو ناتج 3/4 - 1/4؟', answer: '1/2' },
          500: { question: 'ما هو الكسر المكافئ لـ 3/5؟', answer: '6/10' },
          600: { question: 'ما هو ناتج 1/3 + 1/3؟', answer: '2/3' }
        }
      }
    ],
    players: 45,
    views: 230,
    difficulty: 'سهل'
  },
  {
    id: '2',
    name: 'لعبة العلوم',
    title: 'لعبة العلوم',
    description: 'لعبة تعليمية للعلوم للمرحلة المتوسطة',
    status: 'مسودة',
    createdAt: '2024-01-10T14:20:00Z',
    categories: [
      {
        id: 1,
        name: 'الفيزياء',
        image: { uri: 'test' },
        questions: {
          100: { question: 'ما هي وحدة قياس القوة؟', answer: 'نيوتن' },
          200: { question: 'ما هي وحدة قياس الكتلة؟', answer: 'كيلوجرام' }
        }
      }
    ],
    players: 12,
    views: 67,
    difficulty: 'متوسط'
  }
];

const CreatedGamesDashboard = () => {
  const navigation = useNavigation();
  const { createdGames, deleteCreatedGame, updateGamesFromAPI } = useContext(CreatedGamesContext);
  const [userStats, setUserStats] = useState(mockUserStats);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingGameId, setDeletingGameId] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    fetchUserData();
    animateEntrance();
  }, []);

  // Debug useEffect to monitor deletingGameId changes
  useEffect(() => {
    console.log('deletingGameId changed to:', deletingGameId, 'Type:', typeof deletingGameId);
  }, [deletingGameId]);

  const animateEntrance = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      if (USE_MOCK_API) {
        // Mock implementation for testing
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserStats(mockUserStats);
        
        // Also set mock games data
        updateGamesFromAPI(mockCreatedGames);
      } else {
        // Real API implementation
        console.log('Fetching data from API...');
        
        // Fetch statistics
        const statisticsData = await apiService.getGamesStatistics();
        console.log('Statistics API Response:', statisticsData);
        
        // Transform API data to match our expected format
        const transformedStats = {
          users: statisticsData.totalGamePlayed || 0,
          views: statisticsData.totalGameView || 0,
          currentBalance: statisticsData.totalGameRevenue || 0,
          currency: statisticsData.currency || '$'
        };
        
        console.log('Transformed Stats:', transformedStats);
        setUserStats(transformedStats);
        
        // Fetch user games
        try {
          const userGamesData = await apiService.getUserGames();
          console.log('User Games API Response:', userGamesData);
          
          // Update the context with real games data
          if (userGamesData && userGamesData.games && Array.isArray(userGamesData.games)) {
            // Transform the games data to match our expected format
            const transformedGames = userGamesData.games.map(game => ({
              id: game.id,
              name: game.gameName || game.name,
              title: game.gameName || game.name,
              description: game.gameDescription || game.description,
              status: game.status || 'draft',
              createdAt: game.createdAt || game.createdDate,
              categories: game.categories || [],
              players: game.statistics?.players || game.players || 0,
              views: game.statistics?.views || game.views || 0,
              difficulty: game.difficulty || 'متوسط'
            }));
            
            // Update the context with real games
            console.log('Transformed Games:', transformedGames);
            updateGamesFromAPI(transformedGames);
          } else if (userGamesData && Array.isArray(userGamesData)) {
            // Fallback: if the response is directly an array
            const transformedGames = userGamesData.map(game => ({
              id: game.id,
              name: game.gameName || game.name,
              title: game.gameName || game.name,
              description: game.gameDescription || game.description,
              status: game.status || 'draft',
              createdAt: game.createdAt || game.createdDate,
              categories: game.categories || [],
              players: game.statistics?.players || game.players || 0,
              views: game.statistics?.views || game.views || 0,
              difficulty: game.difficulty || 'متوسط'
            }));
            
            console.log('Transformed Games (fallback):', transformedGames);
            updateGamesFromAPI(transformedGames);
          } else {
            console.log('No games data found in response:', userGamesData);
            updateGamesFromAPI([]);
          }
        } catch (gamesError) {
          console.error('Error fetching user games:', gamesError);
          // Don't show error for games if statistics worked
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      
      // Check if it's an authentication error
      const isAuthError = error.message.includes('رأس التفويض مفقود') || 
                         error.message.includes('Authorization') ||
                         error.message.includes('401') ||
                         error.message.includes('403');
      
      if (isAuthError) {
        // Show authentication error
        Alert.alert(
          'خطأ في المصادقة',
          'يجب تسجيل الدخول للوصول إلى البيانات. يرجى تسجيل الدخول أولاً.',
          [
            { text: 'حسناً' },
            { 
              text: 'تسجيل الدخول', 
              onPress: () => {
                // TODO: Navigate to login screen
                console.log('Navigate to login screen');
              }
            }
          ]
        );
      } else {
        // Show general error message
        Alert.alert(
          'خطأ في تحميل البيانات',
          'حدث خطأ أثناء تحميل الإحصائيات. يرجى المحاولة مرة أخرى.',
          [{ text: 'حسناً' }]
        );
      }
      
      // Set fallback data
      setUserStats({
        users: 0,
        views: 0,
        currentBalance: 0,
        currency: '$'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewGame = () => {
    navigation.navigate('GameCreationScreen');
  };

  const handleGamePress = (game) => {
    console.log('Opening game:', game.title);
    // Navigate to game details/edit screen
  };

  const handleGameShow = (game) => {
    console.log('Opening game show:', game.name || game.title || 'Unknown Game');
    // Navigate to game show/details screen
    navigation.navigate('GameShowScreen', { game });
  };

  const handleAccreditationRequest = async (game) => {
    try {
      if (USE_MOCK_API) {
        // TODO: Replace with actual API call when you have a backend
        // await apiService.updateGameStatus(game.id, 'submitted');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        Alert.alert(
          'تم إرسال طلب الاعتماد',
          'تم إرسال طلب اعتماد اللعبة إلى الإدارة بنجاح',
          [{ text: 'حسناً' }]
        );
      } else {
        // Real API implementation - using the website's endpoint
        await apiService.updateGameStatus(game.id, 'submitted');
        
        Alert.alert(
          'تم إرسال طلب الاعتماد',
          'تم إرسال طلب اعتماد اللعبة إلى الإدارة بنجاح',
          [{ text: 'حسناً' }]
        );
      }
    } catch (error) {
      console.error('Error requesting accreditation:', error);
      Alert.alert(
        'خطأ في إرسال الطلب',
        'حدث خطأ أثناء إرسال طلب الاعتماد. يرجى المحاولة مرة أخرى.',
        [{ text: 'حسناً' }]
      );
    }
  };

  const handleDeleteGame = async (game) => {
    console.log('handleDeleteGame called with game:', game);
    console.log('Game ID:', game.id, 'Type:', typeof game.id);
    console.log('Current deletingGameId:', deletingGameId, 'Type:', typeof deletingGameId);
    
    Alert.alert(
      'تأكيد الحذف',
      `هل أنت متأكد من حذف اللعبة "${game.title}"؟\n\nلا يمكن التراجع عن هذا الإجراء.`,
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: () => deleteGameFromAPI(game.id),
        },
      ],
      { cancelable: true }
    );
  };

  const deleteGameFromAPI = async (gameId) => {
    console.log('deleteGameFromAPI called with gameId:', gameId, 'Type:', typeof gameId);
    
    try {
      console.log('Setting deletingGameId to:', gameId);
      setDeletingGameId(gameId);
      
      if (USE_MOCK_API) {
        // Temporary mock implementation - remove this when you have a real API
        // Simulate API call delay
        console.log('Using mock API for delete');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, we'll just remove from local state
        // TODO: Replace this with actual API call when you have a backend
        /*
        // When you have a real API, uncomment the import above and use this:
        await apiService.deleteGame(gameId);
        */
        
        // Remove from local state
        console.log('Removing game from local state');
        deleteCreatedGame(gameId);
        
        // Show success message
        Alert.alert(
          'تم الحذف بنجاح',
          'تم حذف اللعبة بنجاح',
          [{ text: 'حسناً' }]
        );
      } else {
        // Real API implementation
        console.log('Deleting game with ID:', gameId);
        const response = await apiService.deleteGame(gameId);
        console.log('Delete API response:', response);
        
        // Remove from local state
        console.log('Removing game from local state');
        deleteCreatedGame(gameId);
        
        // Show success message
        Alert.alert(
          'تم الحذف بنجاح',
          'تم حذف اللعبة بنجاح',
          [{ text: 'حسناً' }]
        );
      }
      
    } catch (error) {
      console.error('Error deleting game:', error);
      
      // Show error message
      Alert.alert(
        'خطأ في الحذف',
        `حدث خطأ أثناء حذف اللعبة: ${error.message}`,
        [{ text: 'حسناً' }]
      );
    } finally {
      // Always reset the deleting state, regardless of success or failure
      console.log('Resetting deletingGameId to null');
      setDeletingGameId(null);
    }
  };

  // Calculate completion status for a game
  const getGameCompletionStatus = (game) => {
    if (!game.categories) return { categoriesCompleted: 0, questionsCompleted: 0, isFullyCompleted: false };
    
    let categoriesCompleted = 0;
    let questionsCompleted = 0;
    
    game.categories.forEach(category => {
      // Check if category is complete (has name, image, and at least one question)
      if (category.name && category.image && Object.keys(category.questions).length > 0) {
        categoriesCompleted++;
      }
      
      // Count questions in this category
      questionsCompleted += Object.keys(category.questions).length;
    });
    
    const isFullyCompleted = categoriesCompleted === 6 && questionsCompleted === 36;
    
    return {
      categoriesCompleted,
      questionsCompleted,
      isFullyCompleted
    };
  };

  // For testing purposes - you can add this sample data to test completion tracking
  // const sampleCompletedGame = {
  //   id: 'test-1',
  //   name: 'لعبة مكتملة',
  //   description: 'لعبة تجريبية مكتملة',
  //   categories: Array(6).fill(null).map((_, i) => ({
  //     id: i + 1,
  //     name: `فئة ${i + 1}`,
  //     image: { uri: 'test' },
  //     questions: {
  //       100: { question: 'سؤال 1', answer: 'إجابة 1' },
  //       200: { question: 'سؤال 2', answer: 'إجابة 2' },
  //       300: { question: 'سؤال 3', answer: 'إجابة 3' },
  //       400: { question: 'سؤال 4', answer: 'إجابة 4' },
  //       500: { question: 'سؤال 5', answer: 'إجابة 5' },
  //       600: { question: 'سؤال 6', answer: 'إجابة 6' },
  //     }
  //   }))
  // };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStatCard = (icon, title, value, color = '#60a5fa') => (
    <Animated.View
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={styles.statCardContent}>
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.statInfo}>
          <Text style={styles.statTitle}>{title}</Text>
          <Text style={[styles.statValue, { color }]}>{value}</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderGameCard = ({ item, index }) => {
    const completionStatus = getGameCompletionStatus(item);
    
    return (
      <Animated.View
        style={[
          styles.gameCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <TouchableOpacity
          style={styles.gameCardContent}
          onPress={() => handleGamePress(item)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={styles.gameCardGradient}
          >
            {/* Game Header */}
            <View style={styles.gameHeader}>
              <View style={styles.gameMainInfo}>
                <Text style={styles.gameTitle}>{item.name || item.title || 'لعبة بدون عنوان'}</Text>
                <Text style={styles.gameDescription}>{item.description || 'لا يوجد وصف'}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status || 'غير محدد'}</Text>
              </View>
            </View>

            {/* Completion Status */}
            <View style={styles.completionStatusContainer}>
              <View style={styles.completionItem}>
                <Ionicons name="layers-outline" size={16} color="#60a5fa" />
                <Text style={styles.completionText}>
                  الفئات: {completionStatus.categoriesCompleted}/6
                </Text>
              </View>
              <View style={styles.completionItem}>
                <Ionicons name="help-circle-outline" size={16} color="#10b981" />
                <Text style={styles.completionText}>
                  الأسئلة: {completionStatus.questionsCompleted}/36
                </Text>
              </View>
              {completionStatus.isFullyCompleted && (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.completedText}>مكتمل</Text>
                </View>
              )}
            </View>

            {/* Game Categories */}
            <View style={styles.categoriesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.categories && item.categories.map((category, idx) => (
                  <View key={idx} style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Game Stats */}
            <View style={styles.gameStats}>
              <View style={styles.gameStatItem}>
                <Ionicons name="people-outline" size={16} color="#60a5fa" />
                <Text style={styles.gameStatText}>{item.players || 0} لاعب</Text>
              </View>
              <View style={styles.gameStatItem}>
                <Ionicons name="eye-outline" size={16} color="#10b981" />
                <Text style={styles.gameStatText}>{item.views || 0} مشاهدة</Text>
              </View>
              <View style={styles.gameStatItem}>
                <Ionicons name="help-circle-outline" size={16} color="#f59e0b" />
                <Text style={styles.gameStatText}>{completionStatus.questionsCompleted} سؤال</Text>
              </View>
            </View>

            {/* Game Footer */}
            <View style={styles.gameFooter}>
              <View style={styles.gameMetadata}>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
                  <Text style={styles.difficultyText}>{item.difficulty || 'متوسط'}</Text>
                </View>
                <Text style={styles.gameDate}>{formatDate(item.createdAt || item.createdDate)}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleGamePress(item)}
                >
                  <Ionicons name="create-outline" size={16} color="#60a5fa" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.deleteButton,
                    String(deletingGameId) === String(item.id) && styles.deleteButtonDisabled
                  ]}
                  onPress={() => handleDeleteGame(item)}
                  disabled={String(deletingGameId) === String(item.id)}
                >
                  {String(deletingGameId) === String(item.id) ? (
                    <ActivityIndicator size="small" color="#ef4444" />
                  ) : (
                    <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons Row */}
            <View style={styles.mainActionButtons}>
              <TouchableOpacity 
                style={styles.gameShowButton}
                onPress={() => handleGameShow(item)}
              >
                <LinearGradient
                  colors={['#60a5fa', '#3b82f6']}
                  style={styles.gameShowButtonGradient}
                >
                  <Ionicons name="play-outline" size={16} color="white" />
                  <Text style={styles.gameShowButtonText}>عرض اللعبة</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.accreditationButton,
                  !completionStatus.isFullyCompleted && styles.accreditationButtonDisabled
                ]}
                onPress={() => handleAccreditationRequest(item)}
                disabled={!completionStatus.isFullyCompleted}
              >
                <LinearGradient
                  colors={completionStatus.isFullyCompleted ? ['#10b981', '#059669'] : ['#9ca3af', '#6b7280']}
                  style={styles.accreditationButtonGradient}
                >
                  <Ionicons 
                    name="shield-checkmark-outline" 
                    size={16} 
                    color="white" 
                  />
                  <Text style={styles.accreditationButtonText}>
                    طلب الاعتماد
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <Animated.View 
      style={[
        styles.emptyState,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <Ionicons name="game-controller-outline" size={80} color="#60a5fa" />
      <Text style={styles.emptyTitle}>لم تنشئ أي ألعاب بعد!</Text>
      <Text style={styles.emptyDescription}>
        ابدأ بإنشاء لعبتك الأولى وشاركها مع الآخرين
      </Text>
    </Animated.View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#2563eb', '#1d4ed8', '#1e40af']}
        style={styles.header}
      >
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.headerTitle}>أنشئ لعبتك الخاصة</Text>
          <Text style={styles.headerSubtitle}>
            حوّل أفكارك بسهولة إلى لعبة رائعة! صمم، خصص، وابدأ اللعب في دقائق
          </Text>
          
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateNewGame}
          >
            <LinearGradient
              colors={['#60a5fa', '#3b82f6']}
              style={styles.createButtonGradient}
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.createButtonText}>أنشئ لعبة جديدة</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
      >
        {/* Statistics Section */}
        <View style={styles.statisticsSection}>
          <Animated.View 
            style={[
              styles.sectionHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Ionicons name="stats-chart-outline" size={20} color="#374151" />
            <Text style={styles.sectionTitle}>الإحصائيات</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.infoButton} onPress={fetchUserData}>
                <Ionicons name="refresh-outline" size={16} color="#9ca3af" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.infoButton} 
                onPress={() => navigation.navigate('APITestScreen')}
              >
                <Ionicons name="bug-outline" size={16} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={styles.statsContainer}>
            {loading ? (
              // Loading state for statistics
              <>
                <View style={[styles.statCard, styles.statCardLoading]}>
                  <ActivityIndicator size="small" color="#60a5fa" />
                  <Text style={styles.loadingText}>جاري التحميل...</Text>
                </View>
                <View style={[styles.statCard, styles.statCardLoading]}>
                  <ActivityIndicator size="small" color="#10b981" />
                  <Text style={styles.loadingText}>جاري التحميل...</Text>
                </View>
                <View style={[styles.statCard, styles.statCardLoading]}>
                  <ActivityIndicator size="small" color="#f59e0b" />
                  <Text style={styles.loadingText}>جاري التحميل...</Text>
                </View>
              </>
            ) : (
              // Actual statistics data
              <>
                {renderStatCard('trophy-outline', 'المستخدمون', userStats.users.toLocaleString(), '#f59e0b')}
                {renderStatCard('eye-outline', 'المشاهدات', userStats.views.toLocaleString(), '#10b981')}
                {renderStatCard('wallet-outline', 'الرصيد الحالي', `${userStats.currency}${userStats.currentBalance.toLocaleString()}`, '#60a5fa')}
              </>
            )}
          </View>
        </View>

        {/* Games Section */}
        <View style={styles.gamesSection}>
          <Animated.View 
            style={[
              styles.sectionHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Ionicons name="game-controller-outline" size={20} color="#374151" />
            <Text style={styles.sectionTitle}>الألعاب</Text>
            <Text style={styles.gamesCount}>({createdGames.length})</Text>
          </Animated.View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="game-controller-outline" size={40} color="#60a5fa" />
              <Text style={styles.loadingText}>جاري تحميل ألعابك...</Text>
            </View>
          ) : createdGames.length > 0 ? (
            <FlatList
              data={createdGames}
              renderItem={renderGameCard}
              keyExtractor={(item, idx) => (item.id ? item.id.toString() : idx.toString())}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.gamesList}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          ) : (
            renderEmptyState()
          )}
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
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'System',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    fontFamily: 'System',
  },
  createButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'System',
  },
  content: {
    flex: 1,
  },
  statisticsSection: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginLeft: 8,
    fontFamily: 'System',
  },
  gamesCount: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 8,
    fontFamily: 'System',
  },
  infoButton: {
    marginLeft: 'auto',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statInfo: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontFamily: 'System',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'System',
  },
  gamesSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'System',
  },
  gamesList: {
    paddingBottom: 20,
  },
  gameCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameCardContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gameCardGradient: {
    padding: 16,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gameMainInfo: {
    flex: 1,
    marginRight: 12,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
    fontFamily: 'System',
  },
  gameDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    fontFamily: 'System',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'System',
  },
  categoriesContainer: {
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#60a5fa',
    fontWeight: '600',
    fontFamily: 'System',
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  gameStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gameStatText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    fontFamily: 'System',
  },
  gameFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'System',
  },
  gameDate: {
    fontSize: 10,
    color: '#9ca3af',
    fontFamily: 'System',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    backgroundColor: 'rgba(239, 68, 68, 0.5)',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'System',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'System',
  },
  completionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  completionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  completionText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    fontFamily: 'System',
  },
  completedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#10b981',
    marginLeft: 8,
  },
  completedText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'System',
  },
  mainActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  gameShowButton: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginRight: 8,
  },
  gameShowButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  gameShowButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'System',
  },
  accreditationButton: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginLeft: 8,
  },
  accreditationButtonDisabled: {
    opacity: 0.6,
  },
  accreditationButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  accreditationButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'System',
  },
  statCardLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testButton: {
    marginLeft: 8,
  },
});

export default CreatedGamesDashboard;