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

export async function getAllSites() {
  try {
    const querySnapshot = await firestore.collection("sites").get();

    const sites = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      sites.push({ id: doc.id, ...doc.data() });
    });
    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(uid) {
  try {
    const sitesRef = firestore.collection("sites");

    let query = sitesRef.where("authorId", "==", uid);

    const sites = [];

    const querySnapshot = await query.get();

    querySnapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    // dayjs
    // sites.sort((a, b) =>
    //   compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    // );

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getAllFeedbackForSites(uid) {
  try {
    const { sites } = await getUserSites(uid);

    if (!sites.length) {
      return { feedback: [] };
    }

    const siteIds = sites.map((site) => site.id);

    const feedbackRef = firestore.collection("feedback");

    let query = feedbackRef.where("siteId", "in", siteIds);

    const querySnapshot = await query.get();

    const feedback = [];

    querySnapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
}
