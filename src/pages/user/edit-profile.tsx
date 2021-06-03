import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData, refetch } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    // refetch();
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
    }
  };

  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
      password: "",
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    if (!loading) {
      editProfile({
        variables: {
          input: {
            email,
            ...(password !== "" && { password }),
          },
        },
      });
    }
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nomadland</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
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
          className="bg-gray-100 shadow-inner focus:ring-2  focus:ring-yellow-400 focus:ring-opacity-90 focus:outline-none py-3 px-5 rounded-lg transition-colors"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          {...register("password", {
            // minLength: 6,
          })}
          className="bg-gray-100 shadow-inner focus:ring-2  focus:ring-yellow-400 focus:ring-opacity-90 focus:outline-none py-3 px-5 rounded-lg transition-colors"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
