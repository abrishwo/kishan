import { formatResourceURL, handleProfileImageError } from "../../services/asset-paths";
import { getName } from "../../services/utils";
import { getDateAndTime } from "../../services/timeAndDate";

interface NotificationDropdownProps {
  notifications: any[];
  markNotificationAsRead: (notificationId: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  markNotificationAsRead,
}) => {
  return (
    <div className="absolute pr-1.5 right-0 bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2 offset-6 pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right ">
    {/* //  <div  className="absolute top-10 bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2 offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "> */}
    {/* // uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "> */}


      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b dark:border-gray-600">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Notifications</h3>
        <div className="flex gap-2">
          <button type="button" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 focus:bg-secondary dark:text-white">
            {/* Settings Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              {/* Add SVG path for settings icon here */}
            </svg>
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="text-sm max-h-[400px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <a
              key={index}
              href="#"
              className="flex items-start gap-3 px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              onClick={() => markNotificationAsRead(notification._id)}
            >
              <div className="relative flex-shrink-0 w-10 h-10">
                <img
                  src={formatResourceURL(notification?.creator?.profile_img)}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                  onError={handleProfileImageError}
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-gray-100">
                  <span className="font-semibold">{getName(notification.creator)}</span>{" "}
                  {notification.description ?? "No messages"}
                </p>
                <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                  {getDateAndTime(notification.createdAt)}
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
            No notifications available.
          </div>
        )}
      </div>

      {/* Footer */}

     {notifications.length > 0 && ( <a href="#" className="block">
        <div className="text-center py-3 border-t dark:border-gray-600 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200">
          View All Notifications
        </div>
      </a>)}
    </div>
  );
};

export default NotificationDropdown;
