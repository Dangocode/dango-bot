import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { capitalizeFirstLetter } from "../utils";

const meteo = async (city) => {
  try {
    const apiResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY_OPENWEATHER}&units=metric`
    );
    return apiResponse.data.main.temp;
  } catch (e) {
    throw new Error(`Error: ${e.response.data.message}`);
  }
};

const meteoCmd = async (msg) => {
  let cityTable = msg.content.split(" ");
  cityTable.shift();
  let city = cityTable.join(" ");

  if (!city) {
    return msg.channel.send("Usage: !meteo [city]!");
  }
  try {
    const temp = await meteo(city, msg);
    await msg.channel.send(
      `Current temperature in ${capitalizeFirstLetter(city)}: ${temp}°C`
    );
  } catch (e) {
    msg.channel.send(e.message);
  }
};

export default meteoCmd;
