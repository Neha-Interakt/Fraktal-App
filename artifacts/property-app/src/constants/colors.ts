const Colors = {
  primary: '#1a365d',
  primaryDark: '#00122c',
  gold: '#c9a227',
  goldBright: '#ffcb29',
  bg: '#e9e9e9',
  white: '#ffffff',
  surface: '#f8f8f8',
  surfaceAlt: '#edf2f7',
  border: '#d1d5dc',
  muted: '#718096',
  placeholder: '#a0aec0',
  text: '#1a1a1a',
  textLight: '#4a5568',
  green: '#38a169',
  red: '#e53e3e',
  amber: '#d69e2e',
  cardBg: '#fbfbfb',
} as const;

export default Colors;
export type ColorKey = keyof typeof Colors;
