import { FC } from 'react';
import { Typography, Space, Form, Input, Button, message } from 'antd';
import type { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest, useTitle } from 'ahooks';
import { UserAddOutlined } from '@ant-design/icons';
import { LOGIN_PATHNAME } from '@/router';
import styles from './index.module.scss';
import { registerUserService } from '@/service/user';

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  confirm?: string;
  nickname?: string;
};

const Register: FC = () => {
  useTitle('问卷星 - 用户注册');
  const nav = useNavigate();

  const { run: register } = useRequest(
    async ({ username, password, nickname = '' }) => {
      return await registerUserService(username, password, nickname);
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功');
        nav(LOGIN_PATHNAME);
      },
    }
  );

  const handleFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success: ', values);
    register(values);
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
            <Title level={2}>注册新用户</Title>
          </Space>
        </div>
        <div>
          <Form
            name="register" // 表单名称，会作为表单字段 id 前缀使用
            labelCol={{ span: 8 }} // label 标签布局，同 Col 组件，可设置 span 和 offset
            wrapperCol={{ span: 16 }} // 输入控件布局，用法同 labelCol
            onFinish={handleFinish} // 提交表单且数据验证成功后回调事件, function(values)
            onFinishFailed={handleFinishFailed} // 提交表单且数据验证失败后回调事件, function({ values, errorFields, outOfDate })
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                /* 给当前字段设置了一组校验规则 */
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
            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={['password']} // 设置依赖，表示 password 字段值的变化会触发当前字段，即 confirm 字段的验证
              hasFeedback // 展示校验状态图标
              rules={[
                { required: true, message: '请再次确认密码！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject(new Error('前后两次密码输入不一样！'));
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="new-password"></Input.Password>
            </Form.Item>
            <Form.Item label="昵称" name="nickname">
              <Input></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Link to={LOGIN_PATHNAME} style={{ fontSize: '12px' }}>
                  已有账户？点击登录
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
