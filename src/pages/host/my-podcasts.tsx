import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Podcast } from "../../components/podcast";
import { PODCAST_FRAGMENT } from "../../fragments";
import { myPodcasts } from "../../__generated__/myPodcasts";

const MY_PODCASTS_QEURY = gql`
  query myPodcasts {
    myPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const MyPodcasts = () => {
  const { data } = useQuery<myPodcasts>(MY_PODCASTS_QEURY);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>My Podcasts | Nomadland</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My Podcasts</h2>

        <Link
          to={"/add-podcast"}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Podcast &rarr;
        </Link>

        <div className="mt-10">
          {data?.myPodcasts.podcasts?.length === 0 ? (
            <h4 className="text-xl mb-5">Upload a Podcast!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myPodcasts.podcasts?.map((podcast) => (
                <Podcast
                  key={podcast.id}
                  id={podcast.id + ""}
                  title={podcast.title}
                  category={podcast.category}
                  rating={podcast.rating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
