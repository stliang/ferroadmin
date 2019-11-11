"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
// User roles
exports.roles = ['anonymous', 'basic', 'paid', 'admin'];
// User privilege levels
exports.adminLevel = exports.roles;
exports.paidLevel = exports.roles.slice(0, exports.adminLevel.length - 1);
exports.basicLevel = exports.roles.slice(0, exports.paidLevel.length - 1);
exports.anonymousLevel = exports.roles.slice(0, exports.basicLevel.length - 1);
function grantRole(role, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield admin.auth().getUserByEmail(email);
        if (user.customClaims && user.customClaims.userRole === role) {
            return;
        }
        if (exports.roles.includes(role)) {
            return admin.auth().setCustomUserClaims(user.uid, {
                userRole: role,
            });
        }
        else {
            return admin.auth().setCustomUserClaims(user.uid, {
                userRole: exports.roles[0],
            });
        }
    });
}
exports.grantRole = grantRole;
function checkAuth(idToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = yield admin.auth().verifyIdToken(idToken);
        if (decoded.userRole !== 'admin') {
            throw new Error('User does not have admin privileges');
        }
    });
}
exports.checkAuth = checkAuth;
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return admin.auth().getUserByEmail(email);
    });
}
exports.getUser = getUser;
//# sourceMappingURL=iam.js.map