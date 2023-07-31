const { cyan, red, magenta } = require("colorette");

function runPlugin(pluginObj, ctx) {
  pluginObj.forEach(async (plugin) => {
    let pluginName = plugin.name;
    if (!pluginName) {
      console.log(`
          ${red("Error")} : Plugin must be a named function.
          `);
    }
    await plugin(ctx);

    // try {
    //   await plugin(ctx);
    // } catch (err) {
    //   console.log(err.stack);
    //   ctx.res.error(err, (msg = `Error in Plugin ${pluginName || "_______"}`));
    // }
  });
}

module.exports = runPlugin;
