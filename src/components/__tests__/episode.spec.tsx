import { render } from "@testing-library/react";
import { Episode } from "../episode";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Episode />", () => {
  it("renders OK with props", () => {
    const episodeProps = {
      id: "1",
      title: "name",
      category: "category",
    };
    const { getByText } = render(
      <Router>
        <Episode {...episodeProps} />
      </Router>
    );
    getByText(episodeProps.title);
    getByText(episodeProps.category);
  });
});
