import { useEffect, useState } from "react";
import { create, get } from "../../../../../services/crud";
import { toast } from "react-toastify";
import PageLoading from "../../../../../components/PageLoading";
import SuggestedUsersHeader from "../../../../../pages/followers/components/SuggestedUsersHeader";
import DisplayModeBtns from "../../../../../components/DisplayModeBtns";

import {
  formatResourceURL,
  handleProfileImageError,
} from "../../../../../services/asset-paths";
import { getName } from "../../../../../services/utils";
import SearchBar from "../../../../../components/SearchBar";
import BlinkingLoadingCircles from "../../../../../components/BlinkingLoadingCircles";


// Sidebar Component
const Sidebar = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hideMoreBtn, setHideMoreBtn] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearch, setIsSearch] = useState(false);


  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setPage(0);
      setSuggestedUsers([]);
      if (searchText.length === 0) {
        fetchSuggestedUsers(0);
      } else {
        searchUsers(0);
      }
    }, 500);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [searchText]);

  const fetchSuggestedUsers = (pageCopy?: number) => {
    setIsSearch(false);
    setDataLoading(true);
    get("user/suggestion", {
      page: (pageCopy !== undefined ? pageCopy : page) + 1,
      limit,
    })
      .then((res) => {
        if (res.data.length < limit) {
          setHideMoreBtn(true);
        }
        setSuggestedUsers((s: any) => [...s, ...res.data]);
        setPage(parseInt(res.page) ?? page + 1);
        setLimit(res.limit);
        setPageLoading(false);
        setDataLoading(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error(
          e?.response?.data?.message ?? "Error! couldn't load suggested users"
        );
        setPageLoading(false);
        setDataLoading(false);
      });
  };

  const toggleFollow = (id: string, isFollow: boolean) => {
    changeFollowStatus(id, isFollow);
    create("user/" + (isFollow ? "follow" : "unfollow") + "/" + id, {}).catch(
      (e) => {
        console.log(e);
        toast.error("Error! action failed");
        changeFollowStatus(id, !isFollow);
      }
    );
  };

  const changeFollowStatus = (id: string, isFollow: boolean) => {
    const usersCopy = suggestedUsers.map((user: any) => {
      if (user._id === id) {
        user.followed = isFollow;
      }
      return user;
    });

    setSuggestedUsers(usersCopy);
  };

  const searchUsers = (page: number) => {
    if (searchText.trim().length > 0) {
      setIsSearch(true);
      setHideMoreBtn(false);
      setDataLoading(true);
      get("user/search", {
        name: searchText,
        page: page + 1,
        limit,
        excludeFollowing: true,
      })
        .then((res) => {
          if (res.data.length < limit) {
            setHideMoreBtn(true);
          }
          setSuggestedUsers((s: any) => [...s, ...res.data]);
          setPage(res.page);
          setDataLoading(false);
        })
        .catch((e) => {
          console.log(e);
          toast.error(
            e?.response?.data?.message ?? "Error while searching users"
          );
          setDataLoading(false);
        });
    } else {
      fetchSuggestedUsers(0);
    }
  };

  
    return (
      <div className="flex-1">
        {/* People You May Know */}
        <div
          className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
          uk-sticky="media: 1024; end: #js-oversized; offset: 80"
        >
          <div className="box p-5 px-6">
            <div className="flex items-baseline justify-between text-black dark:text-white">
              <h3 className="font-bold text-base">People you may know</h3>
              <a href="#" className="text-sm text-blue-500">See all</a>
            </div>
  
            <div className="side-list">
              {/* Side List Item */}
              <div className="side-list-item">
                <a href="timeline.html">
                  <img
                    src="assets/images/avatars/avatar-2.jpg"
                    alt=""
                    className="side-list-image rounded-full"
                  />
                </a>
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="side-list-title">John Michael</h4>
                  </a>
                  <div className="side-list-info">125k Following</div>
                </div>
                <button className="button bg-primary-soft text-primary dark:text-white">Follow</button>
              </div>
  
              <div className="side-list-item">
                <a href="timeline.html">
                  <img
                    src="assets/images/avatars/avatar-3.jpg"
                    alt=""
                    className="side-list-image rounded-full"
                  />
                </a>
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="side-list-title">Monroe Parker</h4>
                  </a>
                  <div className="side-list-info">320k Following</div>
                </div>
                <button className="button bg-primary-soft text-primary dark:text-white">Follow</button>
              </div>
            </div>
          </div>
  
          {/* People You Might Know */}
          <div className="box p-5 px-6 border1 dark:bg-dark2 hidden">
            <div className="flex justify-between text-black dark:text-white">
              <h3 className="font-bold text-base">People You Might Know</h3>
              {/* Icon commented */}
              {/* <button type="button"><ion-icon name="sync-outline" className="text-xl"></ion-icon></button> */}
            </div>
  
            <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
              <div className="flex items-center gap-3">
                <a href="timeline.html">
                  <img
                    src="assets/images/avatars/avatar-7.jpg"
                    alt=""
                    className="bg-gray-200 rounded-full w-10 h-10"
                  />
                </a>
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-semibold text-sm text-black dark:text-white">Johnson Smith</h4>
                  </a>
                  <div className="mt-0.5">Suggested For You</div>
                </div>
                <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">Follow</button>
              </div>
  
              <div className="flex items-center gap-3">
                <a href="timeline.html">
                  <img
                    src="assets/images/avatars/avatar-5.jpg"
                    alt=""
                    className="bg-gray-200 rounded-full w-10 h-10"
                  />
                </a>
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-semibold text-sm text-black dark:text-white">James Lewis</h4>
                  </a>
                  <div className="mt-0.5">Followed by Johnson</div>
                </div>
                <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">Follow</button>
              </div>
            </div>
          </div>
  
          {/* Latest Marketplace Items */}
          <div className="box p-5 px-6 border1 dark:bg-dark2">
            <div className="flex justify-between text-black dark:text-white">
              <h3 className="font-bold text-base">Premium Photos</h3>
              {/* Icon commented */}
              {/* <button type="button"><ion-icon name="sync-outline" className="text-xl"></ion-icon></button> */}
            </div>
  
            <div className="relative capitalize font-medium text-sm text-center mt-4 mb-2"  uk-slider="autoplay: true;finite: true">
              <div className="overflow-hidden uk-slider-container">
                <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                  {/* Slider Item */}
                  <li className="w-1/2 pr-2">
                    <a href="#">
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="relative w-full h-40">
                          <img
                            src="assets/images/product/product-1.jpg"
                            alt=""
                            className="object-cover w-full h-full inset-0"
                          />
                        </div>
                        <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">$12</div>
                      </div>
                      <div className="mt-3 w-full">Chill Lotion</div>
                    </a>
                  </li>
                  <li className="w-1/2 pr-2">
                    <a href="#">
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="relative w-full h-40">
                          <img
                            src="assets/images/product/product-3.jpg"
                            alt=""
                            className="object-cover w-full h-full inset-0"
                          />
                        </div>
                        <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">$18</div>
                      </div>
                      <div className="mt-3 w-full">Gaming Mouse</div>
                    </a>
                  </li>
                </ul>
  
                {/* Slider Controls */}
                {/* Icons commented */}
                {/* 
                <button type="button" className="absolute bg-white rounded-full top-16 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3" uk-slider-item="previous">
                  <ion-icon name="chevron-back" className="text-2xl"></ion-icon>
                </button>
                <button type="button" className="absolute -right-4 bg-white rounded-full top-16 grid w-9 h-9 place-items-center shadow dark:bg-dark3" uk-slider-item="next">
                  <ion-icon name="chevron-forward" className="text-2xl"></ion-icon>
                </button> 
                */}
              </div>
            </div>
          </div>
  
          {/* Additional sections (Pro Members, Online Friends, etc.) can be similarly converted and trimmed down as needed */}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  