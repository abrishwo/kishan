import ChatListHeader from "./components/ChatListHeader";
import SearchBar from "../../components/SearchBar";
import ContactsList from "./components/container/ContactsList";
import { useEffect, useState } from "react";
import PageLoading from "../../components/PageLoading";
import { get } from "../../services/crud";
import { getUserId } from "../../services/auth";

export default function ChatList() {
  const [pageLoading, setPageLoading] = useState(true);
  const [chatsList, setChatsList] = useState([]);
  const [chatsCount, setChatsCount] = useState(0);

  useEffect(() => {
    get("chat/list/" + getUserId())
      .then((res) => {
        console.log(res);
        setChatsCount(res.count);
        setChatsList(res.data);
        setPageLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setPageLoading(false);
      });
  }, []);

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <ChatListHeader />

      <div className="page-content vh-100">
        <div className="content-inner pt-0">
          <div className="container bottom-content">
            <SearchBar />

            <ContactsList list={chatsList} />
          </div>
        </div>
      </div>
    </>
  );
}
