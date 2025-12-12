import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.whatsappbot.server',
  appName: 'واتساب بوت خادم',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined
    }
  },
  plugins: {
    BackgroundTask: {
      enabled: true
    },
    Network: {
      enabled: true
    },
    App: {
      enabled: true
    }
  }
};

export default config;

