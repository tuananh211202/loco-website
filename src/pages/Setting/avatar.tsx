import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

export const AvataSettingPage = () => {
  return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '50%', backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '30vh' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Avatar size={300} icon={<UserOutlined />} />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <input type="file" accept="image/*" style={{ border: 'solid', borderWidth: '1px', borderRadius: '3px' }} />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button type="primary" danger style={{ marginRight: '10px' }}>Reset</Button>
        <Button type="primary">Save</Button>
      </div>
    </div>
  </div>;
}