import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { Podcasts, PODCASTS_QUERY } from "../listener/podcasts";

describe("<Podcasts />", () => {
  it("renders OK", async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: PODCASTS_QUERY,
              },
              result: {
                data: {
                  getAllPodcasts: {
                    ok: true,
                    error: "queryError",
                    podcasts: [
                      {
                        id: 1,
                        title: "Test title",
                        category: "Test category",
                        rating: 3,
                      },
                    ],
                  },
                },
              },
            },
          ]}
        >
          <HelmetProvider>
            <Router>
              <Podcasts />
            </Router>
          </HelmetProvider>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => expect(document.title).toBe("Home | Nomadland"));
    });
  });
});
