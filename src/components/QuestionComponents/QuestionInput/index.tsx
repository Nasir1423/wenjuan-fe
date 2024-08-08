/* https://ant.design/components/typography-cn */
/* https://ant.design/components/input-cn */
import { Typography, Input } from 'antd';
import { FC } from 'react';

export type PropsType = {
  text?: string;
  placeholder?: string;
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
