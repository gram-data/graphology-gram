
module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'graphology.gram'
      delete config.external;
    }
  
    return config;
  }
}