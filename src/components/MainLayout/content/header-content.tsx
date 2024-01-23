import { Avatar, Button, Input } from "antd";
import { avatarContainerStyle, logoContainerStyle, searchContainerStyle, searchStyle } from "../styles";
import { PlusCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Search } = Input;

export const HeaderContent = () => {
  return (
    <>
      <div style={logoContainerStyle}>
        LOCO
      </div>
      <div style={searchContainerStyle}>
        <Search style={searchStyle} placeholder='Search for users' />
      </div>
      <div style={avatarContainerStyle}>
        <Button type="link" icon={<PlusCircleOutlined style={{ fontSize: '20px' }} /> } style={{ color: 'black' }} />
        <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} size={48} style={{ marginRight: '10px' }} />
          <div style={{ color: 'black', fontSize: '18px' }}>Name</div>
        </div>
        <Button type='link' icon={<SettingOutlined style={{ fontSize: '18px' }} />} style={{ color: 'black' }} />
      </div>
    </>
  )
};
