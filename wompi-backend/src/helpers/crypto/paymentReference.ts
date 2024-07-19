import exp from 'constants';
import * as crypto from 'crypto';

export function generatePaymentReference(email: string, date: number): string {
  let stringHash = `${email}${date}`;

  //Generate the hash with SHA256
  const hash = crypto.createHash('sha256').update(stringHash).digest('hex');
  return hash;
}
