import React from "react";

class Footer extends React.Component {
   render() {
      return (
         <footer class="bg-white border-t border-gray-400 px-4 mb-8">
            <div class="container mx-auto flex pt-3 pb-2">
               <div class="w-full mx-auto flex flex-wrap">
                  <div class="flex w-full lg:w-1/2 ">
                     <div>
                        <h3 class="font-bold text-black">About</h3>
                        <p class="text-gray-500 text-sm">
                           Lorem ipsum dolor sit amet, consectetur adipiscing
                           elit. Maecenas vel mi ut felis tempus commodo nec id
                           erat. Suspendisse consectetur dapibus velit ut
                           lacinia.
                        </p>
                     </div>
                  </div>
                  <div class="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
                     <div>
                        <h3 class="font-bold text-black">Social</h3>
                        <ul class="items-center text-sm">
                           <li>
                              <a
                                 class="inline-block text-gray-500 no-underline hover:text-black hover:underline py-1"
                                 href="#"
                              >
                                 Add social links
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      );
   }
}

export default Footer;
