import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  I18nManager,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameCatogeriesScreen from './GameCatogeriesScreen';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable RTL layout for Arabic
I18nManager.allowRTL(true);

const { width, height } = Dimensions.get('window');

const PlayScreen = () => {
  const insets = useSafeAreaInsets();
  const handleStartPlaying = () => {
    console.log('Start playing pressed');
    // Add your navigation or game start logic here
  };

  // Animated sparkle/star
  const sparkleAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(sparkleAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const sparkleScale = sparkleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] });
  const sparkleOpacity = sparkleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom App Bar */}
      <View style={[styles.appBar, { paddingTop: insets.top + 12 }]}>
        {/* App Icon with gradient border */}
        <LinearGradient
          colors={['#60a5fa', '#1a2332']}
          style={styles.appIconGradient}
        >
          <View style={styles.appIconCircle}>
            <Ionicons name="sparkles" size={28} color="#fff" />
          </View>
        </LinearGradient>
        <Text style={styles.appBarTitle}>تحدي</Text>
        {/* Animated sparkle/star icon */}
        <Animated.View style={{ marginLeft: 8, transform: [{ scale: sparkleScale }], opacity: sparkleOpacity }}>
          <Ionicons name="star" size={26} color="#60a5fa" />
        </Animated.View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={['#1a2332', '#2d3748', '#1a2332']}
          style={styles.background}
        >
          {/* Background decorative elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
          <View style={styles.decorativeWave} />
          <View style={styles.contentCard}>
            <View style={styles.textContainer}>
              <Text style={styles.mainHeading}>
                أسهل طريقة{' '}
                <Text style={styles.highlightText}>للاستمتاع</Text>
              </Text>
              <Text style={styles.subHeading}>اللعب مع الأصدقاء</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  اجمع أصدقاءك وانطلق في رحلة ألعاب مثيرة. في التحدي،
                </Text>
                <Text style={styles.description}>يمكنك الاستمتاع</Text>
                <Text style={styles.description}>
                  بتجربة ألعاب سلسة وممتعة تناسب جميع المستويات.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartPlaying}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>ابدأ اللعب</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* Divider and GameCatogeriesScreen */}
        <View style={styles.sectionDivider} />
        <GameCatogeriesScreen />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.1,
    right: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.2,
    left: -width * 0.4,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(59, 130, 246, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.08)',
  },
  decorativeWave: {
    position: 'absolute',
    top: height * 0.3,
    left: -width * 0.2,
    width: width * 1.4,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(59, 130, 246, 0.02)',
    transform: [{ rotate: '15deg' }],
  },
  contentCard: {
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 2,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 45,
    marginBottom: 8,
    fontFamily: 'System', // Use system Arabic font
    writingDirection: 'rtl',
  },
  highlightText: {
    color: '#60a5fa',
  },
  subHeading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 45,
    marginBottom: 32,
    fontFamily: 'System', // Use system Arabic font
    writingDirection: 'rtl',
  },
  descriptionContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 4,
    fontFamily: 'System', // Use system Arabic font
    writingDirection: 'rtl',
  },
  startButton: {
    backgroundColor: '#60a5fa',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#60a5fa',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'System', // Use system Arabic font
    writingDirection: 'rtl',
  },
  sectionDivider: {
    height: 8,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    marginBottom: 0,
    zIndex: 3,
  },
  appBar: {
    width: '100%',
    backgroundColor: '#1a2332',
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  appIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1a2332',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    color: '#60a5fa',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'System',
    flex: 0,
  },
});

export default PlayScreen;