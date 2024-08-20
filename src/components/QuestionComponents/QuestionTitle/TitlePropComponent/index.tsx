/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateSelectedComponent } from '@/store/components';
import { Checkbox, Form, Input, Select } from 'antd';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PropsType } from '..';

const TitlePropComponent: FC<PropsType> = (props: PropsType) => {
  const { text = '一行标题', level = 1, alignCenter = false, disabled = false } = props;
  const [form] = Form.useForm();
  const disptach = useDispatch();

  /* 双向数据绑定1-props=>form (只要 props 变化，就更新 form 字段) */
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter: alignCenter });
  }, [alignCenter, form, level, text]);
  /* 双向数据绑定1-form=>component (只要 form 字段变化，就更新当前选中 id 的 components 状态的 componentList 中对应组件信息的数据) */
  const handleChange = (_changedValues: any, allValues: any) => {
    const { text, level, isCenter } = allValues;
    const newProps: PropsType = { text, level, alignCenter: isCenter, disabled: false };
    disptach(updateSelectedComponent(newProps));
  };

  return (
    <Form
      form={form}
      initialValues={{ text, level, alignCenter }}
      layout="vertical"
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '标题是必填项~' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default TitlePropComponent;
