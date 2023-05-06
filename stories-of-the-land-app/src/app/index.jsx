import {NavBar} from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/plants/list"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
