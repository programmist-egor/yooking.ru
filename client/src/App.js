import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./routes/Main";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main/>}/>
              {/*<Route path="ErrorPage" element={<ErrorPage/>}/>*/}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
