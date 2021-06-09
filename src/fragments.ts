import gql from "graphql-tag";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    category
    rating
    episodes {
      id
      title
      category
    }
    reviews {
      id
      title
      text
    }
  }
`;
