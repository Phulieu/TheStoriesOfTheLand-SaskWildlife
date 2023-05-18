import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QRGenerate, LogInView, SpecimenList } from "../views";
import SpecimenView from "../views/SpecimenView";
import AddSpecimen from "../views/AddSpecimen";

/**
 * MAIN react 
 * @returns 
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<LogInView/>}/>
          <Route path="/plant/list" element={<SpecimenList/>}/>
          <Route path="/plant/:id" element={<SpecimenView/>}/>
          <Route path="/add-specimen" element={<AddSpecimen/>}/>
          <Route path="/plant/:SpecimenID/QRCode" element={<QRGenerate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
