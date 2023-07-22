const { cyan, red, magenta } = require("colorette");

function runPlugin(pluginObj, ctx) {
  pluginObj.forEach(async (plugin) => {
    let pluginName = plugin.name;
    if (!pluginName) {
      console.log(`
          ${red("Error")} : Plugin must be a named function.
          `);
    }

    try {
      await plugin(ctx);
    } catch (err) {
      console.log(`
          ${red("Error")} in scope of <${magenta(
        plugin.name || "_______"
      )}> Plugin. ${err}
          `);
    }
  });
}

module.exports = runPlugin;
