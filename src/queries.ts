import { QueryFunction } from "nanographql";

const gql = require("nanographql");

export interface Quay {
  id: string;
  name: string;
  estimatedCalls: Array<{
    expectedDeparturetime: string;
    serviceJourney: {
      line: {
        id: string;
      };
    };
  }>;
}

export const AvgangsTavleByQuayId: QueryFunction<{
  quayId: string;
  numberOfDepartures?: number;
}> = gql`
  query AvgangsTavleByQuayId($quayId: String!, $numberOfDepartures: Int!) {
    quay(id: $quayId) {
      id
      name
      estimatedCalls(numberOfDepartures: $numberOfDepartures) {
        expectedDepartureTime
        serviceJourney {
          line {
            transportMode
            id
          }
        }
      }
    }
  }
`;

export type TransportMode = "metro" | "bus" | "train" | "tram";

export interface StopPlace {
  __typename: "StopPlace";
  id: string;
  name: { value: string };
  transportMode: TransportMode;
  quays: Array<{ id: string; description: { value: string } }>;
}

export interface ParentStopPlace {
  __typename: "ParentStopPlace";
  name: { value: string };
  id: string;
  children: Array<StopPlace>;
}

export type StopPlaceResult = Array<StopPlace | ParentStopPlace>;

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
