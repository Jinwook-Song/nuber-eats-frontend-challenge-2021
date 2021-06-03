import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Episode } from "../../components/episode";
import {
  getEpisodes,
  getEpisodesVariables,
} from "../../__generated__/getEpisodes";

export const EPISODES_QUERY = gql`
  query getEpisodes($input: PodcastSearchInput!) {
    getEpisodes(input: $input) {
      error
      ok
      episodes {
        id
        title
        category
      }
    }
  }
`;

interface IEpisodesParams {
  id: string;
}

export const Episodes = () => {
  const params = useParams<IEpisodesParams>();
  const { data, loading } = useQuery<getEpisodes, getEpisodesVariables>(
    EPISODES_QUERY,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );
  return (
    <div>
      <Helmet>
        <title>Episodes | Nomadland</title>
      </Helmet>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.getEpisodes.episodes?.map((episode) => (
              <Episode
                key={episode.id}
                id={episode.id + ""}
                title={episode.title}
                category={episode.category}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
