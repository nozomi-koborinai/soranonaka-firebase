import { User } from "./entity/user";
import { FieldValue, FirestoreDataConverter } from "firebase-admin/firestore";

export const userConverter: FirestoreDataConverter<User> = {
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): User {
    const user = snapshot.data();
    return {
      uid: snapshot.id,
      name: user.name,
      gender: user.gender,
      comment: user.comment,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt?.toDate(),
      updatedAt: user.updatedAt?.toDate(),
    };
  },
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return {
      name: user.name,
      gender: user.gender,
      comment: user.comment,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt ? FieldValue.serverTimestamp() : undefined,
      updatedAt: FieldValue.serverTimestamp(),
    };
  },
};
