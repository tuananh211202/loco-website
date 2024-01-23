import { Typography, Form, Input, Button } from "antd";
import { emailRule, passwordRule } from "../../utils/input-validator";
import { Rule } from "antd/es/form";

const { Text } = Typography;

const SignIn = () => {
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.submit();
  }

  return <div style={{ width: '400px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'black' }}>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '30vh 0px 0px 0px' }}>
      <Text strong style={{ fontSize: '30px' }}>Log In</Text>
    </div>
    <div>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item label="Email" name="email" rules={emailRule as Rule[]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" rules={passwordRule} name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0px 0px 30vh 0px' }}>
      <Text style={{ fontSize: '20px' }}>Don’t have an account? <a href="/signup">Sign up</a></Text>
    </div>
  </div>;
}

export default SignIn;