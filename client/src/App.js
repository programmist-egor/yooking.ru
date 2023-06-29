import './App.css';
import './components/buttons/Buttons.css'
import "./components/blocks/Blocks.css"
import "./components/modals/Modals.css"
import "./components/filters/Filter.css"
import "./components/cards/Cards.css"
import "./components/slider/Slider.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./routes/Main";
import {HotelCity} from "./routes/HotelCity";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="HotelCity" element={<HotelCity/>}/>
              {/*<Route path="ErrorPage" element={<ErrorPage/>}/>*/}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
