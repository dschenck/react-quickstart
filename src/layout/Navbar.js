import React from 'react'

class Navbar extends React.Component{
    render(){
        return(
            <nav class="w-full bg-white border-b border-gray-400 mb-5 px-4">
                <div class="w-full container mx-auto flex flex-wrap items-center justify-between py-4">
                    <div class="flex items-center">
                        <svg class="h-5 pr-3 fill-current" viewBox="0 0 20 20">
                            <path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm14 12h4V2H2v12h4c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2zM5 9l2-2 2 2 4-4 2 2-6 6-4-4z"/>
                        </svg>
                        <a class="font-bold text-xl"  href="#"> 
                            Inbox
                        </a>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border border-gray-500 rounded text-gray-500 hover:text-black appearance-none focus:outline-none">
                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="w-full flex-grow lg:flex lg:content-center lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 z-20">
                        <div class="flex-1 w-full mx-auto max-w-sm content-center py-4 lg:py-0">
                            <div class="relative pull-right pl-4 pr-4 md:pr-0">
                                <input type="search" placeholder="Search" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple rounded py-1 px-2 pl-10 appearance-none leading-normal"/>
                                <div class="absolute" style={{top: "0.375rem",left: "1.75rem"}}>
                                    <svg class="text-gray-600 fill-current pointer-events-none w-4 h-4" viewBox="0 0 20 20">
                                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <ul class="lg:flex justify-end items-center">
                            <li class="mr-3 py-2 lg:py-0">
                                <a class="inline-block py-2 px-4 text-black font-bold no-underline" href="#">Active</a>
                            </li>
                            <li class="mr-3 py-2 lg:py-0">
                                <a class="inline-block text-gray-600 no-underline hover:text-black hover:underline py-2 pl-4" href="#">link</a>
                            </li>
                            <li class="py-2 lg:py-0">
                                <a class="inline-block text-gray-600 no-underline hover:text-black hover:underline py-2 pl-4" href="#">link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar