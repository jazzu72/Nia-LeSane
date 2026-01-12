export const theme = {
  colors: {
    background: '#120024', // Deep Soul Purple
    primary: '#FFD700', // Jazz Gold
    secondary: '#E6E6FA', // Lavender Mist
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    card: '#2A0A3B',
    error: '#FF4444',
    success: '#00FA9A',
  },
  glass: {
    background: 'rgba(42, 10, 59, 0.7)', // Translucent card
    border: 'rgba(255, 215, 0, 0.3)', // Faint gold border
    blur: 10,
  },
  shadows: {
    premium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    glow: {
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 8,
    }
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  fonts: {
    heading: 'System', // Placeholder for custom font
    body: 'System',
  }
};
