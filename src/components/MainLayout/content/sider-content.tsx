import { HomeOutlined, ProfileOutlined, SettingOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd"
import React from "react";


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
  getItem('Peoples', '2', <UserOutlined />),
  getItem('New feeds', 'sub1', <SnippetsOutlined />, [
    getItem('Friends', '3'),
    getItem('Public', '4')
  ]),
  getItem('Profile', '5', <ProfileOutlined />),
  getItem('Setting', '6', <SettingOutlined />)
]

export const SiderContent = () => {
  return <>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ padding: '15px 0px' }} />
  </>
}