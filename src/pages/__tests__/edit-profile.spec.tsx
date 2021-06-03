import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { EditProfile, EDIT_PROFILE_MUTATION } from "../user/edit-profile";
import { MockedProvider } from "@apollo/client/testing";
import { ME_QUERY } from "../../hooks/useMe";
import { UserRole } from "../../__generated__/globalTypes";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const userData = {
  data: {
    me: {
      id: 1,
      email: "test@test.com",
      role: UserRole.Host,
    },
  },
};

describe("<EditProfile />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      const handler = () => Promise.resolve(userData);
      mockedClient.setRequestHandler(ME_QUERY, handler);
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  myProfile: {
                    id: 1,
                    email: "test@test.com",
                    role: UserRole.Listener,
                  },
                },
              },
            },
          ]}
        >
          <HelmetProvider>
            <Router>
              <ApolloProvider client={mockedClient}>
                <EditProfile />
              </ApolloProvider>
            </Router>
          </HelmetProvider>
        </MockedProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Edit Profile | Nomadland");
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        editProfile: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(
      EDIT_PROFILE_MUTATION,
      mockedMutationResponse
    );
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      input: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
