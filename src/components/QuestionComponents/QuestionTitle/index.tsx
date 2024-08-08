/* https://ant.design/components/typography-cn */
import { FC } from 'react';
import { Typography } from 'antd';

/* 组件参数类型 */
type PropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  alignCenter?: boolean;
};

/* 组件类型（每个组件的 title 和 type 都是唯一的） */
export type QuestionTitleType = {
  fe_id: string;
  title: '标题';
  type: 'questionTitle';
  props: PropsType;
};

const { Title } = Typography;

const QuestionTitle: FC<PropsType> = (props: PropsType) => {
  const { text = '问卷标题', level = 1, alignCenter = false } = props;
  const getFontSize = (level: number) => {
    if (level === 1) return '24px';
    else if (level === 2) return '20px';
    else return '16px';
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: alignCenter ? 'center' : 'start',
        marginBottom: '0px',
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
