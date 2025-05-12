const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.throwBall = functions.https.onRequest(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, reason: "no_user_id" });
  }

  // 🔹 0. 사용자 정보 불러오기
  const userRef = db.collection("users").doc(userId);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    return res.status(404).json({ success: false, reason: "user_not_found" });
  }

  const user = userSnap.data();
  const currentBall = user.ball ?? 0;

  if (currentBall <= 0) {
    return res.status(403).json({ success: false, reason: "no_ball" });
  }

  // 🔸 1. 공 차감
  await userRef.update({
    ball: admin.firestore.FieldValue.increment(-1),
  });

  // ✅ 2. 확률 설정값 가져오기
  const configSnap = await db.collection("luck").doc("config").get();
  const chanceThreshold = configSnap.exists
    ? configSnap.data().chanceThreshold
    : 0.2;

  // ✅ 3. 확률 판정
  const chance = Math.random();
  console.log("🎲 chance value:", chance, "vs threshold:", chanceThreshold);

  if (chance > chanceThreshold) {
    return res.json({
      success: false,
      reason: "not_lucky",
      updatedBall: currentBall - 1, // 클라이언트 상태 업데이트용
    });
  }

  // ✅ 4. Firestore에서 아직 사용되지 않은 기프티콘 조회
  const snapshot = await db
    .collection("gifticons")
    .where("used", "==", false)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.json({
      success: false,
      reason: "no_more_gift",
      updatedBall: currentBall - 1,
    });
  }

  const doc = snapshot.docs[0];
  const gift = doc.data();

  // ✅ 5. 기프티콘 사용 처리
  await doc.ref.update({
    used: true,
    usedAt: new Date(),
    usedBy: userId,
  });

  await userRef.update({
    gift: admin.firestore.FieldValue.arrayUnion({
      name: gift.name,
      imageUrl: gift.imageUrl,
      receivedAt: new Date().toISOString(),
    }),
  });

  // ✅ 6. 응답 반환
  return res.json({
    success: true,
    name: gift.name,
    imageUrl: gift.imageUrl,
    updatedBall: currentBall - 1, // 🔄 클라이언트에서 store 업데이트 가능
  });
});
