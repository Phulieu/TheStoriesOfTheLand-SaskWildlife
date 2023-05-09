import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SpecimenList } from "../views";
import SpecimenView from "../views/SpecimenView";

function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<SpecimenList/>}/>
          <Route path="/plant/list" element={<SpecimenList/>}/>
          <Route path="/plant/:id" element={<SpecimenView/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
