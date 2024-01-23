import { Typography, Form, Input, Button, message } from "antd";
import { emailRule, nameRule, passwordRule } from "../../utils/input-validator";
import { Rule } from "antd/es/form";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AuthApi } from "../../midlewares/api";

const { Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const { dispatch: authDispatch } = useAuth();
  const navigate = useNavigate();

  const mutateSignup = useMutation(AuthApi.signUp, {
    onSuccess: (data) => {
      authDispatch({
        type: 'LOGIN',
        payload: {
          access_token: data.access_token,
          user: data.newUser
        }
      });
      navigate('/home');
    },
    onError: (error: any) => {
      message.error(error.response.status);
    }
  });

  const handleLogin = () => {
    const { confirmPassword, ...signupData } = form.getFieldsValue();
    mutateSignup.mutate(signupData);
  }

  return <div style={{ width: '400px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'black' }}>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20vh 0px 0px 0px' }}>
      <Text strong style={{ fontSize: '30px' }}>Sign Up</Text>
    </div>
    <div>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item label="Email" name="email" rules={emailRule as Rule[]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" rules={passwordRule} name="password">
          <Input.Password placeholder="Password" />
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
          <Input.Password placeholder="Confirm Password" />
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