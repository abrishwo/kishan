import React from 'react';

const CreateStatus = () => {
  return (
    <div className="hidden lg:p-20 uk-open" id="create-status" uk-modal="">
      <div className="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2">
        <div className="text-center py-4 border-b mb-0 dark:border-slate-700">
          <h2 className="text-sm font-medium text-black">Create Status</h2>

          {/* Close Button */}
          <button type="button" className="button-icon absolute top-0 right-0 m-2.5 uk-modal-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Textarea Input */}
        <div className="space-y-5 mt-3 p-2">
          <textarea
            className="w-full !text-black placeholder:!text-black !bg-white !border-transparent focus:!border-transparent focus:!ring-transparent !font-normal !text-xl dark:!text-white dark:placeholder:!text-white dark:!bg-slate-800"
            rows={6}
            placeholder="What do you have in mind?"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 text-sm py-2 px-4 font-medium flex-wrap">
          {['image', 'videocam', 'happy', 'location'].map((icon, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center gap-1.5 bg-${
                icon === 'image'
                  ? 'sky-50 text-sky-600 border-sky-100'
                  : icon === 'videocam'
                  ? 'teal-50 text-teal-600 border-teal-100'
                  : icon === 'happy'
                  ? 'orange-50 text-orange-600 border-orange-100'
                  : 'red-50 text-red-600 border-rose-100'
              } rounded-full py-1 px-2 border-2 dark:${
                icon === 'image'
                  ? 'bg-sky-950 border-sky-900'
                  : icon === 'videocam'
                  ? 'bg-teal-950 border-teal-900'
                  : icon === 'happy'
                  ? 'bg-yellow-950 border-yellow-900'
                  : 'bg-rose-950 border-rose-900'
              }`}
            >
              {/* <ion-icon name={icon} className="text-base"></ion-icon> */}
              {icon.charAt(0).toUpperCase() + icon.slice(1)}
            </button>
          ))}
          <button type="button" className="grid place-items-center w-8 h-8 text-xl rounded-full bg-secondery">
            {/* <ion-icon name="ellipsis-horizontal"></ion-icon> */}
          </button>
        </div>

        {/* Dropdown Menu and Create Button */}
        <div className="p-5 flex justify-between items-center">
          <div>
            <button
              className="inline-flex items-center py-1 px-2.5 gap-1 font-medium text-sm rounded-full bg-slate-50 border-2 border-slate-100 group aria-expanded:bg-slate-100 aria-expanded: dark:text-white dark:bg-slate-700 dark:border-slate-600"
              type="button"
            >
              Everyone
              {/* <ion-icon
                name="chevron-down-outline"
                className="text-base duration-500 group-aria-expanded:rotate-180"
              ></ion-icon> */}
            </button>

            <div
              className="p-2 bg-white rounded-lg shadow-lg text-black font-medium border border-slate-100 w-60 dark:bg-slate-700"
              uk-drop="offset:10;pos: bottom-left; reveal-left;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left ; mode:click"
            >
              <form>
                {['Everyone', 'Friends', 'Only me'].map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="radio-status"
                      className="peer appearance-none hidden"
                      defaultChecked={index === 0}
                    />
                    <div className="relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3">
                      <div className="text-sm">{option}</div>
                      {/* <ion-icon
                        name="checkmark-circle"
                        className="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up"
                      ></ion-icon> */}
                    </div>
                  </label>
                ))}
              </form>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="button bg-blue-500 text-white py-2 px-12 text-[14px]">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStatus;
