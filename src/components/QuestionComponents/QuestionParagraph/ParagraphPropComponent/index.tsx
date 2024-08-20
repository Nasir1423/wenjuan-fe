/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import { PropsType } from '..';
import { Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSelectedComponent } from '@/store/components';

const { TextArea } = Input;

const ParagraphPropComponent: FC<PropsType> = (props: PropsType) => {
  const { text = '', isCenter = false, disabled = false } = props;
  const [form] = Form.useForm();
  const disptach = useDispatch();

  /* 双向数据绑定1-props=>form (只要 props 变化，就更新 form 字段) */
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter, form]);
  /* 双向数据绑定1-form=>component (只要 form 字段变化，就更新当前选中 id 的 components 状态的 componentList 中对应组件信息的数据) */
  const handleChange = (_changedValues: any, allValues: { text: any; isCenter: any }) => {
    const { text, isCenter } = allValues;
    const newProps: PropsType = { text, isCenter, disabled: false };
    disptach(updateSelectedComponent(newProps));
  };

  return (
    <Form
      form={form}
      initialValues={{ text, isCenter }}
      layout="vertical"
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容~' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default ParagraphPropComponent;
