export function createMockUser() {
  return {
    id: "mockId123",
    email: "mock@email.com",
  };
}

export function createMockContext() {
  return {
    fastify: {},
    req: {
      log: {
        trace: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
        fatal: () => {},
      },
    },
    res: {},
    user: createMockUser(),
  };
}
