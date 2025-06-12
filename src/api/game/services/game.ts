/**
 * game service
 */

import { factories } from "@strapi/strapi";
import fetch from "node-fetch";
import game from "../controllers/game";

const steamApiKey = process.env.STEAM_API_KEY;
const steamID = "76561198451045399"; // Replace with a real Steam ID

type SteamPlayerSummaryResponse = {
  response: {
    players: Array<Record<string, any>>;
  };
};


type SteamGamesOwned = {
  response: {
    games: Array<Record<string, any>>;
  };
};

export default factories.createCoreService("api::game.game", ({ strapi }) => ({
  async getSteamProfile() {
    try {
      const response = await fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamID}`
      );

      const data = (await response.json()) as SteamPlayerSummaryResponse;
      return data.response.players[0] || null;
    } catch (error) {
      strapi.log.error("Failed to fetch Steam data:", error);
      throw new Error("Steam API call failed");
    }
  },

  async getSteamGames() {
    try {
      const response = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamID}&include_appinfo=true&include_played_free_games=true&format=json`
      );

      const data = await response.json() as SteamGamesOwned;
      const games = data.response.games || [];
      games.sort((a, b) => b.playtime_forever - a.playtime_forever);
      return games;
    } catch (error) {
      strapi.log.error("Failed to fetch Steam games:", error);
      throw new Error("Steam API call failed");
    }
  },
}));
