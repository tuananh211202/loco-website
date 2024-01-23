import { Avatar, Button, Divider, Input, Typography } from "antd";
import { mainContentContainerStyle } from "../styles";
import { ClockCircleOutlined, HeartOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const MainContent = () => {
  const posts = [
    { 
      description: `Display ellipsis when text overflows, can't configure expandable、rows and onExpand by using object. Diff with Typography.Paragraph, Text do not have 100% width style which means it will fix width on the first ellipsis. If you want to have responsive ellipsis, please set width manually`,
      imageUrl: 'data:image/jpeg;base64,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',
      reactCount: 200,
      commentCount: 500,
      create_at: new Date(),
      owner: {
        name: 'bibabibo',
        avatar: ''
      }
    }
  ];

  return <div style={mainContentContainerStyle} className="element">

    <div style={{ width: '50%' }}>

      {posts.filter((_post, index) => index % 2 === 0).map((post) => (
        <div className="post">
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Avatar icon={<UserOutlined />} src={post.owner.avatar} />
            <div style={{ width: 'calc(100% - 80px)' }}>
              <Text>{post.owner.name}</Text>
            </div>
            <Button type="link" icon={<HeartOutlined /> } style={{ color: 'black' , border: 'none' }} />
          </div>

          <div style={{ width: '100%', padding: '10px' }}>
            {post.description}
          </div>

          <img src={post.imageUrl} style={{ width: '100%', padding: '0px 10px 10px 10px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 10px' }}>
            <div style={{ color: '#6a5f62' }}>
              <ClockCircleOutlined style={{ marginRight: '5px' }} />
              10 minutes
            </div>
            <div  style={{ color: '#6a5f62' }}>
              <HeartOutlined style={{ marginRight: '5px' }} /> {post.reactCount}
              <MessageOutlined style={{ margin: '0px 5px 0px 10px' }} /> { post.commentCount }
            </div>
          </div>

          <Divider style={{ margin: '10px 0px' }} />

          <Input style={{ border: 'none', borderRadius: 0, backgroundColor: 'white !important' }} placeholder="Write comment..." />
        </div>
      ))}

    </div>

    <div style={{ width: '50%' }}>

       {posts.filter((_post, index) => index % 2 === 1).map((post) => (
        <div className="post">
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Avatar icon={<UserOutlined />} src={post.owner.avatar} />
            <div style={{ width: 'calc(100% - 80px)' }}>
              <Text>{post.owner.name}</Text>
            </div>
            <Button type="link" icon={<HeartOutlined /> } style={{ color: 'black' , border: 'none' }} />
          </div>

          <div style={{ width: '100%', padding: '10px' }}>
            {post.description}
          </div>

          <img src={post.imageUrl} style={{ width: '100%', padding: '0px 10px 10px 10px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 10px' }}>
            <div style={{ color: '#6a5f62' }}>
              <ClockCircleOutlined style={{ marginRight: '5px' }} />
              10 minutes
            </div>
            <div  style={{ color: '#6a5f62' }}>
              <HeartOutlined style={{ marginRight: '5px' }} /> {post.reactCount}
              <MessageOutlined style={{ margin: '0px 5px 0px 10px' }} /> { post.commentCount }
            </div>
          </div>

          <Divider style={{ margin: '10px 0px' }} />

          <Input style={{ border: 'none', borderRadius: 0, backgroundColor: 'white !important' }} placeholder="Write comment..." />
        </div>
      ))}
      
    </div>
   
  </div>;
}