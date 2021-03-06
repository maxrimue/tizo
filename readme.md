# tizo [![Build Status](https://travis-ci.com/maxrimue/tizo.svg?branch=master)](https://travis-ci.com/maxrimue/tizo) [![Greenkeeper badge](https://badges.greenkeeper.io/maxrimue/tizo.svg)](https://greenkeeper.io/)

> convert a string with hours to any timezone

## Install

```
$ npm install tizo
```

## Usage

```js
const tizo = require("tizo").default;
// or
import tizo from 'tizo';

tizo("19:30 CEST").utc;
// → '[ 17, 30 ]'

tizo("9pm").original;
// → '[ 21, 0 ]'

tizo("08:21").local;
// → '[ 8 + local offset, 21 + local offset ]'
```

- supports many different, popular timezones, including summer/winter adaptions
- automatically parses 'am' and 'pm' for time formatting
- doesn't require internet connection for any lookup
- flexible formatting (eg `sss01:02 aM CesT sss` → `[1, 2, 'am', 'cest']`)
- returns local, utc (gmt) and parsed time

## API

### tizo(input)

#### input

Type: `string`

Any string containing at least a specific hour, and additionally minutes, and optionally am/pm and/or timezone

#### returns

Type `object`

##### original

Type: `array`

Original, parsed time in `[ hours, minutes ]`

#### utc

Type: `array`

UTC/GMT time in `[ hours, minutes ]`

#### local

Type: `array`

Local time in `[ hours, minutes ]`

#### timezones

Type: `object`

List of supported timezones in `<timezone key>: { offset: <offset>, name: <spelled out name> }`.
See examples in the [timezones.ts](timezones.ts) file.

- `timezone key`: abbreviated name of timezone, eg "cest"
- `offset`: positive or negative integer or [integer, integer] representing the timezone's offset
- `spelled out name`: full name of the timezone, eg "Central European Summer Time"

## Related

- [tizo-cli](https://github.com/maxrimue/tizo-cli) - CLI version of this module

## License

MIT © [maxrimue](http://github.com/maxrimue)
