import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Episode } from "../../components/episode";
import { PODCAST_FRAGMENT } from "../../fragments";
import { myPodcast, myPodcastVariables } from "../../__generated__/myPodcast";

const MY_RESTAURANT_QUERY = gql`
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

interface IParams {
  id: string;
}

export const MyPodcast = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myPodcast, myPodcastVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );

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

        <div className="mt-10">
          {data?.myPodcast.podcast?.episodes?.length === 0 ? (
            <h4 className="text-xl mb-5">Upload a Episode!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myPodcast.podcast?.episodes?.map((episode, index) => (
                <Episode
                  key={index}
                  id={episode.id + ""}
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
