import { HomeOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


type MenuItem = Required<MenuProps>['items'][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem => {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('People', '2', <UserOutlined />),
  getItem('Profile', '5', <ProfileOutlined />),
  getItem('Setting', 'sub1', <SettingOutlined />, [
    getItem('Information', '6'),
    getItem('Avatar', '7'),
    getItem('Password', '8')
  ])
]

export const SiderContent = () => {
  const [currentKey, setCurrentKey] = useState('1'); 
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (keys) => {
    switch (keys.key) {
      case '1':
        navigate('/');
        setCurrentKey('1');
        return;
      case '2':
        navigate('/people');
        setCurrentKey('2');
        return;
      case '5':
        navigate('/profile');
        setCurrentKey('5');
        return;
      case '6':
        navigate('/update/information');
        setCurrentKey('6');
        return;
      case '7':
        navigate('/update/avatar');
        setCurrentKey('7');
        return;
      case '8':
        navigate('/update/password');
        setCurrentKey('8');
        return;
      default: 
        return;
    }
  }

  return <>
    <Menu onClick={onClick} theme="dark" selectedKeys={[ currentKey ]} mode="inline" items={items} style={{ padding: '15px 0px' }} />
  </>
}
