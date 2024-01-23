import { Button, Form, Input } from "antd";
import { nameRule } from "../../utils/input-validator";

export const InfomationSettingPage = () => {
  return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Form style={{ width: '50%', backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '40vh' }}>
      <Form.Item label="User ID" name="userId" required>
        <Input disabled />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={nameRule}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item label="Email" name="email" required>
        <Input disabled />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input placeholder="Description" />
      </Form.Item>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <div>
          <Button type="primary" danger style={{ marginRight: '10px' }}>Reset</Button>
          <Button type="primary">Save</Button>
        </div>
      </div>
    </Form>
  </div>;
}