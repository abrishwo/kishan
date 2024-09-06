import { Key, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { get } from "../../../../../services/crud";
import { getUser, getUsername } from "../../../../../services/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getName } from "../../../../../services/utils";
import {
  formatResourceURL,
  handleProfileImageError,
} from "../../../../../services/asset-paths";

import { CameraOutline,ChevronBackOutline,ChevronForwardOutline } from "react-ionicons";

const Stories = () => {

  const [users, setUsers] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [noMorePeople, setNoMorePeople] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFollowings();
  }, []);

  const fetchFollowings = () => {
    setLoading(true);
    get("user/following/" + getUsername(), { page: page + 1, limit })
      .then((res: { data: string | any[]; page: string; limit: string; }) => {
        if (res.data.length < limit) {
          setNoMorePeople(true);
        }
        setUsers((s: any) => [...s, ...res.data]);
        setPage(parseInt(res.page));
        setLimit(parseInt(res.limit));
        setLoading(false);
      })
      .catch((e: { response: { data: { message: any; }; }; }) => {
        console.log(e);
        toast.error(
          e?.response?.data?.message ?? "Error while fetching following users"
        );
        setLoading(false);
      });
  };

  return (
    <div className="mb-8">
      <h3 className="font-extrabold text-2xl text-black dark:text-white hidden">Stories</h3>

      <div className="relative" data-uk-slider="auto play: true;finite: true" data-uk-lightbox="">
        <div className="py-5 uk-slider-container">
          <ul
            className="uk-slider-items w-[calc(100%+14px)]"
            data-uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
          >
            <li className="md:pr-3" data-uk-scrollspy-class="uk-animation-fade">
              <div
                className="md:w-16 md:h-16 w-12 h-12 rounded-full relative border-2 border-dashed grid place-items-center bg-slate-200 border-slate-300 dark:border-slate-700 dark:bg-dark2 shrink-0"
                data-uk-toggle="target: #create-story"
              >
                            <CameraOutline
                                color={'#00000'} 
                                title={'camera'}
                                height="30px"
                                width="30px"
                />
              </div>
              <span className="md:w-16 md:h-16 place-items-center px-3">You</span>
            </li>

            {users.map((user: any, index: any) => (
              <li
                key={index}
                className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300"
              >
                <a href={"/profile/" + user.username} data-caption="Caption 1">
                  <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                    <img
                      src={formatResourceURL(user.profile_img)}
                      onError={handleProfileImageError}
                      alt="/"
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                  <span className="detail">{getName(user)}</span>
                </a>
              </li>
            ))}

            <li className="md:pr-3 pr-2">
              <div className="md:w-16 md:h-16 w-12 h-12 bg-slate-200/60 rounded-full dark:bg-dark2 animate-pulse"></div>
            </li>
          </ul>
        </div>

        <div className="max-md:hidden">
          <button
            type="button"
            className="absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3"
            data-uk-slider-item="previous"
          >
                        <ChevronBackOutline
                            color={'#00000'} 
                            title={'chevron-back'}
                            height="30px"
                            width="30px"
                            />
          </button>
          <button
            type="button"
            className="absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3"
            data-uk-slider-item="next"
          >
            <ChevronForwardOutline
                color={'#00000'} 
                title={'chevron-forward'}
                height="30px"
                width="30px"
                />
          </button>
        </div>

                      {/* <Swiper spaceBetween={"0"} slidesPerView={"auto"}>
                <SwiperSlide>
                  <div className="swiper-slide">
                    <Link
                      to={"/profile"}
                      className="categore-box style-1"
                      style={{ width: "68px" }}
                    >
                      <div className="story-bx">
                        <img
                          src={formatResourceURL(getUser().profile_img)}
                          onError={handleProfileImageError}
                          alt="/"
                          style={{ width: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <span className="detail">You</span>
                    </Link>
                  </div>
                </SwiperSlide>
                {users.map((user: any, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="swiper-slide">
                      <Link
                        to={"/profile/" + user.username}
                        className="categore-box"
                        style={{ width: "68px" }}
                      >
                        <div className="story-bx">
                          <img
                            src={formatResourceURL(user.profile_img)}
                            onError={handleProfileImageError}
                            alt="/"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <span className="detail">{getName(user)}</span>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
                {!noMorePeople && (
                  <SwiperSlide>
                    <div className="swiper-slide">
                      <div className="categore-box" style={{ width: "68px" }}>
                        <div className="story-bx">
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              boxSizing: "content-box",
                              borderRadius: "18px",
                              border: "5px solid #FEF3ED",
                              width: "54px",
                              height: "54px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (!loading) fetchFollowings();
                            }}
                          >
                            {!loading ? (
                              <div
                                className="bg-secondary rounded-circle text-white d-flex justify-content-center align-items-center"
                                style={{ width: "20px", height: "20px" }}
                              >
                                <i
                                  className="fa fa-chevron-right"
                                  style={{ fontSize: "10px" }}
                                ></i>
                              </div>
                            ) : (
                              <div
                                className="bg-secondary rounded-circle text-white d-flex justify-content-center align-items-center"
                                style={{ width: "20px", height: "20px" }}
                              >
                                <i
                                  className="fa fa-spinner fa-spin"
                                  style={{ fontSize: "10px" }}
                                ></i>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="detail">More</span>
                      </div>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper> */}
      </div>
    </div>
  );
};

export default Stories;
