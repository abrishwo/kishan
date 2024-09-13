import ChatListHeader from "./components/ChatListHeader";
import SearchBar from "../../components/SearchBar";
import ContactsList from "./components/container/ContactsList";
import { useEffect, useRef, useState } from "react";
import { get } from "../../services/crud";
import BlinkingLoadingCircles from "../../components/BlinkingLoadingCircles";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { SearchOutline } from 'react-ionicons'


export default function ChatList() {
  const [loading, setLoading] = useState(true);
  const [chatsList, setChatsList] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [limit] = useState(15);
  const [searchText, setSearchText] = useState("");
  const [noMoreChats, setNoMoreChats] = useState(false);

  useEffect(() => {
    getChatsList();
  }, []);

  const delayTimer = useRef<any>();
  const searchInputChanged = (str: any) => {
    setSearchText(str);
    if (!loading) {
      clearTimeout(delayTimer.current);
      delayTimer.current = setTimeout(() => {
        setChatsList([]);
        setPage(0);
        setNoMoreChats(false);
        getChatsList(0, str);
      }, 500);
    }
  };

  const getChatsList = (pageNum?: number, searchTextCopy?: string) => {
    let queryParams: any = {
      page: pageNum ?? page + 1,
      limit,
    };

    if (searchTextCopy) {
      queryParams.searchString = searchTextCopy.trim();
    } else if (searchTextCopy === undefined && searchText.trim().length > 0) {
      queryParams.searchString = searchText.trim();
    }

    setLoading(true);

    get("chat/list/", queryParams)
      .then((res) => {
        if (res.data.length < limit) {
          setNoMoreChats(true);
        }
        if (queryParams.searchString) {
          setChatsList([...res.data]);
        } else {
          setChatsList((s: any) => [...s, ...res.data]);
        }
        setPage(res.page);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        toast.error(e?.response?.data?.message ?? "Error while fetching chats");
      });
  };

  return (
    <>
    <div  className="hidden bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2"
        uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right ">
    
        {/* <!-- heading --> */}
        <div className="flex items-center justify-between gap-2 p-4 pb-1">
            <h3 className="font-bold text-xl"> Chats </h3>

            <div className="flex gap-2.5 text-lg text-slate-900 dark:text-white">
                {/* <ion-icon name="expand-outline"></ion-icon>
                <ion-icon name="create-outline"></ion-icon> */}
            </div>
        </div>



        {/* socialite start */}
        {/* <Link
            to="/timeline"
            className={`nav-link `}
          > */}


            <div className="relative w-full p-2 px-3 ">
            <input type="text" className="w-full !pl-10 !rounded-lg dark:!bg-white/10" placeholder="Search" value={searchText}
              onChange={(e) => searchInputChanged(e.target.value)} /> 
            {/* <ion-icon name="search-outline" className="dark:text-white absolute left-7 -translate-y-1/2 top-1/2"></ion-icon> */}
            <SearchOutline
              color={'#00000'} 
              title={'search'}
              height="24px"
              width="24px"
              style={{
                backgroundColor:"dark",
            
                position:"absolute",
                left:"24",
                transform:"translateY(.5)",
                top:"12"
               
              }}
            />
        
        </div>
          {/* </Link> */}
        {/* socialite end */}
        
        <div className="h-80 overflow-y-auto pr-2">
            
            <div className="p-2 pt-0 pr-1 dark:text-white/80">
            {chatsList.length > 0 ? (
                <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0"> 
                    <img src="assets/images/avatars/avatar-2.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">Jesse Steeve</div>
                        <div className="text-xs text-gray-500 dark:text-white/80"> 09:40AM </div>
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                    </div>
                    <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">Love your photos 😍</div>
                </div>
            </a> 
            ):(
              <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
                No Chat is Found.
              </div>
            )}
               

            </div>

        </div> 


        {/* <!-- footer --> */}
        {loading && !noMoreChats && <BlinkingLoadingCircles />}
       
         {!noMoreChats && !loading && chatsList.length >= 0 && (
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn text-primary"
                  onClick={() => getChatsList()}
                >
                  <i className="fa fa-refresh me-2"></i>
                  <span>Show More</span>
                </button>
              </div>
            )}

        <div className="w-3 h-3 absolute -top-1.5 right-3 bg-white border-l border-t rotate-45 max-md:hidden dark:bg-dark3 dark:border-transparent"></div>
    </div>
    </>
  );
}
