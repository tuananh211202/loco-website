import { Typography, Form, Input, Button, message } from "antd";
import { emailRule, passwordRule } from "../../utils/input-validator";
import { Rule } from "antd/es/form";
import { useAuth } from "../../context/auth-context";
import { useMutation } from "react-query";
import { AuthApi } from "../../midlewares/api";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const SignIn = () => {
  const [form] = Form.useForm();
  const { dispatch: authDispatch } = useAuth();
  const navigate = useNavigate();

  const mutateLogin = useMutation(AuthApi.signIn, {
    onSuccess: (data) => {
      authDispatch({
        type: 'LOGIN',
        payload: {
          access_token: data.access_token,
          user: data.user
        }
      });
      navigate('/home');
    },
    onError: (error: any) => {
      message.error(error.response.status);
    }
  });

  const handleLogin = () => {
    const loginData = form.getFieldsValue();
    mutateLogin.mutate(loginData);
  }

  return <div style={{ width: '400px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'black' }}>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '30vh 0px 0px 0px' }}>
      <Text strong style={{ fontSize: '30px' }}>Log In</Text>
    </div>
    <div>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item label="Email" name="email" rules={emailRule as Rule[]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" rules={passwordRule} name="password">
          <Input.Password placeholder="Password" />
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