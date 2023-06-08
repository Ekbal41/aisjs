urlParserPlugin = (context, next) => {
  const { httpObj, request, isMatched, response } = context;
  for (const requestObj of httpObj) {
    console.log(requestObj.path)
    const regexPattern = urlParser(requestObj.path);
    const regex = new RegExp(`^${regexPattern}(\\?.*)?$`);
    const optionallyMatched = regex.test(request.url.replace(/\/$/, ''));
    if (optionallyMatched) {
      context.isMatched = true;
      return requestObj.callback(request, response);
    }
  }
};
function urlParser(url) {
  let regexPattern = "";

  for (let i = 0; i < url.length; i++) {
    const c = url.charAt(i);
    if (c === ":") {
      let param = "";
      let j;
      for (j = i + 1; j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }
      regexPattern += `(?<${param}>\\w+)`;
      i = j - 1;
    } else {
      regexPattern += c;
    }
  }

  return regexPattern;
}

module.exports = urlParserPlugin;
