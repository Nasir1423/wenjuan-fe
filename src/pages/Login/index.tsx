import { FC, useEffect } from 'react';
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd';
import type { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest, useTitle } from 'ahooks';
import { UserAddOutlined } from '@ant-design/icons';
import { MANAGE_LIST_PATHNAME, REGISTER_PATHNAME } from '@/router';
import styles from './index.module.scss';
import { loginUserService } from '@/service/user';
import { rememberUser, accessUser, forgetUser } from '@/utils/userLoginInfoStorage';
import { setToken } from '@/utils/userTokenStorage';

const { Title } = Typography;

/* 表单提交的数据类型 */
type FieldType = {
  username: string;
  password: string;
  remember?: boolean;
};

const Register: FC = () => {
  useTitle('问卷星 - 用户登录');
  const [form] = Form.useForm();
  const nav = useNavigate();

  useEffect(() => {
    const userInfo = accessUser();
    form.setFieldsValue(userInfo);
  }, [form]);

  const { run: login } = useRequest(
    async ({ username, password }) => {
      return await loginUserService(username, password);
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('登录成功');
        nav(MANAGE_LIST_PATHNAME);
        const { token } = res;
        setToken(token);
      },
    }
  );

  const handleFinish: FormProps<FieldType>['onFinish'] = ({ username, password, remember }) => {
    console.log('Success: ', { username, password, remember });
    login({ username, password });
    if (remember) rememberUser({ username, password });
    else forgetUser();
  };

  const handleFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed: ', errorInfo);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <div>
          <Form
            name="register" // 表单名称，会作为表单字段 id 前缀使用
            form={form}
            labelCol={{ span: 8 }} // label 标签布局，同 Col 组件，可设置 span 和 offset
            wrapperCol={{ span: 16 }} // 输入控件布局，用法同 labelCol
            onFinish={handleFinish} // 提交表单且数据验证成功后回调事件, function(values)
            onFinishFailed={handleFinishFailed} // 提交表单且数据验证失败后回调事件, function({ values, errorFields, outOfDate })
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '用户名是必填项!' },
                { type: 'string', min: 5, max: 20, message: '用户名长度在 5 到 20 之间!' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '只能是字母、数字、下划线的组合！' },
              ]}
            >
              <Input autoComplete="new-password"></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              hasFeedback
              rules={[{ required: true, message: '密码是必填项!' }]}
            >
              <Input.Password autoComplete="new-password"></Input.Password>
            </Form.Item>
            {/* 这里的 valuePropName="checked" 表示，当前字段 key=remember 对应 Checkbox 的 checked 属性。
            默认情况下。Form.Item 的 name 属性作为字段的 key，对应其标签体中提供的组件的 value 属性值，
            但是像 Checkbox 这样的组件没有 value 属性，因此需要手动指定。 */}
            <Form.Item label="记住我" name="remember" hasFeedback valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={REGISTER_PATHNAME} style={{ fontSize: '12px' }}>
                  没有账户？点击注册
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
/* remember 的作用
  1. submit & remember=true ==> 将数据存储到 LocalStorage 中
  2. submit & remember=false ==> 将数据从 LocalStorage 中删除
  3. 刷新页面 => 从 LocalStorage 中获取数据，结合 useForm 生成的 form 实例初始化表单取值，实现记住我！
*/
