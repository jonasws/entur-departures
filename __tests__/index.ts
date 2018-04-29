import "jest-fetch-mock";
import { getDeparturesByQuayId } from "../src";

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(
    JSON.stringify({
      data: {
        quay: {
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

describe("getDeparturesByQuayId", () => {
  test("The function should return the data.quay.estimatedCalls portion of the response", () => {
    return getDeparturesByQuayId("somestopid").then(departures => {
      expect(departures).toEqual({
        quay: {
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
      });
    });
  });

  test("The function should rethrow the error if the request fails", done => {
    expect.assertions(1);
    (fetch as any).mockResponse("", { status: 404 });
    getDeparturesByQuayId("somestopid", s =>
      s.serviceJourney.line.id.startsWith("route")
    ).catch(err => {
      expect(err.message).toEqual("Failed requesting data from the en-tur API");
      done();
    });
  });
});
