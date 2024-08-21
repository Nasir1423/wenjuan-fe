import { Radio, Space, Typography } from 'antd';
import { FC } from 'react';

export type OptionType = {
  value: string;
  text: string;
};

export type PropsType = {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;

  disabled?: boolean;
};

export type QuestionRadioType = {
  fe_id: string;
  title: '问卷单选框' | string;
  type: 'questionRadio';
  isHidden: boolean;
  isLocked: boolean;
  props: PropsType;
};

const { Paragraph } = Typography;

const QuestionRadio: FC<PropsType> = (props: PropsType) => {
  const { title = '问卷单选', isVertical = false, options = [], value = '' } = props;
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default QuestionRadio;
