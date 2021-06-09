import gql from "graphql-tag";
import { PODCAST_FRAGMENT } from "../../fragments";

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
  return <div>My Podcasts</div>;
};
