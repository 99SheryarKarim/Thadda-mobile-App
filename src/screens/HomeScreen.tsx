import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Modal, Image } from "react-native"

const { width } = Dimensions.get("window")

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuOption = (option: 'BuyGame' | 'Profile' | 'Logout') => {
    setMenuVisible(false);
    // Implement navigation or actions for menu options here
    if (option === 'Profile') {
      // Navigate to Profile tab
    }
    if (option === 'Logout') {
      // Implement logout logic
    }
    if (option === 'BuyGame') {
      // Implement buy game logic
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logo}>
              <View style={styles.logoIcon} />
              <Text style={styles.logoText}>منصة</Text>
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hamburger Menu Modal */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity style={styles.menuOverlay} onPress={() => setMenuVisible(false)} activeOpacity={1}>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('BuyGame')}>
                <Text style={styles.menuText}>Buy Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('Profile')}>
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('Logout')}>
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>تجربة مبتكرة تجمع</Text>
              <Text style={styles.heroSubtitle}>
                بين <Text style={styles.highlightText}>الثقافة</Text> و
              </Text>
              <Text style={styles.heroSubtitle}>الإبداع</Text>
              <Text style={styles.heroDescription}>
                استمتع بتجربة فريدة من نوعها تجمع بين التقاليد العريقة والحداثة الإبداعية في رحلة ثقافية ملهمة
              </Text>
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>ابدأ الآن</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>تحديات جديدة</Text>
          <Text style={styles.sectionSubtitle}>في كل فئة</Text>

          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📚</Text>
              </View>
              <Text style={styles.featureTitle}>تعليمي</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>⚙️</Text>
              </View>
              <Text style={styles.featureTitle}>تطوير</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🚗</Text>
              </View>
              <Text style={styles.featureTitle}>سيارات</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>👨‍💼</Text>
              </View>
              <Text style={styles.featureTitle}>مبيعات</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📊</Text>
              </View>
              <Text style={styles.featureTitle}>إدارة</Text>
            </View>

            <View style={[styles.featureCard, styles.specialCard]}>
              <Text style={styles.specialCardTitle}>20+</Text>
              <Text style={styles.specialCardSubtitle}>تطبيق أكثر من</Text>
              <Text style={styles.specialCardDescription}>مجال متنوع ومختلف</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutContent}>
            <View style={styles.aboutImageContainer}>
              <View style={styles.aboutImage} />
              <View style={styles.aboutImageBg} />
            </View>

            <View style={styles.aboutText}>
              <Text style={styles.aboutTitle}>نبذة عن تحدي</Text>
              <Text style={styles.aboutDescription}>
                تحدي منصة إبداعية تهدف إلى تطوير المهارات والقدرات الإبداعية من خلال تحديات متنوعة ومبتكرة تجمع بين
                التعلم والمتعة في بيئة تفاعلية محفزة للإبداع
              </Text>
              <TouchableOpacity style={styles.aboutButton}>
                <Text style={styles.aboutButtonText}>تعرف علينا</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Process Section */}
        <View style={styles.processSection}>
          <Text style={styles.processSectionTitle}>جاهز لتجربة تحدي؟</Text>

          <View style={styles.processSteps}>
            <View style={styles.processStep}>
              <View style={[styles.stepNumber, { backgroundColor: "#3b82f6" }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
            </View>

            <View style={styles.processStep}>
              <View style={[styles.stepNumber, { backgroundColor: "#06b6d4" }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
            </View>

            <View style={styles.processStep}>
              <View style={[styles.stepNumber, { backgroundColor: "#1e293b" }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
            </View>

            <View style={styles.processStep}>
              <View style={[styles.stepNumber, { backgroundColor: "#06b6d4" }]}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <Text style={styles.pricingSectionTitle}>باقاتنا تناسب الجميع</Text>
          <Text style={styles.pricingSectionSubtitle}>اختر الباقة المناسبة لك ولمشروعك</Text>

          <View style={styles.pricingCards}>
            {/* Basic Plan */}
            <View style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Text style={styles.planBadge}>باقة أساسية</Text>
                <Text style={styles.planNumber}>1</Text>
              </View>
              <Text style={styles.planName}>الأساسية</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>20</Text>
                <Text style={styles.currency}>SAR</Text>
              </View>
              <Text style={styles.priceDescription}>شهرياً لكل مستخدم</Text>

              <View style={styles.features}>
                <View style={styles.feature}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>خدمة عملاء متميزة</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>دعم فني متخصص</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>تحديثات مجانية مدى الحياة</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.planButton}>
                <Text style={styles.planButtonText}>اختر الباقة</Text>
              </TouchableOpacity>
            </View>

            {/* Premium Plan */}
            <View style={[styles.pricingCard, styles.premiumCard]}>
              <View style={styles.pricingHeader}>
                <Text style={[styles.planBadge, styles.premiumBadge]}>الأكثر شعبية</Text>
                <Text style={styles.planNumber}>2</Text>
              </View>
              <Text style={[styles.planName, styles.premiumPlanName]}>المتقدمة</Text>
              <View style={styles.priceContainer}>
                <Text style={[styles.price, styles.premiumPrice]}>75</Text>
                <Text style={[styles.currency, styles.premiumCurrency]}>SAR</Text>
              </View>
              <Text style={[styles.priceDescription, styles.premiumDescription]}>شهرياً لكل مستخدم</Text>

              <View style={styles.features}>
                <View style={styles.feature}>
                  <Text style={styles.premiumFeatureCheck}>✓</Text>
                  <Text style={[styles.featureText, styles.premiumFeatureText]}>استضافة مجانية لمدة سنة</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.premiumFeatureCheck}>✓</Text>
                  <Text style={[styles.featureText, styles.premiumFeatureText]}>تطبيق جوال</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.premiumFeatureCheck}>✓</Text>
                  <Text style={[styles.featureText, styles.premiumFeatureText]}>دعم فني على مدار الساعة</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.premiumFeatureCheck}>✓</Text>
                  <Text style={[styles.featureText, styles.premiumFeatureText]}>تحديثات مجانية مدى الحياة</Text>
                </View>
              </View>

              <TouchableOpacity style={[styles.planButton, styles.premiumButton]}>
                <Text style={[styles.planButtonText, styles.premiumButtonText]}>اختر الباقة</Text>
              </TouchableOpacity>
            </View>

            {/* Enterprise Plan */}
            <View style={styles.pricingCard}>
              <View style={styles.pricingHeader}>
                <Text style={styles.planBadge}>باقة متقدمة</Text>
                <Text style={styles.planNumber}>10</Text>
              </View>
              <Text style={styles.planName}>المؤسسات</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>180</Text>
                <Text style={styles.currency}>SAR</Text>
              </View>
              <Text style={styles.priceDescription}>شهرياً لكل مستخدم</Text>

              <View style={styles.features}>
                <View style={styles.feature}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>خدمة عملاء متميزة</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>دعم فني متخصص</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>تحديثات مجانية مدى الحياة</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.planButton}>
                <Text style={styles.planButtonText}>اختر الباقة</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <View style={styles.footerLogoIcon} />
              <Text style={styles.footerLogoText}>المنصة الثقافية</Text>
            </View>
            <Text style={styles.footerDescription}>جميع الحقوق محفوظة لمنصة تحدي الثقافي</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity style={styles.socialLink}>
                <Text style={styles.socialIcon}>📘</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialLink}>
                <Text style={styles.socialIcon}>🐦</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // Header Styles
  header: {
    backgroundColor: "#ffffff",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#06b6d4",
    borderRadius: 15,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },

  // Hero Section Styles
  heroSection: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: "center",
  },
  heroText: {
    alignItems: "center",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  highlightText: {
    color: "#06b6d4",
  },
  heroDescription: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  ctaButton: {
    backgroundColor: "#06b6d4",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  ctaButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Features Section Styles
  featuresSection: {
    backgroundColor: "#ffffff",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 40,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  featureIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  specialCard: {
    backgroundColor: "#1e293b",
    width: (width - 60) / 2,
  },
  specialCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  specialCardSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 5,
  },
  specialCardDescription: {
    fontSize: 12,
    color: "#94a3b8",
  },

  // About Section Styles
  aboutSection: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  aboutContent: {
    alignItems: "center",
  },
  aboutImageContainer: {
    position: "relative",
    marginBottom: 30,
  },
  aboutImage: {
    width: 200,
    height: 250,
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
  },
  aboutImageBg: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 150,
    height: 150,
    backgroundColor: "#06b6d4",
    borderRadius: 75,
    opacity: 0.2,
  },
  aboutText: {
    alignItems: "center",
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 20,
  },
  aboutDescription: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  aboutButton: {
    backgroundColor: "#06b6d4",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  aboutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Process Section Styles
  processSection: {
    backgroundColor: "#ffffff",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  processSectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 40,
  },
  processSteps: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  processStep: {
    alignItems: "center",
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumberText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Pricing Section Styles
  pricingSection: {
    backgroundColor: "#1e293b",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  pricingSectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  pricingSectionSubtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 40,
  },
  pricingCards: {
    gap: 20,
  },
  pricingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
  },
  premiumCard: {
    backgroundColor: "#06b6d4",
    transform: [{ scale: 1.05 }],
  },
  pricingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  planBadge: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  premiumBadge: {
    backgroundColor: "#ffffff",
    color: "#06b6d4",
  },
  planNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#64748b",
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 15,
  },
  premiumPlanName: {
    color: "#ffffff",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 5,
  },
  price: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e293b",
  },
  premiumPrice: {
    color: "#ffffff",
  },
  currency: {
    fontSize: 18,
    color: "#64748b",
    marginLeft: 5,
  },
  premiumCurrency: {
    color: "#ffffff",
  },
  priceDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 25,
  },
  premiumDescription: {
    color: "#ffffff",
  },
  features: {
    marginBottom: 25,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureCheck: {
    color: "#22c55e",
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
  },
  premiumFeatureCheck: {
    color: "#ffffff",
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 14,
    color: "#64748b",
    flex: 1,
  },
  premiumFeatureText: {
    color: "#ffffff",
  },
  planButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  premiumButton: {
    backgroundColor: "#ffffff",
  },
  planButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  premiumButtonText: {
    color: "#06b6d4",
  },

  // Footer Styles
  footer: {
    backgroundColor: "#1e293b",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  footerContent: {
    alignItems: "center",
  },
  footerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  footerLogoIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#06b6d4",
    borderRadius: 15,
    marginRight: 10,
  },
  footerLogoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footerDescription: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 20,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 15,
  },
  socialLink: {
    width: 40,
    height: 40,
    backgroundColor: "#334155",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    fontSize: 20,
  },

  // Hamburger Menu Styles
  menuButton: {
    width: 24,
    height: 18,
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#1e293b",
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
})

export default HomeScreen
