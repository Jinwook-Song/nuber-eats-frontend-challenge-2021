import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { Episodes, EPISODES_QUERY } from "../listener/episodes";

describe("<Episodes />", () => {
  it("renders OK", async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: EPISODES_QUERY,
                variables: { input: { id: 1 } },
              },
              result: {
                data: {
                  getEpisodes: {
                    ok: true,
                    error: "queryError",
                    episodes: [
                      {
                        id: 1,
                        title: "Test episode",
                        category: "category",
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
              <Episodes />
            </Router>
          </HelmetProvider>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => expect(document.title).toBe("Episodes | Nomadland"));
    });
  });
});
