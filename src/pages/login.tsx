import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authToken, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LS_TOKEN } from "../constants";
import nomadLogo from "../images/nomadLogo.jpg";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange", // validation check (onBlur also available)
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok && token) {
      console.log(token);
      localStorage.setItem(LS_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    } else {
      console.log(error);
    }
  };

  // useMutation returns an array
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col pt-10 lg:pt-28 bg-black">
      <Helmet>
        <title>Login | Nomadland</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img alt="Nomadland" src={nomadLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5 text-indigo-50">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            placeholder="Email"
            className="bg-gray-100 shadow-inner focus:ring-2  focus:ring-yellow-400 focus:ring-opacity-90 focus:outline-none py-3 px-5 rounded-lg transition-colors"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              // minLength: 6,
            })}
            type="password"
            placeholder="Password"
            className="bg-gray-100 shadow-inner focus:ring-2  focus:ring-yellow-400 focus:ring-opacity-90 focus:outline-none py-3 px-5 rounded-lg transition-colors"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {/* {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 6 char." />
          )} */}
          <Button //
            canClick={isValid}
            loading={loading}
            actionText={"Log In"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
        <div className="text-indigo-50">
          New to Nomadland?{" "}
          <Link
            to="/create-account"
            className="text-yellow-400 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
