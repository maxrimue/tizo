import guess from "./lib/guess";
import converter from "./lib/converter";
import {tizoResult} from "./lib/types";

export default {
  guess: (input: string): tizoResult => {
    const formattedInput = guess(input);
    return converter(formattedInput);
  },
};
