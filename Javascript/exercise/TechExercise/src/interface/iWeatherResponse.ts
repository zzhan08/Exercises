import ILocation from "./iLocation";
import IWeather from "./iWeather";

export default interface IWeatherResponse {
  "coord":ILocation ,
  "weather": IWeather[],
  "base"?: "stations",
  "main"?: any,
  "visibility"?: number,
  "wind"?: any,
  "clouds"?: any,
  "dt"?: number,
  "sys"?: any,
  "timezone"?: number,
  "id"?: number,
  "name"?: string,
  "cod"?: number
}