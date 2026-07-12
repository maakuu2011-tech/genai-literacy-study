const GENAI_EXTRA_QUESTIONS = [
  {
    id: "history-003",
    category: "AIの歴史",
    difficulty: "easy",
    confidence: "high",
    keyword: "ダートマス会議",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIという名称が研究分野として広まる契機とされる会議はどれか。",
    choices: ["ダートマス会議", "ヤルタ会談", "京都会議", "ブレトンウッズ会議"],
    answer: 0,
    explanation: "1956年のダートマス会議は、Artificial Intelligenceという名称が研究分野として広まる契機とされています。"
  },
  {
    id: "history-004",
    category: "AIの歴史",
    difficulty: "normal",
    confidence: "high",
    keyword: "エキスパートシステム",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "第二次AIブームで注目されたエキスパートシステムの説明として適切なものはどれか。",
    choices: ["専門家の知識をルールとして登録し推論に利用する", "大量画像から特徴を自動学習する生成モデル", "報酬だけで行動を改善するロボット", "次のトークンを確率的に生成するLLM"],
    answer: 0,
    explanation: "エキスパートシステムは、専門家の知識を知識ベースやルールとして登録し、特定領域の判断に利用します。"
  },
  {
    id: "history-005",
    category: "AIの歴史",
    difficulty: "normal",
    confidence: "high",
    keyword: "AIの冬",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIの冬が起きた主な背景として最も適切なものはどれか。",
    choices: ["期待に対して技術・計算資源・データなどが不足し成果が限定された", "AIの研究が法律で世界的に禁止された", "インターネット上のデータが多すぎた", "GPUの性能が必要以上に高くなった"],
    answer: 0,
    explanation: "過大な期待に対し、当時の計算能力やデータ、技術では現実の複雑な問題へ十分対応できず、投資や関心が低下しました。"
  },
  {
    id: "history-006",
    category: "AIの歴史",
    difficulty: "normal",
    confidence: "high",
    keyword: "AI効果",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AI効果の説明として最も適切なものはどれか。",
    choices: ["AI技術が普及するとAIではなく通常の技術として意識されにくくなる", "AIの計算結果が必ず人間より正確になる", "AIを導入すると電力消費がゼロになる", "AIの出力に著作権が自動付与される"],
    answer: 0,
    explanation: "AIで実現した技術が当たり前になると、知的な技術として認識されず『それはAIではない』と見なされる傾向をAI効果と呼びます。"
  },
  {
    id: "dl-004",
    category: "ディープラーニング",
    difficulty: "easy",
    confidence: "high",
    keyword: "重み",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "ニューラルネットワークにおける重みの役割として適切なものはどれか。",
    choices: ["各入力をどの程度重視するかを調整する", "学習データの著作権を判定する", "ネットワーク通信を暗号化する", "画像のファイル容量だけを決める"],
    answer: 0,
    explanation: "重みは入力信号の重要度を調整するパラメータです。学習では損失が小さくなる方向へ多数の重みを更新します。"
  },
  {
    id: "dl-005",
    category: "ディープラーニング",
    difficulty: "normal",
    confidence: "high",
    keyword: "損失関数",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "損失関数の役割として最も適切なものはどれか。",
    choices: ["モデルの出力と正解のずれを数値として測る", "学習データを自動的に公開する", "AIの利用規約を作成する", "入力文を必ず短くする"],
    answer: 0,
    explanation: "損失関数は予測と正解のずれを数値化します。学習は一般に、この損失を小さくするようパラメータを調整します。"
  },
  {
    id: "dl-006",
    category: "ディープラーニング",
    difficulty: "normal",
    confidence: "high",
    keyword: "誤差逆伝播法",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "誤差逆伝播法の説明として適切なものはどれか。",
    choices: ["出力側の誤差を手がかりに各重みの更新へ必要な情報を計算する", "誤った学習データをすべて自動削除する", "生成した文章を逆順に並べる", "ネットワーク障害時に通信経路を戻す"],
    answer: 0,
    explanation: "誤差逆伝播法は、出力の誤差を後ろから前の層へ伝え、各パラメータが誤差へ与えた影響を計算します。"
  },
  {
    id: "dl-007",
    category: "ディープラーニング",
    difficulty: "normal",
    confidence: "high",
    keyword: "ドロップアウト",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "ドロップアウトを利用する主な目的はどれか。",
    choices: ["学習中に一部ノードを無効化して過学習を抑える", "推論時に全データを削除する", "正解ラベルを自動生成する", "モデルの出力を必ず一種類に固定する"],
    answer: 0,
    explanation: "ドロップアウトは学習中に一部のノードをランダムに無効化し、特定の経路への過度な依存を減らして過学習を抑えます。"
  },
  {
    id: "prompt-004",
    category: "プロンプト",
    difficulty: "easy",
    confidence: "high",
    keyword: "プロンプトの構成",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "プロンプトで出力形式を明確にする指示の例として適切なものはどれか。",
    choices: ["結果を3列の表で出力し、各行に根拠を付ける", "いい感じに答える", "なるべく考える", "すべてを完全に理解する"],
    answer: 0,
    explanation: "列数、項目、文字数、JSONなど具体的な出力形式を指定すると、期待する形をモデルへ伝えやすくなります。"
  },
  {
    id: "prompt-005",
    category: "プロンプト",
    difficulty: "normal",
    confidence: "high",
    keyword: "Temperature",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "Temperatureを高くした場合の一般的な傾向として適切なものはどれか。",
    choices: ["出力の多様性やランダム性が高まりやすい", "事実誤認が必ずゼロになる", "入力可能な文字数が必ず倍になる", "個人情報が自動的に匿名化される"],
    answer: 0,
    explanation: "Temperatureを高くすると候補選択が多様になりやすい一方、出力のばらつきも増えます。正確性を保証する設定ではありません。"
  },
  {
    id: "prompt-006",
    category: "プロンプト",
    difficulty: "normal",
    confidence: "high",
    keyword: "反復改善",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "生成AIから期待と異なる回答が出たときの対応として最も適切なものはどれか。",
    choices: ["不足している条件や評価基準を特定し、指示を具体化して再実行する", "同じ曖昧な指示を無条件に繰り返す", "最初の出力を必ず正しいとみなす", "機密情報を追加すれば精度が上がると考える"],
    answer: 0,
    explanation: "生成結果を評価し、目的、前提、入力、出力形式など不足条件を補って反復することが基本です。"
  },
  {
    id: "prompt-007",
    category: "プロンプト",
    difficulty: "normal",
    confidence: "high",
    keyword: "Context",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "プロンプトにおけるContextの役割として適切なものはどれか。",
    choices: ["作業に必要な背景、前提、対象読者などを伝える", "モデルのパスワードを解除する", "出力を必ず著作物にする", "学習データをすべて表示する"],
    answer: 0,
    explanation: "Contextは、作業の背景や前提、利用場面、対象読者などを伝え、モデルが指示を解釈するための文脈を補います。"
  },
  {
    id: "rag-005",
    category: "RAG・検索拡張生成",
    difficulty: "normal",
    confidence: "high",
    keyword: "RAGの処理",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "RAGで質問へ回答する際の処理順として最も適切なものはどれか。",
    choices: ["関連文書を検索し、その内容と質問を使って回答を生成する", "回答を生成してから無関係な文書を削除する", "モデルを毎回ゼロから再学習する", "検索せずランダムな文書を引用する"],
    answer: 0,
    explanation: "RAGは質問に関連する文書を検索し、取得した内容を文脈としてLLMへ渡して回答を生成します。"
  },
  {
    id: "rag-006",
    category: "RAG・検索拡張生成",
    difficulty: "normal",
    confidence: "high",
    keyword: "RAGとファインチューニング",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "頻繁に更新される社内規程を回答へ反映したい場合、RAGが向く理由はどれか。",
    choices: ["外部文書を更新することで新しい情報を参照させやすい", "モデルの全パラメータを毎回手作業で変更できる", "検索結果がなくても必ず正答する", "アクセス制御が一切不要になる"],
    answer: 0,
    explanation: "RAGは参照する外部文書を追加・更新できるため、情報の更新をモデルの再学習なしで反映しやすい方法です。"
  },
  {
    id: "rag-007",
    category: "RAG・検索拡張生成",
    difficulty: "hard",
    confidence: "high",
    keyword: "検索品質",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "RAGの回答品質が低いとき、最初に確認すべき事項として適切なものはどれか。",
    choices: ["必要な文書が検索され、質問に関係するチャンクが取得されているか", "画面の背景色が適切か", "利用者のキーボード配列が同じか", "回答文のフォントサイズだけが十分か"],
    answer: 0,
    explanation: "RAGでは取得した文書が回答の材料になります。登録文書、チャンク分割、検索順位が不適切なら生成前に情報が不足します。"
  },
  {
    id: "rag-008",
    category: "RAG・検索拡張生成",
    difficulty: "hard",
    confidence: "high",
    keyword: "RAGのアクセス制御",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "社内RAGで情報漏洩を防ぐ対策として最も適切なものはどれか。",
    choices: ["利用者の権限に応じて検索対象文書を制限する", "全利用者が全機密文書を検索できるようにする", "検索ログを一切残さない", "文書を細かく分割すれば権限管理は不要とする"],
    answer: 0,
    explanation: "RAGでは回答生成前の検索段階から権限を適用し、利用者が閲覧できない文書を取得させない設計が必要です。"
  },
  {
    id: "agent-002",
    category: "AIエージェント",
    difficulty: "normal",
    confidence: "high",
    keyword: "エージェントループ",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIエージェントの一般的な動作として最も適切なものはどれか。",
    choices: ["目標から計画し、ツールを実行し、結果を観察して次の行動を決める", "常に一度の文章生成だけで終了する", "外部情報を一切利用しない", "人間の許可なくすべての操作を実行する"],
    answer: 0,
    explanation: "AIエージェントは計画、ツール実行、結果の観察を繰り返し、目標へ向けて複数の手順を進めます。"
  },
  {
    id: "agent-003",
    category: "AIエージェント",
    difficulty: "normal",
    confidence: "high",
    keyword: "人間の承認",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIエージェントの実行前に人間の承認を置くべき操作はどれか。",
    choices: ["顧客へのメール送信やデータ削除など外部へ影響する操作", "公開情報の閲覧だけ", "画面内で候補を比較するだけ", "計画案を下書きするだけ"],
    answer: 0,
    explanation: "送信、購入、削除、公開、権限変更など、外部へ影響し取り消しにくい操作では実行直前の人間承認が重要です。"
  },
  {
    id: "agent-004",
    category: "AIエージェント",
    difficulty: "normal",
    confidence: "high",
    keyword: "MCP",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIエージェントに関連するMCPの説明として最も適切なものはどれか。",
    choices: ["AIアプリケーションと外部ツールやデータを接続するための共通的な仕組み", "画像だけを圧縮するファイル形式", "個人情報を匿名化する法律", "ニューラルネットワークの損失関数"],
    answer: 0,
    explanation: "MCPはAIアプリケーションが外部のツールやデータソースと連携するための共通的な接続方式に関係します。"
  },
  {
    id: "agent-005",
    category: "AIエージェント",
    difficulty: "hard",
    confidence: "high",
    keyword: "最小権限",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIエージェントへ最小権限を適用する例として適切なものはどれか。",
    choices: ["必要なフォルダの閲覧だけを許可し、削除や外部送信は別途承認する", "管理者権限を常に与える", "全社データへの無制限アクセスを許可する", "操作ログを利用者からも管理者からも隠す"],
    answer: 0,
    explanation: "最小権限では、目的達成に必要な範囲だけを許可します。高リスク操作は権限を分け、人間承認を加えます。"
  },
  {
    id: "literacy-004",
    category: "情報リテラシー",
    difficulty: "easy",
    confidence: "high",
    keyword: "一次情報",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "生成AIが法律の施行日を回答した場合、確認先として最も適切なものはどれか。",
    choices: ["法令検索や所管省庁などの一次資料", "出典のない匿名投稿一件", "AIが再生成した同じ回答", "広告だけで構成されたまとめページ"],
    answer: 0,
    explanation: "法律の日付や内容は、法令検索や所管省庁など情報源に近い一次資料で確認します。"
  },
  {
    id: "literacy-005",
    category: "情報リテラシー",
    difficulty: "normal",
    confidence: "high",
    keyword: "出典の照合",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "AIが出典リンクを示した場合に必要な確認はどれか。",
    choices: ["リンク先が実在し、回答中の主張を実際に支えているか読む", "URLの文字数だけを確認する", "リンクが青色なら正しいと判断する", "出典名が有名なら本文を読まない"],
    answer: 0,
    explanation: "生成AIは実在しない出典や、主張を支えていないページを示す場合があります。存在と内容の両方を確認します。"
  },
  {
    id: "literacy-006",
    category: "情報リテラシー",
    difficulty: "normal",
    confidence: "high",
    keyword: "情報の更新日",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "生成AIサービスの機能を調べる際に更新日を確認する理由として適切なものはどれか。",
    choices: ["機能や規約が変更され、古い説明が現在と異なる可能性があるため", "古い情報は必ず違法になるため", "更新日が新しければ内容確認が不要になるため", "日付だけで提供企業を特定できるため"],
    answer: 0,
    explanation: "生成AIサービスの機能や利用規約は変化が速いため、参照した情報の公開日・更新日と現在の公式情報を確認します。"
  },
  {
    id: "literacy-007",
    category: "情報リテラシー",
    difficulty: "normal",
    confidence: "high",
    keyword: "拡散前の確認",
    source: "GUGA公式シラバス 2026年2月試験より適用",
    question: "感情を強く刺激するAI生成の可能性がある動画を見たときの対応として適切なものはどれか。",
    choices: ["すぐ拡散せず、公開元や別の記録、公式発表を確認する", "映像が鮮明なら本物として拡散する", "多数共有されていれば事実と判断する", "AI生成の可能性があっても出所確認は不要とする"],
    answer: 0,
    explanation: "偽情報は感情や緊急性を利用して拡散されます。公開元、日時、別角度の記録、本人や組織の公式発表を確認します。"
  }
];

const questionOffset = window.GENAI_PASSPORT_QUESTIONS.length;
const normalizedExtraQuestions = GENAI_EXTRA_QUESTIONS.map((question, index) => {
  const shift = (questionOffset + index) % question.choices.length;
  const choices = question.choices.map((_, choiceIndex) => question.choices[(choiceIndex + shift) % question.choices.length]);
  const answer = (question.answer - shift + question.choices.length) % question.choices.length;
  return { ...question, choices, answer };
});

window.GENAI_PASSPORT_QUESTIONS = [...window.GENAI_PASSPORT_QUESTIONS, ...normalizedExtraQuestions];
