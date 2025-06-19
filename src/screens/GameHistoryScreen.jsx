import React, { useState, useEffect } from 'react';
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

const { width, height } = Dimensions.get('window');

// Mock data for game history
const mockGameHistory = [
  {
    id: 1,
    name: 'لعبة الأصدقاء',
    date: '2024-01-15',
    players: ['أحمد', 'فاطمة', 'محمد', 'سارة'],
    categories: ['الألغاز والأمثال', 'التكنولوجيا', 'الرياضة'],
    status: 'مكتملة',
    score: { team1: 45, team2: 38 },
    duration: '25 دقيقة',
    winner: 'الفريق الأول'
  },
  {
    id: 2,
    name: 'تحدي العائلة',
    date: '2024-01-12',
    players: ['علي', 'نور', 'خالد'],
    categories: ['التاريخ العربي', 'الجغرافيا'],
    status: 'متوقفة',
    score: { team1: 22, team2: 18 },
    duration: '15 دقيقة',
    winner: null
  },
  {
    id: 3,
    name: 'ليلة الألعاب',
    date: '2024-01-10',
    players: ['ليلى', 'عمر', 'ريم', 'يوسف', 'مريم'],
    categories: ['أصوات المشاهير', 'ماذا ترى؟', 'قمصان الأندية'],
    status: 'مكتملة',
    score: { team1: 52, team2: 41 },
    duration: '35 دقيقة',
    winner: 'الفريق الأول'
  }
];

const GameHistoryScreen = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    fetchGameHistory();
    animateEntrance();
    startPulseAnimation();
  }, []);

  const animateEntrance = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const fetchGameHistory = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGameHistory(mockGameHistory);
    } catch (error) {
      console.error('Error fetching game history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewGame = () => {
    console.log('Starting new game...');
    // Navigate to game categories screen
  };

  const handleContinueGame = (game) => {
    console.log('Continuing game:', game.name);
    // Navigate to game screen with saved state
  };

  const handleRestartGame = (game) => {
    console.log('Restarting game:', game.name);
    // Restart game with same settings
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتملة': return '#10b981';
      case 'متوقفة': return '#f59e0b';
      case 'جارية': return '#60a5fa';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderGameCard = ({ item, index }) => (
    <Animated.View
      style={[
        styles.gameCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: pulseAnim }
          ],
        }
      ]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
        style={styles.cardGradient}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.gameInfo}>
            <Text style={styles.gameName}>{item.name}</Text>
            <Text style={styles.gameDate}>{formatDate(item.date)}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        {/* Players */}
        <View style={styles.playersSection}>
          <Ionicons name="people-outline" size={16} color="#60a5fa" />
          <Text style={styles.playersText}>
            {item.players.slice(0, 3).join('، ')}
            {item.players.length > 3 && ` +${item.players.length - 3}`}
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Ionicons name="grid-outline" size={16} color="#60a5fa" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.categories.map((category, idx) => (
              <View key={idx} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Game Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Ionicons name="trophy-outline" size={16} color="#f59e0b" />
            <Text style={styles.statText}>
              {item.winner || 'لم تكتمل'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="#60a5fa" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.scoreText}>
              {item.score.team1} - {item.score.team2}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {item.status === 'متوقفة' ? (
            <TouchableOpacity
              style={[styles.actionButton, styles.continueButton]}
              onPress={() => handleContinueGame(item)}
            >
              <Ionicons name="play-outline" size={16} color="white" />
              <Text style={styles.actionButtonText}>متابعة</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.restartButton]}
              onPress={() => handleRestartGame(item)}
            >
              <Ionicons name="refresh-outline" size={16} color="white" />
              <Text style={styles.actionButtonText}>إعادة تشغيل</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={[styles.actionButton, styles.detailsButton]}>
            <Ionicons name="information-circle-outline" size={16} color="#60a5fa" />
            <Text style={[styles.actionButtonText, { color: '#60a5fa' }]}>التفاصيل</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
      <Text style={styles.emptyTitle}>لم تلعب أي ألعاب بعد!</Text>
      <Text style={styles.emptyDescription}>
        ابدأ لعبتك الأولى واستمتع بتجربة ألعاب رائعة مع الأصدقاء
      </Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2332" />
      <LinearGradient
        colors={['#1a2332', '#2d3748', '#1a2332']}
        style={styles.background}
      >
        {/* Background Decorative Elements */}
        <Animated.View 
          style={[
            styles.decorativeCircle1,
            {
              opacity: fadeAnim,
              transform: [{ scale: pulseAnim }],
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.decorativeCircle2,
            {
              opacity: fadeAnim,
              transform: [{ scale: pulseAnim }],
            }
          ]} 
        />
        <View style={styles.decorativeWave1} />
        <View style={styles.decorativeWave2} />

        {/* Header Section */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.title}>
            !جميع الألعاب التي{' '}
            <Text style={styles.highlightText}>لعبتها</Text>
            {' '}موجودة هنا
          </Text>
          
          <Text style={styles.description}>
            يمكنك متابعة أو إعادة تشغيل الألعاب التي لعبتها من خلال النقر على
            "ألعابي" أو إنشاء لعبة جديدة
          </Text>

          <TouchableOpacity
            style={styles.newGameButton}
            onPress={handleNewGame}
          >
            <LinearGradient
              colors={['#60a5fa', '#3b82f6']}
              style={styles.newGameGradient}
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.newGameText}>لعبة جديدة</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Games List */}
        <View style={styles.gamesContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Ionicons name="game-controller-outline" size={40} color="#60a5fa" />
              </Animated.View>
              <Text style={styles.loadingText}>جاري تحميل ألعابك...</Text>
            </View>
          ) : gameHistory.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Ionicons name="time-outline" size={20} color="#60a5fa" />
                <Text style={styles.sectionTitle}>الألعاب السابقة</Text>
                <Text style={styles.gamesCount}>({gameHistory.length})</Text>
              </View>
              
              <FlatList
                data={gameHistory}
                renderItem={renderGameCard}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gamesList}
              />
            </>
          ) : (
            renderEmptyState()
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(96, 165, 250, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 100,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(96, 165, 250, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.08)',
  },
  decorativeWave1: {
    position: 'absolute',
    top: height * 0.2,
    left: -width * 0.1,
    width: width * 1.2,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'rgba(96, 165, 250, 0.02)',
    transform: [{ rotate: '10deg' }],
  },
  decorativeWave2: {
    position: 'absolute',
    bottom: height * 0.3,
    right: -width * 0.1,
    width: width * 1.2,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: 'rgba(96, 165, 250, 0.02)',
    transform: [{ rotate: '-15deg' }],
  },
  header: {
    padding: 24,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16,
    fontFamily: 'System',
  },
  highlightText: {
    color: '#60a5fa',
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 16,
    fontFamily: 'System',
  },
  newGameButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  newGameGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  newGameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'System',
  },
  gamesContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#cbd5e1',
    fontFamily: 'System',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 8,
    fontFamily: 'System',
  },
  gamesCount: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 8,
    fontFamily: 'System',
  },
  gamesList: {
    paddingBottom: 24,
  },
  gameCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    fontFamily: 'System',
  },
  gameDate: {
    fontSize: 12,
    color: '#9ca3af',
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
  playersSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playersText: {
    fontSize: 14,
    color: '#cbd5e1',
    marginLeft: 8,
    fontFamily: 'System',
  },
  categoriesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#60a5fa',
    fontWeight: '600',
    fontFamily: 'System',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#cbd5e1',
    marginLeft: 4,
    fontFamily: 'System',
  },
  scoreText: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'System',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 0.48,
    justifyContent: 'center',
  },
  continueButton: {
    backgroundColor: '#10b981',
  },
  restartButton: {
    backgroundColor: '#60a5fa',
  },
  detailsButton: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  actionButtonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'System',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
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

export default GameHistoryScreen;