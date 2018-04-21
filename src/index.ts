import "isomorphic-fetch";
import { QueryFunction } from "nanographql";

import { curry, filter, pathOr, pipe, pathEq, isNil, always } from "ramda";

import {
  AvgangsTavleByQuayId,
  SearchForStoppestedByName,
  Quay,
  StopPlace,
  ParentStopPlace,
  StopPlaceResult
} from "./queries";

const ENTUR_JOURNEYPLANNER_API_URL =
  "https://api.entur.org/journeyplanner/2.0/index/graphql";

const ENTUR_STOPPESTED_REGISTER_API_URL =
  "https://api.entur.org/stop_places/1.0/graphql";

const fetchQueryFromUrl = async <T, R>(
  url: string,
  query: QueryFunction<T>,
  parameters: T
): Promise<{ data: R }> => {
  const response = await fetch(url, {
    method: "POST",
    body: query(parameters),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed requesting data from the en-tur API");
  }

  return response.json();
};

export const getEstimatedCallsByQuayId = (
  quayId: string,
  numberOfDepartures: number = 1
) =>
  fetchQueryFromUrl<{ quayId: string; numberOfDepartures?: number }, Quay>(
    ENTUR_JOURNEYPLANNER_API_URL,
    AvgangsTavleByQuayId,
    {
      quayId,
      numberOfDepartures
    }
  );

export const searchForStoppestedByName = (name: string) =>
  fetchQueryFromUrl<{ name: string }, StopPlaceResult>(
    ENTUR_STOPPESTED_REGISTER_API_URL,
    SearchForStoppestedByName,
    {
      name
    }
  );
