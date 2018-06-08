import { default as gql, QueryFunction } from "nanographql";

import { Location, TransportMode } from "../types/entur";

export const SimpleJourneyPlanner: QueryFunction<{
  from: Location;
  to: Location;
  startTime: Date;
}> = gql`
  query SimpleJourneyPlanner(
    $from: Location!
    $to: Location!
    $startTime: DateTime!
  ) {
    trip(from: $from, to: $to, dateTime: $startTime, numTripPatterns: 1) {
      tripPatterns {
        startTime
        duration
        legs {
          aimedStartTime
          mode
          fromEstimatedCall {
            destinationDisplay {
              frontText
            }
          }

          line {
            publicCode
          }
          fromPlace {
            name
          }
        }
      }
    }
  }
`;

export interface TripPattern {
  startTime: string;
  duration: number;
  legs: Array<{
    aimedStartTime: string;
    mode: TransportMode;
    fromPlace: { name: string };
    fromEstimatedCall: {
      destinationDisplay: {
        frontText;
      };
    };

    line: {
      publicCpde: string;
    };
  }>;
}
