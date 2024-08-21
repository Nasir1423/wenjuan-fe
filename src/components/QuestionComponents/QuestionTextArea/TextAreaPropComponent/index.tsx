/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import { PropsType } from '..';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSelectedComponent } from '@/store/components';

const TextAreaPropComponent: FC<PropsType> = (props: PropsType) => {
  const { title = '多行输入', text = '请输入内容', disabled = false } = props;
  const [form] = Form.useForm();
  const disptach = useDispatch();

  /* 双向数据绑定1-props=>form (只要 props 变化，就更新 form 字段) */
  useEffect(() => {
    form.setFieldsValue({ title, text });
  }, [text, title, form]);
  /* 双向数据绑定1-form=>component (只要 form 字段变化，就更新当前选中 id 的 components 状态的 componentList 中对应组件信息的数据) */
  const handleChange = (_changedValues: any, allValues: any) => {
    const { title, text } = allValues;
    const newProps: PropsType = { text, title, disabled: false };
    disptach(updateSelectedComponent(newProps));
  };

  return (
    <Form
      form={form}
      initialValues={{ title, text }}
      layout="vertical"
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '标题是必填项~' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="text">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default TextAreaPropComponent;
