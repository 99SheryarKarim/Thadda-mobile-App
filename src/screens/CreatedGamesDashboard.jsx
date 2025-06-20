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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CreatedGamesContext } from '../context/CreatedGamesContext';

const { width, height } = Dimensions.get('window');

// Mock data for user statistics
const mockUserStats = {
  users: 0,
  views: 0,
  currentBalance: 15,
  currency: '$'
};

const CreatedGamesDashboard = () => {
  const navigation = useNavigation();
  const { createdGames } = useContext(CreatedGamesContext);
  const [userStats, setUserStats] = useState(mockUserStats);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    fetchUserData();
    animateEntrance();
  }, []);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserStats(mockUserStats);
    } catch (error) {
      console.error('Error fetching user data:', error);
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

  const renderGameCard = ({ item, index }) => (
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
              <Text style={styles.gameTitle}>{item.title}</Text>
              <Text style={styles.gameDescription}>{item.description}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          {/* Game Categories */}
          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.categories.map((category, idx) => (
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
              <Text style={styles.gameStatText}>{item.players} لاعب</Text>
            </View>
            <View style={styles.gameStatItem}>
              <Ionicons name="eye-outline" size={16} color="#10b981" />
              <Text style={styles.gameStatText}>{item.views} مشاهدة</Text>
            </View>
            <View style={styles.gameStatItem}>
              <Ionicons name="help-circle-outline" size={16} color="#f59e0b" />
              <Text style={styles.gameStatText}>{item.questions} سؤال</Text>
            </View>
          </View>

          {/* Game Footer */}
          <View style={styles.gameFooter}>
            <View style={styles.gameMetadata}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
                <Text style={styles.difficultyText}>{item.difficulty}</Text>
              </View>
              <Text style={styles.gameDate}>{formatDate(item.createdDate)}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={16} color="#60a5fa" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={16} color="#9ca3af" />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.statsContainer}>
            {renderStatCard('trophy-outline', 'المستخدمون', userStats.users, '#f59e0b')}
            {renderStatCard('eye-outline', 'المشاهدات', userStats.views, '#10b981')}
            {renderStatCard('wallet-outline', 'الرصيد الحالي', `${userStats.currency}${userStats.currentBalance}`, '#60a5fa')}
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
    marginTop: 12,
    fontSize: 14,
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
});

export default CreatedGamesDashboard;