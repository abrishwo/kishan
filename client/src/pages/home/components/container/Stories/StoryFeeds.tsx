import React from 'react';
import { useState, useRef } from "react";
import Post from "../../ui/Post";
import CommentsContainer from "../CommentsContainer";
import { usePostStore, useReportStore } from "../../../../../store";
import { create } from "../../../../../services/crud";
import NoPostsFound from "../../../../../components/NoPostsFound";
import { isLoggedIn } from "../../../../../services/auth";
import { useNavigate } from "react-router-dom";
import ReportModal from "../../../../../components/ReportModal";
import { toast } from "react-toastify";

import { EllipsisHorizontal, BookmarkOutline, NotificationsOffOutline, FlagOutline, ShareOutline, StopCircleOutline, Heart, ChatbubbleEllipses, PaperPlaneOutline, ShareOutline as shareOutlineIcon, ImageOutline,VideocamOutline } from "react-ionicons";

interface PostContainerProps {
  feed: any[];
  showAddBtn?: boolean;
}
// Component for Feed Story

  export default function FeedStory({
    feed,
    showAddBtn,
  }: PostContainerProps) {


    const [visibleComment, setVisibleComment] = useState<string | null>();
    const componentRefs = useRef<{ [key: string]: HTMLElement }>({});
    const postToReport = useReportStore((state) => state.post);
    const togglePostLike = usePostStore((state) => state.togglePostLike);
    const navigate = useNavigate();
  
    const toggleComment = (id: string) => {
      if (visibleComment === id) {
        setVisibleComment(null);
        if (componentRefs.current[id])
          componentRefs.current[id].scrollIntoView({ behavior: "smooth" });
      } else {
        setVisibleComment(id);
      }
    };
  
    const likePost = (id: string, liked: boolean) => {
      if (!isLoggedIn()) return navigate("/auth");
  
      togglePostLike(id, liked);
      if (liked) {
        create("post/like/" + id, {}).catch((e) => {
          console.log(e);
          togglePostLike(id, false);
        });
      } else {
        create("post/unlike/" + id, {}).catch((e) => {
          console.log(e);
          togglePostLike(id, true);
        });
      }
    };
  
    const reportPost = (comment: string) => {
      if (postToReport && comment) {
        create("report", { post: postToReport._id, comment })
          .then(() => {
            toast.success("Report Sent For Review!");
          })
          .catch((e) => {
            console.log(e);
            toast.error(
              e.response?.data?.message ?? "Error! Report Not Submitted"
            );
          });
      }
      closeReportModal();
    };
  
    const closeReportModal = () => {
      let btn = document.getElementById("bottomModalClose");
      if (btn) {
        btn.click();
      }
    };
  
    // if (feed.length === 0) {
    //   return <NoPostsFound showBtn={showAddBtn ?? true} />;
    // }

    


  return (
    <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">

     
      <div className="bg-white shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2">
        <div className="flex items-center md:gap-3 gap-1">
          {/* Input Story */}
          <div className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3 px-3" uk-toggle="target: #create-status"> 
                                    <div className="py-2.5 text-center dark:text-white"> What do you have in mind? </div>
                                </div>

          {/* Icon Buttons */}
          {/* className="bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20" */}
          <ImageOutline 
     
          color={'#00712D'} 
          title={'image'}
          // height="26px"
          // width="60px"
          />
<VideocamOutline
  color={'#C7253E'} 
  title={'video'}
  height="30px"
  width="60px"
/>
          {/* <IconButton className="bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20" icon="path/to/sky-icon.svg" /> */}
        </div>
      </div>

      {/* Post Image */}
      <div className="post-area">
      {feed.map((post) => (
          <div
            key={post._id}
            ref={(el) => (componentRefs.current[post._id] = el as HTMLElement)}
          >
            <Post
              post={post}
              toggleComment={toggleComment}
              togglePostLike={likePost}
            />
            {visibleComment === post._id && <CommentsContainer post={post} />}
          </div>
        ))}
   </div>
   <ReportModal reportPost={reportPost} />
    </div>
  );
};

