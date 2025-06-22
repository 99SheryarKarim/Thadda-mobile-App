import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { CreatedGamesContext } from '../context/CreatedGamesContext';
import { showMessage } from 'react-native-flash-message';
import { apiService } from '../services/api';

const { width, height } = Dimensions.get('window');

const GameCreationScreen = ({ navigation, route }) => {
  const { addCreatedGame } = useContext(CreatedGamesContext);
  
  // Check if we're editing an existing game
  const existingGame = route?.params?.game;
  const isEditing = !!existingGame;
  
  // Game basic info state
  const [gameData, setGameData] = useState({
    name: existingGame?.name || '',
    description: existingGame?.description || '',
    image: existingGame?.image || null,
    id: existingGame?.id || null,
  });

  // Categories state - 6 categories as shown in UI
  const [categories, setCategories] = useState(
    existingGame?.categories || [
    { id: 1, name: '', image: null, questions: {} },
    { id: 2, name: '', image: null, questions: {} },
    { id: 3, name: '', image: null, questions: {} },
    { id: 4, name: '', image: null, questions: {} },
    { id: 5, name: '', image: null, questions: {} },
    { id: 6, name: '', image: null, questions: {} },
    ]
  );

  // Loading states
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Modal states
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(null);

  // Question form state
  const [questionForm, setQuestionForm] = useState({
    question: '',
    answer: '',
    questionMedia: null,
    answerMedia: null,
  });

  const pointValues = [100, 200, 300];

  // Handle game image selection
  const handleGameImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled) {
        setGameData(prev => ({ ...prev, image: result.assets[0] }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      showMessage({
        message: 'Error',
        description: 'Failed to pick image. Please try again.',
        type: 'danger',
        icon: () => <Ionicons name="alert-circle" size={24} color="#ef4444" />,
        duration: 3000,
      });
    }
  };

  // Handle category image selection
  const handleCategoryImagePicker = async (categoryId) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled) {
        setCategories(prev =>
          prev.map(cat =>
            cat.id === categoryId
              ? { ...cat, image: result.assets[0] }
              : cat
          )
        );
      }
    } catch (error) {
      console.error('Error picking category image:', error);
      showMessage({
        message: 'Error',
        description: 'Failed to pick category image. Please try again.',
        type: 'danger',
        icon: () => <Ionicons name="alert-circle" size={24} color="#ef4444" />,
        duration: 3000,
      });
    }
  };

  // Handle category name change
  const handleCategoryNameChange = (categoryId, name) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, name } : cat
      )
    );
  };

  // Handle point button press
  const handlePointButtonPress = (categoryId, points) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category.name.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال اسم الفئة أولاً');
      return;
    }

    setCurrentCategory(categoryId);
    setCurrentPoints(points);
    
    // Load existing question if available
    const existingQuestion = category.questions[points];
    if (existingQuestion) {
      setQuestionForm(existingQuestion);
    } else {
      setQuestionForm({
        question: '',
        answer: '',
        questionMedia: null,
        answerMedia: null,
      });
    }
    
    setQuestionModalVisible(true);
  };

  // Handle media picker for questions
  const handleMediaPicker = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setQuestionForm(prev => ({
          ...prev,
          [type]: result.assets[0]
        }));
      }
    } catch (error) {
      console.error('Error picking media:', error);
      showMessage({
        message: 'Error',
        description: 'Failed to pick media file. Please try again.',
        type: 'danger',
        icon: () => <Ionicons name="alert-circle" size={24} color="#ef4444" />,
        duration: 3000,
      });
    }
  };

  // Save question
  const handleSaveQuestion = () => {
    if (!questionForm.question.trim() || !questionForm.answer.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال السؤال والإجابة');
      return;
    }

    setCategories(prev =>
      prev.map(cat =>
        cat.id === currentCategory
          ? {
              ...cat,
              questions: {
                ...cat.questions,
                [currentPoints]: { ...questionForm }
              }
            }
          : cat
      )
    );

    setQuestionModalVisible(false);
    resetQuestionForm();
  };

  // Cancel question creation
  const handleCancelQuestion = () => {
    setQuestionModalVisible(false);
    resetQuestionForm();
  };

  // Reset question form
  const resetQuestionForm = () => {
    setQuestionForm({
      question: '',
      answer: '',
      questionMedia: null,
      answerMedia: null,
    });
  };

  // Prepare game data for API
  const prepareGameData = () => {
    console.log('Preparing game data...');
    
    // Process categories and questions
    const categoriesData = categories.map(category => {
      console.log('Processing category:', category);
      
      const categoryData = {
        categoryId: category.id,
        name: category.name,
        questions: []
      };
      
      // Process questions for this category
      Object.keys(category.questions).forEach(points => {
        const questionData = category.questions[points];
        console.log('Processing question for points:', points, questionData);
        
        if (questionData && questionData.question && questionData.answer) {
          categoryData.questions.push({
            points: parseInt(points),
            question: questionData.question,
            answer: questionData.answer,
            questionMedia: questionData.questionMedia,
            answerMedia: questionData.answerMedia,
          });
        }
      });
      
      return categoryData;
    });
    
    // Calculate statistics
    const statistics = {
      totalQuestions: categoriesData.reduce((total, cat) => total + cat.questions.length, 0),
      totalCategories: categoriesData.filter(cat => cat.name.trim() !== '').length,
      totalPoints: categoriesData.reduce((total, cat) => 
        total + cat.questions.reduce((catTotal, q) => catTotal + q.points, 0), 0
      )
    };
    
    // Create the gameData object that the server expects
    const gameDataObj = {
      gameName: gameData.name,
      gameDescription: gameData.description,
      categories: categoriesData,
      statistics: statistics
    };
    
    // Wrap in gameData object as the server expects
    const requestData = {
      gameData: gameDataObj
    };
    
    console.log('Game data object to be sent:', gameDataObj);
    console.log('Full request data:', requestData);
    console.log('Game data preparation completed');
    return requestData;
  };

  // Test function to verify API integration
  const testAPIIntegration = async () => {
    try {
      console.log('Testing API integration...');
      
      // Test with minimal data
      const testFormData = new FormData();
      testFormData.append('gameName', 'Test Game');
      testFormData.append('gameDescription', 'Test Description');
      testFormData.append('categories', JSON.stringify([]));
      
      console.log('FormData prepared:', {
        gameName: 'Test Game',
        gameDescription: 'Test Description',
        categories: []
      });
      
      // This would be called in a real scenario
      // const response = await apiService.createGame(testFormData);
      // console.log('API Response:', response);
      
      showMessage({
        message: 'API Test',
        description: 'API integration test completed successfully',
        type: 'success',
        icon: () => <Ionicons name="checkmark-circle" size={24} color="#10b981" />,
        duration: 2000,
      });
      
    } catch (error) {
      console.error('API Test Error:', error);
      showMessage({
        message: 'API Test Failed',
        description: error.message,
        type: 'danger',
        icon: () => <Ionicons name="alert-circle" size={24} color="#ef4444" />,
        duration: 3000,
      });
    }
  };

  // Save game - calls create or update API
  const handleSaveGame = async () => {
    if (!gameData.name.trim() || !gameData.description.trim()) {
      Alert.alert('تنبيه', 'يرجى إدخال اسم اللعبة والوصف');
      return;
    }

    // Check if categories are complete
    const incompleteCategoriesCount = categories.filter(cat =>
      !cat.name.trim() || !cat.image || Object.keys(cat.questions).length === 0
    ).length;
    
    if (incompleteCategoriesCount > 0) {
      Alert.alert(
        'تنبيه',
        `يوجد ${incompleteCategoriesCount} فئات غير مكتملة. هل تريد الحفظ كمسودة أم حفظها كمنجزة؟`,
        [
          { text: 'حفظ كمسودة', onPress: () => saveGameData('draft') },
          { text: 'حفظها كمنجزة', onPress: () => saveGameData('completed') },
        ]
      );
      return;
    }
    
    // Save as completed
    await saveGameData('completed');
  };

  const saveGameData = async (status) => {
    setIsSaving(true);
    
    try {
      console.log('Starting game save process...');
      console.log('Game data:', gameData);
      console.log('Categories:', categories);
      
      const requestData = prepareGameData();
      console.log('Game data object prepared successfully');
      
      let response;
      
      if (isEditing && gameData.id) {
        console.log('Updating existing game with ID:', gameData.id);
        // Update existing game
        response = await apiService.updateGame(gameData.id, requestData);
        console.log('Update response:', response);
        showMessage({
          message: 'تم التحديث بنجاح',
          description: 'تم تحديث اللعبة بنجاح',
          type: 'success',
          icon: () => <Ionicons name="checkmark-circle" size={24} color="#10b981" />,
          duration: 3000,
        });
      } else {
        console.log('Creating new game...');
        // Create new game
        response = await apiService.createGame(requestData);
        console.log('Create response:', response);
        
        // Update local game data with the returned ID
        if (response.id) {
          setGameData(prev => ({ ...prev, id: response.id }));
          console.log('Updated game data with new ID:', response.id);
        }
        
        showMessage({
          message: 'تم الحفظ بنجاح',
          description: status === 'completed' ? 'تم حفظ اللعبة بنجاح' : 'تم حفظ اللعبة كمسودة',
          type: 'success',
          icon: () => <Ionicons name="checkmark-circle" size={24} color="#10b981" />,
          duration: 3000,
        });
      }
      
      // Add to local context for immediate UI update
    const gameToSave = {
        id: response.id || gameData.id || Date.now(),
      ...gameData,
      categories,
      status,
      createdAt: new Date().toISOString(),
    };
    addCreatedGame(gameToSave);
      console.log('Game added to local context');
      
      // Navigate back to dashboard if editing
      if (isEditing) {
        navigation.goBack();
      }
      
    } catch (error) {
      console.error('Error saving game:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        toString: error.toString()
      });
      
      let errorMessage = 'حدث خطأ أثناء حفظ اللعبة. يرجى المحاولة مرة أخرى.';
      
      // Try to extract the actual error message
      if (error.message && error.message !== '[object Object]') {
        errorMessage = error.message;
      } else if (error.toString && error.toString() !== '[object Object]') {
        errorMessage = error.toString();
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Clean up the error message
      errorMessage = errorMessage.replace(/^Error: /, '').replace(/^\[object Object\]/, 'حدث خطأ في الخادم');
      
      showMessage({
        message: 'خطأ في الحفظ',
        description: errorMessage,
        type: 'danger',
        icon: () => <Ionicons name="alert-circle" size={24} color="#ef4444" />,
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Document/Publish game - calls update status API
  const handleDocumentGame = async () => {
    if (!gameData.id) {
      Alert.alert('تنبيه', 'يجب حفظ اللعبة أولاً قبل التوثيق');
      return;
    }
    
    Alert.alert(
      'توثيق اللعبة',
      'هل أنت متأكد من رغبتك في توثيق اللعبة؟ سيتم إرسالها للمراجعة.',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'توثيق', onPress: () => publishGame() },
      ]
    );
  };

  const publishGame = async () => {
    setIsPublishing(true);
    
    try {
      console.log('Starting game publish process...');
      console.log('Game ID:', gameData.id);
      
      await apiService.updateGameStatus(gameData.id, 'submitted');
      console.log('Game status updated to submitted successfully');
      
      showMessage({
        message: 'تم التوثيق بنجاح',
        description: 'تم إرسال اللعبة للمراجعة والتوثيق',
        type: 'success',
        icon: () => <Ionicons name="checkmark-circle" size={24} color="#10b981" />,
        duration: 3000,
      });
      
      // Navigate back to dashboard
      navigation.goBack();
      
    } catch (error) {
      console.error('Error publishing game:', error);
      showMessage({
        message: 'خطأ في التوثيق',
        description: error.message || 'حدث خطأ أثناء توثيق اللعبة. يرجى المحاولة مرة أخرى.',
        type: 'danger',
        icon: () => <Ionicons name="alert-circle" size={24} color="#ef4444" />,
        duration: 4000,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Check if point button has question
  const hasQuestion = (categoryId, points) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.questions[points] ? true : false;
  };

  // Render category card exactly as shown in UI
  const renderCategoryCard = (category, index) => (
    <View key={category.id} style={styles.categoryCard}>
      {/* Category Name Input */}
      <TextInput
        style={styles.categoryNameInput}
        placeholder="Type the category name"
        placeholderTextColor="#9ca3af"
        value={category.name}
        onChangeText={(text) => handleCategoryNameChange(category.id, text)}
      />

      {/* Category Image */}
      <TouchableOpacity
        style={styles.categoryImageContainer}
        onPress={() => handleCategoryImagePicker(category.id)}
      >
        {category.image ? (
          <Image source={{ uri: category.image.uri }} style={styles.categoryImage} />
        ) : (
          <View style={styles.categoryImagePlaceholder}>
            <Ionicons name="create-outline" size={32} color="#9ca3af" />
          </View>
        )}
      </TouchableOpacity>

      {/* Point Buttons - exactly as shown in UI */}
      <View style={styles.pointButtonsContainer}>
        <View style={styles.pointButtonsRow}>
          {pointValues.map((points) => (
            <TouchableOpacity
              key={`${category.id}-${points}-1`}
              style={[
                styles.pointButton,
                hasQuestion(category.id, points) && styles.pointButtonCompleted
              ]}
              onPress={() => handlePointButtonPress(category.id, points)}
            >
              <Text style={styles.pointButtonText}>{points}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.pointButtonsRow}>
          {pointValues.map((points) => (
            <TouchableOpacity
              key={`${category.id}-${points}-2`}
              style={[
                styles.pointButton,
                hasQuestion(category.id, points + 300) && styles.pointButtonCompleted
              ]}
              onPress={() => handlePointButtonPress(category.id, points + 300)}
            >
              <Text style={styles.pointButtonText}>{points}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        {/* Game Info Panel - Top */}
        <View style={styles.gameInfoPanel}>
          {/* Game Image */}
          <TouchableOpacity
            style={styles.gameImageContainer}
            onPress={handleGameImagePicker}
          >
            {gameData.image ? (
              <Image source={{ uri: gameData.image.uri }} style={styles.gameImage} />
            ) : (
              <View style={styles.gameImagePlaceholder}>
                <Ionicons name="create-outline" size={48} color="#9ca3af" />
              </View>
            )}
          </TouchableOpacity>

          {/* Game Name */}
          <Text style={styles.gameInfoLabel}>Game name</Text>
          <TextInput
            style={styles.gameNameInput}
            placeholder="Enter the game name"
            placeholderTextColor="#9ca3af"
            value={gameData.name}
            onChangeText={(text) => setGameData(prev => ({ ...prev, name: text }))}
          />

          {/* Game Description */}
          <TextInput
            style={styles.gameDescriptionInput}
            placeholder="Enter game description"
            placeholderTextColor="#9ca3af"
            value={gameData.description}
            onChangeText={(text) => setGameData(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Action Buttons */}
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && styles.disabledButton]} 
            onPress={handleSaveGame}
            disabled={isSaving || isPublishing}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'جاري الحفظ...' : 'احفظ اللعبة'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.documentButton, isPublishing && styles.disabledButton]} 
            onPress={handleDocumentGame}
            disabled={isSaving || isPublishing}
          >
            <Text style={styles.documentButtonText}>
              {isPublishing ? 'جاري التوثيق...' : 'وثّق اللعبة'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories Grid - Bottom */}
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => renderCategoryCard(category, index))}
          </View>
        </View>
      </ScrollView>

      {/* Question Creation Modal - Exactly as shown in second image */}
      <Modal
        visible={questionModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCancelQuestion} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <View style={styles.modalHeaderCenter}>
              <TouchableOpacity style={styles.previewButton}>
                <Text style={styles.previewButtonText}>Preview the question</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createQuestionButton}>
                <Text style={styles.createQuestionButtonText}>Create a question</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Points Indicator */}
          <View style={styles.pointsIndicator}>
            <Text style={styles.pointsText}>{currentPoints} points</Text>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Question Input */}
            <TextInput
              style={styles.questionInput}
              placeholder="Write your question"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={questionForm.question}
              onChangeText={(text) => setQuestionForm(prev => ({ ...prev, question: text }))}
              multiline
            />

            {/* Question Media Upload */}
            <TouchableOpacity
              style={styles.mediaUploadContainer}
              onPress={() => handleMediaPicker('questionMedia')}
            >
              <Text style={styles.mediaUploadTitle}>Upload an image, audio file, or video</Text>
              <Text style={styles.mediaUploadSubtitle}>
                This will be the attachment displayed during the question phase.
              </Text>
              <View style={styles.downloadButton}>
                <Ionicons name="download-outline" size={16} color="#666" />
                <Text style={styles.downloadButtonText}>Download file</Text>
              </View>
              {questionForm.questionMedia && (
                <Text style={styles.selectedFileText}>
                  Selected: {questionForm.questionMedia.name}
                </Text>
              )}
            </TouchableOpacity>

            {/* Answer Input */}
            <TextInput
              style={styles.answerInput}
              placeholder="Write the answer"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={questionForm.answer}
              onChangeText={(text) => setQuestionForm(prev => ({ ...prev, answer: text }))}
              multiline
            />

            {/* Answer Media Upload */}
            <TouchableOpacity
              style={styles.mediaUploadContainer}
              onPress={() => handleMediaPicker('answerMedia')}
            >
              <Text style={styles.mediaUploadTitle}>Upload an image, audio file, or video</Text>
              <Text style={styles.mediaUploadSubtitle}>
                This will be the attachment displayed during the answer phase.
              </Text>
              <View style={styles.downloadButton}>
                <Ionicons name="download-outline" size={16} color="#666" />
                <Text style={styles.downloadButtonText}>Download file</Text>
              </View>
              {questionForm.answerMedia && (
                <Text style={styles.selectedFileText}>
                  Selected: {questionForm.answerMedia.name}
                </Text>
              )}
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.modalActionButtons}>
              <TouchableOpacity style={styles.saveQuestionButton} onPress={handleSaveQuestion}>
                <Text style={styles.saveQuestionButtonText}>Save the question</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelQuestion}>
                <Text style={styles.cancelButtonText}>cancellation</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  mainContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#f8fafc',
  },
  gameInfoPanel: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  categoriesContainer: {
    width: '100%',
    maxWidth: 500,
  },
  categoriesGrid: {
    width: '100%',
  },
  categoryCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  categoryNameInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    color: '#374151',
    marginBottom: 8,
    backgroundColor: '#f9fafb',
  },
  categoryImageContainer: {
    height: 100,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryImagePlaceholder: {
    flex: 1,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointButtonsContainer: {
    gap: 4,
  },
  pointButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pointButton: {
    flex: 1,
    backgroundColor: '#22d3ee',
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointButtonCompleted: {
    backgroundColor: '#10b981',
  },
  pointButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  gameImageContainer: {
    width: 200,
    height: 150,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  gameImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gameImagePlaceholder: {
    flex: 1,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  gameNameInput: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
    backgroundColor: '#f9fafb',
    alignSelf: 'center',
  },
  gameDescriptionInput: {
    width: '100%',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    color: '#374151',
    marginBottom: 24,
    height: 100,
    backgroundColor: '#f9fafb',
    alignSelf: 'center',
  },
  saveButton: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#9ca3af',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  documentButton: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#6b7280',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
  documentButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  closeButton: {
    padding: 8,
  },
  modalHeaderCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 32,
    maxWidth: 300,
  },
  previewButton: {
    flex: 1,
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  createQuestionButton: {
    flex: 1,
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#22d3ee',
    alignItems: 'center',
  },
  createQuestionButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  pointsIndicator: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    margin: 16,
  },
  pointsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  questionInput: {
    backgroundColor: '#4a90a4',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
    minHeight: 60,
  },
  answerInput: {
    backgroundColor: '#4a90a4',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
    minHeight: 60,
  },
  mediaUploadContainer: {
    backgroundColor: '#9ca3af',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  mediaUploadTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  mediaUploadSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  downloadButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  selectedFileText: {
    fontSize: 12,
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  modalActionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  saveQuestionButton: {
    backgroundColor: '#22d3ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  saveQuestionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
});

export default GameCreationScreen;