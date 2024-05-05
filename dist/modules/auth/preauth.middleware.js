"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreauthMiddleware = void 0;
const firebase = require("firebase-admin");
const common_1 = require("@nestjs/common");
require("dotenv/config");
const firebase_params = {
    type: 'service_account',
    projectId: 'engteachinglearningassistance',
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: 'https://accounts.google.com/o/oauth2/auth',
    tokenUri: 'https://oauth2.googleapis.com/token',
    authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
    clientC509CertUrl: process.env.FIREBASE_CLIENT_ID,
};
let PreauthMiddleware = exports.PreauthMiddleware = class PreauthMiddleware {
    constructor() {
        console.log(firebase_params);
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
            databaseURL: 'https://engteachinglearningassistance-default-rtdb.asia-southeast1.firebasedatabase.app',
        });
    }
    use(req, res, next) {
        const token = req.body.token;
        if (token != null && token != '') {
            this.defaultApp
                .auth()
                .verifyIdToken(token)
                .then(async (decodedToken) => {
                const user = {
                    email: decodedToken.email,
                    picture: decodedToken.picture,
                    userId: decodedToken.user_id,
                    name: decodedToken.name,
                    iat: decodedToken.iat,
                    exp: decodedToken.exp,
                };
                req.firebaseUser = user;
                next();
            })
                .catch((error) => {
                console.log('Failed to verify Firebase token', error);
                res.status(401).send('Unauthorized');
            });
        }
        else {
            console.log('No token found');
            next();
        }
    }
    accessDenied(url, res) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied',
        });
    }
};
exports.PreauthMiddleware = PreauthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PreauthMiddleware);
//# sourceMappingURL=preauth.middleware.js.map