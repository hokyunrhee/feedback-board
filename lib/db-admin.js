import { firestore } from "./firebase-admin";

export async function getAllFeedback(siteId, route) {
  try {
    const feedbackRef = firestore.collection("feedback");
    let query = feedbackRef
      .where("siteId", "==", siteId)
      .where("status", "==", "active");

    if (route) {
      query = query.where("route", "==", route);
    }

    const feedback = [];

    const querySnapshot = await query.get();

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      feedback.push({ id: doc.id, ...doc.data() });
    });
    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getSite(siteId) {
  try {
    const sitesRef = firestore.collection("sites");
    const doc = await sitesRef.doc(siteId).get();
    const site = { id: doc.id, ...doc.data() };
    return { site };
  } catch (error) {
    return { error };
  }
}
