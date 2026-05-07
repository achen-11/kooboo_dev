/**
* @name k_sqlite
* @description ORM 对象关系映射(sqlite)
* @author ux34
* @updatedAt 2025-5-26
*/
export const DataTypes = {
  // Text
  String: String as any as StringConstructor,
  Array: 'Array' as any as StringConstructor,
  Object: 'Object' as any as StringConstructor,
  // INTEGER
  Number: Number as any as NumberConstructor,
  Boolean: Boolean as any as BooleanConstructor,
  Timestamp: 'Timestamp' as any as NumberConstructor,
  // REAL
  Float: 'Float' as any as NumberConstructor
};
export const Operators = k.DB.sqlite.operators();
type TSchemaOption = {
  type: typeof DataTypes[keyof typeof DataTypes] | any; // 类型
  autoincrement?: boolean; // 自增
  required?: boolean; // 必填
  primaryKey?: boolean; // 主键
  index?: boolean | string[]; // true 表示单列索引，string[] 表示多列组合索引
  ref?: string; // 外键
  select?: boolean; // 默认读取是否选中
  default?: string | number | boolean | object | (() => string | number | boolean | object); // 默认值
};
type ModelSchema = {
  [key: string]: TSchemaOption;
};
type ModelConfig = {
  timestamps?: true | false | {
    createdAt: `${any}${string}`;
    updatedAt: `${any}${string}`;
  };
  softDelete?: true | false | {
    isDeleted: `${any}${string}`;
    deletedAt: `${any}${string}`;
  };
};
type OutputBaseModal<T extends ModelConfig> =
// 基础字段
{
  _id: string;
}
// 合并时间戳字段
& (T["timestamps"] extends true ? {
  created: number;
  updated: number;
} : T["timestamps"] extends {
  createdAt: infer C;
  updatedAt: infer U;
} ? { [K in C & string]: number } & { [K in U & string]: number } : {})
// 合并软删除字段
& (T["softDelete"] extends true ? {
  is_deleted: boolean;
  deleted_at: number;
} : T["softDelete"] extends {
  isDeleted: infer I;
  deletedAt: infer D;
} ? { [K in I & string]: boolean } & { [K in D & string]: number } : {});
type OutputModel<T extends ModelSchema> = { [K in keyof T]: T[K]['type'] extends StringConstructor ? string : T[K]['type'] extends NumberConstructor ? number : T[K]['type'] extends BooleanConstructor ? boolean : T[K]['type'] };
type WhereParams<T> = Partial<T> & { [K in keyof T]?: T[K] | T[K][] | {
  [operator: string]: T[K] | T[K][];
} } & {
  [key: string]: any;
};
type OrderParams<T> = keyof T | {
  prop: keyof T;
  order?: 'ascending' | 'descending';
};

// 查询参数
type QueryParams<T> = {
  page?: number;
  pageSize?: number;
  select?: Array<keyof T> | string | '*';
  include?: Array<keyof T>;
  exclude?: Array<keyof T>;
  isDeserialize?: boolean; // default true
  order?: OrderParams<T> | OrderParams<T>[];
  includeDeleted?: boolean; // default false
};
export function define<TModelSchema extends ModelSchema, TModelConfig extends ModelConfig>(tableName: string, schema: TModelSchema, config?: TModelConfig) {
  type Model = OutputBaseModal<TModelConfig> & OutputModel<TModelSchema>;
  const TableInstance = k.DB.sqlite.getTable(tableName);
  (schema as any)['_id'] = {
    type: DataTypes.String,
    required: true,
    primaryKey: true
  };

  // 是否自动添加时间戳
  let timestampsConfig: Exclude<ModelConfig['timestamps'], true> = false;
  if (config?.timestamps) {
    const {
      createdAt = 'created',
      updatedAt = 'updated'
    } = typeof config.timestamps === 'object' ? config.timestamps : {};
    (schema as any)[createdAt] = {
      type: DataTypes.Timestamp,
      required: true
    };
    (schema as any)[updatedAt] = {
      type: DataTypes.Timestamp,
      required: true
    };
    timestampsConfig = {
      createdAt,
      updatedAt
    };
  }

  // 处理软删除配置
  let softDeleteConfig: Exclude<ModelConfig['softDelete'], true> = false;
  if (config?.softDelete) {
    const {
      isDeleted = 'is_deleted',
      deletedAt = 'deleted_at'
    } = typeof config.softDelete === 'object' ? config.softDelete : {};
    (schema as any)[isDeleted] = {
      type: DataTypes.Boolean,
      default: false
    };
    (schema as any)[deletedAt] = {
      type: DataTypes.Timestamp
    };
    softDeleteConfig = {
      isDeleted,
      deletedAt
    };
  }

  // 自动创建表
  if (!isExistsTable(tableName)) {
    createTable(tableName, schema);
  }
  function create(model: Omit<Partial<Model>, '_id'>): string {
    if (timestampsConfig) {
      const now = getNow();
      (model as any)[timestampsConfig.createdAt] = now;
      (model as any)[timestampsConfig.updatedAt] = now;
    }

    // 提取默认值
    const defaultModel = Object.keys(schema).reduce((acc, cur) => {
      if (typeof schema[cur].default === 'function') {
        acc[cur] = schema[cur].default();
      } else if (schema[cur].default !== undefined) {
        acc[cur] = schema[cur].default;
      }
      return acc;
    }, {} as any);
    let newModel = excludeProperties(pickProperties({
      ...defaultModel,
      ...model
    }, Object.keys(schema)), ['_id']);

    // 根据schema规则序列化数据
    newModel = serialize(newModel, schema);
    const currentId = TableInstance.add(newModel);
    return currentId;
  }

  /** 如果数据库未找到，则创建 */
  function createIfNotExists(model: Partial<Model>, where: WhereParams<Model>) {
    if (count(where) > 0) {
      return null;
    } else {
      return create(model);
    }
  }
  function deleteById(id: string): boolean {
    const count = k.DB.sqlite.execute(`
                DELETE FROM '${tableName}' WHERE _id = @id;
            `, {
      id
    });
    return count === 1;
  }
  function deleteOne(where: WhereParams<Model>): boolean {
    const id = findOne(where)?._id;
    return id ? deleteById(id) : false;
  }
  function deleteMany(where: WhereParams<Model>): {
    [id: string]: boolean;
  } {
    return findAll(where).reduce((acc, cur) => {
      acc[cur._id] = deleteById(cur._id);
      return acc;
    }, {} as any);
  }
  function removeById(id: string): boolean {
    if (softDeleteConfig) {
      const now = getNow();
      const updateData = {
        [softDeleteConfig.isDeleted]: true,
        [softDeleteConfig.deletedAt]: now
      };
      return !!updateById(id, updateData as Model, false); // 禁用时间戳自动更新
    }
    return deleteById(id); // 降级到物理删除
  }
  function removeOne(where: WhereParams<Model>): boolean {
    const id = findOne(where, {
      isDeserialize: false
    })?._id;
    return id ? removeById(id) : false;
  }
  function removeMany(where: WhereParams<Model>): {
    [id: string]: boolean;
  } {
    return findAll(where, {
      isDeserialize: false
    }).reduce((acc, cur) => {
      acc[cur._id] = removeById(cur._id);
      return acc;
    }, {} as any);
  }
  function restoreByIds(ids: string[]) {
    if (!softDeleteConfig) return [];
    const newModelList = findAll({
      _id: {
        [Operators.OR]: ids
      },
      [softDeleteConfig.isDeleted]: true
    } as any, {
      select: '*',
      isDeserialize: false,
      includeDeleted: true
    }).map(oldModel => {
      const newModel = {
        ...oldModel,
        [softDeleteConfig.isDeleted]: false,
        [softDeleteConfig.deletedAt]: null
      };
      TableInstance.update(newModel);
      return newModel._id;
    });
    return newModelList;
  }
  function clear(): number {
    if (!softDeleteConfig) {
      throw new Error('Soft delete not enabled');
    }
    return k.DB.sqlite.execute(`DELETE FROM '${tableName}' WHERE ${softDeleteConfig.isDeleted} = @value`, {
      value: true
    });
  }
  function updateOne(where: WhereParams<Model>, model: Partial<Model>, isTimeUpdated = true) {
    // 不需要反序列化
    const oldModel = findOne(where, {
      isDeserialize: false,
      select: '*'
    });
    if (!oldModel) {
      return null;
    }

    // 更新时间戳
    if (timestampsConfig && isTimeUpdated) {
      const now = getNow();
      delete model[timestampsConfig.createdAt];
      (model as any)[timestampsConfig.updatedAt] = now;
    }

    // 只存储schema定义的字段，并序列化数据
    model = serialize(pickProperties(model, Object.keys(schema)), schema) as any;
    const newModel = {
      ...oldModel,
      ...model
    };
    TableInstance.update(newModel);
    return newModel._id;
  }
  function updateById(id: string, model: Partial<Model>, isTimeUpdated = true) {
    return updateOne({
      _id: id
    } as any, model, isTimeUpdated);
  }

  /**
   * 保存数据(不存在则创建)
   * 
   * 第二个参数用于查询是否有相似的记录，如果没有才能创建
   */
  function updateOrCreate(model: Partial<Model>, isTimeUpdated = true): string | null {
    if (model._id) {
      return updateOne({
        _id: model._id
      } as any, model, isTimeUpdated);
    } else {
      return create(model);
    }
  }
  function updateMany(where: WhereParams<Model>, model: Partial<Model>, isTimeUpdated = true): string[] {
    // 更新时间戳
    if (timestampsConfig && isTimeUpdated) {
      const now = getNow();
      delete model[timestampsConfig.createdAt];
      (model as any)[timestampsConfig.updatedAt] = now;
    }

    // 只存储schema定义的字段，并序列化数据
    model = serialize(pickProperties(model, Object.keys(schema)), schema) as any;
    const newModelList = findAll(where, {
      select: '*',
      isDeserialize: false
    }).map(oldModel => {
      const newModel = {
        ...oldModel,
        ...model
      };
      TableInstance.update(newModel);
      return newModel._id;
    });
    return newModelList;
  }

  // 查询方法自动过滤软删除数据
  function applySoftDelete(where: WhereParams<Model>, params: QueryParams<Model>) {
    if (softDeleteConfig && !params.includeDeleted) {
      return {
        ...where,
        [softDeleteConfig.isDeleted]: {
          [Operators.NE]: true
        }
      };
    }
    return where;
  }

  // 过滤where中的空值
  function filterEmptyWhereValues(where: WhereParams<Model>): WhereParams<Model> {
    if (!where || typeof where !== 'object') return where;
    if (Array.isArray(where)) {
      return where.map(item => {
        if (item === null || item === undefined) {
          return Infinity;
        } else if (typeof item === 'object') {
          return filterEmptyWhereValues(item);
        } else {
          return item;
        }
      }) as any;
    }
    const transformed: Record<string, any> = {};
    for (const [key, value] of Object.entries(where)) {
      if (value === null || value === undefined) {
        transformed[key] = Infinity;
      } else if (Array.isArray(value)) {
        transformed[key] = value.length === 0 ? Infinity : filterEmptyWhereValues(value as any);
      } else if (typeof value === 'object') {
        transformed[key] = filterEmptyWhereValues(value as any);
      } else {
        transformed[key] = value;
      }
    }
    return transformed as WhereParams<Model>;
  }
  function findOne(where: WhereParams<Model>, params: QueryParams<Model> = {}) {
    where = applySoftDelete(filterEmptyWhereValues(where), params);
    let query = TableInstance.query(where);
    // const total = query.count()

    const {
      page = 1,
      pageSize = 1,
      order,
      isDeserialize,
      select,
      include,
      exclude
    } = params;

    // order
    const orderList = (order ? Array.isArray(order) ? order : [order] : []).map(item => {
      if (item && typeof item === 'string') {
        if (item === 'RANDOM()') return 'RANDOM()';
        return `\`${item}\``;
      } else if (typeof item === 'object' && item.prop) {
        return `\`${String(item.prop)}\`${item.order === 'descending' ? ' DESC' : ''}`;
      }
    });
    if (orderList.length) {
      query.orderBy(orderList.join(','));
    }

    // paging
    let model: Model = query.skip((page - 1) * pageSize).take(pageSize)?.[0] as any;
    if (!model) {
      return null;
    }

    // select
    model = pickProperties(model, parseSelect(schema, select, include, exclude)) as any;

    // serialize
    if (isDeserialize !== false) {
      model = deserialize(model, schema);
    }
    return model;
  }
  function findById(id: string, params: QueryParams<Model> = {}) {
    return findOne({
      _id: id
    } as any, params);
  }
  function findAll(where: WhereParams<Model>, params: QueryParams<Model> = {}) {
    where = applySoftDelete(filterEmptyWhereValues(where), params);
    let query = TableInstance.query(where);
    // const total = query.count()

    const {
      page,
      pageSize,
      order,
      isDeserialize = false,
      select,
      include,
      exclude
    } = params;

    // order
    const orderList = (order ? Array.isArray(order) ? order : [order] : []).map(item => {
      if (item && typeof item === 'string') {
        if (item === 'RANDOM()') return 'RANDOM()';
        return `\`${item}\``;
      } else if (typeof item === 'object' && item.prop) {
        return `\`${String(item.prop)}\`${item.order === 'descending' ? ' DESC' : ''}`;
      }
    });
    if (orderList.length) {
      query.orderBy(orderList.join(','));
    }

    // paging
    let list: Model[] = (page && pageSize ? query.skip((page - 1) * pageSize).take(pageSize) : query.all()) as any;

    // select
    const returnFields = parseSelect(schema, select, include, exclude);
    return list.map(model => {
      // select
      model = pickProperties(model, returnFields) as any;

      // serialize
      if (isDeserialize !== false) {
        model = deserialize(model, schema);
      }
      return model;
    });
  }

  /**
   * 分页查询
   */
  function findPaginated(where: WhereParams<Model>, params: QueryParams<Model> = {
    page: 1,
    pageSize: 10
  }) {
    where = applySoftDelete(filterEmptyWhereValues(where), params);
    let query = TableInstance.query(where);
    const total = query.count();
    const {
      page,
      pageSize,
      order,
      isDeserialize = false,
      select,
      include,
      exclude
    } = params;

    // order
    const orderList = (order ? Array.isArray(order) ? order : [order] : []).map(item => {
      if (item && typeof item === 'string') {
        if (item === 'RANDOM()') return 'RANDOM()';
        return `\`${item}\``;
      } else if (typeof item === 'object' && item.prop) {
        return `\`${String(item.prop)}\`${item.order === 'descending' ? ' DESC' : ''}`;
      }
    });
    if (orderList.length) {
      query.orderBy(orderList.join(','));
    }

    // paging
    let list: Model[] = (page && pageSize ? query.skip((page - 1) * pageSize).take(pageSize) : query.all()) as any;

    // select
    const returnFields = parseSelect(schema, select, include, exclude);
    list = list.map(model => {
      // select
      model = pickProperties(model, returnFields) as any;

      // serialize
      if (isDeserialize !== false) {
        model = deserialize(model, schema);
      }
      return model;
    });
    return {
      list,
      page,
      pageSize,
      total
    };
  }

  /**
   * 数量查询
   */
  function count(where: WhereParams<Model>, params: QueryParams<Model> = {}) {
    where = applySoftDelete(filterEmptyWhereValues(where), params);
    return TableInstance.query(where).count();
  }
  return {
    __info__: {
      tableName,
      schema,
      getFieldType() {
        const fieldType: Record<string, any> = {};
        for (let [key, value] of Object.entries(schema)) {
          fieldType[key] = typeof value.type === 'function' ? value.type.name : value.type;
        }
        return fieldType;
      }
    },
    create,
    createIfNotExists,
    deleteById,
    deleteOne,
    deleteMany,
    removeById,
    removeOne,
    removeMany,
    restoreByIds,
    clear,
    updateOne,
    updateById,
    updateOrCreate,
    updateMany,
    findOne,
    findById,
    findAll,
    findPaginated,
    count
  };
}
function sync<T extends ReturnType<typeof define>>(model: T) {
  const {
    tableName,
    schema
  } = model.__info__;
  deleteTable(tableName);
  createTable(tableName, schema);
}
export const ksql = {
  DataTypes,
  Operators,
  define,
  sync
};
export default ksql;

// 用到的函数

// 序列化到数据库
function serialize<T extends Record<string, any>, TModelSchema extends ModelSchema>(newModel: T, schema: TModelSchema): T {
  for (const [key, value] of Object.entries(newModel)) {
    const schemaItem = schema[key];
    switch (schemaItem?.type) {
      case DataTypes.Array:
        if (Array.isArray(value)) {
          (newModel as any)[key] = JSON.stringify(value);
        } else {
          (newModel as any)[key] = '[]';
        }
        break;
      case DataTypes.Object:
        if (isObject(value)) {
          (newModel as any)[key] = JSON.stringify(value);
        } else {
          (newModel as any)[key] = '{}';
        }
        break;
      case DataTypes.Boolean:
        (newModel as any)[key] = value ? 1 : 0;
        break;
      case DataTypes.Timestamp:
        if (value && !isTimestamp(value)) {
          const time = new Date(value).getTime();
          if (isTimestamp(time)) {
            (newModel as any)[key] = time;
          } else {
            throw new Error('Not the correct time format' + `{ key: ${key}, value: ${value}} `);
          }
        }
        break;
    }
  }
  return newModel;
}

// 反序列化
function deserialize<T extends Record<string, any>, TModelSchema extends ModelSchema>(newModel: T, schema: TModelSchema): T {
  for (const [key, value] of Object.entries(newModel)) {
    const schemaItem = schema[key];
    switch (schemaItem?.type) {
      case DataTypes.Array:
      case DataTypes.Object:
        if (typeof value === 'string') {
          (newModel as any)[key] = JSON.parse(value);
        }
        break;
      case DataTypes.Boolean:
        (newModel as any)[key] = value ? true : false;
        break;
    }
  }
  return newModel;
}
function parseSelect<TModelSchema extends ModelSchema>(schema: TModelSchema, select?: string | string[] | any, include?: string[] | any, exclude?: string[] | any) {
  let fields = [];
  if (Array.isArray(select)) {
    fields = select;
  } else if (select === '*') {
    fields = Object.keys(schema);
  } else if (typeof select === 'string' && select.trim()) {
    fields = select.split(',').map(i => i.trim());
  } else {
    fields = Object.keys(schema).filter(key => schema[key].select !== false);
  }
  // include
  if (Array.isArray(include)) {
    fields = [...new Set([...fields, ...include])];
  }
  // exclude
  if (Array.isArray(exclude)) {
    fields = fields.filter(i => !exclude.includes(i));
  }
  return fields;
}
function isObject(obj: object) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}
function isTimestamp(value: any) {
  return Number.isInteger(value) && value > 0 && new Date(value).getTime() === value;
}
function excludeProperties<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const copy = {
    ...obj
  };
  for (const key of keys) {
    delete copy[key];
  }
  return copy;
}
function pickProperties<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keys) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}
function getNow(): number {
  const now = Date.now();
  return now;
}
function isExistsTable(tableName: string) {
  return !!k.DB.sqlite.sqlite_master.count({
    type: 'table',
    name: tableName
  });
}
function createTable(tableName: string, schema: ModelSchema) {
  let query = `CREATE TABLE IF NOT EXISTS '${tableName}' (`;
  for (const columnName in schema) {
    const columnConfig = schema[columnName];
    query += `'${columnName}' `;
    switch (columnConfig.type) {
      case DataTypes.String:
      case DataTypes.Array:
      case DataTypes.Object:
        query += 'TEXT';
        break;
      case DataTypes.Number:
      case DataTypes.Boolean:
      case DataTypes.Timestamp:
        query += 'INTEGER';
        break;
      case DataTypes.Float:
        query += 'REAL';
        break;
      default:
        throw new Error(`Unsupported data type for column ${columnName}: ${columnConfig.type}`);
    }
    if (columnConfig.primaryKey) {
      query += ' PRIMARY KEY';
    }
    if (columnConfig.autoincrement) {
      if (columnConfig.type !== DataTypes.Number) {
        throw new Error('AUTOINCREMENT is only supported for columns of type "number".');
      }
      query += ' AUTOINCREMENT';
    }
    if (columnConfig.required) {
      query += ' NOT NULL';
    }
    query += ', ';
  }
  query = query.slice(0, -2); // Remove the trailing comma and space

  query += ')';
  const indexQueries: string[] = [];
  // 添加索引创建部分
  for (const columnName in schema) {
    const columnConfig = schema[columnName];
    if (columnConfig.index) {
      if (typeof columnConfig.index === 'boolean') {
        // 单列索引
        indexQueries.push(`CREATE INDEX IF NOT EXISTS '${tableName}_${columnName}_index' ON '${tableName}' ('${columnName}');`);
      } else if (Array.isArray(columnConfig.index)) {
        // 多列组合索引
        const indexColumns = columnConfig.index.map(col => `'${col}'`).join(', ');
        indexQueries.push(`CREATE INDEX IF NOT EXISTS '${tableName}_${columnConfig.index.join('_')}_index' ON '${tableName}' (${indexColumns});`);
      }
    }
  }

  // k.logger.information('SQL', query)

  // 执行表创建语句
  try {
    k.DB.sqlite.execute(query);
    // 执行索引创建语句
    indexQueries.forEach(indexQuery => {
      k.DB.sqlite.execute(indexQuery);
    });
  } catch (error) {
    throw new Error(`Failed to create table or indexes: ${(error as Error).message}`);
  }
  return 'Create Table ' + tableName;
}
function deleteTable(tableName: string) {
  try {
    const dropTableSQL = `DROP TABLE IF EXISTS '${tableName}'`;
    k.DB.sqlite.execute(dropTableSQL);
    const resetAutoIncrementSQL = `DELETE FROM SQLITE_SEQUENCE WHERE name='${tableName}' AND EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='SQLITE_SEQUENCE')`;
    k.DB.sqlite.execute(resetAutoIncrementSQL);
    return 'Delete Table ' + tableName;
  } catch (error) {
    throw new Error('Error deleting table and resetting auto-increment values');
  }
}