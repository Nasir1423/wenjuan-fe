import instance from './ajax';
import { ResDataType } from './ajax';

type searchOption = {
  keywords: string;
  page: number;
  pageSize: number;
  isStar: boolean;
  isPublished: boolean;
  isDeleted: boolean;
};

/* 获取单个问卷信息
    method -> get
    path -> /api/question/:id
    response -> { errno: 0, data: { id, title, ... } }
*/
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = await instance.get(url);
  return data;
}

/* 创建问卷
    method -> post
    path -> /api/question
    request body -> 无
    response -> { errno: 0, data: { id } }
*/
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await instance.post(url);
  return data;
}

/* 查询问卷列表（有条件查询）
    method -> get
    path -> /api/question
    response -> { errno: 0, data: { list: [...] }, total }
*/
export async function getQuestionListService(option: Partial<searchOption>): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await instance.get(url, { params: option });
  return data;
}
/* Partial<T> 表示 T 中指定的属性任意满足即可 */
