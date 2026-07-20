module.exports = [
  {
    id: "daily-001",
    category: "AIの基礎",
    difficulty: "easy",
    confidence: "high",
    keyword: "AIの定義",
    source: "GUGA公式シラバス 2026年2月試験より引用",
    question: "AIを活用する際の説明として、最も適切なものはどれか。",
    choices: [
      "AIの出力は常に正しいため、人による確認は不要である",
      "AIは目的やデータ、評価方法を設計したうえで活用する",
      "AIは学習済みの知識を一切使わず、毎回ゼロから判断する",
      "AIを導入すれば、利用目的や責任分担を決める必要はない"
    ],
    answer: 1,
    explanation: "AIは目的に応じてデータやモデルを使い、一定の入力から出力を得る仕組みです。導入時は何に使うか、どのように評価するか、出力を誰が確認するかまで設計する必要があります。",
    sourceRefs: [{ sourceId: "guga-syllabus-2026", url: "https://guga.or.jp/assets/syllabus.pdf", locator: "AIの基礎", claim: "AIの定義と活用に関する基礎事項" }],
    choiceExplanations: [
      "AIの出力には誤りがあり得るため、人による確認が必要です。",
      "正解。目的、データ、評価、責任分担を含めて活用を設計します。",
      "学習済みモデルは、学習したパターンや知識を使って出力します。",
      "導入前に利用目的と責任分担を定めることが重要です。"
    ]
  },
  {
    id: "daily-002",
    category: "機械学習",
    difficulty: "normal",
    confidence: "high",
    keyword: "学習データと評価データ",
    source: "GUGA公式シラバス 2026年2月試験より引用",
    question: "機械学習モデルの性能を適切に評価する方法として、最も適切なものはどれか。",
    choices: [
      "学習に使ったデータだけで性能を測る",
      "評価指標を使わず、出力の印象だけで判断する",
      "学習に使っていないデータでも性能を確認する",
      "正解率が高ければ、どの用途でも必ず実用化する"
    ],
    answer: 2,
    explanation: "学習に使ったデータだけで評価すると、データを覚えた結果を性能と誤認することがあります。学習に使っていない評価用データや実運用に近いデータで、目的に合った指標を確認します。",
    sourceRefs: [{ sourceId: "guga-syllabus-2026", url: "https://guga.or.jp/assets/syllabus.pdf", locator: "機械学習", claim: "機械学習の学習と評価に関する基礎事項" }],
    choiceExplanations: [
      "学習データだけでは未知のデータへの性能を判断できません。",
      "用途に応じた評価指標を使って、再現性のある確認を行います。",
      "正解。未使用データや実運用に近いデータで汎化性能を確認します。",
      "指標だけでなく、用途、リスク、運用体制も確認する必要があります。"
    ]
  },
  {
    id: "daily-003",
    category: "生成モデル",
    difficulty: "easy",
    confidence: "high",
    keyword: "生成モデル",
    source: "GUGA公式シラバス 2026年2月試験より引用",
    question: "生成モデルの説明として、最も適切なものはどれか。",
    choices: [
      "既存データの件数を数えるだけの仕組み",
      "入力された文章を必ず事実に変換する仕組み",
      "学習したパターンをもとに新しい文章や画像などを生成する仕組み",
      "人間の承認があるまで一切の出力を作れない仕組み"
    ],
    answer: 2,
    explanation: "生成モデルは、学習したデータのパターンをもとに、文章、画像、音声、コードなどの新しいコンテンツを生成します。生成物が事実であることや権利上問題ないことを自動で保証するものではありません。",
    sourceRefs: [{ sourceId: "guga-syllabus-2026", url: "https://guga.or.jp/assets/syllabus.pdf", locator: "生成AI・生成モデル", claim: "生成モデルの基本的な仕組み" }],
    choiceExplanations: [
      "件数の集計は生成モデルの本質的な説明ではありません。",
      "生成モデルは事実性を自動で保証する仕組みではありません。",
      "正解。学習したパターンをもとに新しいコンテンツを生成します。",
      "人の承認なしで出力できるサービスもあります。"
    ]
  },
  {
    id: "daily-004",
    category: "プロンプト",
    difficulty: "normal",
    confidence: "high",
    keyword: "プロンプトの具体化",
    source: "GUGA公式シラバス 2026年2月試験より引用",
    question: "生成AIに期待する回答を得やすくするプロンプトとして、最も適切なものはどれか。",
    choices: [
      "目的、前提、出力形式を具体的に示す",
      "重要な条件をすべて省略して短くする",
      "一度の回答を必ず正解として採用する",
      "個人情報をできるだけ多く入力する"
    ],
    answer: 0,
    explanation: "目的、対象者、前提条件、制約、出力形式を明示すると、生成AIが回答の方向性を捉えやすくなります。出力は確認し、入力する情報も必要最小限にします。",
    sourceRefs: [{ sourceId: "guga-syllabus-2026", url: "https://guga.or.jp/assets/syllabus.pdf", locator: "プロンプト", claim: "生成AIへの指示と出力の確認に関する基礎事項" }],
    choiceExplanations: [
      "正解。目的や条件、形式を具体化すると回答のずれを減らせます。",
      "条件の省略は、期待と異なる出力につながることがあります。",
      "生成AIの出力は検証してから利用します。",
      "個人情報は必要最小限にし、入力可否を確認します。"
    ]
  },
  {
    id: "daily-005",
    category: "セキュリティ",
    difficulty: "normal",
    confidence: "high",
    keyword: "プロンプトインジェクション",
    source: "経済産業省 AI事業者ガイドライン",
    question: "プロンプトインジェクションへの対策として、最も適切なものはどれか。",
    choices: [
      "外部入力を常にシステム指示より優先する",
      "入力内容を信頼し、検証を省略する",
      "外部入力を不信なデータとして扱い、権限や出力を検証する",
      "機密情報をプロンプトに含めて判断させる"
    ],
    answer: 2,
    explanation: "プロンプトインジェクションは、外部入力によってAIの指示を意図しない方向へ誘導する攻撃です。入力を信頼しすぎず、指示とデータを分離し、ツール権限を最小化し、重要な処理や出力を検証します。",
    sourceRefs: [{ sourceId: "meti-ai-guideline", url: "https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/", locator: "AIの安全性・セキュリティ", claim: "AIシステムのリスク管理と安全性確保" }],
    choiceExplanations: [
      "外部入力を無条件に優先すると、攻撃の影響を受けやすくなります。",
      "外部入力や生成結果は、信頼できるとは限らないため検証が必要です。",
      "正解。入力、権限、出力をそれぞれ検証し、影響範囲を限定します。",
      "機密情報の入力は漏えいリスクを高めます。"
    ]
  },
  {
    id: "daily-006",
    category: "情報リテラシー",
    difficulty: "easy",
    confidence: "high",
    keyword: "ハルシネーション",
    source: "GUGA公式シラバス 2026年2月試験より引用",
    question: "生成AIのハルシネーションに対する対応として、最も適切なものはどれか。",
    choices: [
      "流暢な文章なら正しいと判断する",
      "重要な事実や数値を一次資料などで確認する",
      "AIに自信の有無を聞けば確認は不要である",
      "誤りを防ぐため出力を一切読まない"
    ],
    answer: 1,
    explanation: "ハルシネーションは、生成AIがもっともらしい誤情報を出力する現象です。重要な事実、数値、引用、法令や制度の内容は、信頼できる一次資料や担当者の確認を通して利用します。",
    sourceRefs: [{ sourceId: "guga-syllabus-2026", url: "https://guga.or.jp/assets/syllabus.pdf", locator: "生成AIのリスク", claim: "生成AIの出力に含まれる誤情報への対応" }],
    choiceExplanations: [
      "流暢さは事実性を保証しません。",
      "正解。重要な内容は一次資料や専門家によって検証します。",
      "AI自身の自己評価だけでは十分な検証になりません。",
      "出力を読まなければ誤りやリスクを発見できません。"
    ]
  },
  {
    id: "daily-007",
    category: "ビジネス活用",
    difficulty: "normal",
    confidence: "high",
    keyword: "AI活用の評価",
    source: "経済産業省 AI事業者ガイドライン",
    question: "業務で生成AIを導入した後に確認すべき内容として、最も適切なものはどれか。",
    choices: [
      "導入したことだけを成果とする",
      "利用状況、品質、コスト、リスクを継続的に確認する",
      "一度決めた利用ルールを更新しない",
      "出力の確認責任を誰にも割り当てない"
    ],
    answer: 1,
    explanation: "AI活用は導入して終わりではありません。利用状況、品質、費用、情報漏えい、権利侵害、業務への影響を継続的に確認し、必要に応じてルールや運用を見直します。",
    sourceRefs: [{ sourceId: "meti-ai-guideline", url: "https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/", locator: "AIガバナンス", claim: "AIのリスク管理と継続的な改善" }],
    choiceExplanations: [
      "導入だけでは、業務上の効果やリスクを判断できません。",
      "正解。効果とリスクを継続的に測り、運用を改善します。",
      "制度やサービス、業務実態の変化に応じた更新が必要です。",
      "確認責任と判断基準を明確にする必要があります。"
    ]
  }
];
