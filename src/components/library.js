import React from "react";

import strategies from "./strategies";
import operators from "./operators";

const Library = (props) => {
   const strats = props.strategies.map((strat, i) => {
      return <strategies.Template {...strat} key={i} />;
   });
   const opers = props.operators.map((oper, i) => {
      return <operators.Template {...oper} key={i} />;
   });

   return (
      <div>
         <h2 class="text-lg">Components</h2>
         <div class="dragula-container" data-nodetype="strategy-library">
            {strats}
         </div>
         <h2 class="text-lg">Containers</h2>
         <div class="dragula-container" data-nodetype="operators-library">
            {opers}
         </div>
      </div>
   );
};

export default Library;
