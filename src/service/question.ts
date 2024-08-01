import instance from './ajax';
import { ResDataType } from './ajax';

type searchOption = {
  keywords: string;
  isPublished: boolean;
  isDeleted: boolean;
  isStar: boolean;
  page: number;
  pageSize: number;
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

/* 更新问卷
    method -> patch
    path -> /api/question/:id
    request body -> { title, isStar, ... }
    response -> { errno: 0 }
*/
export async function updateQuestionService(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = await instance.patch(url, option);
  return data;
}

/* 复制问卷
    method -> post
    path -> /api/question/:id
    response -> { errno: 0, data: { id } }
*/
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = await instance.post(url);
  return data;
}

/* 删除问卷（彻底删除）
    method -> delete
    path -> /api/question
    request body -> { ids: [ ... ] }
    response -> { errno: 0 }
*/
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await instance.delete(url, { data: { ids } });
  return data;
}
