import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nomadLogo from "../images/nomadLogo.jpg";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Listener,
    },
  });

  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      // redirect to login page
      history.push("/");
    } else {
      console.log(error);
    }
  };
  // useMutation returns an array
  const [
    createAccountMutation,
    { data: createAccountMutationResult, loading },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    const { email, password, role } = getValues();
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col pt-10 lg:pt-28 bg-black">
      <Helmet>
        <title>Create Account | Nomadland</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 ">
        <img alt="Nomadland" src={nomadLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5 text-indigo-50">
          Let's get started
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
            className="bg-gray-100 shadow-inner focus:ring-2  focus:ring-yellow-400 focus:ring-opacity-90 focus:outline-none py-3 px-5 rounded-lg"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {/* {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 6 char." />
          )} */}
          <select
            {...register("role", { required: true })}
            className="bg-gray-100 shadow-inner focus:ring-2  focus:ring-yellow-400 focus:ring-opacity-90 focus:outline-none py-3 px-5 rounded-lg"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>

          <Button //
            canClick={isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult?.createAccount.error}
            />
          )}
        </form>
        <div className="text-indigo-50">
          Already have an account?{" "}
          <Link to="/" className="text-yellow-400 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
