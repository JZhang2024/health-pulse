import { developmentConfig } from './development';

const isProd = process.env.NODE_ENV === 'production';

export const config = {
  api: {
    baseUrl: isProd 
      ? '/api/vitals'
      : developmentConfig.api.usePythonServer
        ? `${developmentConfig.api.pythonServerUrl}/api/vitals`
        : '/api/vitals',
    mockLatency: isProd ? 0 : developmentConfig.api.mockLatency,
  }
};

export type Config = typeof config;