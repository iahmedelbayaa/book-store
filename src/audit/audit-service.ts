import events from 'events';
import { Audit } from '../model/audit-model';
import { queryList } from '../db/dbQuery';
import { dbQuery } from '../db/connection';

// create event
const emitter = new events.EventEmitter();

const auditEvent = 'audit';
// event effect
emitter.on(auditEvent, (Audit) => {
  // console.log('Audit Event Emitter - Audit : ' + JSON.stringify(Audit));
  try {
    //make values with specific type
    const values: any[] = [
      Audit.auditAction,
      JSON.stringify(Audit.data),
      Audit.status,
      Audit.error,
      Audit.auditBy,
      Audit.auditOn,
    ];

    let getQuery = new queryList();
    let auditQuery = getQuery.AUDIT_QUERY;
    dbQuery(auditQuery, values);
  } catch (error) {
    console.log('Audit Event Emitter - error : ' + error);
  }
});

export function prepareAudit(
  auditAction: string,
  data: any,
  error: any,
  auditBy: string,
  auditOn: string
) {
  let status = 200;
  if (error) status = 500;

  let auditObj = new Audit(auditAction, data, status, error, auditBy, auditOn);

  emitter.emit(auditEvent, auditObj);
}
