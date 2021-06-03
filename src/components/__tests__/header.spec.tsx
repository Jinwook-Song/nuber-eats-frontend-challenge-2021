import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Header } from "../header";

describe("<Header />", () => {
  it("renders header", async () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>
    );

    expect(container.firstChild?.firstChild?.firstChild).toHaveAttribute(
      "href",
      "/"
    );
  });
});
