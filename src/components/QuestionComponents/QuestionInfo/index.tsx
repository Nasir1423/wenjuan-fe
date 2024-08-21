import { Typography } from 'antd';
import { FC } from 'react';

export type PropsType = {
  title?: string;
  desc?: string;

  disabled?: boolean;
};

export type QuestionInfoType = {
  fe_id: string;
  title: '问卷标题';
  type: 'questionInfo';
  isHidden: boolean;
  isLocked: boolean;
  props: PropsType;
};

const { Title, Paragraph } = Typography;

/**
 * 问卷详情标题组件
 * @param props 包含字段 title, desc
 */
const QuestionInfo: FC<PropsType> = (props: PropsType) => {
  const { title = '问卷标题', desc = '问卷描述' } = props;
  const descTextList = desc.split('\n');
  return (
    <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
