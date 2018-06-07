import { default as gql, QueryFunction } from "nanographql";

export const SearchForStoppestedByName: QueryFunction<{ name: string }> = gql`
  query SearchForStoppestedByName($name: String!) {
    stopPlace(query: $name) {
      __typename
      id
      name {
        value
      }
      ... on StopPlace {
        ...stopPlaceFields
      }
      ... on ParentStopPlace {
        children {
          ...stopPlaceFields
        }
      }
    }
  }

  fragment stopPlaceFields on StopPlace {
    transportMode
    id
    name {
      value
    }
    quays {
      id
      description {
        value
      }
    }
  }
`;
