import { Button, Dropdown, MenuProps, Typography } from "antd"
import { friendsContainerStyle, requestsContainerStyle } from "../styles"
import { CheckOutlined, CloseOutlined, EllipsisOutlined, EyeOutlined, MessageOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { FriendRequestApi } from "../../../midlewares/api";
import { profileLink } from "../../../utils/profile-link";
import { useNavigate } from "react-router-dom";
import MessageBox from "../../MessageBox";
import { useChat } from "../../../context/chat-context";

const { Text } = Typography;

export const RightContent = () => {
  const navigate = useNavigate();
  const { dispatch } = useChat();

  const { data: newestRequest } = useQuery(['listFriendRequest'], FriendRequestApi.getListRequest);

  const { data: listFriends } = useQuery(['listFriend'], FriendRequestApi.getListFriend);

  const handleClick = (userId: number, avatar: string, name: string) => {
    dispatch({ type: 'OPEN', payload: { userId, avatar, name  } });
  }

  return <>
    <div style={requestsContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text strong style={{ fontSize: '16px' }}>Requests</Text>
        <Button type="link" icon={<UserOutlined /> } style={{ color: 'black' , border: 'none' }} />
      </div>
      {
        (newestRequest ?? []).slice(0,4).map((request) => {
          return <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
            <div style={{ width: '80%' }}>{`${request.name} #${request.userId} `}wants to add you to friend.</div>
            <Button type="link" icon={<EyeOutlined /> } style={{ color: 'black' , border: 'none' }} onClick={() => navigate(profileLink(request.userId))} />
          </div>
        })
      }
    </div>
    <div style={friendsContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text strong style={{ fontSize: '16px' }}>Friends</Text>
        <Button type="link" icon={<SearchOutlined /> } style={{ color: 'black' , border: 'none' }} />
      </div>
      <div style={{ width: '100%', overflowY: 'auto', height: 'calc(100% - 32px)' }} className="element">
        {
          (listFriends ?? []).map((friend) => {
            return <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div style={{ width: '80%' }}>{friend.name}</div>
              <Button type="link" icon={<MessageOutlined /> } style={{ color: 'black' , border: 'none' }} onClick={() => handleClick(friend.userId, friend.avatar, friend.name)} />
            </div>
          })
        }
      </div>
    </div>
  </>
}