import { default as gql, QueryFunction } from "nanographql";

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
        destinationDisplay {
          frontText
        }
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
