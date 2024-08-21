/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import { OptionType, PropsType } from '..';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { updateSelectedComponent } from '@/store/components';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';

const CheckboxPropComponent: FC<PropsType> = (props: PropsType) => {
  const { title = '问卷多选', isVertical = false, list = [], disabled = false } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // useEffect 数据从画布/Redux ==> Form
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list });
  }, [form, isVertical, list, title]);

  // onValuesChange 数据从 Form ===> 画布/Redux
  const handleValueChange = (_changedValues: any, allValues: any) => {
    const { title, isVertical, list } = allValues;
    const newProps: PropsType = { title, isVertical, list, disabled: false };
    dispatch(updateSelectedComponent(newProps));
  };

  return (
    <Form
      form={form}
      initialValues={{ title, isVertical, list }}
      layout="vertical"
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '标题是必填项' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        {/* Form.List 用于动态地管理一组数据 */}
        <Form.List name="list">
          {/* 1. fields 是一个数组，每个元素对应 Form.List 所管理的数组中的一个元素；
              2. fields 的每个元素可以解构出来后以下属性
                - key 元素“渲染”时的唯一标识
                - name 元素在数组中的路径或索引
                - fieldKey 元素“添加”或“删除”时的唯一标识
                - ... 
              3. add 函数，用于新增一个元素；remove 函数，用于删除一个元素*/}
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                /* 渲染一个元素，每个元素包括 text 和 value 两个字段 */
                <Space key={key} align="baseline">
                  {/* 修改选中效果 */}
                  <Form.Item {...restField} name={[name, 'checked']} valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                  {/* 渲染当前元素的 text 字段 */}
                  <Form.Item
                    {...restField}
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      ({ getFieldsValue }) => ({
                        /* 通过校验，确保不会出现重复的选项，即两个选项之间的 text 字段不能一样 */
                        validator(_, text) {
                          const { list = [] } = getFieldsValue();
                          let frequency = 0;
                          (list as OptionType[]).forEach(opt => {
                            if (opt.text === text) frequency++;
                          });
                          if (frequency === 1) return Promise.resolve();
                          else return Promise.reject(new Error('不能和其他选项重复'));
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="输入选项文字..." />
                  </Form.Item>
                  {/* 渲染删除按钮：只有第三项（包括）以后的选项才可以被删除 */}
                  {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: nanoid(5), checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default CheckboxPropComponent;
