/* eslint-disable react-refresh/only-export-components */
import QuestionTitle, {
  QuestionTitleType,
  PropsType as QuestionTitlePropsType,
} from './QuestionTitle';
import QuestionInput, {
  QuestionInputType,
  PropsType as QuestionInputPropsType,
} from './QuestionInput';
import TitlePropComponent from './QuestionTitle/TitlePropComponent';
import InputPropComponent from './QuestionInput/InputPropComponent';

/**
 * 组件信息的联合类型，用于描述不同类型的组件。
 */
export type ComponentType = QuestionTitleType | QuestionInputType;

/**
 * 组件所需参数的联合类型
 */
export type PropsType = QuestionTitlePropsType | QuestionInputPropsType;

// ----------------------------------------------------------------

/**
 * 组件类型常量映射表。
 */
const COMPONENT_TYPES = {
  TITLE: 'questionTitle',
  INPUT: 'questionInput',
};

/**
 * 根据传入的组件信息返回对应的 React 组件。
 * @param props 组件的类型和属性
 * @returns 对应的 React 组件实例
 */
export const getComponentByInfo = (props: ComponentType) => {
  const { type, props: componentProps } = props;

  switch (type) {
    case COMPONENT_TYPES.TITLE:
      return <QuestionTitle {...componentProps} />;
    case COMPONENT_TYPES.INPUT:
      return <QuestionInput {...componentProps} />;
    default:
      return <h1 style={{ color: 'red' }}>未知的组件类型</h1>;
  }
};

/**
 * 根据传入的组件信息返回对应的 React 组件对应的属性组件
 * @param props 组件的类型和属性
 * @returns 对应的 React 组件对应的属性组件
 */
export const getPropComponentByInfo = (props: ComponentType) => {
  const { type, props: componentProps } = props;

  switch (type) {
    case COMPONENT_TYPES.TITLE:
      return <TitlePropComponent {...componentProps} />;
    case COMPONENT_TYPES.INPUT:
      return <InputPropComponent {...componentProps} />;
    default:
      return <h1 style={{ color: 'red' }}>未知的属性组件类型</h1>;
  }
};

// ----------------------------------------------------------------

type GroupElementType = {
  groupId: string;
  groupName: string;
  components: ComponentType[];
};

const DefaultQuestionTitleInfo: ComponentType = {
  fe_id: 'init',
  title: '标题',
  type: 'questionTitle',
  props: {
    text: '一行标题',
    level: 1,
    alignCenter: false,
  },
};

const DefaultQuestionInputInfo: ComponentType = {
  fe_id: 'init',
  title: '输入框',
  type: 'questionInput',
  props: {
    text: '输入框标题',
    placeholder: '请输入...',
  },
};

/**
 * 组件分组信息，用于在组件库中组织和渲染不同类型的组件。
 */
export const componentGroup: GroupElementType[] = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [DefaultQuestionTitleInfo],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [DefaultQuestionInputInfo],
  },
  {
    groupId: 'select',
    groupName: '用户选择',
    components: [],
  },
];
