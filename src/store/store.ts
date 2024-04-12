import { create } from "zustand";
import axios from "axios";
//import { object, string, number, Output, parse } from "valibot";
import { z } from "zod";
import { devtools } from "zustand/middleware";
import { SearchType } from "../types";

//Zod schema
const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});
type Weather = z.infer<typeof WeatherSchema>;

//Valibot schema
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   }),
// });
// type Weather = Output<typeof WeatherSchema>;

interface WeatherData {
  searchType: SearchType;
  error?: string | null;
  fetchWeatherData: (data: SearchType) => Promise<void>;
  weatherResult?: Weather | null;
}

export const useWeatherDataStore = create<WeatherData>()(
  devtools((set) => ({
    searchType: {
      city: "",
      country: "",
    },

    fetchWeatherData: async (search: SearchType) => {
      const { city, country } = search;
      const apiKey = import.meta.env.VITE_API_KEY;
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
      try {
        const { data } = await axios(geoUrl);
        console.log(data);

        //Zod validation
        const result = WeatherSchema.safeParse(data);
        // if (result.success) {
        //   result.data.name;
        //   console.log(result.data.main.temp);
        // } else {
        //   console.log("Bad Request");
        // }

        //Valibot validation
        // const result = parse(WeatherSchema, data);
        // if (result) {
        //   console.log(result.name);
        // } else {
        //   console.log("Bad Request");
        // }

        set({
          // Tambien se puede hacer asi "searchType: { city, country },"
          searchType: search,
          error: null,
          fetchWeatherData: data,
          weatherResult: result.success ? result.data : null,
        });
      } catch (error) {
        set({ error: "City not found" });
      }
    },
  }))
);
