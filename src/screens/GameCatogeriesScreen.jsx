import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

// Mock API data - replace with actual API call
const mockGameCategories = [
  {
    id: 1,
    title: 'الألغاز والأمثال',
    icon: 'puzzle-outline',
    color: '#60a5fa',
    difficulty: 'متوسط',
    questionsCount: 6
  },
  {
    id: 2,
    title: 'أصوات المشاهير',
    icon: 'mic-outline',
    color: '#34d399',
    difficulty: 'صعب',
    questionsCount: 6
  },
  {
    id: 3,
    title: 'التكنولوجيا',
    icon: 'laptop-outline',
    color: '#f59e0b',
    difficulty: 'سهل',
    questionsCount: 6
  },
  {
    id: 4,
    title: 'كأس العالم',
    icon: 'trophy-outline',
    color: '#ef4444',
    difficulty: 'متوسط',
    questionsCount: 6
  },
  {
    id: 5,
    title: 'ماذا ترى؟',
    icon: 'eye-outline',
    color: '#8b5cf6',
    difficulty: 'سهل',
    questionsCount: 6
  },
  {
    id: 6,
    title: 'قمصان الأندية',
    icon: 'shirt-outline',
    color: '#06b6d4',
    difficulty: 'صعب',
    questionsCount: 6
  },
  {
    id: 7,
    title: 'التاريخ العربي',
    icon: 'library-outline',
    color: '#d946ef',
    difficulty: 'صعب',
    questionsCount: 6
  },
  {
    id: 8,
    title: 'الجغرافيا',
    icon: 'earth-outline',
    color: '#10b981',
    difficulty: 'متوسط',
    questionsCount: 6
  }
];

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

const GameCategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Simulate API call
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, replace with: const response = await fetch('your-api-endpoint');
      setCategories(mockGameCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchText.toLowerCase())
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
        style={[
          styles.categoryCard,
          { backgroundColor: item.color },
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
          <Ionicons name={item.icon} size={40} color="white" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>
            {item.questionsCount} أسئلة • {item.difficulty}
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* Filter Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#6b7280" />
          </TouchableOpacity>
          {categoryFilters.map(renderFilterButton)}
        </ScrollView>

        {/* Selected Categories Counter */}
        <View style={styles.selectionCounter}>
          <Text style={styles.counterText}>
            الفئات المختارة: {selectedCategories.length}/6
          </Text>
        </View>

        {/* Categories Grid */}
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.categoriesContainer}
          scrollEnabled={false}
        />
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
  selectionCounter: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    fontFamily: 'System',
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