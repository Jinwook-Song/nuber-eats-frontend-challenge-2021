import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Episode } from "../../components/episode";
import {
  deleteEpisode,
  deleteEpisodeVariables,
} from "../../__generated__/deleteEpisode";
import { myEpisode, myEpisodeVariables } from "../../__generated__/myEpisode";

export const MY_EPISODE_QUERY = gql`
  query myEpisode($input: MyEpisodeInputType!) {
    myEpisode(input: $input) {
      error
      ok
      episode {
        title
        category
      }
    }
  }
`;

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisode($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
  episodeId: string;
}

export const MyEpisode = () => {
  const { id: podcastId, episodeId } = useParams<IParams>();
  const { data } = useQuery<myEpisode, myEpisodeVariables>(MY_EPISODE_QUERY, {
    variables: {
      input: {
        podcastId: +podcastId,
        id: +episodeId,
      },
    },
  });

  const onCompleted = (data: deleteEpisode) => {
    console.log(data);
  };

  const [deleteEpisodeMutation, { loading, data: deleteResult }] = useMutation<
    deleteEpisode,
    deleteEpisodeVariables
  >(DELETE_EPISODE_MUTATION, {
    onCompleted,
  });

  const triggerDeleteMutation = () => {
    const ok = window.confirm("Are you sure to delete episode?");
    if (ok && !loading) {
      deleteEpisodeMutation({
        variables: {
          input: {
            podcastId: +podcastId,
            episodeId: +episodeId,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {data?.myEpisode.episode?.title || "Loading..."} | Nomadland
        </title>
      </Helmet>

      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myEpisode.episode?.title || "Loading..."}
        </h2>

        <Link
          to={`/podcasts/${podcastId}/episodes/${episodeId}/edit-episode`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Update Episode &rarr;
        </Link>
        <div
          onClick={triggerDeleteMutation}
          className="inline cursor-pointer mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Delete Episode &rarr;
        </div>

        <div className="mt-10">
          <Episode
            id={podcastId}
            episodeId={episodeId}
            title={data?.myEpisode.episode?.title}
            category={data?.myEpisode.episode?.category}
          />
        </div>
      </div>
    </div>
  );
};
