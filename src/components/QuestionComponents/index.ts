import { PropsType as TitlePropsType } from './QuestionTitle';
import { PropsType as InputPropsType } from './QuestionInput';

/* 定义了所有组件所需属性的联合类型 */
export type PropsType = TitlePropsType | InputPropsType;
