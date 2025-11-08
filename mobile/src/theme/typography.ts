/**
 * Eventide AI Typography
 * Modern, rounded sans-serif font styling
 */

export const typography = {
  // Font families
  fontFamily: {
    regular: 'System', // Will use SF Pro on iOS, Roboto on Android
    medium: 'System',
    bold: 'System',
  },
  
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  
  // Font weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

