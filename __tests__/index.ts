import { getDepartures } from "../src";

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(
    JSON.stringify({
      data: {
        stopPlace: {
          estimatedCalls: [
            {
              serviceJourney: {
                line: {
                  id: "route1"
                }
              }
            },
            {
              serviceJourney: {
                line: {
                  id: "route2"
                }
              }
            }
          ]
        }
      }
    })
  );
});

test("The function should return the data.stopPlace.estimatedCalls portion of the response", () => {
  return getDepartures("somestopid").then(stops => {
    expect(stops).toEqual([
      {
        serviceJourney: {
          line: {
            id: "route1"
          }
        }
      },
      {
        serviceJourney: {
          line: {
            id: "route2"
          }
        }
      }
    ]);
  });
});

test("The function should return the stops adhering to the optionally provided string predicate", () => {
  return getDepartures("somestopid", "route1").then(stops => {
    expect(stops).toEqual([
      {
        serviceJourney: {
          line: {
            id: "route1"
          }
        }
      }
    ]);
  });
});

test("The function should return the stops adhering to the optionally provided predicate function", () => {
  return getDepartures("somestopid", s =>
    s.serviceJourney.line.id.startsWith("route")
  ).then(stops => {
    expect(stops).toEqual([
      {
        serviceJourney: {
          line: {
            id: "route1"
          }
        }
      },
      {
        serviceJourney: {
          line: {
            id: "route2"
          }
        }
      }
    ]);
  });
});
