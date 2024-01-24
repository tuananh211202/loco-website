import { Button, Form, Input, message } from "antd";
import { nameRule } from "../../utils/input-validator";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "react-query";
import { UserApi } from "../../midlewares/api";

export const InfomationSettingPage = () => {
  const currentUser = JSON.parse(Cookies.get('user') ?? '');
  const [form] = Form.useForm();

  const { data: currentUserData, refetch } = useQuery(['userData'],() => UserApi.getUserById(currentUser.userId), {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    }
  });

  const updateUserMutation = useMutation(UserApi.updateUser, {
    onSuccess: () => {
      refetch();
    }
  });

  const handleReset = () => {
    form.setFieldsValue(currentUserData);
  };

  const handleUpdate = () => {
    const userData = form.getFieldsValue();
    updateUserMutation.mutate(UserApi.updateUser(userData));
    message.success('Update user information successfully!');
  };

  return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Form style={{ width: '50%', backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '40vh' }} form={form} onFinish={handleUpdate}>
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
          <Button type="primary" danger style={{ marginRight: '10px' }} onClick={handleReset}>Reset</Button>
          <Button type="primary" htmlType="submit">Save</Button>
        </div>
      </div>
    </Form>
  </div>;
}