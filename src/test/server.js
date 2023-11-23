import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const createServer = (handlerConfig) => {
  const handlers = handlerConfig.map((config) => {
    return http[config.method || "get"];
  });

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
    window.localStorage.clear();
  });
  afterAll(() => {
    server.close();
  });
};

export default createServer;
