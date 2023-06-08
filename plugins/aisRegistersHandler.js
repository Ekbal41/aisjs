const aisRegistersHandler = (context, next) => {
  const { ais } = context;
  //   console.log(ais.assetsFolder);

  next();
};

module.exports = aisRegistersHandler;
