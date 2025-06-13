export default {
  routes: [
    {
      method: "GET",
      path: "/game/steam-profile",
      handler: "game.getSteamProfile",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/game/steam-games",
      handler: "game.getSteamGames",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/game/random-game",
      handler: "game.getRandomGame",
      config: {
        policies: [],
      },
    },
  ],
};
