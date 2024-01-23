import { Typography, Form, Input, Button } from "antd";
import { emailRule, nameRule, passwordRule } from "../../utils/input-validator";
import { Rule } from "antd/es/form";

const { Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.submit();
  }

  return <div style={{ width: '400px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'black' }}>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20vh 0px 0px 0px' }}>
      <Text strong style={{ fontSize: '30px' }}>Sign Up</Text>
    </div>
    <div>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item label="Email" name="email" rules={emailRule as Rule[]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" rules={passwordRule} name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item 
          label="Confirm new password" 
          name='confirmPassword' 
          rules={[
            ...passwordRule,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={nameRule}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0px 0px 20vh 0px' }}>
      <Text style={{ fontSize: '20px' }}>Already have an account? <a href="/signin">Log in</a></Text>
    </div>
  </div>;
}

export default SignUp;