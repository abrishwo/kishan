import { useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import { get, update } from "../../services/crud";
import { getSocket } from "../../services/socket";
import { useCurrentUserStore } from "../../store";
import { NotificationsOutline } from 'react-ionicons'


export default function NotificationButton() {
  const socket = getSocket();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const currentUserId = useCurrentUserStore((state: any) => state.id);

  useEffect(() => {
    fetchNotifications();

    const handleNewNotification = (notification: any) => {
      if (currentUserId !== notification?.creator?._id) {
        setNotifications((prevNotifications: any) => [...prevNotifications, notification]);
        if (!notification.read) {
          setUnreadCount((prevCount) => prevCount + 1);
        }
      }
    };

    socket?.on("NEW_NOTIFICATION", handleNewNotification);

    socket?.on("READ_NOTIFICATION", (updatedNotification: { _id: any }) => {
      setNotifications((prevNotifications: any) =>
        prevNotifications.map((notification: any) =>
          notification._id === updatedNotification._id
            ? { ...updatedNotification, read: true }
            : notification
        )
      );
      setUnreadCount((prevCount) => prevCount - 1);
    });

    return () => {
      socket?.off("NEW_NOTIFICATION", handleNewNotification);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await get("notification/");
      setNotifications(res.data);
      setUnreadCount(res.data.filter((notification: any) => !notification.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await update(`notification/${notificationId}`, { read: true });
      setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="sm:p-2 p-1 rounded-full relative sm:bg-secondary dark:text-white"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 max-sm:hidden"
        > */}
          {/* SVG paths here */}
        {/* </svg> */}
        <NotificationsOutline
          color={'#00000'} 
          title={'notification'}
          height="24px"
          width="24px"
        />
        {unreadCount > 0 && (
          <div className="absolute top-1 right-1 -m-1 bg-red-600 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </div>
        )}
      </button>

      {showDropdown && (
        <NotificationDropdown
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
        />
      )}
    </div>
  );
}
