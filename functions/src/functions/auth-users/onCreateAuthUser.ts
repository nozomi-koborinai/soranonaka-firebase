import "reflect-metadata";
import * as functions from "firebase-functions";
import { constants } from "../../configs/constants";
import { User } from "../../firestore-collections/users/entity/user";
import { container, providers } from "../../configs/dicon";
import { UsersRepository } from "../../firestore-collections/users/usersRepository";

// Firebase.Authenticationにユーザーがつくられた時
export const onCreateAuthUser = functions
  .region(constants.region)
  .auth.user()
  .onCreate(async (user) => {
    const input = new User({
      uid: user.uid,
    });

    const usersRepository = container.get<UsersRepository>(
      providers.usersRepository
    );
    await usersRepository.add({ input: input });
    functions.logger.info(`ユーザーを追加しました: uid = ${input.uid}`);
  });
