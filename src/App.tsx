import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
function App() {
  return (
    <>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/admin">
          <Main />
        </Route>
  
      </Switch>
    </>
  );
}

export default App;
