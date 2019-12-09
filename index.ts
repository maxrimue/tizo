import guess from "./lib/guess";
import converter from "./lib/converter";
import {tizoResult, formattedTime} from "./lib/types";

export default {
  guess: (input: string): tizoResult => {
    const formattedInput = guess(input);
    return converter(formattedInput);
  },
  formatted: (input: formattedTime): tizoResult => {
    return converter(input);
  },
};
