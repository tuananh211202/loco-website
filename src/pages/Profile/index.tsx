import { Avatar, Button, Card, Menu, MenuProps, Typography } from "antd";
import { mainContentContainerStyle, profileContainer } from "./styles";
import { EditOutlined, InfoCircleOutlined, PaperClipOutlined, UserOutlined } from "@ant-design/icons";
import { PostType, PostBox } from "../../components/Post/post-box";
import { posts } from "../../utils/constants";
import { useState } from "react";
import { UserBox } from "../../components/User/user-box";

const { Text } = Typography;

const ProfilePage = () => {
  const [currentKey, setCurrentKey] = useState('posts');

  const users = [
    { name: 'aaaa' }
  ];

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
    {
      label: 'Friends',
      key: 'friends',
      icon: <UserOutlined />,
    }
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key);
  }

  return (
    <div style={mainContentContainerStyle} className="element">
      <div style={profileContainer}>
        <Avatar shape="square" size={120} icon={<UserOutlined />} />
        <div style={{ width: 'calc(100% - 110px)', marginLeft: '10pX', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Text strong style={{ fontSize: '24px', color: 'white' }}>abc</Text>
          <Text style={{ fontSize: '20px', color: 'white' }}>abc</Text>
          <div>
            <Button type="primary" style={{ fontWeight: 'bold' }} icon={<EditOutlined />}>
              Edit profile
            </Button>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '46px', backgroundColor: 'white', padding: '0px 200px' }}>
        <Menu mode="horizontal" items={items} onClick={onClick} selectedKeys={[ currentKey ]} />
      </div>
      <div style={{ width: '100%', minHeight: 'calc(100% - 206px)' }}>
        {currentKey === 'posts' && <>
          <div style={{ width: '50%' }}>
            {posts.filter((_post, index) => index % 2 === 0).map((post: PostType) => {
              return <PostBox post={post} />
            })}
          </div>

          <div style={{ width: '50%' }}>
            {posts.filter((_post, index) => index % 2 === 1).map((post: PostType) => {
              return <PostBox post={post} />
            })}
          </div>
        </>}

        {currentKey === 'about' && <>
          <Card title="Description" bordered={false} style={{ margin: '10px' }}>
            <Text>con ca ne</Text>
          </Card>
          <Card title="Post statistics" bordered={false} style={{ margin: '10px' }}>
            <Text>10 reacts / 2 posts</Text>
          </Card>
        </>}

        {currentKey === 'friends' && <>
          {users.map((user) => (
            <UserBox name={user.name} type="friend" />
          ))}
        </>}
      </div>
    </div>
  )
}

export default ProfilePage;