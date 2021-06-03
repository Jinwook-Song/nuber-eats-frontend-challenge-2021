import { render, waitFor } from "../../test-utils";
import { ApolloProvider } from "@apollo/client";
import { RenderResult, act } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ME_QUERY } from "../../hooks/useMe";
import { LoggedInRouter } from "../logged-in-router";
import { UserRole } from "../../__generated__/globalTypes";

const userData = {
  data: {
    me: {
      id: 1,
      email: "test@test.com",
      role: UserRole.Host,
    },
  },
};

describe("<LoggedInRouter />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      const handler = () => Promise.resolve(userData);
      mockedClient.setRequestHandler(ME_QUERY, handler);
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoggedInRouter />
        </ApolloProvider>
      );
    });
  });

  it("renders OK go to not found", async () => {
    const { getByText } = renderResult;
    await waitFor(() => {
      getByText("Page Not Found.");
    });
  });
});
