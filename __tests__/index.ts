import "jest-fetch-mock";
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

describe("getDepartures", () => {
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

  test("The function should rethrow the error if the request fails", done => {
    expect.assertions(1);
    (fetch as any).mockResponse("", { status: 404 });
    getDepartures("somestopid", s =>
      s.serviceJourney.line.id.startsWith("route")
    ).catch(err => {
      expect(err.message).toEqual("Failed requesting data from the en-tur API");
      done();
    });
  });
});
