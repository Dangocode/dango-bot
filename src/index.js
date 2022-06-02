import dotenv from "dotenv";
dotenv.config();
const Discord = require("discord.js");
const client = new Discord.Client();
import meteoCmd from "./cmd/meteo";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content === "!ping") {
    msg.channel.send("pong");
  } else if (msg.content.startsWith("!meteo")) {
    await meteoCmd(msg);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
