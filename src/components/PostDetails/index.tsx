import { Avatar, Button, Divider, Input, Modal, Typography } from "antd";
import { usePost } from "../../context/post-context";
import { UserOutlined, HeartOutlined, ClockCircleOutlined, MessageOutlined, HeartFilled } from "@ant-design/icons";
import { imageLink } from "../../utils/image-link";
import { useMutation, useQuery } from "react-query";
import { PostApi } from "../../midlewares/api";
import Cookies from "js-cookie";
import { useState } from "react";

const { Text } = Typography;

const PostDetails = () => {
  const { state, dispatch } = usePost();
  const currentUser = JSON.parse(Cookies.get('user') ?? '');
  const [comment, setComment] = useState('');

  const { data: post, refetch } = useQuery(['postDetails', state.postId], () => PostApi.getPostDetails(state.postId));
  
  const reactPostMutation = useMutation(PostApi.reactPost, {
    onSuccess: () => {
      refetch();
    }
  });

  const unreactPostMutation = useMutation(PostApi.unReactPost, {
    onSuccess: () => {
      refetch();
    }
  });

  const commentLPostMutation = useMutation(PostApi.commentPost, {
    onSuccess: () => {
      refetch();
      setComment('');
    }
  });

  const handleCancel = () => {
    dispatch({ type: 'CLOSE' });
  }

  const handleClick = () => {
    post?.reacts.includes(currentUser.userId) ? 
    unreactPostMutation.mutate(post?.postId) :
    reactPostMutation.mutate(post?.postId);
  }

  return <Modal open={state.isOpen} onCancel={handleCancel} centered footer={false} closeIcon={null} style={{ maxHeight: '80%', overflowY: 'auto' }} className="element">
    <div key={post?.postId}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar icon={<UserOutlined />} src={imageLink(post?.owner?.avatar)} />
        <div style={{ width: 'calc(100% - 80px)' }}>
          <Text>{post?.owner?.name}</Text>
        </div>
        <Button type="link" icon={post?.reacts.includes(currentUser.userId) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined /> } style={{ color: 'black' , border: 'none' }} onClick={handleClick} />
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
          <HeartOutlined style={{ marginRight: '5px' }} /> {post?.reacts.length}
          <MessageOutlined style={{ margin: '0px 5px 0px 10px' }} /> { post?.comments.length }
        </div>
      </div>

      <Divider style={{ margin: '10px 0px' }} />

      <Input style={{ border: 'none', borderRadius: 0, backgroundColor: 'white !important' }} placeholder="Write comment..." onChange={(e) => setComment(e.target.value)} value={comment} onPressEnter={() => commentLPostMutation.mutate({ postId: post?.postId, content: comment })} />
      {post?.comments.map((comment) => {
        return <div style={{ width: '96%', margin: '10px 0px', padding: '5px' }}>
          <Avatar icon={<UserOutlined />} src={comment.owner.avatar.length ? imageLink(comment.owner.avatar.length) : undefined} />{` ${comment.owner.name}`}
          <div style={{ margin: '0px 32px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>{comment.content}</div>
        </div>;
      })}
    </div>
  </Modal>;
}

export default PostDetails;