import useGetPageInfo from '@/hooks/useGetPageInfo';
import { PageInfoStateType, resetPageInfo } from '@/store/pageInfo';
import { Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const { TextArea } = Input;

const Setting: FC = () => {
  const { title, desc, js, css } = useGetPageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // 数据流：Redux ==> 表单
  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css });
  }, [css, desc, form, js, title]);

  // 数据流：表单 ==> Redux
  const handleChange = (_changedValues: unknown, allValues: PageInfoStateType) => {
    const { title, desc, js, css } = allValues;
    dispatch(resetPageInfo({ title, desc, js, css }));
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      onValuesChange={handleChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入页面标题' }]}
      >
        <Input placeholder="请输入页面标题..." />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="请输入页面描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入 css 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入 js 脚本代码..." />
      </Form.Item>
    </Form>
  );
};

export default Setting;
