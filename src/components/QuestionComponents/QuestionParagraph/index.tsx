/* https://ant.design/components/typography-cn */
/* https://ant.design/components/input-cn */
import { Typography } from 'antd';
import { FC } from 'react';

// 定义组件的 props 类型
export type PropsType = {
  text?: string;
  isCenter?: boolean;

  disabled: boolean;
};

// 定义组件的数据结构类型
export type QuestionParagraphType = {
  fe_id: string;
  title: '段落';
  type: 'questionParagraph';
  isHidden: boolean;
  isLocked: boolean;
  props: PropsType;
};

const { Paragraph } = Typography;

/**
 * 问卷输入组件
 * @param props 包含字段 text、placeholder
 */
const QuestionParagraph: FC<PropsType> = (props: PropsType) => {
  const { text = '', isCenter = false } = props;
  const textList = text.split('\n'); // 为了实现安全的换行效果（也可以使用 dangerousHtml，但是太危险）
  return (
    <>
      <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
        {/* 实现文字换行效果 */}
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </>
  );
};

export default QuestionParagraph;

/* 不推荐的换行实现
  <Paragraph>
    <span dangerouslySetInnerHTML={{ __html: text.replaceAll('\n', '<br/>') }}></span>
  </Paragraph>;
*/
