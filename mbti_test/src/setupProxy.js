const { createProxyMiddleware } = require("http-proxy-middleware"); //기능 추가
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      // api가붙어있는 url만 찾을건데
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false, // 보안은 사용하지않을것입니다.
    })
  );
};
