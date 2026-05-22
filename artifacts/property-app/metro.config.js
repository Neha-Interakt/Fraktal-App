const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      '@': __dirname,
      '@src': `${__dirname}/src`,
      '@components': `${__dirname}/src/components`,
      '@screens': `${__dirname}/src/screens`,
      '@navigation': `${__dirname}/src/navigation`,
      '@services': `${__dirname}/src/services`,
      '@context': `${__dirname}/src/context`,
      '@constants': `${__dirname}/src/constants`,
      '@hooks': `${__dirname}/src/hooks`,
      '@types': `${__dirname}/src/types`,
      '@data': `${__dirname}/src/data`,
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
