import { setupServer } from "msw/node";

const createServer = (handlers) => {
  const server = setupServer(...handlers);

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
