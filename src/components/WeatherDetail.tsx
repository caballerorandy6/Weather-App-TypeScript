import { useWeatherDataStore } from "../store/store";
import { formatTemperature } from "../utils/index";
import Error from "./Error";
import Loader from "./Loader";

const WeatherDetail = () => {
  const { weatherResult, error, loading } = useWeatherDataStore();

  if (loading) return <Loader />;

  return (
    <>
      {error && <Error>{error}</Error>}
      {!weatherResult ? (
        <p>Search for a city to get the temperature</p>
      ) : (
        <div className="weatherDetailContainer">
          <h3>
            The temperature today in{" "}
            <span className="colorPrimary">{weatherResult.name}</span>
          </h3>
          <p className="current">
            Current:{" "}
            <span>{formatTemperature(weatherResult.main.temp)}&deg;C</span>
          </p>
          <div className="temperatures">
            <p className="colorPrimary">
              Min:{" "}
              <span>
                {formatTemperature(weatherResult.main.temp_min)}&deg;C
              </span>
            </p>
            <p className="colorPrimary">
              Max:{" "}
              <span>
                {formatTemperature(weatherResult.main.temp_max)}&deg;C
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherDetail;
