# tizo [![Build Status](https://travis-ci.org/maxrimue/tizo.svg?branch=master)](https://travis-ci.org/maxrimue/tizo)

> convert a string with hours to any timezone

## Install

```
$ npm install tizo
```

## Usage

```js
const tizo = require("tizo");

tizo("19:30 CEST").utc;
// → '[ 17, 30 ]'

tizo("9pm").original;
// → '[ 21, 0 ]'

tizo("08:21").local;
// → '[ 8 + local offset, 21 + local offset ]'
```

* supports many different, popular timezones, including summer/winter adaptions
* automatically parses 'am' and 'pm' for time formatting
* doesn't require internet connection for any lookup
* flexible formatting (eg `sss01:02 aM CesT sss` → `[1, 2, 'am', 'cest']`)
* returns local, utc (gmt) and parsed time

## API

### tizo(input)

#### input

Type: `string`

Any string containing at least a specific hour, and additionally minutes, and/or am/pm and/or timezone

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

## License

MIT © [maxrimue](http://github.com/maxrimue)
