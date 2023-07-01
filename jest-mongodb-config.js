module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.6',
      skipMD5: true
    },
    autoStart: false,
    instance: {
      dbName: 'jest'
    }
  },
  mongoURLEnvName: 'MONGODB_URI'
}
