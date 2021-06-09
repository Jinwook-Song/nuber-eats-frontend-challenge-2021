import gql from "graphql-tag";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    title
    category
    rating
    # creator
    episodes {
      title
      category
    }
    reviews {
      title
      text
    }
  }
`;
