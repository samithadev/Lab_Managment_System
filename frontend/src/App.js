
import './App.css';
import AddTest from './components/LabTests/AddTest';
import AllLabTests from './components/LabTests/AllLabTests';
import Home from './components/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import UpdateTest from './components/LabTests/UpdateTest';
import CreateReport from './components/LabReports/CreateReport';
import AllAssis from './components/LabAssistants/AllAssis';
import UpdateAssis from './components/LabAssistants/UpdateAssis';
import Patient from './components/Patient';
import AllRequests from './components/LabTestRequest/AllRequests';
import Sidebar from './components/sidebar/Header2'

function App() {
  return (
    <BrowserRouter>
    {/* <Sidebar/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/patient' element={<Patient/>}/>
      <Route path='/allLabTests' element={<AllLabTests/>}/>
      <Route path='/allAssistants' element={<AllAssis/>}/>
      <Route path='/allRequests' element={<AllRequests/>}/>
      <Route path='/createReport/:id' element={<CreateReport/>}/>
      <Route path="/edit/:id" element={<UpdateTest/>}/>
      <Route path="/editAssistant/:id" element={<UpdateAssis/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
