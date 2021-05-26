import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../../apollo";
import { LS_TOKEN } from "../../constants";

export const Podcasts = () => {
  const history = useHistory();

  const onClick = () => {
    localStorage.removeItem(LS_TOKEN);
    isLoggedInVar(false);
    history.push("/");
  };
  return (
    <div>
      <h1>Podcasts</h1>
      <button onClick={onClick}>Log Out</button>
    </div>
  );
};
