import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../../apollo";
import { Podcast } from "../../components/podcast";
import { LS_TOKEN } from "../../constants";
import { getAllPodcastsQuery } from "../../__generated__/getAllPodcastsQuery";

export const PODCASTS_QUERY = gql`
  query getAllPodcastsQuery {
    getAllPodcasts {
      error
      ok
      podcasts {
        id
        title
        category
        rating
      }
    }
  }
`;

export const Podcasts = () => {
  const { data, loading } = useQuery<getAllPodcastsQuery>(PODCASTS_QUERY);
  return (
    <div>
      <Helmet>
        <title>Home | Nomadland</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.getAllPodcasts.podcasts?.map((podcast) => (
              <Podcast
                key={podcast.id}
                id={podcast.id + ""}
                title={podcast.title}
                category={podcast.category}
                rating={podcast.rating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
