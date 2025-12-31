import { Trash } from "@components";
import { NavigatorProps } from "@types";
import "@styles/layouts/chat/withData/navigator.scss";

export const Navigator: React.FC<NavigatorProps> = ({ chatList, channelName, popup, trashChat, channelSelected, setChat }) => (
  <div className="navigator">
    {chatList.map((item, index) => (
      <div
        key={index}
        style={{ backgroundColor: item.name === channelName ? "rgba(37, 37, 43, 1)" : "" }}
        className="channel"
        onClick={() => {
          if (item.channelId.toString() !== channelSelected) {
            setChat(item.channelId, item.chatroomId, item.name)
          };
        }}
      >
        {item.name}
        <div className="options" 
          onClick={(e) => {
            e.stopPropagation();
            trashChat(item.channelId)
          }}
        >
          <Trash />
        </div>
      </div>
    ))}
    {chatList.length <= 3 && (
      <div className="channel" onClick={popup}>+</div>
    )}
  </div>
);