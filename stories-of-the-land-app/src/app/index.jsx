import {NavBar} from "../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SpecimenList } from "../views";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/plants/list" element={<SpecimenList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
