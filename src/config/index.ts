import { developmentConfig } from './development';

const usePythonServer = process.env.NEXT_PUBLIC_USE_PYTHON_SERVER === 'true';

export const config = {
  api: {
    baseUrl: usePythonServer
      ? `${developmentConfig.api.pythonServerUrl}/api/vitals`
      : `${process.env.NEXT_PUBLIC_API_URL}`,
    mockLatency: usePythonServer ? 0 : developmentConfig.api.mockLatency,
  }
};

export type Config = typeof config;