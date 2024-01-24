import { Avatar, Button, Card, Menu, MenuProps, Typography } from "antd";
import { mainContentContainerStyle, profileContainer } from "./styles";
import { CheckOutlined, CloseOutlined, EditOutlined, InfoCircleOutlined, PaperClipOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { PostType, PostBox } from "../../components/Post/post-box";
import { useState } from "react";
import { UserBox } from "../../components/User/user-box";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { convertToNumber } from "../../utils/convert-string-to-number";
import { FriendRequestApi, PostApi, UserApi } from "../../midlewares/api";
import Cookies from "js-cookie";
import { Relation } from "../../midlewares/api/friend-request";
import { imageLink } from "../../utils/image-link";

const { Text } = Typography;

const ProfilePage = () => {
  const [currentKey, setCurrentKey] = useState('posts');
  const { id } = useParams();
  const userId = convertToNumber(id);
  const currentUser = JSON.parse(Cookies.get('user') ?? '');
  const navigate = useNavigate();

  const { data: userData } = useQuery(['userDataDetails', userId], () => UserApi.getUserById(userId));

  const { data: listFriend } = useQuery(['getListFriend'], FriendRequestApi.getListFriend);

  const { data: listPost } = useQuery(['listPost', userId], () => PostApi.getList({ userId }));

  const { data: friendRequest } = useQuery(
    ['relation', userId], 
    () => FriendRequestApi.getRelation(userId)
  );

  const actionRequestMutation = useMutation(FriendRequestApi.actionRequest, {
    onSuccess: () => {
      window.location.reload();
    }
  });

  if(!userData?.userId) return <></>;

  const items: MenuProps['items'] = [
    {
      label: 'Posts',
      key: 'posts',
      icon: <PaperClipOutlined />,
    },
    {
      label: 'About',
      key: 'about',
      icon: <InfoCircleOutlined />,
    },
  ];

  if(currentUser.userId === userId) items.push({
    label: 'Friends',
    key: 'friends',
    icon: <UserOutlined />,
  });

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key);
  }

  const handleRequest = (rqUserId: number, type: string) => {
    actionRequestMutation.mutate({ userId: rqUserId, type });
  }

  return (
    <div style={mainContentContainerStyle} className="element">
      <div style={profileContainer}>
        <Avatar shape="square" size={120} icon={<UserOutlined />} src={imageLink(userData.avatar)} />
        <div style={{ width: 'calc(100% - 110px)', marginLeft: '10pX', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Text strong style={{ fontSize: '24px', color: 'white' }}>{userData.name}</Text>
          <Text style={{ fontSize: '20px', color: 'white' }}>{`User ID: ${userData.userId}`}</Text>
          <div>
            {
              currentUser.userId === userId ? <Button type="primary" style={{ fontWeight: 'bold' }} icon={<EditOutlined />} onClick={() => navigate('/update/information')}>
                Edit profile
              </Button> : friendRequest == Relation.none ?
              <Button type="primary" style={{ fontWeight: 'bold' }} icon={<PlusOutlined />} onClick={() => handleRequest(userId, 'addfriend')}>Add friend</Button> : friendRequest === Relation.friend ?
              <Button type="primary" danger style={{ fontWeight: 'bold' }} icon={<CloseOutlined />} onClick={() => handleRequest(userId, 'unfriend')}>Unfriend</Button> : friendRequest === Relation.receiver ? <>
                <Button type="primary" style={{ fontWeight: 'bold', marginRight: '10px' }} icon={<CheckOutlined />} onClick={() => handleRequest(userId, 'accept')}>Accept</Button>
                <Button type="primary" danger style={{ fontWeight: 'bold' }} icon={<CloseOutlined />} onClick={() => handleRequest(userId, 'decline')}>Decline</Button>
              </> : <Button type="primary" danger style={{ fontWeight: 'bold', marginRight: '10px' }} icon={<CloseOutlined />} onClick={() => handleRequest(userId, 'cancel')}>Cancel</Button>
            }
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '46px', backgroundColor: 'white', padding: '0px 200px' }}>
        <Menu mode="horizontal" items={items} onClick={onClick} selectedKeys={[ currentKey ]} />
      </div>
      <div style={{ width: '100%', minHeight: 'calc(100% - 206px)', display: currentKey === 'posts' ? 'flex' : 'inline' }}>
        {currentKey === 'posts' && <>
          <div style={{ width: '50%' }}>
            {(listPost ?? []).filter((_post, index) => index % 2 === 0).map((post: PostType) => {
              return <PostBox post={post} />
            })}
          </div>

          <div style={{ width: '50%' }}>
            {(listPost ?? []).filter((_post, index) => index % 2 === 1).map((post: PostType) => {
              return <PostBox post={post} />
            })}
          </div>
        </>}

        {currentKey === 'about' && <>
          <Card title="Description" bordered={false} style={{ margin: '10px' }}>
            <Text>{userData.description}</Text>
          </Card>
          <Card title="Post statistics" bordered={false} style={{ margin: '10px' }}>
            <Text>{`${userData.reacts ?? 0} reacts / ${userData.posts ?? 0} posts`}</Text>
          </Card>
        </>}

        {currentKey === 'friends' && <>
          {(listFriend ?? []).map((friend) => (
            <UserBox name={friend.name} type="friend" handleUnfriend={() => handleRequest(friend.userId, 'unfriend')} />
          ))}
        </>}
      </div>
    </div>
  )
}

export default ProfilePage;