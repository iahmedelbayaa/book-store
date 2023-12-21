import pool from './pool';

export const dbQuery = (queryText: string, queryParams?: any) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, queryParams).then(res => {
            resolve(res);
        })
            .catch((err: Error) => {
            console.log('Error executing database query' , err.message);
            reject(err);
        });
    });
};



