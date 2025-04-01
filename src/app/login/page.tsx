'use client';
import HSTitle from '@/components/HSTitle';
import { login } from '@/service/users';
import { Checkbox, Flex, Form, FormProps, Input } from 'antd';
import { useRouter } from 'next/navigation';

type LoginFields = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const onFinish: FormProps<LoginFields>['onFinish'] = async (values) => {
    const { username, password } = values;

    try {
      const res = await login(username!, password!);
      console.log(res);
      const { token } = res;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <HSTitle title="登录" />
      <div className="w-72 mx-auto">
        <Form
          name="basic"
          size="large"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item<LoginFields>
            layout="vertical"
            label="用户名"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<LoginFields>
            layout="vertical"
            label="密码"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<LoginFields>>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="">忘记密码</a>
            </Flex>
          </Form.Item>

          <button
            type="submit"
            className="mx-auto hover:bg-themeGreen-dark active:bg-themeGreen-dark bg-themeGreen w-[160px] h-10 rounded-full flex items-center justify-center">
            <p className="text-white text-lg font-semibold">提交</p>
          </button>
        </Form>
      </div>
    </div>
  );
}
