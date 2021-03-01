import { firestore } from "./firebase";

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function updateUser(uid, data) {
  // 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 수정
  return firestore.collection("users").doc(uid).update(data);
}

export function createSite(data) {
  // 자동 생성 ID를 사용하여 문서 참조를 만든 후 참조를 사용: doc() 호출
  const siteRef = firestore.collection("sites").doc();
  siteRef.set(data);

  return siteRef;
}
