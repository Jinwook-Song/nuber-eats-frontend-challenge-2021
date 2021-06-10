import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Episode } from "../../components/episode";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  deletePodcast,
  deletePodcastVariables,
} from "../../__generated__/deletePodcast";
import { myPodcast, myPodcastVariables } from "../../__generated__/myPodcast";

export const MY_PODCAST_QUERY = gql`
  query myPodcast($input: MyPodcastInputType!) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcast($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const MyPodcast = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myPodcast, myPodcastVariables>(MY_PODCAST_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const onCompleted = (data: deletePodcast) => {
    console.log(data);
  };

  const [deletePodcastMutation, { loading, data: deleteResult }] = useMutation<
    deletePodcast,
    deletePodcastVariables
  >(DELETE_PODCAST_MUTATION, {
    onCompleted,
  });

  const triggerDeleteMutation = () => {
    const ok = window.confirm("Are you sure to delete podcast?");
    if (ok && !loading) {
      deletePodcastMutation({
        variables: {
          input: {
            id: +id,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {data?.myPodcast.podcast?.title || "Loading..."} | Nomadland
        </title>
      </Helmet>

      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myPodcast.podcast?.title || "Loading..."}
        </h2>
        <Link
          to={`/podcasts/${id}/add-episode`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Episode &rarr;
        </Link>
        <Link
          to={`/podcasts/${id}/edit-podcast`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Update Podcast &rarr;
        </Link>
        <div
          onClick={triggerDeleteMutation}
          className="inline cursor-pointer mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Delete Podcast &rarr;
        </div>

        <div className="mt-10">
          {data?.myPodcast.podcast?.episodes?.length === 0 ? (
            <h4 className="text-xl mb-5">Upload a Episode!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myPodcast.podcast?.episodes?.map((episode, index) => (
                <Episode
                  key={index}
                  id={id}
                  episodeId={episode.id + ""}
                  title={episode.title}
                  category={episode.category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
