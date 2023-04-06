// ユーザー
export class User {
  // ユーザーID
  uid = ``;

  // 名前
  name = ``;

  // 性別
  gender = ``;

  // ひとこと
  comment = ``;

  // プロフィール画像URL
  imageUrl = ``;

  // 作成日時
  createdAt?: Date;

  // 更新日時
  updatedAt?: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
