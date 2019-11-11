import * as admin from 'firebase-admin';
import * as iam from './iam';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

if (process.argv.length !== 3) {
  throw Error('Invalid use of promote. Usage: node promote.js <email>');
}
const email = process.argv[2];
iam.getUser(email).then((res) => {
  console.log(`User:\n ${JSON.stringify(res, null, 4)}\n`);
  process.exit(0);
}).catch((err) => {
  console.log('Failed to get user: ' + err);
  process.exit(1);
});
