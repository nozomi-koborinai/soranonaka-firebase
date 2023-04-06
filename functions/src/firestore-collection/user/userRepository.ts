import "reflect-metadata";
import { inject, injectable, LazyServiceIdentifer } from "inversify";
import { CollectionReference } from "firebase-admin/firestore";
import { User } from "./entity/user";
import { providers } from "../../configs/dicon";
import * as dayjs from "dayjs";

// ユーザーリポジトリ
@injectable()
export class UserRepository {
  constructor(
    @inject(new LazyServiceIdentifer(() => providers.userRef))
    private collectionRef: CollectionReference<User>
  ) {}

  // ユーザーを追加する
  async add({ input }: { input: User }): Promise<void> {
    input.createdAt = dayjs().toDate();
    await this.collectionRef.doc(input.uid).set(input);
  }
}
