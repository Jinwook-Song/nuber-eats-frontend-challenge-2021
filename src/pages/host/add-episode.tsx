import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createEpisode,
  createEpisodeVariables,
} from "../../__generated__/createEpisode";

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisode($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      error
      ok
      id
    }
  }
`;

interface IParams {
  id: string;
}

interface IFormProps {
  title: string;
  category: string;
  podcastId: string;
}

export const AddEpisode = () => {
  const { id: podcastId } = useParams<IParams>();
  const history = useHistory();
  const onCompleted = (data: createEpisode) => {
    const {
      createEpisode: { ok, id },
    } = data;
    if (ok) {
      history.push(`/podcasts/${podcastId}`);
    }
  };

  const [createEpisodeMutation, { loading, data }] = useMutation<
    createEpisode,
    createEpisodeVariables
  >(CREATE_EPISODE_MUTATION, {
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
      createEpisodeMutation({
        variables: {
          input: {
            title,
            category,
            podcastId: +podcastId,
          },
        },
      });
    }
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Episode | Nomadland</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Episode</h4>
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
          actionText="Create Episode"
        />
        {data?.createEpisode?.error && (
          <FormError errorMessage={data.createEpisode.error} />
        )}
      </form>
    </div>
  );
};
