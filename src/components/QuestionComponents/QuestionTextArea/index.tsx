/* https://ant.design/components/typography-cn */
/* https://ant.design/components/input-cn */
import { Typography, Input } from 'antd';
import { FC } from 'react';

// 定义组件的 props 类型
export type PropsType = {
  title?: string;
  text?: string;

  disabled?: boolean;
};

// 定义组件的数据结构类型
export type QuestionTextAreaType = {
  fe_id: string;
  title: '多行输入' | string;
  type: 'questionTextArea';
  isHidden: boolean;
  isLocked: boolean;
  props: PropsType;
};

const { Paragraph } = Typography;
const { TextArea } = Input;

/**
 * 问卷输入组件
 * @param props 包含字段 text、placeholder
 */
const QuestionTextArea: FC<PropsType> = (props: PropsType) => {
  const { title = '多行输入', text = '请输入内容' } = props;
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={text} />
      </div>
    </>
  );
};

export default QuestionTextArea;
