import "reflect-metadata";
import { Container } from "inversify/lib/container/container";
import { Firestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import { User } from "../firestore-collections/users/entity/user";
import { userConverter } from "../firestore-collections/users/userConverter";
import { UsersRepository } from "../firestore-collections/users/usersRepository";

/**
 * DI コンテナー
 */
export const container = new Container();

/**************************************************************************
 * プロバイダー名の定義
 **************************************************************************/

export const providers = {
  /**
   * Firestore
   */
  firestoreDb: Symbol.for(`firestoreDb`),

  /**
   * User
   */
  usersRef: Symbol.for(`usersRef`),
  usersRepository: Symbol.for(`usersRepository`),
};

/**************************************************************************
 * DI の登録
 **************************************************************************/

/**
 * Firestore
 */
container
  .bind<Firestore>(providers.firestoreDb)
  .toDynamicValue(() => {
    const db = admin.firestore();
    /** undefined なプロパティを無視するよう設定する */
    db.settings({ ignoreUndefinedProperties: true });
    return db;
  })
  .inSingletonScope();

/**
 * User
 */
container
  .bind<FirebaseFirestore.CollectionReference<User>>(providers.usersRef)
  .toDynamicValue((context) => {
    const db = context.container.get<Firestore>(providers.firestoreDb);
    return db.collection(`Users`).withConverter<User>(userConverter);
  })
  .inSingletonScope();
container.bind<UsersRepository>(providers.usersRepository).to(UsersRepository);
