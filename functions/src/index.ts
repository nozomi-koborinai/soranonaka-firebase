import "reflect-metadata";
import * as admin from "firebase-admin";
import { constants } from "./configs/constants";

// Firestore Admin SDK の初期化
admin.initializeApp();

// タイムゾーンの初期化
process.env.TZ = constants.timezone;

// デプロイする関数を一旦importする
import { onCreateAuthUser } from "./functions/auth-users/onCreateAuthUser";

// デプロイする関数一覧
export { onCreateAuthUser };
