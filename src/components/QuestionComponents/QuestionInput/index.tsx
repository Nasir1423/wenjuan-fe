/* https://ant.design/components/typography-cn */
/* https://ant.design/components/input-cn */
import { Typography, Input } from 'antd';
import { FC } from 'react';

/* 组件参数类型 */
type PropsType = {
  text?: string;
  placeholder?: string;
};

/* 组件类型（每个组件的 title 和 type 都是唯一的） */
export type QuestionInputType = {
  fe_id: string;
  title: '输入框';
  type: 'questionInput';
  props: PropsType;
};

const { Paragraph } = Typography;

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
