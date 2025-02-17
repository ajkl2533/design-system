import { colors } from './colors';
import { pxToRem } from '../utils';
import {
  Family,
  LineHeight,
  Links,
  Margin,
  Size,
  Typography,
  Weight,
} from './typography.types';
import { BASE_FONT_SIZE, BASE_LINE_HEIGHT } from './constants';

const family: Family = {
  base: "'proxima-nova', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif",
  mono: "'space-mono', 'Courier New', Courier, monospace",
};

const size: Size = {
  h0: pxToRem(BASE_FONT_SIZE * 2.625), // 42px
  h1: pxToRem(BASE_FONT_SIZE * 2.25), // 36px
  h2: pxToRem(BASE_FONT_SIZE * 1.875), // 30px
  h3: pxToRem(BASE_FONT_SIZE * 1.5), // 24px
  h4: pxToRem(BASE_FONT_SIZE * 1.125), // 18px
  h5: pxToRem(BASE_FONT_SIZE * 1.125), // 18px
  lg: pxToRem(BASE_FONT_SIZE), // 16px
  md: pxToRem(BASE_FONT_SIZE * 0.875), // 14px
  sm: pxToRem(BASE_FONT_SIZE * 0.6875), // 11px, TO BE DEPRECATED
};

const weight: Weight = {
  light: 200,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const lineHeight: LineHeight = {
  xxl: pxToRem(BASE_LINE_HEIGHT * 2), // 40px
  xl: pxToRem(BASE_LINE_HEIGHT * 1.5), // 30px
  lg: pxToRem(BASE_LINE_HEIGHT), // 20px
  md: pxToRem(BASE_LINE_HEIGHT * 0.8), // 16px
};

const margin: Margin = {
  heading: {
    h0: {
      top: pxToRem(BASE_LINE_HEIGHT * 6), // 120px
      bottom: pxToRem(BASE_LINE_HEIGHT * 3), // 60px
    },
    h1: {
      top: pxToRem(BASE_LINE_HEIGHT * 5), // 100px
      bottom: pxToRem(BASE_LINE_HEIGHT * 2.5), // 50px
    },
    h2: {
      top: pxToRem(BASE_LINE_HEIGHT * 4), // 80px
      bottom: pxToRem(BASE_LINE_HEIGHT * 2), // 40px
    },
    h3: {
      top: pxToRem(BASE_LINE_HEIGHT * 3), // 60px
      bottom: pxToRem(BASE_LINE_HEIGHT * 1.5), // 30px
    },
    h4: {
      top: pxToRem(BASE_LINE_HEIGHT * 2), // 40px
      bottom: pxToRem(BASE_LINE_HEIGHT), // 20px
    },
    h5: {
      top: pxToRem(BASE_LINE_HEIGHT * 2), // 40px
      bottom: pxToRem(BASE_LINE_HEIGHT), // 20px
    },
  },
  paragraph: {
    bottom: pxToRem(BASE_LINE_HEIGHT * 0.5), // 10px
  },
};

const createLinks = (themeColors: typeof colors): Links => ({
  primary: {
    color: themeColors.primary[500],
    hoverColor: themeColors.primary[400],
    activeColor: themeColors.primary[200],
    decoration: 'none',
  },
  danger: {
    color: themeColors.error[500],
    hoverColor: themeColors.error[600],
    activeColor: themeColors.error[700],
    decoration: 'none',
  },
  secondary: {
    color: themeColors.neutral[700],
    hoverColor: themeColors.primary[400],
    activeColor: themeColors.primary[200],
    decoration: 'underline',
  },
});

export const createTypography = (themeColors: typeof colors): Typography => ({
  family,
  size,
  weight,
  lineHeight,
  margin,
  links: createLinks(themeColors),
});
