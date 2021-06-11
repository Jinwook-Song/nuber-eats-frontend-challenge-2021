import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  updateEpisode,
  updateEpisodeVariables,
} from "../../__generated__/updateEpisode";
import { MY_EPISODE_QUERY } from "./my-episode";

const EDIT_EPISODE_MUTATION = gql`
  mutation updateEpisode($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      error
      ok
    }
  }
`;

interface IParams {
  id: string;
  episodeId: string;
}

interface IFormProps {
  title: string;
  category: string;
  rating: string;
}

export const EditEpisode = () => {
  const { id: podcastId, episodeId } = useParams<IParams>();
  const client = useApolloClient();
  const { myEpisode } = client.readQuery({
    query: MY_EPISODE_QUERY,
    variables: {
      input: {
        podcastId: +podcastId,
        id: +episodeId,
      },
    },
  });

  const onCompleted = (data: updateEpisode) => {
    console.log(data);
  };
  const [updateEpisode, { loading, data }] = useMutation<
    updateEpisode,
    updateEpisodeVariables
  >(EDIT_EPISODE_MUTATION, {
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
      title: myEpisode.episode.title,
      category: myEpisode.episode.category,
    },
  });

  const onSubmit = () => {
    const { title, category } = getValues();
    if (!loading) {
      updateEpisode({
        variables: {
          input: {
            podcastId: +podcastId,
            episodeId: +episodeId,
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
        <title>Update Episode | Nomadland</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Update Episode</h4>
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

        {errors.rating?.message && (
          <FormError errorMessage={errors.rating?.message} />
        )}

        <Button
          canClick={isValid}
          loading={loading}
          actionText="Update Episode"
        />
        {data?.updateEpisode?.error && (
          <FormError errorMessage={data.updateEpisode.error} />
        )}
      </form>
    </div>
  );
};
