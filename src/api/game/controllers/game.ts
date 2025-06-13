/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::game.game", ({ strapi }) => ({
  async getSteamProfile(ctx) {
    try {
      const profile = await strapi.service("api::game.game").getSteamProfile();
      ctx.send(profile);
    } catch (error) {
      ctx.throw(500, "Failed to fetch Steam profile");
    }
  },

  async getSteamGames(ctx) {
    try {
      const games = await strapi.service("api::game.game").getSteamGames();
      ctx.send(games);
    } catch (error) {
      ctx.throw(500, "Failed to fetch Steam games");
    }
  },
  async getRandomGame(ctx) {
    try {
      const game = await strapi.service("api::game.game").getRandomGame();
      if (!game) {
        ctx.throw(404, "no games found");
      }
      ctx.send(game);
    } catch (error) {
      ctx.throw(500, "Failed to fetch random Steam game");
    }
  },
}));
