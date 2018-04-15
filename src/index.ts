import "isomorphic-fetch";
import gql from "nanographql";

import { filter, pathOr, pipe, pathEq, isNil, always } from "ramda";

const ENTUR_API_URL = "https://api.entur.org/journeyplanner/2.0/index/graphql";

interface EstimatedCall {
  expectedDepartureTime: string;
  destinationDisplay: {
    frontText: string;
  };
  serviceJourney: {
    line: {
      id: string;
    };
  };
}

type Predicate = string | ((ec: EstimatedCall) => boolean);

const getPredicateFunction = (predicate?: Predicate) => {
  if (typeof predicate === "string") {
    return pathEq(["serviceJourney", "line", "id"], predicate);
  } else if (!isNil(predicate)) {
    return predicate;
  } else {
    return always(true);
  }
};

const extractEstimatedCalls = (predicate?: Predicate) =>
  pipe(
    pathOr([], ["data", "stopPlace", "estimatedCalls"]),
    filter(getPredicateFunction(predicate))
  );

export async function getDepartures(
  stopId: string,
  predicate?: Predicate
): Promise<Array<EstimatedCall>> {
  const query = gql`
    query AvgangsTavleById($stopId: String!, $startTime: DateTime) {
      stopPlace(id: $stopId) {
        id
        name
        estimatedCalls(
          startTime: $startTime
          timeRange: 72100
          numberOfDepartures: 10
        ) {
          expectedDepartureTime
          destinationDisplay {
            frontText
          }
          serviceJourney {
            line {
              id
            }
          }
        }
      }
    }
  `;

  const response = await fetch(ENTUR_API_URL, {
    method: "POST",
    body: query({ stopId }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return extractEstimatedCalls(predicate)(data) as Array<EstimatedCall>;
}
