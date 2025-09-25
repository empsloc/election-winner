// light-theme.ts
import type { Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(245, 245, 245)',
    text: 'rgb(17, 24, 28)',
    border: 'rgb(229, 231, 235)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
  },
};
