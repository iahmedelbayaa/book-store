import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';

export async function getUserByEmail(email: string) {
//   const query = 'SELECT * FROM users WHERE email = $1';
    try {
    var result: any = await dbQuery(email);
    return result.rows[0]; // return the first row
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get user by email');
  }
}
