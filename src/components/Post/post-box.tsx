import { UserOutlined, HeartOutlined, ClockCircleOutlined, MessageOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Input, Typography } from "antd"
import { imageLink } from "../../utils/image-link";
import { useMutation } from "react-query";
import { FriendRequestApi } from "../../midlewares/api";

const { Text } = Typography;

export type PostType = {
  owner: {
    avatar: string;
    name: string;
  };
  postId: number;
  description: string;
  imageUrl: string;
  reactCount: number;
  commentCount: number;
  create_at: string;
}

type PostBoxProps = {
  post: PostType;
}

export const PostBox = (props: PostBoxProps) => {
  const { post } = props;

  return (
    <div className="post" key={post?.postId}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar icon={<UserOutlined />} src={imageLink(post?.owner?.avatar)} />
        <div style={{ width: 'calc(100% - 80px)' }}>
          <Text>{post?.owner?.name}</Text>
        </div>
        <Button type="link" icon={<HeartOutlined /> } style={{ color: 'black' , border: 'none' }} />
      </div>

      <div style={{ width: '100%', padding: '10px' }}>
        {post?.description}
      </div>

      <img src={imageLink(post?.imageUrl)} style={{ width: '100%', padding: '0px 10px 10px 10px' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 10px' }}>
        <div style={{ color: '#6a5f62' }}>
          <ClockCircleOutlined style={{ marginRight: '5px' }} />
          10 minutes
        </div>
        <div  style={{ color: '#6a5f62' }}>
          <HeartOutlined style={{ marginRight: '5px' }} /> {post?.reactCount}
          <MessageOutlined style={{ margin: '0px 5px 0px 10px' }} /> { post?.commentCount }
        </div>
      </div>

      <Divider style={{ margin: '10px 0px' }} />

      <Input style={{ border: 'none', borderRadius: 0, backgroundColor: 'white !important' }} placeholder="Write comment..." />
    </div>
  )
}