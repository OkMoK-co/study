import mysql from 'serverless-mysql';

interface userType {
  name: string;
  nickName: string;
}

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export default async function excuteQuery({ query, values }: any) {
  try {
    const results = await db.query(query, values);
    await db.end();
    console.log('DB result', results);
    return results;
  } catch (error) {
    console.log('DB result error', error);
    return { error };
  }
}

export async function addUser({ name, nickName }: userType) {
  try {
    const result = await excuteQuery({
      query: 'INSERT INTO test.users (name, nickName) VALUES(?, ?)',
      values: [name, nickName],
    });
    console.log('DB addUser', result);
  } catch (error) {
    console.log('DB addUser error', error);
  }
}

export async function findUser(name: string) {
  try {
    const result = await excuteQuery({
      query: 'SELECT * FROM test.users WHERE name = ?',
      values: [name],
    });
    console.log('DB findUser', result);
    return result;
  } catch (error) {
    console.log('DB findUser error', error);
  }
}

export async function modifyNickname({ name, nickName }: userType) {
  try {
    const result = await excuteQuery({
      query: 'UPDATE test.users SET nickName = ? WHERE name = ?',
      values: [nickName, name],
    });
    console.log('DB modifyNick', result);
  } catch (error) {
    console.log('DB modifyNick error', error);
  }
}
