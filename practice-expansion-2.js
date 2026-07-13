(() => {
  const syllabusUrl = "https://guga.or.jp/assets/syllabus.pdf";
  const guidelineUrl = "https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/";
  const source = "GUGA公式シラバス 2026年2月試験より適用";

  const ref = (sourceId, url, locator, claim) => ({ sourceId, url, locator, claim });

  const questions = [
    {
      id: "dl-008",
      category: "ディープラーニング",
      difficulty: "normal",
      confidence: "high",
      keyword: "Attention",
      source,
      question: "Transformerで重要なAttentionの役割として最も適切なものはどれか。",
      choices: [
        "入力中のどの情報に注目するかを重み付けし、関係性を捉えやすくする",
        "画像ファイルの容量だけを小さくする",
        "学習データの著作権を自動で消す",
        "ネットワーク接続を暗号化する"
      ],
      answer: 0,
      explanation: "Attentionは、入力内のどの部分を重視するかを重み付けする仕組みです。Transformerでは文中の単語同士の関係などを捉えるために重要で、現在の大規模言語モデルの基盤理解にもつながります。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "ディープラーニングとTransformer", "TransformerやAttentionなどの基礎概念は学習範囲に含まれる。")],
      choiceExplanations: [
        "正解。入力中の重要な関係を重み付けして扱う仕組みです。",
        "ファイル圧縮の説明ではありません。",
        "著作権処理を自動で行う仕組みではありません。",
        "通信暗号化とは別の技術です。"
      ]
    },
    {
      id: "dl-009",
      category: "ディープラーニング",
      difficulty: "normal",
      confidence: "high",
      keyword: "埋め込み表現",
      source,
      question: "埋め込み表現の説明として最も適切なものはどれか。",
      choices: [
        "文章を必ず画像に変換すること",
        "単語や文などの意味的特徴を数値ベクトルとして表すこと",
        "AIサービスの料金を計算する表",
        "パスワードを短く保存すること"
      ],
      answer: 1,
      explanation: "埋め込み表現は、単語、文、画像などを数値ベクトルとして表す方法です。意味が近い情報を近いベクトルとして扱えるため、検索、分類、RAGなどで重要です。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "自然言語処理とベクトル表現", "埋め込みやベクトル表現は生成AI理解に関係する基礎事項である。")],
      choiceExplanations: [
        "画像変換ではありません。",
        "正解。意味的特徴を数値ベクトルで表します。",
        "料金表ではありません。",
        "パスワード保存の説明ではありません。"
      ]
    },
    {
      id: "rag-009",
      category: "RAG・検索拡張生成",
      difficulty: "normal",
      confidence: "high",
      keyword: "チャンク設計",
      source,
      question: "RAGで文書をチャンクに分割する理由として最も適切なものはどれか。",
      choices: [
        "検索しやすい単位に分け、関連する情報を回答生成時に参照しやすくするため",
        "文書の著作権をなくすため",
        "AIの回答を必ず正解にするため",
        "すべての文書を公開するため"
      ],
      answer: 0,
      explanation: "RAGでは、長い文書を検索しやすい単位に分割し、質問に関連する部分を取り出して回答生成に使います。チャンクが大きすぎても小さすぎても、検索や文脈理解に影響します。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "RAG・検索拡張生成", "RAGの仕組みや外部文書参照は学習範囲に含まれる。")],
      choiceExplanations: [
        "正解。検索と回答生成に使いやすい単位にするためです。",
        "チャンク化しても著作権は消えません。",
        "RAGでも誤検索や誤回答は起こり得ます。",
        "公開を目的とする処理ではありません。"
      ]
    },
    {
      id: "rag-010",
      category: "RAG・検索拡張生成",
      difficulty: "normal",
      confidence: "high",
      keyword: "ベクトル検索",
      source,
      question: "RAGでベクトル検索を使う利点として最も適切なものはどれか。",
      choices: [
        "インターネット接続が必ず不要になる",
        "言葉が完全一致しなくても、意味が近い文書を探しやすくなる",
        "社内文書の機密性が自動で保証される",
        "AIの出力を必ず短くできる"
      ],
      answer: 1,
      explanation: "ベクトル検索では、文章を埋め込み表現に変換して意味的な近さで検索します。キーワードが完全一致しない場合でも関連文書を見つけやすい一方、権限管理や検索品質の確認は別途必要です。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "RAG・ベクトルデータベース", "ベクトル検索やRAGの基本的な仕組みは学習範囲に含まれる。")],
      choiceExplanations: [
        "システム構成によってはネットワーク接続が必要です。",
        "正解。完全一致ではなく意味的な近さで探せます。",
        "機密性はアクセス制御などで別途管理します。",
        "出力長を保証する仕組みではありません。"
      ]
    },
    {
      id: "agent-006",
      category: "AIエージェント",
      difficulty: "normal",
      confidence: "high",
      keyword: "ツール利用",
      source,
      question: "AIエージェントに外部ツールを使わせる場合の注意点として最も適切なものはどれか。",
      choices: [
        "実行できる操作、権限、承認が必要な場面をあらかじめ設計する",
        "ツールを使うなら人間の確認は一切不要になる",
        "外部ツールには個人情報を必ず送信する",
        "ツール利用時はログを残してはいけない"
      ],
      answer: 0,
      explanation: "AIエージェントが外部ツールを使う場合、読み取りだけか変更もできるか、どの権限で実行するか、人間の承認が必要な操作は何かを設計する必要があります。ログや監査も重要です。",
      sourceRefs: [ref("meti-ai-guideline", guidelineUrl, "AIガバナンスと運用管理", "AI利用では権限、リスク、人間の関与、記録管理を含む運用設計が重要である。")],
      choiceExplanations: [
        "正解。権限と承認範囲を事前に設計します。",
        "外部操作を伴うほど、人間の確認が重要になる場面があります。",
        "個人情報の送信は必要性、法令、契約、権限に基づき判断します。",
        "ログは監査や事故対応に役立つため、適切に管理します。"
      ]
    },
    {
      id: "agent-007",
      category: "AIエージェント",
      difficulty: "normal",
      confidence: "high",
      keyword: "自律実行",
      source,
      question: "AIエージェントの自律実行に関する説明として最も適切なものはどれか。",
      choices: [
        "AIが自律実行する場合、誤操作は絶対に起きない",
        "自律実行では利用目的を設定してはいけない",
        "目的に向けて手順を分解し、必要に応じてツールを使う仕組みだが、重要操作には制御が必要である",
        "AIエージェントは文章生成だけで、外部操作はできない"
      ],
      answer: 2,
      explanation: "AIエージェントは、目標に向けて手順を考え、ツールや外部サービスを使いながら処理を進める仕組みです。ただし、誤操作、権限超過、情報漏えいのリスクがあるため、重要操作には承認や制御が必要です。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "AIエージェント", "AIエージェントの特徴とリスクは学習範囲に含まれる。")],
      choiceExplanations: [
        "誤操作や誤判断は起こり得ます。",
        "目的を設定しなければ、適切な計画や実行ができません。",
        "正解。自律性があるからこそ、権限や承認の制御が重要です。",
        "AIエージェントは外部ツールを使う設計もあります。"
      ]
    },
    {
      id: "literacy-008",
      category: "情報リテラシー",
      difficulty: "normal",
      confidence: "high",
      keyword: "一次情報",
      source,
      question: "生成AIの回答を学習や業務で使う前の確認として最も適切なものはどれか。",
      choices: [
        "自然な文章なら確認せずそのまま使う",
        "AIが出典名を書いたらリンク先を読まなくてよい",
        "重要な事実、日付、法律、数値は公式資料や一次情報で確認する",
        "SNSで多く共有されていれば正しいと判断する"
      ],
      answer: 2,
      explanation: "生成AIの回答は自然でも誤りを含むことがあります。重要な事実、日付、法律、数値、製品仕様などは、公式資料や一次情報で確認してから利用します。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "情報リテラシー", "生成AI出力の確認、ファクトチェック、情報源確認は学習範囲に含まれる。")],
      choiceExplanations: [
        "文章が自然でも正しいとは限りません。",
        "出典名があっても、リンク先の存在と内容を確認します。",
        "正解。重要事項は一次情報で確認します。",
        "共有数は正確性の保証ではありません。"
      ]
    },
    {
      id: "literacy-009",
      category: "情報リテラシー",
      difficulty: "normal",
      confidence: "high",
      keyword: "誤情報拡散",
      source,
      question: "AI生成コンテンツをSNSで共有する前の対応として最も適切なものはどれか。",
      choices: [
        "AIが作ったものなら誤情報にはならない",
        "感情を強く揺さぶる内容ほどすぐ共有する",
        "画像や動画は見た目が自然なら本物と判断する",
        "事実確認、出所確認、誤解を招く表現の有無を確認してから共有する"
      ],
      answer: 3,
      explanation: "AI生成コンテンツは、誤情報、なりすまし、切り取り、ディープフェイクと結びつく可能性があります。共有前に出所、作成経緯、事実関係、誤解を招く表現の有無を確認します。",
      sourceRefs: [ref("guga-syllabus-2026", syllabusUrl, "情報リテラシーとリスク", "AI生成物の誤情報、真正性、出所確認は学習範囲に含まれる。")],
      choiceExplanations: [
        "AI生成物でも誤情報になり得ます。",
        "強い感情を誘う内容ほど、拡散前の確認が重要です。",
        "見た目が自然でも生成・加工された可能性があります。",
        "正解。拡散前に事実と出所を確認します。"
      ]
    }
  ];

  window.GENAI_PASSPORT_QUESTIONS = [...window.GENAI_PASSPORT_QUESTIONS, ...questions];
})();
