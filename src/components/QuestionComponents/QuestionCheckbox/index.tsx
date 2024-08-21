import { Checkbox, Space, Typography } from 'antd';
import { FC } from 'react';

export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};

export type PropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];

  disabled?: boolean;
};

export type QuestionCheckboxType = {
  fe_id: string;
  title: '问卷多选框';
  type: 'questionCheckbox';
  isHidden: boolean;
  isLocked: boolean;
  props: PropsType;
};

const { Paragraph } = Typography;

const QuestionCheckbox: FC<PropsType> = (props: PropsType) => {
  const { title = '问卷单选', isVertical = false, list = [] } = props;
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { text, value, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
