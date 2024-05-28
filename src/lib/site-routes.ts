export const SITE_ROUTES = {
  home: { path: "/", title: "Home", protected: false },
  authLogin: { path: "/auth/login", title: "Login", protected: false },
  jeopardyDashboard: { path: "/jeopardy", title: "Jeopardy", protected: true },
  jeopardyCreate: {
    path: "/jeopardy/board/create",
    title: "Create New Jeopardy",
    protected: true,
  },
  jeopardyPlay: {
    path: "/jeopardy/board/play",
    title: "Play Jeopardy!",
    protected: true,
  },
};
