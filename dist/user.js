"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const iam = __importStar(require("./iam"));
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
//# sourceMappingURL=user.js.map