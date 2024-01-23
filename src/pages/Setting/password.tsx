import { Button, Form, Input } from "antd";
import { passwordRule } from "../../utils/input-validator";

export const PasswordSettingPage = () => {
  return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Form style={{ width: '50%', backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '40vh' }}>
      <Form.Item label="Old password" name='oldPassword' rules={passwordRule}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="New password" name='newPassword' rules={passwordRule}>
        <Input.Password />
      </Form.Item>
      <Form.Item 
        label="Confirm new password" 
        name='confirmPassword' 
        rules={[
          ...passwordRule,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button type="primary">Update</Button>
      </div>
    </Form>
  </div>;
}