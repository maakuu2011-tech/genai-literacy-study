(() => {
  const questions = [
  {
    "id": "daily-001",
    "category": "AIの基礎",
    "difficulty": "easy",
    "confidence": "high",
    "keyword": "AIの定義",
    "source": "GUGA公式シラバス 2026年2月試験より引用",
    "question": "AIを活用する際の説明として、最も適切なものはどれか。",
    "choices": [
      "AIの出力は常に正しいため、人による確認は不要である",
      "AIは目的やデータ、評価方法を設計したうえで活用する",
      "AIは学習済みの知識を一切使わず、毎回ゼロから判断する",
      "AIを導入すれば、利用目的や責任分担を決める必要はない"
    ],
    "answer": 1,
    "explanation": "AIは目的に応じてデータやモデルを使い、一定の入力から出力を得る仕組みです。導入時は何に使うか、どのように評価するか、出力を誰が確認するかまで設計する必要があります。",
    "sourceRefs": [
      {
        "sourceId": "guga-syllabus-2026",
        "url": "https://guga.or.jp/assets/syllabus.pdf",
        "locator": "AIの基礎",
        "claim": "AIの定義と活用に関する基礎事項"
      }
    ],
    "choiceExplanations": [
      "AIの出力には誤りがあり得るため、人による確認が必要です。",
      "正解。目的、データ、評価、責任分担を含めて活用を設計します。",
      "学習済みモデルは、学習したパターンや知識を使って出力します。",
      "導入前に利用目的と責任分担を定めることが重要です。"
    ],
    "reviewStatus": "approved",
    "reviewedAt": "2026-07-20"
  },
  {
    "id": "daily-002",
    "category": "機械学習",
    "difficulty": "normal",
    "confidence": "high",
    "keyword": "学習データと評価データ",
    "source": "GUGA公式シラバス 2026年2月試験より引用",
    "question": "機械学習モデルの性能を適切に評価する方法として、最も適切なものはどれか。",
    "choices": [
      "学習に使ったデータだけで性能を測る",
      "評価指標を使わず、出力の印象だけで判断する",
      "学習に使っていないデータでも性能を確認する",
      "正解率が高ければ、どの用途でも必ず実用化する"
    ],
    "answer": 2,
    "explanation": "学習に使ったデータだけで評価すると、データを覚えた結果を性能と誤認することがあります。学習に使っていない評価用データや実運用に近いデータで、目的に合った指標を確認します。",
    "sourceRefs": [
      {
        "sourceId": "guga-syllabus-2026",
        "url": "https://guga.or.jp/assets/syllabus.pdf",
        "locator": "機械学習",
        "claim": "機械学習の学習と評価に関する基礎事項"
      }
    ],
    "choiceExplanations": [
      "学習データだけでは未知のデータへの性能を判断できません。",
      "用途に応じた評価指標を使って、再現性のある確認を行います。",
      "正解。未使用データや実運用に近いデータで汎化性能を確認します。",
      "指標だけでなく、用途、リスク、運用体制も確認する必要があります。"
    ],
    "reviewStatus": "approved",
    "reviewedAt": "2026-07-20"
  }
];
  window.GENAI_PASSPORT_QUESTIONS = [...(window.GENAI_PASSPORT_QUESTIONS || []), ...questions];
  if (typeof module !== "undefined") module.exports = questions;
})();
