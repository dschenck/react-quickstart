import { combine } from "../lib";

//import all the subreducers
import session from "./session";
import todos from "./todos";

export default combine({
   session,
   todos,
});
