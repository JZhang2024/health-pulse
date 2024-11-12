export const developmentConfig = {
  api: {
    usePythonServer: process.env.NEXT_PUBLIC_USE_PYTHON_SERVER === 'true',
    pythonServerUrl: process.env.NEXT_PUBLIC_PYTHON_SERVER_URL || 'http://localhost:8000',
    mockLatency: 2000,
  }
};