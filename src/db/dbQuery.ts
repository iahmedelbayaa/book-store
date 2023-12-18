export class queryList {
  GET_STORE_LIST_QUERY: string = `SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE`;

  SAVE_STORE_QUERY: string = `INSERT INTO BMS.STORE (STORE_NAME, STORE_CODE, ADDRESS , CREATED_ON , CREATED_By) VALUES($1, $2, $3, $4, $5)`;

  GET_BOOK_LIST_QUERY: string = `SELECT BOOK_ID, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER FROM BMS.BOOK`;

  SAVE_BOOK_QUERY: string = ` INSERT INTO BMS.BOOK (BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, STORE_CODE, CREATED_BY , CREATED_ON) VALUES($1, $2, $3, $4, $5 , $6 , $7 , $8)`;

  GET_BOOK_DETAILS_QUERY: string = `SELECT BOOK_ID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, BOOK.STORE_CODE, store.store_name , store.address  FROM BMS.BOOK INNER JOIN  BMS.STORE ON BOOK.STORE_CODE  = STORE.STORE_CODE WHERE BOOK_ID =$1`;

  UPDATE_STORE_QUERY: string = `UPDATE BMS.BOOK SET BOOK_TITLE=$1, BOOK_DESCRIPTION=$2, BOOK_AUTHOR=$3, BOOK_PUBLISHER=$4,BOOK_PAGES=$5, STORE_CODE=$6, CREATED_BY=$7 , CREATED_ON=$8 WHERE BOOK_ID=$9`;

  DELETE_BOOK_QUERY: string = `DELETE FROM BMS.BOOK WHERE BOOK_ID=$1`;

  AUDIT_QUERY: string = `INSERT INTO BMS.APP_AUDIT (AUDIT_ACTION, AUDIT_DATA, AUDIT_STATUS, AUDIT_ERROR , AUDIT_BY, AUDIT_ON) VALUES($1, $2, $3, $4, $5, $6)`;
}