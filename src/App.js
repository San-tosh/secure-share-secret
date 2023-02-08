import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Receive from './pages/receive';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/receive" element={<Receive />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
