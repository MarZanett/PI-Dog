import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import DogCreate from "./components/dogCreated";
import DogDetail from "./components/detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element= {<LandingPage/>}/>
          <Route exact path="/home" element= {<Home/>}/>
          <Route exact path="/dogs" element= {<DogCreate/>}/>
          <Route exact path="/home/:id" element= {<DogDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
