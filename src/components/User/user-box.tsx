import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

export type UserBoxProps = {
  name: string;
  type: string;
  handleUnfriend?: () => void;
  handleAccept?: () => void;
  handleDecline?: () => void;
  handleCancel?: () => void;
}

export const UserBox = (props: UserBoxProps) => {
  const { name, type, handleAccept, handleCancel, handleDecline, handleUnfriend } = props;
  return (
    <div style={{ width: '100%', backgroundColor: 'white', margin: '10px 0px', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="hover-div">
      <div>
        <Avatar size={48} style={{ marginRight: '10px' }} icon={<UserOutlined />} />
        <a style={{ color: 'black' }} href="/profile">{name}</a>
      </div>
      {
        type === 'friend' ? <Button icon={<CloseOutlined />} danger type="primary" onClick={handleUnfriend}>Unfriend</Button> : null
      }
      {
        type === 'sender' ? <Button icon={<CloseOutlined />} danger type="primary" onClick={handleCancel}>Cancel</Button> : null
      }
      {
        type === 'receiver' ? <div>
          <Button icon={<CheckOutlined />} type="primary" style={{ marginRight: '10px' }} onClick={handleAccept}>Accept</Button>
          <Button icon={<CloseOutlined />} danger type="primary" onClick={handleDecline}>Decline</Button>
        </div> : null
      }
    </div>
  )
}