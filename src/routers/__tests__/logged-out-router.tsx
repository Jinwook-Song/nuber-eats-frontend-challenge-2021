import { render, waitFor } from "../../test-utils";
import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { LoggedOutRouter } from "../logged-out-router";

describe("<LoggedOutRouter />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoggedOutRouter />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    const { getByText } = renderResult;
    await waitFor(() => {
      getByText("Log In");
    });
  });
});
