import { Button, Dropdown, MenuProps, Typography } from "antd"
import { friendsContainerStyle, requestsContainerStyle } from "../styles"
import { CheckOutlined, CloseOutlined, EllipsisOutlined, MessageOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const RightContent = () => {
  const fourNewestRequest = [
    { content: 'User A wants to add you to friend.' },
    { content: 'User B wants to add you to friend.' },
    { content: 'User B wants to add you to friend.' },
    { content: 'User B wants to add you to friend.' },
  ];

  const friends = [
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
    { 'name': 'A' },
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Button type="link" style={{ width: 'fit-content', padding: 0 }} icon={<CheckOutlined />}>Accept</Button>,
    },
    {
      key: '0',
      label: <Button type="link" style={{ width: 'fit-content', padding: 0 }} icon={<CloseOutlined />}>Decline</Button>,
    }
  ]

  return <>
    <div style={requestsContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text strong style={{ fontSize: '16px' }}>Requests</Text>
        <Button type="link" icon={<UserOutlined /> } style={{ color: 'black' , border: 'none' }} />
      </div>
      {
        fourNewestRequest.map((request) => {
          return <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
            <div style={{ width: '80%' }}>{request.content}</div>
            <Dropdown menu={{items}} placement="topLeft" trigger={['click']}>
              <Button type="link" icon={<EllipsisOutlined /> } style={{ color: 'black' , border: 'none' }} />
            </Dropdown>
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
          friends.map((friend) => {
            return <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div style={{ width: '80%' }}>{friend.name}</div>
              <Button type="link" icon={<MessageOutlined /> } style={{ color: 'black' , border: 'none' }} />
            </div>
          })
        }
      </div>
    </div>
  </>
}