import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Podcasts } from "../pages/host/podcast";

const HostRoutes = [
  <Route path="/" exact>
    <Podcasts />
  </Route>,
];

export const LoggedInRouter = () => {
  // from api
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Host" && HostRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
