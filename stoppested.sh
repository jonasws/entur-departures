#!/usr/bin/env sh

STOPPESTED="NSR:StopPlace:58244"

http POST https://api.entur.org/journeyplanner/2.0/index/graphql query=@stoppested-query.graphql variables:=@variables.json |\
    jq -r ".data.stopPlace.estimatedCalls
     | map(select(.destinationDisplay.frontText | startswith(\"Vestli\") or startswith(\"Frognerseteren\")))
     | .[].aimedArrivalTime
     | strptime(\"%Y-%m-%dT%H:%M:%S%z\")
     | strftime(\"%H:%M\")
"
