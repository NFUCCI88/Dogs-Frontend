import {Route} from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Create from "./views/Create/Create";
import Detail from "./views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


function App() {

  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar></NavBar>}
   
      <Route exact path = "/">
        <Landing></Landing>
      </Route>
      <Route path = "/home"> 
        <Home></Home>
      </Route>
      <Route path = "/create">
        <Create></Create>
      </Route>
      <Route path = "/detail/:id">
        <Detail></Detail>
      </Route>

    </div>
  );
}

export default App;
