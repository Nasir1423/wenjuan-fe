import QuestionTitle, { QuestionTitleType } from './QuestionTitle';
import QuestionInput, { QuestionInputType } from './QuestionInput';

const COMPONENT_TYPES = {
  TITLE: 'questionTitle',
  INPUT: 'questionInput',
};

/* 定义了所有组件所需属性的联合类型 */
export type ComponentType = QuestionTitleType | QuestionInputType;

/* 根据组件信息，返回对应的组件 JSX 元素 */
export const getComponentByInfo = (props: ComponentType) => {
  const { type, props: componentProps } = props;

  switch (type) {
    case COMPONENT_TYPES.TITLE:
      return <QuestionTitle {...componentProps} />;
    case COMPONENT_TYPES.INPUT:
      return <QuestionInput {...componentProps} />;
    default:
      return <h1>不存在的问题组件类型</h1>;
  }
};
