/* eslint-disable react-refresh/only-export-components */
import QuestionTitle, {
  QuestionTitleType,
  PropsType as QuestionTitlePropsType,
} from './QuestionTitle';
import QuestionInput, {
  QuestionInputType,
  PropsType as QuestionInputPropsType,
} from './QuestionInput';
import QuestionParagraph, {
  QuestionParagraphType,
  PropsType as QuestionParagraphPropsType,
} from './QuestionParagraph';
import QuestionInfo, { QuestionInfoType, PropsType as QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextArea, {
  QuestionTextAreaType,
  PropsType as QuestionTextAreaPropsType,
} from './QuestionTextArea';
import QuestionRadio, {
  QuestionRadioType,
  PropsType as QuestionRadioPropsType,
} from './QuestionRadio';
import QuestionCheckbox, {
  QuestionCheckboxType,
  PropsType as QuestionCheckboxPropsType,
} from './QuestionCheckbox';

import TitlePropComponent from './QuestionTitle/TitlePropComponent';
import InputPropComponent from './QuestionInput/InputPropComponent';
import ParagraphPropComponent from './QuestionParagraph/ParagraphPropComponent';
import InfoPropComponent from './QuestionInfo/InfoPropComponent';
import TextAreaPropComponent from './QuestionTextArea/TextAreaPropComponent';
import RadioPropComponent from './QuestionRadio/RadioPropComponent';
import CheckboxPropComponent from './QuestionCheckbox/CheckboxPropComponent';

/**
 * 组件信息的联合类型，用于描述不同类型的组件。
 */
export type ComponentType =
  | QuestionTitleType
  | QuestionInputType
  | QuestionParagraphType
  | QuestionInfoType
  | QuestionTextAreaType
  | QuestionRadioType
  | QuestionCheckboxType;

/**
 * 组件所需参数的联合类型
 */
export type PropsType =
  | QuestionTitlePropsType
  | QuestionInputPropsType
  | QuestionParagraphPropsType
  | QuestionInfoPropsType
  | QuestionTextAreaPropsType
  | QuestionRadioPropsType
  | QuestionCheckboxPropsType;

// ----------------------------------------------------------------

/**
 * 组件类型常量映射表。
 */
const COMPONENT_TYPES = {
  TITLE: 'questionTitle',
  INPUT: 'questionInput',
  PARAGRAPH: 'questionParagraph',
  INFO: 'questionInfo',
  TEXTAREA: 'questionTextArea',
  RADIO: 'questionRadio',
  CHECKBOX: 'questionCheckbox',
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
    case COMPONENT_TYPES.PARAGRAPH:
      return <QuestionParagraph {...componentProps} />;
    case COMPONENT_TYPES.INFO:
      return <QuestionInfo {...componentProps} />;
    case COMPONENT_TYPES.TEXTAREA:
      return <QuestionTextArea {...componentProps} />;
    case COMPONENT_TYPES.RADIO:
      return <QuestionRadio {...componentProps} />;
    case COMPONENT_TYPES.CHECKBOX:
      return <QuestionCheckbox {...componentProps} />;
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
  const { type, props: componentProps, isLocked } = props;

  switch (type) {
    case COMPONENT_TYPES.TITLE:
      return <TitlePropComponent {...componentProps} disabled={isLocked} />;
    case COMPONENT_TYPES.INPUT:
      return <InputPropComponent {...componentProps} disabled={isLocked} />;
    case COMPONENT_TYPES.PARAGRAPH:
      return <ParagraphPropComponent {...componentProps} disabled={isLocked} />;
    case COMPONENT_TYPES.INFO:
      return <InfoPropComponent {...componentProps} disabled={isLocked} />;
    case COMPONENT_TYPES.TEXTAREA:
      return <TextAreaPropComponent {...componentProps} />;
    case COMPONENT_TYPES.RADIO:
      return <RadioPropComponent {...componentProps} />;
    case COMPONENT_TYPES.CHECKBOX:
      return <CheckboxPropComponent {...componentProps} />;
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
  isHidden: false,
  isLocked: false,
  props: {
    text: '一行标题',
    level: 1,
    alignCenter: false,
    disabled: false,
  },
};

const DefaultQuestionInputInfo: ComponentType = {
  fe_id: 'init',
  title: '输入框',
  type: 'questionInput',
  isHidden: false,
  isLocked: false,
  props: {
    text: '输入框标题',
    placeholder: '请输入...',
    disabled: false,
  },
};

const DefaultQuestionParagraphInfo: ComponentType = {
  fe_id: 'init',
  title: '段落',
  type: 'questionParagraph',
  isHidden: false,
  isLocked: false,
  props: {
    text: '一行段落',
    isCenter: false,
    disabled: false,
  },
};

const DefaultQuestionInfoInfo: ComponentType = {
  fe_id: 'init',
  title: '问卷标题',
  type: 'questionInfo',
  isHidden: false,
  isLocked: false,
  props: {
    title: '问卷标题',
    desc: '问卷描述...',
    disabled: false,
  },
};

const DefaultQuestionTextAreaInfo: ComponentType = {
  fe_id: 'init',
  title: '多行输入',
  type: 'questionTextArea',
  isHidden: false,
  isLocked: false,
  props: {
    title: '多行输入标题',
    text: '请输入内容',
    disabled: false,
  },
};

const DefaultQuestionRadioInfo: ComponentType = {
  fe_id: 'init',
  title: '问卷单选框',
  type: 'questionRadio',
  isHidden: false,
  isLocked: false,
  props: {
    title: '单选标题',
    isVertical: false,
    options: [
      { value: 'item1', text: '选项一' },
      { value: 'item2', text: '选项二' },
      { value: 'item3', text: '选项三' },
    ],
    disabled: false,
  },
};

const DefaultQuestionCheckboxInfo: ComponentType = {
  fe_id: 'init',
  title: '问卷多选框',
  type: 'questionCheckbox',
  isHidden: false,
  isLocked: false,
  props: {
    title: '多选标题',
    isVertical: false,
    list: [
      { value: 'item1', text: '选项一', checked: false },
      { value: 'item2', text: '选项二', checked: false },
      { value: 'item3', text: '选项三', checked: false },
    ],
    disabled: false,
  },
};

/**
 * 组件分组信息，用于在组件库中组织和渲染不同类型的组件。
 */
export const componentGroup: GroupElementType[] = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [DefaultQuestionInfoInfo, DefaultQuestionTitleInfo, DefaultQuestionParagraphInfo],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [DefaultQuestionInputInfo, DefaultQuestionTextAreaInfo],
  },
  {
    groupId: 'select',
    groupName: '用户选择',
    components: [DefaultQuestionRadioInfo, DefaultQuestionCheckboxInfo],
  },
];
