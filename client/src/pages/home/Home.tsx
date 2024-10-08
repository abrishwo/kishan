import { useEffect, useState, useRef } from "react";
import PageLoading from "../../components/PageLoading";
import HomeHeader from "./components/HomeHeader";
import StoryBar from "./components/container/StoryBar";
import Stories from "./components/container/Stories/Stories";
import PostsContainer from "./components/container/PostsContainer";
import SidebarContainer from "./components/ui/sidebar/SidebarContainer";
import Sidebar from "./components/ui/sidebar/Sidebar";
import { get } from "../../services/crud";
import BlinkingLoadingCircles from "../../components/BlinkingLoadingCircles";
import { useBgdImgStore, usePostStore } from "../../store";
import ShareModal from "../../components/ShareModal";
import { toast } from "react-toastify";
import AddPWA, { usePwaInstallPrompt } from "../../components/AddPWA";
import {
  fetchImageConfig,
  getBackgroundImage,
} from "../../services/config-data";
import { formatResourceURL } from "../../services/asset-paths";
import { isLoggedIn } from "../../services/auth";
import FeedStory from "./components/container/Stories/StoryFeeds";
import OpenChatBox from "./components/ui/chat/OpenChatBox";
import CreateStatus from "./components/ui/chat/CreateStatus";
import CreateStory from "./components/container/Stories/CreateStory";
// import SideBar from "../../components/SideBar";
import { Link, useParams } from "react-router-dom";
export default function Home({ active }: { active?: string }) {
  const params = useParams();
  const installPWA: any = usePwaInstallPrompt();

  const [pageLoading, setPageLoading] = useState(true);
  const lastDate = useRef<string | null>(null);
  const lastPostId = useRef<string | null>(null);
  const loadingAdditionalPosts = useRef<boolean>(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const posts = usePostStore((state) => state.posts);
  const addToFeed = usePostStore((state) => state.addToFeed);
  const clearPosts = usePostStore((state) => state.clearPosts);

  const bgdImage = useBgdImgStore((s) => s.url);
  const setBgdImage = useBgdImgStore((s) => s.setImage);

  useEffect(() => {
    getFeed();

    // add event listener for scorll event to fetch additional posts on the bottom of the page
    window.addEventListener("scroll", handleScroll);

    // add event listener for resize event to handle background image
    setBackgroundImage();
    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScreenResize);
      clearPosts();
    };
  }, []);

  // Fetch more posts when the user reaches the bottom of the page
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 5 &&
      !loadingAdditionalPosts.current
    ) {
      loadingAdditionalPosts.current = true;
      await getFeed();
      loadingAdditionalPosts.current = false;
    }
  };

  const getFeed = async () => {
    setPostsLoading(true);
    return get("post/feed", {
      pageSize: 10,
      lastDate: lastDate.current,
      lastPostId: lastPostId.current,
    })
      .then((res) => {
        if (res.data.length === 0) {
          loadingAdditionalPosts.current = false;
          window.removeEventListener("scroll", handleScroll);
        }
        addToFeed([...res.data]);
        lastDate.current = res.lastDate;
        lastPostId.current = res.lastPostId;
        setPageLoading(false);
        setPostsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setPageLoading(false);
        setPostsLoading(false);
        toast.error(e.response?.data?.message ?? "Error fetching posts");
      });
  };

  const setBackgroundImage = async () => {
    setBackground(); // until new data is fetched, display old one
    await fetchImageConfig();
    setBackground();
  };

  const handleScreenResize = () => {
    setBackground();
  };

  const setBackground = () => {
    const url = formatResourceURL(getBackgroundImage());
    setBgdImage(url);
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
    <div id="wrapper">
      <HomeHeader installPWA={installPWA} />

      {/* <SidebarContainer /> */}

      {/* Page Content  */}
      {/* <div
        className="page-content min-vh-100 background-image"
        style={{ background: `url(${bgdImage})` }}
      >
        <div className="content-inner pt-0">
          <div className="container bottom-content">
            {/* STORY  */}
      {/* {isLoggedIn() && <StoryBar />} */}

      {/* POSTS */}
      {/* <PostsContainer feed={posts} /> */}

      {/* {postsLoading && <BlinkingLoadingCircles />} */}

      {/* <ShareModal /> */}
      {/* </div>
        </div>
      </div> */}
      {/* Page Content End */}

      {/* <!-- main contents --> */}
      <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">

        {/* <!-- timeline --> */}
        <div className="lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto" id="js-oversized">

          <div className="max-w-[680px] mx-auto">
            {/* <!-- stories --> */}
            {/* {isLoggedIn() && <StoryBar />} */}
           {isLoggedIn() &&  <Stories />}
{/* <PostsContainer feed={posts} /> */}
            <FeedStory feed={posts}/>
            <ShareModal /> 
            </div>

            <Sidebar /> 
        </div>

       
      </main>

      <AddPWA installPWA={installPWA} />
    </div>
    {/* open chat box  */}
    
  


            <OpenChatBox />
          

    
    {/* <CreateStory /> */}
    </>

  );
}
