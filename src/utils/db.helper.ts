import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export const conditionUtils = <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  // 后面的 .where 会替换前面的 .where
  // WHERE 1=1 AND ...
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, {
        [key]: obj[key],
      });
    }
  });
  return queryBuilder;
};
