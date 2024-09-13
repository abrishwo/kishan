

const OpenChatBox = () => {
    return (
        // JSX Version
<>


  <div
    className="bg-white rounded-xl drop-shadow-xl sm:w-80 w-screen border-t dark:bg-dark3 dark:border-slate-600 uk-open"
    id="chat__box"
  >
    <div className="relative">
      {/* <div className="p-5">
        <h1 className="text-lg font-bold text-black">Chats</h1>
      </div> */}

      {/* Search input default is hidden */}
      <div
        className="bg-white p-3 absolute w-full top-11 border-b flex gap-2 hidden dark:border-slate-600 dark:bg-slate-700 z-10"
        id="search__chat"
      >
        <div className="relative w-full">
          <input
            type="text"
            className="w-full rounded-3xl dark:!bg-white/10"
            placeholder="Search"
          />
          <button
            type="button"
            className="absolute right-0 rounded-full shrink-0 px-2 -translate-y-1/2 top-1/2"
          >
            {/* Close Icon */}
            {/* <ion-icon name="close-outline" className="text-xl flex"></ion-icon> */}
          </button>
        </div>
      </div>

      {/* Button actions */}
      <div className="absolute top-0 -right-1 m-5 flex gap-2 text-xl">
        {/* Search Icon */}
        {/* <button><ion-icon name="search-outline"></ion-icon></button> */}
        {/* Close Icon */}
        {/* <button><ion-icon name="close-outline"></ion-icon></button> */}
      </div>

      {/* Tabs */}
      {/* <div className="page-heading bg-slate-50">
        <nav className="nav__underline -mt-7 px-5">
          <ul className="group">
            <li>
              <a href="#" className="inline-block py-[18px] border-b-2 border-transparent">
                Friends
              </a>
            </li>
            <li>
              <a href="#">Groups</a>
            </li>
          </ul>
        </nav>
      </div> */}

      {/* Chat List */}
      <div className="uk-switcher overflow-hidden rounded-xl -mt-8" id="chat__tabs">
        {/* Tab list 1 */}
        <div className="space-y-mt-5 p-3 text-sm font-medium h-[280px] overflow-y-auto">
          <a href="#" className="block">
            <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
              <img
                src="assets/images/avatars/avatar-1.jpg"
                alt=""
                className="w-7 rounded-full"
              />
              <div>Jesse Steeve</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
              <img
                src="assets/images/avatars/avatar-2.jpg"
                alt=""
                className="w-7 rounded-full"
              />
              <div>John Michael</div>
            </div>
          </a>
        </div>

        {/* Tab list 2 */}
        <div className="space-y-mt-5 p-3 text-sm font-medium h-[280px] overflow-y-auto">
          <a href="#" className="block">
            <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
              <img
                src="assets/images/avatars/avatar-1.jpg"
                alt=""
                className="w-7 rounded-full"
              />
              <div>Jesse Steeve</div>
            </div>
          </a>
          <a href="#" className="block">
            <div className="flex items-center gap-3.5 rounded-lg p-2 hover:bg-secondery dark:hover:bg-white/10">
              <img
                src="assets/images/avatars/avatar-2.jpg"
                alt=""
                className="w-7 rounded-full"
              />
              <div>John Michael</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div className="w-3.5 h-3.5 absolute -bottom-2 right-5 bg-white rotate-45 dark:bg-dark3"></div>
  </div>
</>

    )};

    export default OpenChatBox;