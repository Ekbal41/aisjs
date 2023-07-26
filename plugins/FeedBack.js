const cache = require("memory-cache");
function FeedBack(ctx) {
  const objFromCache = cache.get("feedback");
  if (objFromCache) {
    ctx.req.feedback = objFromCache;
  } else {
    ctx.req.feedback = false;
  }
 
}

module.exports = FeedBack;
