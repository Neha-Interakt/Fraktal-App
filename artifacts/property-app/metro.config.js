const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@': __dirname,
  '@src': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@screens': path.resolve(__dirname, 'src/screens'),
  '@navigation': path.resolve(__dirname, 'src/navigation'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@context': path.resolve(__dirname, 'src/context'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@data': path.resolve(__dirname, 'src/data'),
};

const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    if (moduleName === 'react-native-linear-gradient') {
      return { filePath: path.resolve(__dirname, 'src/shims/LinearGradient.web.tsx'), type: 'sourceFile' };
    }
    if (moduleName === 'react-native-keychain') {
      return { filePath: path.resolve(__dirname, 'src/shims/Keychain.web.ts'), type: 'sourceFile' };
    }
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
