import { create } from "zustand";
import axios from "axios";
import { z } from "zod";
import { devtools } from "zustand/middleware";
import { SearchType } from "../types";

const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});
export type Weather = z.infer<typeof WeatherSchema>;

interface WeatherData {
  searchType: SearchType;
  error?: string | null;
  fetchWeatherData: (data: SearchType) => Promise<void>;
  weatherResult: Weather | null;
  loading: boolean;
}

export const useWeatherDataStore = create<WeatherData>()(
  devtools((set) => ({
    searchType: {
      city: "",
      country: "",
    },
    showWeather: false,
    error: null,
    weatherResult: null,
    loading: false,

    fetchWeatherData: async (search: SearchType) => {
      set({ loading: true, weatherResult: null });

      const { city, country } = search;
      const apiKey = import.meta.env.VITE_API_KEY;
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
      try {
        const { data } = await axios.get(geoUrl);
        console.log(data);
        const result = WeatherSchema.safeParse(data);
        console.log(result);
        if (result)
          set({
            searchType: search,
            error: null,
            loading: false,

            weatherResult: result.success ? result.data : null,
          });
      } catch (error) {
        set({
          error: "City not found!",
          weatherResult: null,
          loading: false,
        });
      } finally {
        set({ loading: false });
      }
    },
  }))
);
