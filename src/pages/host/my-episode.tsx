import { useApolloClient } from "@apollo/client";
import { useParams } from "react-router";
import { MY_PODCAST_QUERY } from "./my-podcast";

interface IParams {
  id: string;
  episodeId: string;
}

export const MyEpisode = () => {
  const { id, episodeId } = useParams<IParams>();
  const client = useApolloClient();
  const { myPodcast } = client.readQuery({
    query: MY_PODCAST_QUERY,
    variables: {
      input: {
        id: +id,
      },
    },
  });
  console.log(myPodcast);
  return <div>My Episode</div>;
};
