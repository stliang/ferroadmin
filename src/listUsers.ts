import * as admin from 'firebase-admin';
import * as iam from './iam';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

if (process.argv.length !== 2) {
  throw Error('Invalid use of listUsers. Usage: node listUsers.js');
}
const email = process.argv[1];
iam.listUsers().then((res) => {
  console.log(`Users:\n ${JSON.stringify(res, null, 4)}\n`);
  process.exit(0);
}).catch((err) => {
  console.log('Failed to list user: ' + err);
  process.exit(1);
});
