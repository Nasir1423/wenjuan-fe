import instance, { ResDataType } from './ajax';

/* 
  获取单个问卷的所有答卷数据
  method -> get
  path -> /api/stat/:questionId
  response -> { errno: 0, data: {} }
*/
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = await instance.get(url, { params: opt });
  return data;
}

/* 
  获取单个问卷的特定组件的统计数据
  method -> get
  path -> /api/stat/:questionId/:componentId
  response -> { errno: 0, data: {} }
*/
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = await instance.get(url);
  return data;
}
