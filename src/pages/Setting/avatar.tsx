import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, message } from "antd";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ImageApi, UserApi } from "../../midlewares/api";
import Cookies from "js-cookie";
import { imageLink } from "../../utils/image-link";

export const AvataSettingPage = () => {
  const [file, setFile] = useState<any>();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = JSON.parse(Cookies.get('user') ?? '');

  const { data: userData, refetch } = useQuery(['userData'], () => UserApi.getUserById(currentUser.userId));

  const updateDataMutation = useMutation(UserApi.updateUser, {
    onSuccess: () => {
      refetch();
    }
  });

  const uploadImageMutation = useMutation(ImageApi.uploadImage, {
    onSuccess: (data) => {
      updateDataMutation.mutate({ avatar: data.path });
      message.success('Update avatar successfully!');
    }
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files && event.target.files[0];
    if (uploadFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result as string;

        image.onload = () => {
          setPreviewUrl(reader.result as string);
          setFile(uploadFile);
        }
      }

      reader.readAsDataURL(uploadFile);
    } else setPreviewUrl('');
  };

  const handleReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setPreviewUrl('');
    setFile(undefined);
  }

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('image', file);
    uploadImageMutation.mutate(formData);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setPreviewUrl('');
    setFile(undefined);
  }

  return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '50%', backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '30vh' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Avatar size={300} icon={<UserOutlined />} src={previewUrl.length ? previewUrl : userData?.avatar.length ? imageLink(userData?.avatar) : undefined} />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <input type="file" accept="image/*" style={{ border: 'solid', borderWidth: '1px', borderRadius: '3px' }} onChange={onChange} ref={fileInputRef} />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button type="primary" onClick={handleReset} danger style={{ marginRight: '10px' }}>Reset</Button>
        <Button type="primary" onClick={handleUpdate}>Save</Button>
      </div>
    </div>
  </div>;
}