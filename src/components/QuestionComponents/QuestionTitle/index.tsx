/* https://ant.design/components/typography-cn */
import { FC } from 'react';
import { Typography } from 'antd';

// 定义组件的 props 类型
export type PropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  alignCenter?: boolean;

  disabled?: boolean;
};

// 定义组件的数据结构类型
export type QuestionTitleType = {
  fe_id: string;
  title: '标题' | string;
  type: 'questionTitle';
  isHidden: boolean;
  isLocked: boolean;
  props: PropsType;
};

const { Title } = Typography;

/**
 * 问卷标题组件
 * @param props 包含字段 text, level, alignCenter
 */
const QuestionTitle: FC<PropsType> = (props: PropsType) => {
  const { text = '一行标题', level = 1, alignCenter = false } = props;
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
        // marginBottom: '0px',
        margin: '0px auto',
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
