import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createPodcast,
  createPodcastVariables,
} from "../../__generated__/createPodcast";

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      error
      ok
      id
    }
  }
`;

interface IFormProps {
  title: string;
  category: string;
}

export const AddPodcast = () => {
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: createPodcast) => {
    const {
      createPodcast: { ok, id },
    } = data;
    if (ok) {
      history.push("/");
    }
  };

  const [createPodcastMutation, { loading, data }] = useMutation<
    createPodcast,
    createPodcastVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted,
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { title, category } = getValues();
    if (!loading) {
      createPodcastMutation({
        variables: {
          input: {
            title,
            category,
          },
        },
      });
    }
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Restaurant | Nomadland</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Restaurant</h4>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="input"
          {...register("title", { required: "Title is required." })}
          placeholder="Title"
          type="text"
        />
        {errors.title?.message && (
          <FormError errorMessage={errors.title?.message} />
        )}
        <input
          className="input"
          {...register("category", { required: "Category is required." })}
          placeholder="Category"
          type="text"
        />
        {errors.category?.message && (
          <FormError errorMessage={errors.category?.message} />
        )}

        <Button
          canClick={isValid}
          loading={loading}
          actionText="Create Restaurant"
        />
        {data?.createPodcast?.error && (
          <FormError errorMessage={data.createPodcast.error} />
        )}
      </form>
    </div>
  );
};
