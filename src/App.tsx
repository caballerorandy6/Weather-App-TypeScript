import Form from "./components/Form";
import WeatherDetail from "./components/WeatherDetail";

function App() {
  return (
    <>
      <h1 className="title">Weather App</h1>
      <div className="container">
        <Form />
        <WeatherDetail />
      </div>
    </>
  );
}

export default App;
