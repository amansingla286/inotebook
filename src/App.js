import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import React,{useState} from 'react';
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";


function App() {
  const [alert, setAlert] = useState("Null");

  const showAlert = (meassage, type) => {
    setAlert({
      msg: meassage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  
  return (
    <>
    
      <NoteState>
        <Router>
          <Navbar />
<Alert alert={alert} />

        <div className="container my-3"></div>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showalert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/signup">
                <Signup/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
