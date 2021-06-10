import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  updatePodcast,
  updatePodcastVariables,
} from "../../__generated__/updatePodcast";
import { MY_PODCAST_QUERY } from "./my-podcast";

const EDIT_PODCAST_MUTATION = gql`
  mutation updatePodcast($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      error
      ok
    }
  }
`;

interface IParams {
  id: string;
}

interface IFormProps {
  title: string;
  category: string;
  rating: string;
}

export const EditPodcast = () => {
  const { id } = useParams<IParams>();
  console.log(id);
  const client = useApolloClient();
  const { myPodcast } = client.readQuery({
    query: MY_PODCAST_QUERY,
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const onCompleted = (data: updatePodcast) => {
    console.log(data);
  };
  const [updatePodcast, { loading, data }] = useMutation<
    updatePodcast,
    updatePodcastVariables
  >(EDIT_PODCAST_MUTATION, {
    onCompleted,
  });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      title: myPodcast.podcast.title,
      category: myPodcast.podcast.category,
    },
  });
  const onSubmit = () => {
    const { title, category, rating } = getValues();
    if (!loading) {
      updatePodcast({
        variables: {
          input: {
            id: +id,
            payload: {
              title,
              category,
              rating: +rating,
            },
          },
        },
      });
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Update Podcast | Nomadland</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Update Podcast</h4>
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

        <input
          className="input"
          {...register("rating", {
            required: "Category is required.",
            min: 0,
            max: 5,
          })}
          placeholder="Rating"
          type="number"
          step={0.1}
        />
        {errors.rating?.message && (
          <FormError errorMessage={errors.rating?.message} />
        )}

        <Button
          canClick={isValid}
          loading={loading}
          actionText="Update Podcast"
        />
        {data?.updatePodcast?.error && (
          <FormError errorMessage={data.updatePodcast.error} />
        )}
      </form>
    </div>
  );
};
