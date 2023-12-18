import events from 'events';
import { Audit } from '../model/audit-model';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';


// create event 
const emitter = new events.EventEmitter();

const auditEvent = 'audit';
// event effect 
emitter.on(auditEvent, (audit: Audit) => {
  console.log('Audit Event Emitter - Audit : ' + JSON.stringify(audit));
  try {

    //make values with specific type
    const values: (string | number)[] = [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.status,
      audit.error,
      audit.auditBy,
      audit.auditOn,
    ];
    var getQuery = new queryList();
    var auditQuery = getQuery.AUDIT_QUERY;
    dbQuery(auditQuery, values);
  } catch (error) {
    console.log('Audit Event Emitter - error : ' + error);
  }
});

export function prepareAudit(
  auditAction: string,
  data: any,
  error: string,
  auditBy: string,
  auditOn: string
) {
  let status = 200;
  if (error) status = 500;

  const auditObj: Audit = {
    auditAction,
    data,
    status,
    error,
    auditBy,
    auditOn,
  };

  emitter.emit(auditEvent, auditObj);
}
