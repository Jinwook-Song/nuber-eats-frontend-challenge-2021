import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { AddPodcast } from "../pages/host/add-podcast";
import { MyPodcast } from "../pages/host/my-podcast";
import { MyPodcasts } from "../pages/host/my-podcasts";
import { Episodes } from "../pages/listener/episodes";
import { Podcasts } from "../pages/listener/podcasts";
import { EditProfile } from "../pages/user/edit-profile";
import { UserRole } from "../__generated__/globalTypes";

const commonRoutes = [
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
];
const hostRoutes = [
  {
    path: "/",
    component: <MyPodcasts />,
  },
  {
    path: "/add-podcast",
    component: <AddPodcast />,
  },
  {
    path: "/podcasts/:id",
    component: <MyPodcast />,
  },
];
const listenerRoutes = [
  {
    path: "/",
    component: <Podcasts />,
  },
  {
    path: "/podcasts/:id",
    component: <Episodes />,
  },
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
        {data.me.role === UserRole.Host &&
          hostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Listener &&
          listenerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
