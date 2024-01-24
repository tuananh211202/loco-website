import { HomeOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import Cookies from "js-cookie";

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
  ]),
  getItem('Logout', '9', <LogoutOutlined />),
]

export const SiderContent = () => {
  const [currentKey, setCurrentKey] = useState('1'); 
  const navigate = useNavigate();
  const { dispatch: authDispatch } = useAuth();
  const location = useLocation();
  const currentUser = JSON.parse(Cookies.get('user') ?? '');

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
        navigate(`/profile/${currentUser.userId}`);
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
      case '9':
        authDispatch({ type: 'LOGOUT' });
        navigate('signin');
        return;
      default: 
        return;
    }
  }

  useEffect(() => {
    if(location.pathname === '/') setCurrentKey('1');
    else {
      const pathArr = location.pathname.split('/');
      const str = pathArr[1];
      switch (str) {
        case 'people':
          setCurrentKey('2');
          return;
        case 'profile':
          setCurrentKey('5');
          return;
        case 'update':
          if(pathArr[2] === 'information') setCurrentKey('6');
          if(pathArr[2] === 'avatar') setCurrentKey('7');
          if(pathArr[2] === 'password') setCurrentKey('8');
          return;
        default:
          break;
      }
    }
  }, [location.pathname]);

  return <>
    <Menu onClick={onClick} theme="dark" selectedKeys={[ currentKey ]} mode="inline" items={items} style={{ padding: '15px 0px' }} />
  </>
}
