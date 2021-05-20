import { Redirect, Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/launches" />} />
      <Route path="/launches" component={HomePage} />
    </Switch>
  );
};

export default App;
