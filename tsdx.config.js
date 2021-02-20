
module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      config.output.name = 'graphology.gram'
      // console.log(config.external);
      delete config.external;
      config.external = ['graphology'];
    }
  
    return config;
  }
}