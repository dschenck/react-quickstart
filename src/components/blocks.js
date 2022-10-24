import React from "react";

import strategies from "./strategies";
import operators from "./operators";

const Block = (props) => {
   if (props.node.value.type == "operator") {
      return <operators.Operator {...props} />;
   }
   return <strategies.Strategy {...props} />;
};

export default Block;
