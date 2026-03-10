export const theme = {
  colors: {
    background: '#0F011A', // Deeper Soul Purple
    surface: '#1A0229',
    primary: '#FFD700', // Jazz Gold
    primaryLight: '#FFEC8B',
    secondary: '#D8BFD8', // Thistle Lavender
    accent: '#B8860B', // Dark Gold
    text: '#FFFFFF',
    textSecondary: '#A090B0', // Muted Lavender-Grey
    card: '#240636',
    error: '#FF4D4D',
    success: '#00FF9F',
    info: '#00BFFF',
  },
  gradients: {
    soulful: ['#120024', '#2A0A3B', '#0F011A'],
    jazzGold: ['#FFD700', '#B8860B'],
    glass: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
  },
  glass: {
    background: 'rgba(36, 6, 54, 0.6)',
    border: 'rgba(255, 215, 0, 0.25)',
    blur: 16,
    activeBackground: 'rgba(36, 6, 54, 0.8)',
  },
  shadows: {
    premium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 12,
    },
    glow: {
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 20,
      elevation: 10,
    },
    inner: {
      shadowColor: 'rgba(255, 215, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
    }
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  fonts: {
    heading: 'System',
    body: 'System',
    mono: 'System',
  },
  borderRadius: {
    s: 8,
    m: 16,
    l: 24,
    full: 9999,
  }
};
