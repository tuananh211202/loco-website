import { Avatar, Button, Select } from "antd";
import { avatarContainerStyle, logoContainerStyle, searchContainerStyle, searchStyle } from "../styles";
import { PlusCircleOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import { UserApi } from "../../../midlewares/api";
import { imageLink } from "../../../utils/image-link";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UploadPostModal } from "../../UploadModal";
import { profileLink } from "../../../utils/profile-link";

type HeaderContentProps = {
  firstWidth: number;
  secondWidth: number;
}

export const HeaderContent = (props: HeaderContentProps) => {
  const { firstWidth, secondWidth } = props;
  const currentUser = JSON.parse(Cookies.get('user') ?? '');
  const navigate = useNavigate();
  const [value, setValue] = useState<string>();
  const [data, setData] = useState<any[]>();
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData } = useQuery(['userData'], () => UserApi.getUserById(currentUser.userId));

  const searchMutation = useMutation(['searchData', value], UserApi.getListUser, {
    onSuccess: (res) => {
      setData(res.users);
    }
  })

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSearch = (newValue: string) => {
    searchMutation.mutate({ name: newValue });
  }

  return (
    <>
      <UploadPostModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div style={logoContainerStyle}>
        LOCO
      </div>
      <div style={{...searchContainerStyle, width: firstWidth}}>
        <Select 
          style={searchStyle} 
          placeholder='Search for users' 
          showSearch
          defaultActiveFirstOption={false}
          suffixIcon={<SearchOutlined />}
          filterOption={false}
          value={value}
          onChange={handleChange}
          onSearch={handleSearch}
          notFoundContent={null}
          options={(data || []).map((d) => ({
            value: d.userId,
            label: <a href={profileLink(d.userId)} style={{ width: '100%', color: 'black' }}>
              <Avatar size={20} src={d?.avatar.length ? imageLink(d?.avatar) : undefined} /> {d.name}
            </a>,
          }))}
        />
      </div>
      <div style={{...avatarContainerStyle, width: secondWidth}}>
        <Button type="link" icon={<PlusCircleOutlined style={{ fontSize: '20px' }} /> } style={{ color: 'black' }} onClick={() => setIsOpen(true)} />
        <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} size={48} style={{ marginRight: '10px' }} src={userData?.avatar.length ? imageLink(userData.avatar) : undefined} />
          <div style={{ color: 'black', fontSize: '18px' }}>{userData?.name ?? 'name'}</div>
        </div>
        <Button type='link' icon={<SettingOutlined style={{ fontSize: '18px' }} />} style={{ color: 'black' }} onClick={() => navigate('/update/information')} />
      </div>
    </>
  )
};
