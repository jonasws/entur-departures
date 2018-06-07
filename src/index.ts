import "isomorphic-fetch";
import { QueryFunction } from "nanographql";

import { prop, identity } from "ramda";

import {
  QuayResponse,
  StopPlace,
  ParentStopPlace,
  StopPlaceResult
} from "./types/entur";

import { SearchForStoppestedByName } from "./queries/searchForStoppestedByName";
import { AvgangsTavleByQuayId } from "./queries/avgangsTableByQuayId";

const ENTUR_JOURNEYPLANNER_API_URL =
  "https://api.entur.org/journeyplanner/2.0/index/graphql";

const ENTUR_STOPPESTED_REGISTER_API_URL =
  "https://api.entur.org/stop_places/1.0/graphql";

const fetchQueryFromUrl = async <T, R>(
  url: string,
  query: QueryFunction<T>,
  parameters: T
): Promise<R> => {
  const response = await fetch(url, {
    method: "POST",
    body: query(parameters),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed requesting data from the en-tur API");
  }

  return prop("data", await response.json());
};

export const getDeparturesByQuayId = (
  quayId: string,
  numberOfDepartures: number = 1
) =>
  fetchQueryFromUrl<
    { quayId: string; numberOfDepartures?: number },
    QuayResponse
  >(ENTUR_JOURNEYPLANNER_API_URL, AvgangsTavleByQuayId, {
    quayId,
    numberOfDepartures
  });

export const searchForQuayByName = (name: string) =>
  fetchQueryFromUrl<{ name: string }, StopPlaceResult>(
    ENTUR_STOPPESTED_REGISTER_API_URL,
    SearchForStoppestedByName,
    {
      name
    }
  );
