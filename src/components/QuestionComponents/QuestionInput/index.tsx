/* https://ant.design/components/typography-cn */
/* https://ant.design/components/input-cn */
import { Typography, Input } from 'antd';
import { FC } from 'react';

// 定义组件的 props 类型
export type PropsType = {
  text?: string;
  placeholder?: string;
};

// 定义组件的数据结构类型
export type QuestionInputType = {
  fe_id: string;
  title: '输入框';
  type: 'questionInput';
  isHidden: boolean;
  props: PropsType;
};

const { Paragraph } = Typography;

/**
 * 问卷输入组件
 * @param props 包含字段 text、placeholder
 */
const QuestionInput: FC<PropsType> = (props: PropsType) => {
  const { text = '输入框标题', placeholder = '请输入...' } = props;
  return (
    <>
      <Paragraph strong>{text}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  );
};

export default QuestionInput;
