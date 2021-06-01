import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Episodes } from "../pages/listener/episodes";
import { Podcasts } from "../pages/listener/podcasts";
import { EditProfile } from "../pages/user/edit-profile";

const ListenerRoutes = [
  <Route key={1} path="/" exact>
    <Podcasts />
  </Route>,
  <Route key={2} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
  <Route key={3} path="/podcasts/:id" exact>
    <Episodes />
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
        {data.me.role === "Listener" && ListenerRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
