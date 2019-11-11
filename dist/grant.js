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
const usageErrorMsg = `Invalid use of grant. Usage: node grant.js <${iam.roles.toString()}> <email>`;
if (process.argv.length !== 4) {
    throw Error(usageErrorMsg);
}
const role = process.argv[2];
const email = process.argv[3];
if (!(iam.roles.includes(role))) {
    throw Error(usageErrorMsg);
}
iam.grantRole(role, email).then((res) => {
    console.log(`User ${email} has been given ${role} role`);
    process.exit(0);
}).catch((err) => {
    console.log(`Failed to grant user ${role} role: ` + err);
    process.exit(1);
});
//# sourceMappingURL=grant.js.map