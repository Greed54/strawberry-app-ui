// eslint-disable-next-line
import * as styledComponents from 'styled-components';
// eslint-disable-next-line
import {ThemedStyledComponentsModule} from 'styled-components';

const {default: styled, css, ThemeProvider} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

interface Colors {
  whiteGrey: string;
  white: string;
  lightGreen: string;
  baseLightGreen: string;
  baseGreen: string;
  baseDark: string;
  lightDark: string;
  mediumDark: string;
  gray: string;
  lightGray: string;
}

export interface Size {
  tiny: string | number;
  small: string | number;
  medium: string | number;
  big: string | number;
  large: string | number;
}

export interface ThemeInterface {
  margin: Size;
  colors: Colors;
  size: any;
  text: any;
  padding: any;
  fontStyles: any;
  buttonColor: any;
}

export const theme = {
  text: {
    color: '#000',
    colorLight: 'rgba(255, 255, 255, .7)',
    size: {
      tiny: '12px',
      small: '14px',
      medium: '20px',
      mediumBig: '24px',
      big: '30px',
      large: '38px',
    },
  },
  padding: {
    table: '0 16px',
    cell: '0 16px',
  },
  background: {
    hover: '#E6ECF3',
  },
  size: {
    rowHeight: '31px',
    collapseHeader: 74,
    tableHeader: 35,
    headerHeight: '48px',
  },
  colors: {
    whiteGrey: '#F3F4F6',
    white: '#FAFAFA',
    lightGreen: '#8DE4AF',
    baseLightGreen: '#389583',
    baseGreen: '#004E16',
    baseDark: '#002140',
    lightDark: '#263343',
    mediumDark: '#272727',
    gray: '#D8D8D8',
    lightGray: '#D9D9D9',
  },
  margin: {
    tiny: '8px',
    small: '16px',
    medium: '24px',
    big: '32px',
    large: '40px',
  },
  grid: {
    tiny: 8,
    small: 16,
    medium: 24,
    big: 32,
    large: 40,
  },
  fontStyles: {
    heading1: {
      size: '38px',
    },
    heading2: {
      size: '30px',
    },
    heading3: {
      size: '24px',
    },
    heading4: {
      size: '16px',
      bold: true,
    },
    display: {
      size: '20px',
      bold: true,
    },
    bodyLead: {
      size: '16px',
    },
    bodyText: {
      size: '14px',
    },
    caption: {
      size: '12px',
      bold: true,
    },
  },
  buttonColor: {
    normal: '#E8E8E8',
    hover: '#F2F2F2',
    focus: '#F2F2F2',
    active: '#BBBBBB',
  },
};

export default styled;
export {css, ThemeProvider};
