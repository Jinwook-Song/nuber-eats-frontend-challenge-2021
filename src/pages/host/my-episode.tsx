import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { myEpisode, myEpisodeVariables } from "../../__generated__/myEpisode";

const MY_EPISODE_QUERY = gql`
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
  console.log(data);

  return <div>My Episode</div>;
};
