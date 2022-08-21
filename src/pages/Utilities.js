import React from "react";
import utils from "../utilities";

export default class Page extends React.Component {
   render() {
      return (
         <div class="mb-8">
            <h1 class="text-2xl text-gray-600 pb-2">Utilities</h1>
            <div class="grid">
               <div class="box">
                  <h1 class="text-lg font-bold border-b border-gray-200 mb-1">
                     If statements
                  </h1>
                  <p class="font-bold">Test 1</p>
                  <utils.If test={true}>
                     <p>The test is true, and this will be printed</p>
                     <utils.Else>...while this is not</utils.Else>
                  </utils.If>
                  <p class="font-bold">Test 2</p>
                  <utils.If test={false}>
                     <p>As the test is false, this will not be printed</p>
                     <utils.Else>
                        As this test is false, the else is printed
                     </utils.Else>
                  </utils.If>
               </div>
               <div class="box">
                  <h1 class="text-lg font-bold border-b border-gray-200 mb-1">
                     Switch statements
                  </h1>
                  <p class="font-bold">Test 1</p>
                  <utils.Switch>
                     <utils.Case test={false}>This is False</utils.Case>
                     <utils.Case test={false}>This is False</utils.Case>
                     <utils.Case test={true}>This is True</utils.Case>
                     <utils.Case test={true}>
                        This is also true... but too late, the switch exited
                     </utils.Case>
                     <utils.Case test={false}>This is False</utils.Case>
                  </utils.Switch>
                  <p class="font-bold">Test 2</p>
                  <utils.Switch>
                     <utils.Case test={false}>This is False</utils.Case>
                     <utils.Case test={false}>This is False</utils.Case>
                     <p>
                        A child without a test will be used as a default value
                     </p>
                  </utils.Switch>
               </div>
               <div class="box">
                  <h1 class="text-lg font-bold border-b border-gray-200 mb-1">
                     Ternary statements
                  </h1>
                  <p class="font-bold">Test 1</p>
                  <utils.Ternary test={true}>
                     <p>The ternary is true</p>
                     <p>The ternary is false</p>
                  </utils.Ternary>
                  <p class="font-bold">Test 2</p>
                  <utils.Ternary test={false}>
                     <p>The ternary is true</p>
                     <p>The ternary is false</p>
                  </utils.Ternary>
               </div>
            </div>
         </div>
      );
   }
}
