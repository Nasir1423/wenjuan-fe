/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import { PropsType } from '..';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSelectedComponent } from '@/store/components';

const { TextArea } = Input;

const InfoPropComponent: FC<PropsType> = (props: PropsType) => {
  const { title = '问卷标题', desc = '问卷详情', disabled = false } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [desc, form, title]);

  const handleChange = (_changedValues: any, allValues: any) => {
    const { title, desc } = allValues;
    const newProps: PropsType = { title, desc, disabled: false };
    dispatch(updateSelectedComponent(newProps));
  };

  return (
    <Form
      form={form}
      initialValues={{ title, desc }}
      layout="vertical"
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="详情" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default InfoPropComponent;
