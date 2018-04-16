# entur-departures

This is a tiny module, consisting of one function: `getDepartures`:

```typescript
import { getDepartures } from 'entur-departures';

getDepartures("stopId").then(stops => {
  console.log(stops);
})
```

For info on the "stop" interface, look at the source code (TypeScript), or head over to the [ENTUR Developer portal](http://www.entur.org/dev/api/).
