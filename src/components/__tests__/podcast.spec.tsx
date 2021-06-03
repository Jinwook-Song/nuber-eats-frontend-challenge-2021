import { render } from "@testing-library/react";
import { Podcast } from "../podcast";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Podcast />", () => {
  it("renders OK with props", () => {
    const podcastProps = {
      id: "1",
      title: "name",
      category: "category",
      rating: 0,
    };
    const { getByText, container } = render(
      <Router>
        <Podcast {...podcastProps} />
      </Router>
    );
    getByText(podcastProps.title);
    getByText(podcastProps.category);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/podcasts/${podcastProps.id}`
    );
  });
});
