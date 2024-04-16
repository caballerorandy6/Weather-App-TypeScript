import { countries } from "../data/country";
import { useWeatherDataStore } from "../store/store";
import { useForm } from "react-hook-form";
import Error from "./Error";
import { SearchType } from "../types";

const Form = () => {
  const { fetchWeatherData } = useWeatherDataStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchType>();

  const onSubmit = async (search: SearchType) => {
    await fetchWeatherData(search);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="city">City: </label>
        <input
          id="city"
          type="text"
          placeholder="City"
          {...register("city", { required: "The city is required!" })}
        />
        {errors.city && <Error>{errors?.city?.message?.toString()}</Error>}
      </div>

      <div className="field">
        <label htmlFor="country">Country: </label>
        <select
          id="country"
          {...register("country", { required: "The country is required!" })}
        >
          <option value="">-- Select a country -- </option>
          {countries.map(({ name, code }) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </select>
        {errors.country && (
          <Error>{errors?.country?.message?.toString()}</Error>
        )}
      </div>
      <button type="submit">Check the weather</button>
    </form>
  );
};

export default Form;
