import { CameraOutline,ChevronBackOutline,ChevronForwardOutline } from "react-ionicons";

const SidebardContainer = ()=>{
    return (
    <div id="site__sidebar" className="fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform xl:duration-500 max-xl:w-full max-xl:-translate-x-full">
    
       
        <div className="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
    
            <div className="pr-4" data-simplebar>
    
                <nav id="side">
                
                    <ul>
                        <li className="active">
                            <a href="feed.html">
                                <img src="assets/images/icons/home.png" alt="feeds" className="w-6"/>
                                <span> Feed </span> 
                            </a>
                        </li>
                        <li>
                            <a href="messages.html">
                                <img src="assets/images/icons/message.png" alt="messages" className="w-5"/>
                                <span> messages </span> 
                            </a>
                        </li> 
                        <li>
                            <a href="video.html">
                                <img src="assets/images/icons/video.png" alt="messages" className="w-6"/>
                                <span> video </span> 
                            </a>
                        </li>
                        <li>
                            <a href="event.html">
                                <img src="assets/images/icons/event.png" alt="messages" className="w-6"/>
                                <span> event </span> 
                            </a>
                        </li>
                        <li>
                            <a href="pages.html">
                                <img src="assets/images/icons/page.png" alt="pages" className="w-6"/>
                                <span> Pages </span> 
                            </a>
                        </li>
                        <li>
                            <a href="groups.html">
                                <img src="assets/images/icons/group.png" alt="groups" className="w-6"/>
                                <span> Groups </span> 
                            </a>
                        </li>
                        <li>
                            <a href="market.html">
                                <img src="assets/images/icons/market.png" alt="market" className="w-7 -ml-1"/>
                                <span> market </span> 
                            </a>
                        </li> 
                        <li>
                            <a href="blog.html">
                                <img src="assets/images/icons/blog.png" alt="blog" className="w-6"/>
                                <span> blog </span> 
                            </a>
                        </li> 
                        <li className="!hidden" id="show__more">
                            <a href="games.html">
                                <img src="assets/images/icons/game.png" alt="games" className="w-6"/>
                                <span> games </span> 
                            </a>
                        </li>
                        <li className="!hidden" id="show__more">
                            <a href="funding.html">
                                <img src="assets/images/icons/fund.png" alt="messages" className="w-6"/>
                                <span> Fundraiser  </span> 
                            </a>
                        </li>
                        <li className="!hidden" id="show__more">
                            <a href="blog-2.html">
                                <img src="assets/images/icons/blog-2.png" alt="blog" className="w-6"/>
                                <span> blog II </span> 
                            </a>
                        </li>
                        <li className="!hidden" id="show__more">
                            <a href="event-2.html">
                                <img src="assets/images/icons/event-2.png" alt="event" className="w-6"/>
                                <span> Event II </span> 
                            </a>
                        </li>
                        <li className="!hidden" id="show__more">
                            <a href="groups-2.html">
                                <img src="assets/images/icons/group-2.png" alt="groups" className="w-6"/>
                                <span> Groups II </span> 
                            </a>
                        </li>
    
                </ul>
                    
                    <button type="button" className="flex items-center gap-4 py-2 px-4 w-full font-medium text-sm text-black dark:text-white" uk-toggle="target: #show__more; cls: !hidden uk-animation-fade"> 
                        <svg className="bg-gray-200 rounded-full w-6 h-6 dark:bg-slate-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> 
                        <span id="show__more"> See More </span> 
                        <span className="!hidden" id="show__more"> See Less </span> 
                    </button>
    
                </nav>
    
                <div className="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800">
                    <div className="px-3 pb-2 text-sm font-medium"> 
                        <div className="text-black dark:text-white">Shortcut</div> 
                    </div>
                    <a href="#">
                        <div className="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                            <img src="assets/images/avatars/avatar-2.jpg" alt="" className="w-6 rounded-full object-cover"/>
                            <div> Marin Gray</div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                            <img src="assets/images/avatars/avatar-7.jpg" alt="" className="w-6 rounded-full object-cover"/>
                            <div>   Alexa Stella</div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                            <img src="assets/images/avatars/avatar-3.jpg" alt="" className="w-6 rounded-full object-cover"/>
                            <div> Sarah Ali</div>
                        </div>
                    </a> 
                </div>
    
                <nav id="side" className="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800">
                    <div className="px-3 pb-2 text-sm font-medium"> 
                        <div className="text-black dark:text-white">Pages</div> 
                    </div>
    
                    <ul className="mt-2 -space-y-2" 
                        uk-nav="multiple: true">
    
                        <li>
                            <a href="setting.html"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.354-.133-.75-.072-1.074.124-.073.043-.146.087-.22.127-.332.184-.582.496-.645.87l-.213 1.28c-.09.542-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.645-.87c-.074-.04-.147-.083-.22-.127-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.003-.827c.293-.24.438-.613.431-.992a6.759 6.759 0 000-.255c.007-.378-.138-.75-.43-.99l-1.005-.828a1.125 1.125 0 01-.26-1.43l1.298-2.247a1.125 1.125 0 011.369-.491l1.217.456c.354.133.75.072 1.074-.124.073-.043.146-.087.22-.127.332-.184.582-.496.645-.87l.213-1.28zM12 15a3 3 0 100-6 3 3 0 000 6z" />
                                </svg>
                                <span> Settings </span> 
                            </a>
                        </li> 
    
                    </ul>
                </nav>
    
            </div>
        </div>
    </div>);
   
    
};

export default SidebardContainer;