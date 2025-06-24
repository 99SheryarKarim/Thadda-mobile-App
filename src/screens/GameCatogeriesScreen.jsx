import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import placeholderImg from '../../assets/images.jpeg';
import ApiService from '../services/api';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

const categoryFilters = [
  { id: 'all', title: 'الكل', active: true },
  { id: 'works', title: 'أعمال' },
  { id: 'language', title: 'لغة' },
  { id: 'series', title: 'مسلسلات' },
  { id: 'mystery', title: 'غموض' },
  { id: 'general', title: 'معرفة عامة' },
  { id: 'sports', title: 'رياضة' },
  { id: 'community', title: 'ألعاب مجتمعية' }
];

const API_GAMES_URL = 'https://tahadda-dev-env.onrender.com/api/v1/category/category-list';
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2MmMxYmNmLTMzNzgtNDYyYS1hODExLWRjZDA2NjMyNDE2NiIsInJvbGUiOiJ2aXNpdG9yIiwiZW1haWwiOiJ0ZXN0MTNAZ21haWwuY29tIiwiaWF0IjoxNzUwNTA5MTkzLCJleHAiOjE3NTIzMjM1OTN9.s1nP4OiXS6sMTBu7WitZp2DR1xw6MPt1ysgIOizKFaY';

const GameCategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState('');
  const [createdGames, setCreatedGames] = useState([]);
  const [createdGamesLoading, setCreatedGamesLoading] = useState(true);
  const [createdGamesError, setCreatedGamesError] = useState('');
  const [visibleGamesCount, setVisibleGamesCount] = useState(6);

  useEffect(() => {
    fetchCategories();
    fetchAllGames();
    fetchCreatedGames();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://tahadda-dev-env.onrender.com/api/v1/community/mygames', {
        headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
      });
      const data = await response.json();
      console.log('API games data:', data);
      const games = Array.isArray(data) ? data : (data.games || []);
      setCategories(games);
      if (!games.length) setError('No games found from the server.');
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('An error occurred while loading games: ' + error.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllGames = async () => {
    try {
      setGamesLoading(true);
      setGamesError('');
      const response = await fetch(API_GAMES_URL, {
        headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
      });
      const data = await response.json();
      setAllGames(Array.isArray(data) ? data : []);
      if (!data || !data.length) setGamesError('لم يتم العثور على ألعاب.');
    } catch (error) {
      setGamesError('حدث خطأ أثناء تحميل الألعاب: ' + error.message);
      setAllGames([]);
    } finally {
      setGamesLoading(false);
    }
  };

  const fetchCreatedGames = async () => {
    try {
      setCreatedGamesLoading(true);
      setCreatedGamesError('');
      const api = new ApiService();
      const data = await api.getUserGames();
      let games = [];
      if (data && data.games && Array.isArray(data.games)) {
        games = data.games.map(game => ({
          id: game.id,
          name: game.gameName || game.name,
          title: game.gameName || game.name,
          description: game.gameDescription || game.description,
          status: game.status || 'draft',
          createdAt: game.createdAt || game.createdDate,
          image: game.image || game.gameImage || null,
          categories: game.categories ? game.categories.map(category => ({
            id: category.id,
            name: category.name || category.categoryName,
            image: category.image || category.categoryImage || null,
            questions: category.questions || category.questionData || {}
          })) : [],
          players: game.statistics?.players || game.players || 0,
          views: game.statistics?.views || game.views || 0,
          difficulty: game.difficulty || 'متوسط'
        }));
      } else if (Array.isArray(data)) {
        games = data.map(game => ({
          id: game.id,
          name: game.gameName || game.name,
          title: game.gameName || game.name,
          description: game.gameDescription || game.description,
          status: game.status || 'draft',
          createdAt: game.createdAt || game.createdDate,
          image: game.image || game.gameImage || null,
          categories: game.categories ? game.categories.map(category => ({
            id: category.id,
            name: category.name || category.categoryName,
            image: category.image || category.categoryImage || null,
            questions: category.questions || category.questionData || {}
          })) : [],
          players: game.statistics?.players || game.players || 0,
          views: game.statistics?.views || game.views || 0,
          difficulty: game.difficulty || 'متوسط'
        }));
      }
      setCreatedGames(games);
      if (!games.length) setCreatedGamesError('لم يتم العثور على ألعاب أنشأها المستخدمون.');
    } catch (error) {
      setCreatedGamesError('حدث خطأ أثناء تحميل الألعاب التي أنشأها المستخدمون: ' + error.message);
      setCreatedGames([]);
    } finally {
      setCreatedGamesLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    (category.title || category.name || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCategorySelect = (category) => {
    if (selectedCategories.find(item => item.id === category.id)) {
      setSelectedCategories(selectedCategories.filter(item => item.id !== category.id));
    } else if (selectedCategories.length < 6) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRandomSelection = () => {
    if (categories.length === 0) return;
    const randomIndex = Math.floor(Math.random() * categories.length);
    setSelectedCategories([categories[randomIndex]]);
  };

  const renderCategoryCard = ({ item }) => {
    const isSelected = selectedCategories.find(cat => cat.id === item.id);
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.categoryCard,
          { backgroundColor: '#60a5fa' },
          isSelected && styles.selectedCard
        ]}
        onPress={() => handleCategorySelect(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <Ionicons name={'help-circle-outline'} size={40} color="white" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{item.title || item.name}</Text>
          <Text style={styles.cardSubtitle}>
            {(item.questionsCount || (item.questions ? item.questions.length : 0)) + ' أسئلة'}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.activeFilterButton
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter.id && styles.activeFilterButtonText
      ]}>
        {filter.title}
      </Text>
    </TouchableOpacity>
  );

  // Helper component for fallback image
  const GameImage = ({ uri }) => {
    const [error, setError] = useState(false);
    return (
      <Image
        source={error || !uri ? placeholderImg : { uri }}
        style={{ width: 100, height: 80, borderRadius: 10, marginBottom: 8, backgroundColor: '#e5e7eb' }}
        resizeMode="cover"
        onError={() => setError(true)}
      />
    );
  };

  const renderAllGameCard = ({ item }) => (
    <View style={{ flex: 1, margin: 8, backgroundColor: '#fff', borderRadius: 16, padding: 10, alignItems: 'center', shadowColor: '#60a5fa', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2, maxWidth: cardWidth }}>
      <GameImage uri={item.img} />
      <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#60a5fa', textAlign: 'center', marginBottom: 4 }}>{item.category}</Text>
      <Text style={{ fontSize: 12, color: '#6b7280', textAlign: 'center' }} numberOfLines={2}>{item.description}</Text>
    </View>
  );

  // Helper to chunk array into rows of 2
  const chunkArray = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  };

  // Add a helper for the status badge
  const getStatusColor = (status) => {
    switch (status) {
      case 'نشطة':
      case 'approved':
        return '#10b981'; // green
      case 'مسودة':
      case 'draft':
        return '#f59e0b'; // yellow
      case 'متوقفة':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  // Professional card component for a game with touch feedback and reduced height
  const GameCard = ({ game, hideStatus }) => {
    const scale = React.useRef(new Animated.Value(1)).current;
    const handlePressIn = () => {
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ flex: 1 }}
      >
        <Animated.View style={{
          transform: [{ scale }],
          margin: 8,
          backgroundColor: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          shadowColor: '#2563eb',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.13,
          shadowRadius: 12,
          elevation: 6,
          maxWidth: cardWidth,
          minHeight: 160,
          position: 'relative',
        }}>
          {/* Game Image */}
          <View style={{ width: '100%', height: 68, backgroundColor: '#e5e7eb' }}>
            <Image
              source={game.img || game.image || game.gameImage ? { uri: game.img || game.image || game.gameImage } : placeholderImg}
              style={{ width: '100%', height: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              resizeMode="cover"
            />
            {/* Status Badge (conditionally render) */}
            {!hideStatus && (
              <View style={{
                position: 'absolute',
                top: 7,
                right: 7,
                backgroundColor: getStatusColor(game.status),
                borderRadius: 8,
                paddingHorizontal: 7,
                paddingVertical: 1,
                zIndex: 2,
              }}>
                <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>{game.status || 'غير محدد'}</Text>
              </View>
            )}
          </View>
          {/* Game Info */}
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#2563eb', textAlign: 'center', marginBottom: 2 }} numberOfLines={1}>
              {game.category || game.title || game.name}
            </Text>
            <Text style={{ fontSize: 11, color: '#6b7280', textAlign: 'center', marginBottom: 2 }} numberOfLines={2}>
              {game.description || game.gameDescription || 'لا يوجد وصف'}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Filter createdGames to only include approved games
  const approvedCreatedGames = createdGames.filter(game => (game.status || '').toLowerCase() === 'approved');

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#60a5fa" />
          <Text style={styles.loadingText}>جاري تحميل الفئات...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        {/* Error Message */}
        {error && error !== 'No games found from the server.' ? (
          <View style={{ padding: 16, backgroundColor: '#fee2e2', borderRadius: 8, margin: 16 }}>
            <Text style={{ color: '#b91c1c', fontWeight: 'bold', textAlign: 'center' }}>{error}</Text>
          </View>
        ) : null}
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>اختر فئات اللعب</Text>
          <TouchableOpacity
            style={styles.randomButton}
            onPress={handleRandomSelection}
          >
            <Ionicons name="dice-outline" size={20} color="white" />
            <Text style={styles.randomButtonText}>اختيار عشوائي</Text>
          </TouchableOpacity>
          <Text style={styles.description}>
            اختر 3 فئات لفريقك و 3 للفريق المنافس. لكل فئة، هناك 6 أسئلة مختلفة،
            كل منها يستحق عدد معين من النقاط حسب مستوى الصعوبة.
          </Text>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن فئة معينة أو اسم لعبة"
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={setSearchText}
            textAlign="right"
          />
        </View>
        {/* Filter Buttons (horizontal FlatList) */}
        <FlatList
          data={categoryFilters}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
          ListHeaderComponent={() => (
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
          renderItem={({ item }) => renderFilterButton(item)}
        />
        {/* User Created Games Section (moved up) */}
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#374151', marginLeft: 24, marginTop: 16 }}>ألعاب أنشأها المستخدمون</Text>
        {createdGamesLoading ? (
          <ActivityIndicator size="small" color="#60a5fa" style={{ marginVertical: 16 }} />
        ) : createdGamesError ? (
          <Text style={{ color: '#b91c1c', textAlign: 'center', marginVertical: 8 }}>{createdGamesError}</Text>
        ) : (
          <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
            {chunkArray(approvedCreatedGames, 2).map((row, rowIndex) => (
              <View key={`created-row-${rowIndex}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {row.map(item => (
                  <GameCard key={item.id} game={item} hideStatus />
                ))}
              </View>
            ))}
          </View>
        )}
        {/* All Games Title and Grid (paginated) */}
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#374151', marginLeft: 24, marginTop: 8 }}>كل الألعاب</Text>
        <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
          {chunkArray(allGames.slice(0, visibleGamesCount), 2).map((row, rowIndex) => (
            <View key={`allgames-row-${rowIndex}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {row.map(item => (
                <GameCard key={item.id} game={item} />
              ))}
            </View>
          ))}
          {visibleGamesCount < allGames.length && (
            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 12, backgroundColor: '#60a5fa', borderRadius: 20, paddingHorizontal: 32, paddingVertical: 10 }}
              onPress={() => setVisibleGamesCount(count => Math.min(count + 6, allGames.length))}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>عرض المزيد</Text>
            </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'System',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#60a5fa',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'System',
    letterSpacing: 1,
  },
  randomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60a5fa',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  randomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
    fontFamily: 'System',
    marginTop: 8,
    marginBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    marginHorizontal: 24,
    marginBottom: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontFamily: 'System',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 24,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  activeFilterButton: {
    backgroundColor: '#60a5fa',
    borderColor: '#60a5fa',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  activeFilterButtonText: {
    color: 'white',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    minHeight: 160,
    maxWidth: cardWidth,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedCard: {
    borderColor: '#1565C0',
    borderWidth: 3,
    backgroundColor: '#e0f2fe',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  infoButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'System',
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: 'System',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 2,
  },
});

export default GameCategoriesScreen;