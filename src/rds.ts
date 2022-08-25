import { createConnection, Connection } from 'mysql'

/**
 * DBへのコネクション生成
 * @returns {Connection} DBコネクション
 */
export const createSingleConnection = (): Connection => {
  return createConnection({
    host: process.env.DB_HOHT, // Lambdaの環境変数から取得
    user: process.env.DB_USER, // Lambdaの環境変数から取得
    password: process.env.DB_PASSWORD, // Lambdaの環境変数から取得
    database: process.env.DB_NAME, // Lambdaの環境変数から取得
    timeout: 60000
  })
}

/**
 * DBのトランザクション開始
 * @param {Connection} connection DBコネクション
 * @returns トランザクションオブジェクト
 */
export const beginTransaction = (connection: Connection): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    connection.beginTransaction((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

/**
 * クエリ実行
 * @param {Connection} connection DBコネクション
 * @param {string} statement SQL文
 * @param {Array<unknown>} params パラメータ
 * @returns トランザクションオブジェクト
 */
export const query = (connection: Connection, statement: string, params: Array<unknown>) => {
  return new Promise((resolve, reject) => {
    connection.query(statement, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

/**
 * トランザクションをコミットする
 * @param {Connection} connection DBコネクション
 * @returns トランザクションオブジェクト
 */
export const commit = (connection: Connection): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    connection.commit((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

/**
 * トランザクションをロールバックする
 * @param {Connection} connection DBコネクション
 * @returns トランザクションオブジェクト
 */
export const rollback = (connection: Connection): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    connection.rollback((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

/**
 * クエリ実行
 * @param {string} statement SQL文
 * @param params パラメータ
 * @returns クエリ実行結果
 */
const oneShotQuery = async (statement: string, params?: Array<unknown>) => {
  const connection = createSingleConnection()
  const results = await query(connection, statement, params).finally(() => {
    connection.destroy()
  })
  return results
}

/**
 * 特定のカラム抽出
 * @returns
 */
export const getColumn1 = async (): Promise<unknown> => {
  console.log('getColumn1')
  const sql = `
    SELECT
      user_id
    FROM
      schema_name.table_name
  ;`
  const results = await oneShotQuery(sql)
  return results
}

/**
 * 全カラム抽出
 * @returns
 */
export const getColumn2 = async (): Promise<unknown> => {
  console.log('getColumn2')
  const sql = `
    SELECT
      *
    FROM
      schema_name.table_name
  ;`
  const results = await oneShotQuery(sql)
  return results
}
