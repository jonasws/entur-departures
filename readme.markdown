# entur-departures

This library contains simple abstractions for some commonly used operations related to interacting with the [ENTUR-API](http://www.entur.org/dev/api/).
Example usages of this library includes [a CLI for checking departure times](https://www.npmjs.com/package/entur-departures-cli).


## Functions
### getDeparturesByQuayId
```typescript
import { getDeparturesByQuayId } from 'entur-departures';

const optionalNumberOfDepartures = 1;

getDeparturesByQuayId("stopId", optionalNumberOfDepartures).then(stops => {
  console.log(stops);
})

```
### searchForQuayByName
```typescript
import { searchForQuayByName } from 'entur-departures';

const optionalNumberOfDepartures = 1;

searchForQuayByName("quayQuery").then(results => {
  console.log(results);
})
```




### Further learning
For info on the "stop" interface, look at the source code (TypeScript), or head over to the [ENTUR Developer portal](http://www.entur.org/dev/api/).
