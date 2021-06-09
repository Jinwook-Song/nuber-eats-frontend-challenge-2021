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
        {data?.myPodcasts.ok && data.myPodcasts.podcasts?.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no podcasts.</h4>
            <Link className="text-yellow-400 hover:underline" to="/add-podcast">
              Create one &rarr;
            </Link>
          </>
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
  );
};
