export interface QuayResponse {
  quay: {
    id: string;
    name: string;
    estimatedCalls: Array<{
      expectedDepartureTime: string;
      destinationDisplay: {
        frontText: string;
      };
      serviceJourney: {
        line: {
          id: string;
        };
      };
    }>;
  };
}

export type TransportMode = "metro" | "bus" | "rail" | "tram";

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

export interface Location {
  name: string;
  place?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type StopPlaceResult = Array<StopPlace | ParentStopPlace>;
