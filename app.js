const questions = window.GENAI_PASSPORT_QUESTIONS;
const lessons = window.GENAI_PASSPORT_LESSONS;
const storageKey = "genai-passport-study-progress";
const settingsKey = "genai-passport-study-settings";
const examHistoryKey = "genai-passport-exam-history";
const activityKey = "genai-passport-study-activity";
const lessonProgressKey = "genai-passport-lesson-progress";
const readinessTarget = 80;
const defaultSettings = { dailyGoal: 10, examSize: 20 };
const studyAppName = "生成AIリテラシー学習室";
const maxActivityCount = 10000;
const difficultyLabels = { easy: "基礎", normal: "標準", hard: "応用" };
const confidenceLabels = { high: "確認済み", medium: "要再確認" };
let examTimerId = null;

const studyNotes = {
  "AI": "AIは、人間の知的な働きに近い処理をコンピュータで実現しようとする技術分野です。生成AI、画像認識、音声認識、予測、分類などはAIの応用例です。試験では、AI全体の概念と生成AIの違いを分けて理解しておくことが重要です。",
  "教師あり学習": "教師あり学習は、入力データと正解ラベルの組を使って学習する方法です。分類や回帰など、正解例から規則性を学ぶ場面で使われます。",
  "教師なし学習": "教師なし学習は、正解ラベルを与えずにデータの傾向や構造を見つける方法です。代表例はクラスタリングで、顧客を似た特徴ごとに分けるような分析に使われます。",
  "過学習": "過学習は、学習データに合わせすぎて未知のデータに弱くなる状態です。学習時の点数は高いのに実運用で性能が出ない場合に疑います。汎化性能という言葉とセットで押さえると理解しやすいです。",
  "ニューラルネットワーク": "ニューラルネットワークは、人工ニューロンを層状につないで入力から出力への変換を学習するモデルです。層を深くしたものがディープラーニングで使われ、画像、音声、自然言語処理などに広く使われます。",
  "生成AI": "生成AIは、学習したパターンをもとに文章、画像、音声、動画、コードなどの新しいコンテンツを作るAIです。従来の識別・分類だけでなく、生成できる点が大きな特徴です。",
  "ハルシネーション": "ハルシネーションは、生成AIが事実ではない情報をもっともらしく出力する現象です。文章が自然でも正しいとは限らないため、重要な情報は一次情報や信頼できる資料で確認します。",
  "RAG": "RAGは、外部の文書やデータを検索し、その内容を参照しながら回答を生成する仕組みです。モデル単体の記憶だけに頼らないため、社内文書検索や根拠付き回答の仕組みで使われます。",
  "プロンプト": "プロンプトは、生成AIに与える指示文です。目的、条件、対象読者、出力形式、制約を具体的に書くほど、期待に近い出力を得やすくなります。機密情報や個人情報を入れない判断も重要です。",
  "バイアス": "AIのバイアスは、学習データや設計、評価方法の偏りによって、不公平または不適切な出力が生じることです。AIは常に中立ではないため、利用場面に応じた確認が必要です。",
  "ディープフェイク": "ディープフェイクは、人物の映像や音声を人工的に作成・改変する技術です。なりすまし、詐欺、誤情報の拡散に悪用される可能性があるため、出所確認や本人確認が重要です。",
  "個人情報": "生成AIに個人情報を入力する場合は、法令、利用規約、社内ルール、本人同意、利用目的を確認します。便利だからといって、氏名、住所、顧客情報、社内機密を安易に入力してはいけません。",
  "著作権": "生成AIと著作権では、既存著作物との類似性、依拠性、利用目的などが問題になる場合があります。AIで作ったから常に自由に使えるわけではなく、公開・商用利用では特に確認が必要です。",
  "人間による確認": "生成AIの出力には誤り、不適切表現、古い情報、権利上の問題が含まれる可能性があります。業務で使う場合は、人間が内容、根拠、社内ルールとの整合性を確認することが前提です。",
  "機密情報": "機密情報は、公開前の事業計画、顧客情報、契約内容、認証情報、社外秘資料など外部に出してはいけない情報です。生成AIサービスへ入力する前に、利用規約と組織のルールを確認します。",
  "ルールベース": "ルールベースは、人間があらかじめ条件分岐や判断ルールを記述して処理する方式です。機械学習のようにデータから自動で規則性を学ぶのではなく、決められたルールに従って動作します。",
  "強化学習": "強化学習は、エージェントが行動し、その結果として得られる報酬を手がかりに、よりよい行動を学ぶ方法です。ゲーム、ロボット制御、最適化などの例で説明されることがあります。",
  "AIブーム": "AIの歴史は、探索・推論が注目された第一次AIブーム、エキスパートシステムが広がった第二次AIブーム、ビッグデータとディープラーニングが中心になった第三次AIブームとして整理されます。",
  "弱いAIと強いAI": "弱いAIは特定の目的に特化して動くAI、強いAIは人間のように幅広く理解し判断できる汎用的なAIを指します。現在広く使われているAIの多くは、特定用途の弱いAIとして理解します。",
  "シンギュラリティ": "シンギュラリティは、AIなどの技術が人間の知能を超え、社会に大きな変化をもたらすとされる仮説的な概念です。試験では、言葉の意味と関連人物、2045年問題を押さえます。",
  "CNN": "CNNは畳み込みニューラルネットワークのことで、画像の局所的な特徴を捉えるのに使われる代表的なモデルです。畳み込み処理によって、画像認識などで有効な特徴を抽出します。",
  "GAN": "GANは生成器と識別器を競わせながら学習する生成モデルです。生成器は本物らしいデータを作り、識別器は本物か偽物かを見分けようとします。",
  "Transformer": "Transformerは、Attentionという仕組みを使って入力内の重要な関係を捉えるモデルです。現在の大規模言語モデルの基盤として重要で、自己注意や位置エンコーディングと関連します。",
  "RLHF": "RLHFは、人間のフィードバックを使った強化学習です。AIの出力を人間の意図や好みに近づけるアライメントの手法として、対話型AIの調整で使われます。",
  "マルチモーダル": "マルチモーダルは、テキスト、画像、音声、動画など複数の種類の情報を扱えることです。生成AIでは、画像を見て説明したり、音声や動画を生成したりする能力と関係します。",
  "チャンク": "RAGでのチャンクは、文書を検索しやすい単位に分割したものです。長い文書を小さなまとまりに分け、ベクトルデータベースで検索して回答の文脈として使います。",
  "AIエージェント": "AIエージェントは、目標に向かって状況を判断し、ツールや外部サービスを使いながら複数の手順を進めるAIの仕組みです。単発の回答だけでなく、計画や実行を伴う点が特徴です。",
  "フィッシング": "フィッシングは、偽のメールやWebサイトなどで利用者をだまし、ID、パスワード、クレジットカード情報などを盗む攻撃です。SMSを使うスミッシング、音声通話を使うヴィッシングも関連します。",
  "マルウェア": "マルウェアは、利用者や組織に害を与える悪意あるソフトウェアの総称です。ランサムウェア、スパイウェアなどが含まれ、生成AIの悪用で攻撃文面やコード作成が容易になるリスクもあります。",
  "要配慮個人情報": "要配慮個人情報は、人種、信条、社会的身分、病歴、犯罪歴など、不当な差別や不利益につながるおそれがある情報です。通常の個人情報より慎重な取り扱いが求められます。",
  "匿名加工情報": "匿名加工情報は、特定の個人を識別できないように個人情報を加工し、元の個人情報を復元できないようにした情報です。単なる名前の削除だけでは十分とは限りません。",
  "Zero-shot": "Zero-shotは、具体例を示さずにタスクを指示してAIに回答させる方法です。モデルが持つ一般的な能力に頼るため、簡単な分類や要約では有効ですが、複雑な出力では条件を明確にする必要があります。",
  "Few-shot": "Few-shotは、いくつかの入力例と望ましい出力例をプロンプトに含めて、同じ形式で回答させる方法です。出力形式や判断基準をそろえたいときに役立ちます。",
  "プロンプトインジェクション": "プロンプトインジェクションは、利用者の入力や外部文書に紛れた悪意ある指示によって、AIに本来の指示を無視させる攻撃です。RAGやAIエージェントでは特に注意が必要です。",
  "ジェイルブレイク": "ジェイルブレイクは、AIの安全制約を回避して、本来出してはいけない情報や行動を引き出そうとする行為です。攻撃例を知るだけでなく、業務利用時に不審な指示を扱わせない設計が重要です。",
  "ベクトルデータベース": "ベクトルデータベースは、文章や画像などを数値ベクトルに変換して保存し、意味的に近い情報を検索するために使われます。RAGでは関連文書の検索に利用されます。",
  "エンベディング": "エンベディングは、テキストや画像などの情報を数値ベクトルとして表現することです。意味が近いデータほどベクトル空間上で近くなるため、検索や分類に使われます。",
  "温度パラメータ": "温度パラメータは、生成AIの出力のランダム性を調整する値です。低いと安定した出力になりやすく、高いと多様で創造的な出力になりやすい一方、ばらつきも大きくなります。",
  "ファクトチェック": "ファクトチェックは、AIの出力が事実に基づいているか確認する作業です。生成AIはもっともらしい誤情報を出すことがあるため、重要な内容は一次情報や信頼できる資料で照合します。",
  "AIガバナンス": "AIガバナンスは、AIを安全かつ適切に利用するための方針、ルール、責任体制、監査、教育などの仕組みです。企業利用では個人任せにせず、組織として管理する視点が重要です。",
  "オプトアウト": "オプトアウトは、利用者が自分のデータ利用や特定の処理を拒否できる仕組みです。生成AIサービスでは、入力データが学習に使われるかどうかを利用規約や設定で確認することが大切です。",
  "API": "APIは、ソフトウェア同士が機能やデータをやり取りするための接点です。生成AIでは、アプリケーションからAIモデルを呼び出して文章生成や分類などを行うために使われます。",
  "OCR": "OCRは、画像内の文字を認識してテキスト化する技術です。紙の書類や画像PDFをデジタル処理しやすくする技術で、AI活用の前処理としても使われます。",
  "真正性": "真正性は、情報やコンテンツが本物であり、改ざんやなりすましではないことを確認できる性質です。生成AI時代には、画像、音声、動画の出所や作成経緯を確認する重要性が増しています。",
  "説明可能性": "説明可能性は、AIがなぜその判断や出力に至ったのかを人間が理解しやすい形で説明できる性質です。重要な意思決定にAIを使う場面では、結果だけでなく理由を確認できることが求められます。",
  "アカウンタビリティ": "アカウンタビリティは、AIの利用や判断結果について、組織や利用者が説明責任を果たす考え方です。AIが出したから責任がない、とはならない点が重要です。",
  "データ前処理": "データ前処理は、AIに学習や分析をさせる前に、欠損値、重複、表記ゆれ、外れ値などを整理する作業です。入力データの品質はAIの出力品質に大きく影響します。",
  "混同行列": "混同行列は、分類モデルの予測結果を、正解と不正解の組み合わせで整理する表です。真陽性、偽陽性、真陰性、偽陰性を把握し、精度だけでは見えない偏りを確認します。",
  "適合率と再現率": "適合率は、陽性と予測したもののうち実際に正しかった割合です。再現率は、実際の陽性をどれだけ見つけられたかの割合です。目的に応じて重視する指標が変わります。",
  "トークン": "トークンは、生成AIがテキストを処理するときの単位です。日本語では文字や単語そのものと完全には一致しません。入力や出力の長さ、料金、文脈量の理解に関係します。",
  "コンテキストウィンドウ": "コンテキストウィンドウは、モデルが一度に参照できる入力と出力の範囲です。長い文書や会話を扱う場合、範囲を超える情報は参照できないことがあります。",
  "ファインチューニング": "ファインチューニングは、既存モデルを特定のデータで追加学習し、用途に合わせて調整する方法です。RAGとは異なり、外部文書を検索して参照する仕組みではありません。",
  "シャドーAI": "シャドーAIは、組織が把握していない形で従業員がAIサービスを利用する状態です。便利でも、機密情報流出や規程違反のリスクがあるため、組織的なルール整備が必要です。",
  "利用規約": "生成AIサービスの利用規約では、入力データの扱い、商用利用、禁止事項、著作権、責任範囲などが定められています。業務利用前に確認することが重要です。",
  "プライバシーポリシー": "プライバシーポリシーは、サービスが個人情報をどのように取得、利用、保存、第三者提供するかを説明する文書です。個人情報を扱う前に確認します。",
  "肖像権": "肖像権は、自分の顔や姿を無断で撮影・公表・利用されない利益に関係します。画像生成や画像加工で実在人物を扱う場合に注意が必要です。",
  "商標権": "商標権は、商品やサービスを識別するための名称、ロゴ、マークなどを保護する権利です。生成AIでロゴやブランド名を扱う場合、誤認や権利侵害に注意します。",
  "パブリシティ権": "パブリシティ権は、有名人などの氏名や肖像が持つ顧客吸引力を無断で商業利用されない利益に関係します。広告や販売促進でAI生成物を使う場合に注意します。",
  "学習データ": "学習データは、AIモデルがパターンを学ぶために使うデータです。量だけでなく、品質、偏り、権利処理、個人情報の有無が重要です。",
  "画像生成AI": "画像生成AIは、テキストや画像などの入力をもとに新しい画像を生成するAIです。著作権、肖像権、商標、誤情報、ディープフェイクのリスクとあわせて理解します。",
  "音声生成AI": "音声生成AIは、テキストや音声データをもとに合成音声を生成するAIです。本人の声に似せたなりすまし、詐欺、同意のない利用に注意が必要です。",
  "大規模言語モデル": "大規模言語モデルは、大量のテキストデータを用いて学習し、文章の生成、要約、翻訳、分類、対話などを行うモデルです。LLMとも呼ばれ、Transformerを基盤にするものが多いです。",
  "自然言語処理": "自然言語処理は、人間の言葉をコンピュータで扱う技術分野です。形態素解析、翻訳、要約、感情分析、質問応答などが含まれます。",
  "拡散モデル": "拡散モデルは、ノイズから徐々にデータを復元するように学習する生成モデルです。画像生成AIで代表的に使われる方式の一つです。",
  "VAE": "VAEは変分オートエンコーダのことで、データを潜在空間に圧縮し、そこから新しいデータを生成する生成モデルです。",
  "潜在空間": "潜在空間は、データの特徴を圧縮して表した空間です。画像や文章の意味的な特徴を扱う生成モデルの理解に関係します。",
  "データリーク": "データリークは、機密情報や個人情報などが意図せず外部へ漏れることです。生成AIへの入力、ログ保存、共有設定、外部連携で起きる可能性があります。",
  "アクセス制御": "アクセス制御は、誰がどの情報や機能にアクセスできるかを管理する仕組みです。AIエージェントやRAGで社内データを扱う場合、権限を超えた情報参照を防ぐことが重要です。",
  "多要素認証": "多要素認証は、パスワードに加えて端末、認証アプリ、生体情報など複数の要素で本人確認する仕組みです。アカウント乗っ取り対策として有効です。",
  "人間中心のAI": "人間中心のAIは、AIを人間の価値、権利、安全、幸福に沿うよう設計・運用する考え方です。AIの効率だけでなく、人間への影響を重視します。",
  "公平性": "公平性は、AIの判断や出力が特定の属性や集団に不当な不利益を与えないようにする考え方です。バイアス対策と密接に関係します。",
  "透明性": "透明性は、AIの利用目的、仕組み、データの扱い、判断の根拠などを関係者が理解できるようにする考え方です。",
  "第三者提供": "第三者提供は、個人情報を本人や取扱事業者以外の第三者に提供することです。法令上の要件や本人同意が関係するため慎重な確認が必要です。",
  "仮名加工情報": "仮名加工情報は、他の情報と照合しない限り特定の個人を識別できないように加工した情報です。匿名加工情報とは復元可能性や取り扱いが異なります。",
  "委託": "委託は、業務の一部を外部事業者に任せることです。個人情報を扱う業務を委託する場合、委託先の監督が必要になります。",
  "目的外利用": "目的外利用は、取得時に示した利用目的の範囲を超えて個人情報を使うことです。生成AI活用でも、収集目的と異なる使い方には注意が必要です。",
  "入力データ": "入力データは、生成AIに与えるプロンプト、文書、画像、音声、表データなどです。機密情報、個人情報、権利のある情報を含める場合は確認が必要です。",
  "出力データ": "出力データは、生成AIが返す文章、画像、音声、コードなどです。誤情報、権利侵害、不適切表現、機密情報の混入がないか確認してから利用します。",
  "ログ": "ログは、システムやサービスの利用履歴・入力・出力・操作記録などです。生成AIサービスでは、入力内容や出力内容がログとして保存される可能性があるため確認が必要です。",
  "監査": "監査は、AI利用がルールや法令、社内方針に沿っているかを確認する活動です。AIガバナンスでは、利用状況の記録、点検、改善が重要になります。",
  "データマイニング": "データマイニングは、大量のデータから有用な規則性や知見を見つける分析手法です。購買傾向分析や異常検知などに使われます。",
  "クラスタリング": "クラスタリングは、正解ラベルを使わずに似たデータ同士をグループに分ける手法です。教師なし学習の代表例です。",
  "回帰": "回帰は、売上や価格、気温など連続的な数値を予測する機械学習タスクです。分類との違いを押さえることが重要です。",
  "分類": "分類は、入力データをあらかじめ決められたカテゴリに分けるタスクです。迷惑メール判定や画像の犬猫分類などが例です。",
  "推論": "推論は、学習済みモデルに新しい入力を与えて予測や生成を行う処理です。学習とは異なり、すでに得たモデルを使う段階です。",
  "GPU": "GPUは、多数の計算を並列に処理する装置です。ディープラーニングの学習や推論で大量の計算を高速化するために使われます。",
  "アノテーション": "アノテーションは、学習データにラベルや説明を付ける作業です。教師あり学習のデータ作成で重要です。",
  "データセット": "データセットは、AIの学習、検証、評価に使うデータのまとまりです。学習用、検証用、テスト用に分けて性能を確認します。",
  "テストデータ": "テストデータは、学習に使っていないデータでモデルの性能を評価するために使います。未知のデータへの強さを確認するために重要です。",
  "クロスバリデーション": "クロスバリデーションは、データを複数に分けて学習と評価を繰り返す検証方法です。データが少ない場合にも性能を安定して見積もる助けになります。",
  "モデルカード": "モデルカードは、AIモデルの用途、性能、制約、学習データ、注意点などを説明する文書です。透明性や適切な利用に役立ちます。",
  "データカード": "データカードは、データセットの内容、収集方法、用途、制約、偏りなどを説明する文書です。データの信頼性や適切な利用の判断に役立ちます。",
  "リスクアセスメント": "リスクアセスメントは、AI利用に伴うリスクを洗い出し、影響度や発生可能性を評価して対策を考える活動です。",
  "インシデント対応": "インシデント対応は、情報漏えい、不適切出力、誤情報拡散などの問題が起きたときに、影響を抑えて復旧・再発防止を行う活動です。",
  "サプライチェーンリスク": "サプライチェーンリスクは、外部サービス、委託先、API、データ提供元などを通じて生じるリスクです。AI利用では外部依存先の管理も重要です。",
  "利用ログ管理": "利用ログ管理は、誰がいつどのAI機能を使ったかを記録・確認することです。監査、インシデント対応、ルール改善に役立ちます。",
  "生成物の表示": "生成物の表示は、AIで作成したコンテンツであることを明示する対応です。誤認防止や透明性の観点で重要になる場合があります。",
  "同意": "同意は、個人情報や肖像、音声などを特定の目的で利用することに本人が承諾することです。AI利用では何に使うかを明確にする必要があります。",
  "データ最小化": "データ最小化は、目的達成に必要な範囲だけのデータを扱う考え方です。生成AIに不要な個人情報や機密情報を入力しない判断につながります。",
  "セキュリティポリシー": "セキュリティポリシーは、組織が情報資産を守るための基本方針やルールです。生成AIの利用可否、入力禁止情報、承認手続きなども含めて整備します。"
};

const categoryNotes = {
  "すべて": "まずは未回答モードで全体を一周し、間違えた問題を復習モードで潰す流れが効率的です。",
  "AIの基礎": "AI、ルールベース、弱いAI・強いAIなど、用語の定義を取り違えないことが大切です。",
  "機械学習": "教師あり、教師なし、強化学習、過学習の違いを説明できる状態を目指します。",
  "ディープラーニング": "ニューラルネットワーク、CNNなど、モデルの用途と特徴をざっくり結びつけます。",
  "生成AI": "生成できる対象、ハルシネーション、RLHF、マルチモーダルなどを実務上の注意点と一緒に押さえます。",
  "生成モデル": "GANやTransformerなど、代表的なモデル名と仕組みのキーワードを整理します。",
  "RAG・検索拡張生成": "検索、チャンク、外部データ参照、根拠付き回答の関係を押さえます。",
  "AIエージェント": "単発の回答ではなく、目標に向けて計画、判断、ツール利用を行う仕組みとして理解します。",
  "プロンプト": "目的、条件、出力形式、制約を具体化するほど出力品質が安定します。",
  "リスク・倫理": "ハルシネーション、バイアス、ディープフェイクなど、社会的な影響と対策をセットで覚えます。",
  "法律・個人情報": "個人情報、著作権、要配慮個人情報、匿名加工情報は制度変更もあるため、慎重に扱います。",
  "ビジネス活用": "AIの出力をそのまま信じず、人間による確認と社内ルールの遵守を前提にします。",
  "セキュリティ": "機密情報、フィッシング、マルウェアなど、入力してはいけない情報と攻撃手口を整理します。",
  "AIの歴史": "第一次、第二次、第三次AIブームとシンギュラリティの意味を押さえます。",
  "情報リテラシー": "ファクトチェック、真正性、出所確認など、生成AIの出力を鵜呑みにしない判断力を鍛えます。"
};

let state = {
  currentIndex: 0,
  category: "すべて",
  mode: "all",
  order: questions.map((_, index) => index),
  progress: loadProgress(),
  settings: loadJson(settingsKey, defaultSettings),
  examHistory: loadJson(examHistoryKey, []),
  activity: loadJson(activityKey, {}),
  lessonProgress: loadJson(lessonProgressKey, {}),
  showQuestion: false,
  examOrder: [],
  examAnswers: {},
  examSubmitted: false,
  examDeadline: null,
  examStartedAt: null,
  difficulty: "all",
  searchTerm: ""
};

const elements = {
  accuracyText: document.getElementById("accuracyText"),
  answeredCount: document.getElementById("answeredCount"),
  correctCount: document.getElementById("correctCount"),
  reviewCount: document.getElementById("reviewCount"),
  insightBox: document.getElementById("insightBox"),
  dailyProgressText: document.getElementById("dailyProgressText"),
  dailyProgress: document.getElementById("dailyProgress"),
  dailyGoalInput: document.getElementById("dailyGoalInput"),
  startDailyButton: document.getElementById("startDailyButton"),
  coverageText: document.getElementById("coverageText"),
  readinessAccuracyText: document.getElementById("readinessAccuracyText"),
  streakText: document.getElementById("streakText"),
  lessonProgressText: document.getElementById("lessonProgressText"),
  readinessBadge: document.getElementById("readinessBadge"),
  nextActionText: document.getElementById("nextActionText"),
  continueLessonButton: document.getElementById("continueLessonButton"),
  categoryList: document.getElementById("categoryList"),
  categoryNote: document.getElementById("categoryNote"),
  categoryStats: document.getElementById("categoryStats"),
  glossaryList: document.getElementById("glossaryList"),
  questionNumber: document.getElementById("questionNumber"),
  questionCategory: document.getElementById("questionCategory"),
  questionDifficulty: document.getElementById("questionDifficulty"),
  questionConfidence: document.getElementById("questionConfidence"),
  examPanel: document.getElementById("examPanel"),
  examStatus: document.getElementById("examStatus"),
  examTimer: document.getElementById("examTimer"),
  examSizeSelect: document.getElementById("examSizeSelect"),
  submitExamButton: document.getElementById("submitExamButton"),
  restartExamButton: document.getElementById("restartExamButton"),
  examHistory: document.getElementById("examHistory"),
  lessonPanel: document.getElementById("lessonPanel"),
  questionCard: document.getElementById("questionCard"),
  questionFilters: document.getElementById("questionFilters"),
  lessonNumber: document.getElementById("lessonNumber"),
  lessonChapter: document.getElementById("lessonChapter"),
  lessonCategory: document.getElementById("lessonCategory"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonLead: document.getElementById("lessonLead"),
  lessonSections: document.getElementById("lessonSections"),
  lessonKeyPoints: document.getElementById("lessonKeyPoints"),
  lessonTraps: document.getElementById("lessonTraps"),
  lessonSources: document.getElementById("lessonSources"),
  prevLessonButton: document.getElementById("prevLessonButton"),
  nextLessonButton: document.getElementById("nextLessonButton"),
  markLessonCompleteButton: document.getElementById("markLessonCompleteButton"),
  startLessonQuestionsButton: document.getElementById("startLessonQuestionsButton"),
  studyGuideButton: document.getElementById("studyGuideButton"),
  studyGuideDialog: document.getElementById("studyGuideDialog"),
  closeStudyGuideButton: document.getElementById("closeStudyGuideButton"),
  bookmarkButton: document.getElementById("bookmarkButton"),
  studyNote: document.getElementById("studyNote"),
  studyTitle: document.getElementById("studyTitle"),
  studyText: document.getElementById("studyText"),
  openLessonButton: document.getElementById("openLessonButton"),
  revealQuestionButton: document.getElementById("revealQuestionButton"),
  questionBody: document.getElementById("questionBody"),
  questionText: document.getElementById("questionText"),
  choices: document.getElementById("choices"),
  result: document.getElementById("result"),
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  retryButton: document.getElementById("retryButton"),
  shuffleButton: document.getElementById("shuffleButton"),
  difficultyFilter: document.getElementById("difficultyFilter"),
  searchInput: document.getElementById("searchInput"),
  exportButton: document.getElementById("exportButton"),
  importInput: document.getElementById("importInput"),
  resetProgressButton: document.getElementById("resetProgressButton")
};

function loadJson(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved ?? fallback;
  } catch {
    return fallback;
  }
}

function loadProgress() {
  return loadJson(storageKey, {});
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state.progress));
}

function saveStudyData() {
  saveProgress();
  localStorage.setItem(settingsKey, JSON.stringify(state.settings));
  localStorage.setItem(examHistoryKey, JSON.stringify(state.examHistory));
  localStorage.setItem(activityKey, JSON.stringify(state.activity));
  localStorage.setItem(lessonProgressKey, JSON.stringify(state.lessonProgress));
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDaysIso(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(6, 0, 0, 0);
  return date.toISOString();
}

function isReviewDue(record, now = Date.now()) {
  if (!record || (!record.needsReview && record.lastCorrect !== false)) return false;
  if (!record.reviewAt) return true;
  const reviewTime = new Date(record.reviewAt).getTime();
  return Number.isNaN(reviewTime) || reviewTime <= now;
}

function formatReviewDate(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "復習予定を設定しました";
  return `${date.getMonth() + 1}月${date.getDate()}日に復習予定`;
}

function recordActivity(count = 1) {
  const key = getLocalDateKey();
  const current = Math.max(0, Number(state.activity[key]) || 0);
  const increment = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;
  state.activity[key] = Math.min(maxActivityCount, current + increment);
  localStorage.setItem(activityKey, JSON.stringify(state.activity));
}

function getStudyStreak() {
  let streak = 0;
  const cursor = new Date();
  const studiedOn = (dateKey) => {
    if (state.activity[dateKey]) return true;
    return Object.values(state.lessonProgress).some((record) => {
      return record?.completedAt && getLocalDateKey(new Date(record.completedAt)) === dateKey;
    });
  };
  if (!studiedOn(getLocalDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  while (studiedOn(getLocalDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function shuffleIndexes(indexes) {
  return [...indexes].sort(() => Math.random() - 0.5);
}

function startExam() {
  clearInterval(examTimerId);
  const requestedSize = Number(state.settings.examSize) === 60 ? 60 : 20;
  const size = Math.min(requestedSize, questions.length);
  state.examOrder = shuffleIndexes(questions.map((_, index) => index)).slice(0, size);
  state.examAnswers = {};
  state.examSubmitted = false;
  state.examStartedAt = Date.now();
  state.examDeadline = Date.now() + size * 60 * 1000;
  state.currentIndex = 0;
  state.showQuestion = true;
  examTimerId = setInterval(updateExamTimer, 1000);
  render();
}

function updateExamTimer() {
  if (state.mode !== "exam" || !state.examDeadline || state.examSubmitted) return;
  const remaining = Math.max(0, Math.ceil((state.examDeadline - Date.now()) / 1000));
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  elements.examTimer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  elements.examTimer.classList.toggle("warning", remaining <= 300);
  if (remaining === 0) submitExam(true);
}

function scrollToElement(element, behavior = "smooth") {
  if (!element) return;
  requestAnimationFrame(() => element.scrollIntoView({ behavior, block: "start" }));
}

function scrollToQuestion(behavior = "smooth") {
  scrollToElement(document.querySelector(".question-card"), behavior);
}

function scrollToLesson(behavior = "smooth") {
  scrollToElement(elements.lessonPanel, behavior);
}

function getFilteredOrder() {
  if (state.mode === "exam") {
    return state.examOrder;
  }

  const searchTerm = state.searchTerm.trim().toLowerCase();

  return state.order.filter((index) => {
    const question = questions[index];
    const progress = state.progress[question.id];
    const hasSelected = progress?.selected !== undefined;
    const inCategory = state.category === "すべて" || question.category === state.category;
    const inDifficulty = state.difficulty === "all" || question.difficulty === state.difficulty;
    const inMode =
      state.mode === "all" ||
      (state.mode === "new" && !hasSelected) ||
      (state.mode === "review" && isReviewDue(progress)) ||
      (state.mode === "bookmarked" && progress && progress.bookmarked) ||
      (state.mode === "weak" && progress && (progress.bookmarked || progress.needsReview || progress.lastCorrect === false));
    const searchableText = [
      question.category,
      question.keyword,
      question.question,
      question.explanation,
      ...question.choices
    ].join(" ").toLowerCase();
    const inSearch = !searchTerm || searchableText.includes(searchTerm);
    return inCategory && inDifficulty && inMode && inSearch;
  });
}

function getCurrentQuestion(filteredOrder) {
  if (filteredOrder.length === 0) return null;
  state.currentIndex = Math.min(state.currentIndex, filteredOrder.length - 1);
  return questions[filteredOrder[state.currentIndex]];
}

function getExamStats() {
  const answered = Object.keys(state.examAnswers).length;
  const correct = Object.entries(state.examAnswers).filter(([questionId, selected]) => {
    const question = questions.find((item) => item.id === questionId);
    return question && question.answer === selected;
  }).length;
  return { answered, correct, total: state.examOrder.length || Number(state.settings.examSize) };
}

function submitExam(isTimeUp = false) {
  if (state.examSubmitted || state.examOrder.length === 0) return;
  const stats = getExamStats();
  const unanswered = stats.total - stats.answered;
  if (!isTimeUp && unanswered > 0 && !confirm(`未回答が${unanswered}問あります。このまま採点しますか？`)) return;

  clearInterval(examTimerId);
  state.examSubmitted = true;
  const finishedAt = new Date();
  const durationSeconds = Math.max(0, Math.round((Date.now() - state.examStartedAt) / 1000));
  const wrongIds = [];

  state.examOrder.forEach((index) => {
    const question = questions[index];
    const selected = state.examAnswers[question.id];
    if (selected === undefined || selected !== question.answer) wrongIds.push(question.id);
    if (selected === undefined) {
      state.progress[question.id] = {
        ...(state.progress[question.id] || {}),
        lastCorrect: false,
        needsReview: true,
        reviewAt: finishedAt.toISOString(),
        answeredAt: finishedAt.toISOString(),
        answeredIn: "exam-unanswered"
      };
      return;
    }
    state.progress[question.id] = {
      ...(state.progress[question.id] || {}),
      selected,
      lastCorrect: selected === question.answer,
      needsReview: selected !== question.answer,
      reviewAt: selected === question.answer ? null : finishedAt.toISOString(),
      answeredAt: finishedAt.toISOString(),
      answeredIn: "exam"
    };
  });

  state.examHistory.unshift({
    id: finishedAt.toISOString(),
    date: finishedAt.toISOString(),
    score: stats.correct,
    total: stats.total,
    percent: Math.round((stats.correct / stats.total) * 100),
    durationSeconds,
    unanswered,
    wrongIds
  });
  state.examHistory = state.examHistory.slice(0, 20);
  if (stats.answered) recordActivity(stats.answered);
  saveStudyData();
  render();
}

function renderDashboard() {
  const records = Object.values(state.progress).filter((record) => record?.selected !== undefined);
  const answered = records.length;
  const correct = records.filter((record) => record.lastCorrect).length;
  const coverage = Math.round((answered / questions.length) * 100);
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
  const dailyGoal = Math.min(50, Math.max(5, Number(state.settings.dailyGoal) || 10));
  const todayCount = Number(state.activity[getLocalDateKey()]) || 0;
  const latestFullExam = state.examHistory.find((result) => result.total === 60);
  const completedLessons = lessons.filter((lesson) => state.lessonProgress[lesson.category]?.completedAt).length;
  const nextUnreadLesson = lessons.find((lesson) => !state.lessonProgress[lesson.category]?.completedAt) || lessons[0];
  const dueReviews = Object.values(state.progress).filter((record) => isReviewDue(record)).length;
  const ready = completedLessons === lessons.length && coverage >= 90 && accuracy >= readinessTarget && latestFullExam?.percent >= readinessTarget;

  elements.dailyGoalInput.value = dailyGoal;
  elements.dailyProgress.max = dailyGoal;
  elements.dailyProgress.value = Math.min(todayCount, dailyGoal);
  elements.dailyProgressText.textContent = `${todayCount} / ${dailyGoal}問`;
  elements.coverageText.textContent = `${coverage}%`;
  elements.readinessAccuracyText.textContent = `${accuracy}%`;
  elements.streakText.textContent = `${getStudyStreak()}日`;
  elements.lessonProgressText.textContent = `${completedLessons}/${lessons.length}`;
  elements.continueLessonButton.dataset.category = nextUnreadLesson.category;
  elements.continueLessonButton.textContent = completedLessons === lessons.length ? "教材を復習" : `次: ${nextUnreadLesson.category}`;
  elements.readinessBadge.textContent = ready ? "受験準備 OK" : "準備中";
  elements.readinessBadge.classList.toggle("ready", ready);

  if (dueReviews > 0) {
    elements.nextActionText.textContent = `次の一手: 今日が復習予定の問題が${dueReviews}問あります。先に記憶を定着させます。`;
  } else if (completedLessons < lessons.length) {
    elements.nextActionText.textContent = `次の一手: 「${nextUnreadLesson.category}」の教材を読み、読了後に章問題へ進みます。`;
  } else if (todayCount < dailyGoal) {
    elements.nextActionText.textContent = `次の一手: 今日の目標まであと${dailyGoal - todayCount}問です。未回答を優先します。`;
  } else if (coverage < 90) {
    elements.nextActionText.textContent = `次の一手: 今日の目標達成。未回答${questions.length - answered}問を進めて学習範囲を90%以上にします。`;
  } else if (accuracy < readinessTarget) {
    elements.nextActionText.textContent = `次の一手: 復習モードで正答率を${readinessTarget}%以上に引き上げます。`;
  } else if (!latestFullExam || latestFullExam.percent < readinessTarget) {
    elements.nextActionText.textContent = `次の一手: 60問・本番形式の模試で${readinessTarget}%以上を確認します。`;
  } else {
    elements.nextActionText.textContent = "学習範囲・正答率・本番形式模試が目標に到達しています。弱点を維持復習します。";
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor((Number(seconds) || 0) / 60);
  const rest = (Number(seconds) || 0) % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function renderExamHistory() {
  elements.examHistory.replaceChildren();
  if (!state.examHistory.length) {
    const empty = document.createElement("p");
    empty.className = "empty-history";
    empty.textContent = "まだ模試結果はありません。20問で操作に慣れた後、60問形式へ進みます。";
    elements.examHistory.appendChild(empty);
    return;
  }

  state.examHistory.slice(0, 5).forEach((result) => {
    const date = new Date(result.date);
    const dateText = Number.isNaN(date.getTime()) ? "日時不明" : date.toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const row = document.createElement("div");
    row.className = "exam-history-row";
    const values = [dateText, `${result.total}問`, `${result.score}/${result.total}・${result.percent}%`, formatDuration(result.durationSeconds)];
    values.forEach((value, index) => {
      const cell = document.createElement(index === 2 ? "strong" : "span");
      cell.textContent = value;
      row.appendChild(cell);
    });
    elements.examHistory.appendChild(row);
  });
}

function renderCategories() {
  const questionCategories = [...new Set(questions.map((question) => question.category))];
  const categories = state.mode === "lesson" ? lessons.map((lesson) => lesson.category) : ["すべて", ...questionCategories];
  elements.categoryList.innerHTML = "";

  categories.forEach((category) => {
    const count = category === "すべて"
      ? questions.length
      : questions.filter((question) => question.category === category).length;
    const button = document.createElement("button");
    button.type = "button";
    const lessonCompleted = state.mode === "lesson" && Boolean(state.lessonProgress[category]?.completedAt);
    button.className = [category === state.category ? "active" : "", lessonCompleted ? "completed" : ""].filter(Boolean).join(" ");
    button.innerHTML = `<span>${category}</span><span>${lessonCompleted ? "✓" : count}</span>`;
    button.disabled = state.mode === "exam";
    button.addEventListener("click", () => {
      state.category = category;
      state.currentIndex = 0;
      state.showQuestion = false;
      render();
      if (state.mode === "lesson") scrollToLesson();
      else scrollToQuestion();
    });
    elements.categoryList.appendChild(button);
  });

  elements.categoryNote.textContent = categoryNotes[state.category] || "このカテゴリは、用語の意味と実務上の注意点をセットで確認します。";
}

function renderStats() {
  const records = Object.values(state.progress).filter((record) => record.selected !== undefined);
  const answered = records.length;
  const correct = records.filter((record) => record.lastCorrect).length;
  const review = Object.values(state.progress).filter((record) => isReviewDue(record)).length;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  elements.accuracyText.textContent = `${accuracy}%`;
  elements.answeredCount.textContent = answered;
  elements.correctCount.textContent = correct;
  elements.reviewCount.textContent = review;
  renderInsight(answered, review);
  renderCategoryStats();
}

function renderCategoryStats() {
  const categories = [...new Set(questions.map((question) => question.category))];
  const rows = categories.map((category) => {
    const categoryQuestions = questions.filter((question) => question.category === category);
    const answered = categoryQuestions.filter((question) => state.progress[question.id]?.selected !== undefined).length;
    const correct = categoryQuestions.filter((question) => state.progress[question.id]?.lastCorrect).length;
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
    return { category, answered, total: categoryQuestions.length, accuracy };
  });

  elements.categoryStats.innerHTML = rows
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered)
    .slice(0, 8)
    .map((row) => `
      <div class="category-stat">
        <header>
          <span>${row.category}</span>
          <span>${row.answered}/${row.total}・${row.accuracy}%</span>
        </header>
        <div class="bar"><span style="width: ${row.accuracy}%"></span></div>
      </div>
    `)
    .join("");
}

function renderGlossary() {
  const searchTerm = state.searchTerm.trim().toLowerCase();
  const keywordToCategory = questions.reduce((map, question) => {
    if (!map[question.keyword]) map[question.keyword] = question.category;
    return map;
  }, {});

  const items = Object.entries(studyNotes)
    .map(([keyword, note]) => ({ keyword, note, category: keywordToCategory[keyword] || "関連用語" }))
    .filter((item) => state.category === "すべて" || item.category === state.category)
    .filter((item) => {
      if (!searchTerm) return true;
      return `${item.keyword} ${item.note} ${item.category}`.toLowerCase().includes(searchTerm);
    })
    .slice(0, 12);

  elements.glossaryList.innerHTML = items.length
    ? items.map((item) => `
        <article class="glossary-item">
          <strong>${item.keyword}</strong>
          <p>${item.note}</p>
        </article>
      `).join("")
    : `<article class="glossary-item"><strong>該当なし</strong><p>検索語を変えるか、カテゴリを「すべて」に戻してください。</p></article>`;
}

function renderInsight(answered, review) {
  const bookmarked = Object.values(state.progress).filter((record) => record.bookmarked).length;

  if (answered === 0) {
    elements.insightBox.textContent = bookmarked
      ? `保存済みが${bookmarked}問あります。まず保存モードで不安な問題を確認しましょう。`
      : "まずは未回答モードで10問ほど進めましょう。間違いが出てから復習モードが効いてきます。";
    return;
  }

  const weakCategories = questions.reduce((summary, question) => {
    const progress = state.progress[question.id];
    if (!isReviewDue(progress)) return summary;
    summary[question.category] = (summary[question.category] || 0) + 1;
    return summary;
  }, {});

  const weakest = Object.entries(weakCategories).sort((a, b) => b[1] - a[1])[0];

  if (review === 0) {
    elements.insightBox.textContent = bookmarked
      ? `復習待ちはありません。保存済み${bookmarked}問を確認してから模擬試験へ進めます。`
      : "復習待ちの問題はありません。模擬試験で実戦チェックに進めます。";
    return;
  }

  elements.insightBox.textContent = weakest
    ? `復習待ちは${review}問、保存済みは${bookmarked}問。いま一番崩れているのは「${weakest[0]}」です。`
    : `復習待ちは${review}問。解説を読んでから同じカテゴリをもう一周しましょう。`;
}

function renderEmptyState() {
  elements.questionNumber.textContent = "0 / 0";
  elements.questionCategory.textContent = state.category;
  elements.questionDifficulty.textContent = "-";
  elements.questionConfidence.textContent = "-";
  elements.bookmarkButton.hidden = true;
  elements.studyNote.hidden = false;
  elements.examPanel.hidden = true;
  elements.studyTitle.textContent = "学習対象がありません";
  elements.openLessonButton.hidden = true;
    elements.studyText.textContent = state.mode === "review"
      ? "今日が復習予定の問題はありません。間違えた問題や自己評価で登録した問題は、予定日になるとここへ表示されます。"
      : state.mode === "new"
        ? "この条件の未回答問題はありません。復習モードか模擬試験に進めます。"
        : state.mode === "weak"
          ? "弱点対象はありません。間違えた問題か保存済み問題がここに表示されます。"
        : "カテゴリに該当する問題がありません。";
  elements.revealQuestionButton.hidden = true;
  elements.questionBody.hidden = true;
  elements.choices.innerHTML = "";
  elements.result.hidden = true;
  elements.prevButton.disabled = true;
  elements.nextButton.disabled = true;
  elements.retryButton.disabled = true;
}

function renderQuestion() {
  const filteredOrder = getFilteredOrder();
  const question = getCurrentQuestion(filteredOrder);

  if (!question) {
    renderEmptyState();
    return;
  }

  const isExam = state.mode === "exam";
  const savedProgress = state.progress[question.id];
  const examSelected = state.examAnswers[question.id];
  const hasAnswered = isExam ? state.examSubmitted : savedProgress?.selected !== undefined;

  elements.examPanel.hidden = !isExam;
  elements.studyNote.hidden = isExam;
  elements.questionNumber.textContent = `${state.currentIndex + 1} / ${filteredOrder.length}`;
  elements.questionCategory.textContent = question.category;
  elements.questionDifficulty.textContent = difficultyLabels[question.difficulty] || question.difficulty;
  elements.questionConfidence.textContent = `根拠: ${confidenceLabels[question.confidence] || question.confidence}`;
  elements.bookmarkButton.hidden = false;
  elements.bookmarkButton.textContent = savedProgress?.bookmarked ? "保存済み" : "保存する";
  elements.bookmarkButton.classList.toggle("active", Boolean(savedProgress?.bookmarked));
  elements.studyTitle.textContent = `${question.keyword} の要点`;
  elements.studyText.textContent = studyNotes[question.keyword] || question.explanation;
  elements.openLessonButton.hidden = false;
  elements.revealQuestionButton.hidden = hasAnswered;
  elements.questionBody.hidden = isExam ? false : !(hasAnswered || state.showQuestion);
  elements.questionText.textContent = question.question;
  elements.choices.innerHTML = "";

  if (isExam) {
    const stats = getExamStats();
    elements.examStatus.textContent = state.examSubmitted
      ? `採点結果: ${stats.correct} / ${stats.total}問正解、${Math.round((stats.correct / stats.total) * 100)}%。各問の解説を確認できます。`
      : `回答 ${stats.answered} / ${stats.total}。採点するまで正解は表示されません。`;
    elements.examTimer.hidden = state.examSubmitted;
    elements.submitExamButton.disabled = state.examSubmitted;
    elements.submitExamButton.textContent = state.examSubmitted ? "採点済み" : "採点する";
    elements.examSizeSelect.value = String(state.settings.examSize);
    updateExamTimer();
  }

  question.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.innerHTML = `<span class="label">${String.fromCharCode(65 + choiceIndex)}</span><span>${choice}</span>`;
    button.addEventListener("click", () => answerQuestion(question, choiceIndex));

    if (isExam && !state.examSubmitted) {
      if (choiceIndex === examSelected) button.classList.add("selected");
    } else if (hasAnswered) {
      const selected = isExam ? examSelected : savedProgress.selected;
      button.disabled = true;
      if (choiceIndex === question.answer) {
        button.classList.add("correct");
      } else if (choiceIndex === selected) {
        button.classList.add("incorrect");
      }
    }

    elements.choices.appendChild(button);
  });

  if (hasAnswered) {
    showResult(question, isExam ? examSelected : savedProgress.selected);
  } else {
    elements.result.hidden = true;
    elements.result.innerHTML = "";
  }

  elements.prevButton.disabled = state.currentIndex === 0;
  elements.nextButton.disabled = state.currentIndex === filteredOrder.length - 1;
  elements.retryButton.disabled = isExam || savedProgress?.selected === undefined;
}

function answerQuestion(question, selected) {
  if (state.mode === "exam") {
    state.examAnswers[question.id] = selected;
  } else {
    state.progress[question.id] = {
      ...(state.progress[question.id] || {}),
      selected,
      lastCorrect: selected === question.answer,
      needsReview: selected !== question.answer,
      reviewAt: selected === question.answer ? null : new Date().toISOString(),
      answeredAt: new Date().toISOString()
    };
    recordActivity();
    saveProgress();
  }

  state.showQuestion = true;
  render();
  if (state.mode !== "exam") scrollToElement(elements.result);
}

function showResult(question, selected) {
  const isCorrect = selected === question.answer;
  const sourceUrl = getSourceUrl(question);
  const lesson = lessons.find((item) => item.category === question.category);
  const selectedLabel = selected === undefined
    ? "未回答"
    : `${String.fromCharCode(65 + selected)}. ${question.choices[selected]}`;
  const correctLabel = `${String.fromCharCode(65 + question.answer)}. ${question.choices[question.answer]}`;
  const relatedPoints = lesson?.keyPoints.slice(0, 2) || [];
  const trap = lesson?.traps[0];
  const progress = state.progress[question.id];
  const understoodDays = isCorrect ? 7 : 3;
  const scheduleStatus = progress?.needsReview && progress.reviewAt ? formatReviewDate(progress.reviewAt) : "";
  const selfAssessment = state.mode === "exam" ? "" : `
    <div class="self-assessment">
      <p>解説を読んだ今の理解度は？</p>
      <div class="self-assessment-actions">
        <button type="button" data-review-days="1" data-review-confidence="uncertain">まだ不安・明日もう一度</button>
        <button type="button" data-review-days="${understoodDays}" data-review-confidence="understood">理解した・${understoodDays}日後に確認</button>
      </div>
      <small class="review-schedule-status">${scheduleStatus}</small>
    </div>
  `;
  elements.result.hidden = false;
  elements.result.innerHTML = `
    <strong>${selected === undefined ? "未回答" : isCorrect ? "正解" : "不正解"}</strong>
    <div class="answer-comparison">
      <div><span>あなたの回答</span>${selectedLabel}</div>
      <div><span>正解</span>${correctLabel}</div>
    </div>
    <p>${question.explanation}</p>
    <div class="result-review">
      <h3>この問題の関連ポイント</h3>
      <ul>${relatedPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
      ${trap ? `<p class="trap-note"><strong>引っかけ注意:</strong> ${trap}</p>` : ""}
    </div>
    ${selfAssessment}
    <small>出典確認: <a href="${sourceUrl}" target="_blank" rel="noreferrer">${question.source}</a></small>
  `;
}

function getSourceUrl(question) {
  if (question.category === "法律・個人情報") {
    if (["AI法", "AI戦略本部"].includes(question.keyword)) {
      return "https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html";
    }
    return question.keyword.includes("著作")
      ? "https://www.bunka.go.jp/seisaku/chosakuken/aiandcopyright.html"
      : "https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/";
  }
  if (["リスク・倫理", "ビジネス活用"].includes(question.category)) {
    return "https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/";
  }
  return "https://guga.or.jp/assets/syllabus.pdf";
}

function renderLesson() {
  let lessonIndex = lessons.findIndex((lesson) => lesson.category === state.category);
  if (lessonIndex < 0) {
    lessonIndex = 0;
    state.category = lessons[0].category;
  }
  const lesson = lessons[lessonIndex];
  elements.lessonNumber.textContent = `${lessonIndex + 1} / ${lessons.length}`;
  elements.lessonChapter.textContent = lesson.chapter;
  elements.lessonCategory.textContent = lesson.category;
  elements.lessonTitle.textContent = lesson.title;
  elements.lessonLead.textContent = lesson.lead;
  elements.lessonSections.innerHTML = lesson.sections.map((section) => `
    <section class="lesson-section">
      <div>
        <h3>${section.heading}</h3>
        <p>${section.body}</p>
      </div>
    </section>
  `).join("");
  elements.lessonKeyPoints.innerHTML = lesson.keyPoints.map((point) => `<li>${point}</li>`).join("");
  elements.lessonTraps.innerHTML = lesson.traps.map((trap) => `<li>${trap}</li>`).join("");
  elements.lessonSources.innerHTML = lesson.sources.map((source) => `
    <a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>
  `).join("");
  const completed = Boolean(state.lessonProgress[lesson.category]?.completedAt);
  elements.markLessonCompleteButton.textContent = completed ? "読了済み ✓" : "読了にする";
  elements.markLessonCompleteButton.classList.toggle("completed", completed);
  elements.prevLessonButton.disabled = lessonIndex === 0;
  elements.nextLessonButton.disabled = lessonIndex === lessons.length - 1;
}

function render() {
  renderCategories();
  renderStats();
  renderDashboard();
  renderExamHistory();
  renderGlossary();
  const isLesson = state.mode === "lesson";
  elements.lessonPanel.hidden = !isLesson;
  elements.questionCard.hidden = isLesson;
  elements.questionFilters.hidden = isLesson;
  elements.searchInput.disabled = state.mode === "exam";
  elements.difficultyFilter.disabled = state.mode === "exam";
  if (isLesson) renderLesson();
  else renderQuestion();
}

function setMode(mode) {
  if (state.mode === "exam" && mode !== "exam") clearInterval(examTimerId);
  state.mode = mode;
  if (mode === "lesson" && !lessons.some((lesson) => lesson.category === state.category)) {
    state.category = lessons[0].category;
  }
  state.currentIndex = 0;
  state.showQuestion = mode === "exam";
  document.querySelectorAll(".segmented-control button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  if (mode === "exam" && (state.examOrder.length === 0 || state.examSubmitted)) {
    startExam();
    scrollToQuestion();
    return;
  }
  if (mode === "exam") {
    clearInterval(examTimerId);
    examTimerId = setInterval(updateExamTimer, 1000);
  }
  render();
  if (mode === "lesson") scrollToLesson();
  else scrollToQuestion();
}

function exportStudyData() {
  const payload = {
    app: studyAppName,
    version: 3,
    exportedAt: new Date().toISOString(),
    progress: state.progress,
    settings: state.settings,
    examHistory: state.examHistory,
    activity: state.activity,
    lessonProgress: state.lessonProgress
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `genai-passport-progress-${getLocalDateKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

const supportedImportVersion = 3;
const maxImportFileBytes = 1024 * 1024;
const maxProgressEntries = 500;
const maxExamHistoryEntries = 100;
const importedExamHistoryEntries = 20;
const maxWrongIds = 60;
const maxActivityEntries = 3660;
const maxLessonProgressEntries = 100;
const validExamSizes = new Set([20, 60]);
const validAnsweredInValues = new Set(["exam", "exam-unanswered"]);
const validConfidenceRatings = new Set(["uncertain", "understood"]);
const maxExamDurationSeconds = 24 * 60 * 60;

function isRecordObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeIsoDateTime(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(value)) return null;
  if (!isValidDateKey(value.slice(0, 10))) return null;
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

function isValidDateKey(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function normalizeInteger(value, minimum, maximum, fallback = null) {
  return Number.isInteger(value) && value >= minimum && value <= maximum ? value : fallback;
}

function normalizeProgressRecord(record, question) {
  if (!isRecordObject(record)) return null;
  const normalized = {};
  const selected = normalizeInteger(record.selected, 0, question.choices.length - 1);
  if (selected !== null) normalized.selected = selected;
  if (typeof record.lastCorrect === "boolean") normalized.lastCorrect = record.lastCorrect;
  if (typeof record.needsReview === "boolean") normalized.needsReview = record.needsReview;
  if (typeof record.bookmarked === "boolean") normalized.bookmarked = record.bookmarked;

  ["reviewAt", "answeredAt", "bookmarkedAt", "ratedAt"].forEach((field) => {
    if (field === "reviewAt" && record[field] === null) {
      normalized[field] = null;
      return;
    }
    const date = normalizeIsoDateTime(record[field]);
    if (date) normalized[field] = date;
  });
  if (validAnsweredInValues.has(record.answeredIn)) normalized.answeredIn = record.answeredIn;
  if (validConfidenceRatings.has(record.confidenceRating)) normalized.confidenceRating = record.confidenceRating;
  return Object.keys(normalized).length ? normalized : null;
}

function normalizeExamResult(item, validIds) {
  if (!isRecordObject(item)) return null;
  const id = normalizeIsoDateTime(item.id);
  const date = normalizeIsoDateTime(item.date);
  const total = validExamSizes.has(item.total) ? item.total : null;
  const score = total === null ? null : normalizeInteger(item.score, 0, total);
  if (!id || !date || total === null || score === null || !Array.isArray(item.wrongIds)) return null;
  if (item.wrongIds.length > maxWrongIds) throw new Error("模試履歴の問題IDが多すぎます。");

  const wrongIds = [...new Set(item.wrongIds.filter((wrongId) => typeof wrongId === "string" && validIds.has(wrongId)))].slice(0, total);
  return {
    id,
    date,
    score,
    total,
    percent: Math.round((score / total) * 100),
    durationSeconds: normalizeInteger(item.durationSeconds, 0, maxExamDurationSeconds, 0),
    unanswered: normalizeInteger(item.unanswered, 0, total, 0),
    wrongIds
  };
}

function assertImportCollectionSizes(payload) {
  if (Object.keys(payload.progress).length > maxProgressEntries) throw new Error("学習進捗の件数が多すぎます。");
  if (payload.examHistory.length > maxExamHistoryEntries) throw new Error("模試履歴の件数が多すぎます。");
  if (Object.keys(payload.activity).length > maxActivityEntries) throw new Error("学習日数の件数が多すぎます。");
  if (Object.keys(payload.lessonProgress).length > maxLessonProgressEntries) throw new Error("教材進捗の件数が多すぎます。");
}

function sanitizeImportedData(payload) {
  if (
    !isRecordObject(payload) ||
    payload.app !== studyAppName ||
    payload.version !== supportedImportVersion ||
    !isRecordObject(payload.progress) ||
    !isRecordObject(payload.settings) ||
    !Array.isArray(payload.examHistory) ||
    !isRecordObject(payload.activity) ||
    !isRecordObject(payload.lessonProgress)
  ) {
    throw new Error("学習データの形式ではありません。");
  }
  if (payload.exportedAt !== undefined && !normalizeIsoDateTime(payload.exportedAt)) {
    throw new Error("学習データの日時が不正です。");
  }
  assertImportCollectionSizes(payload);

  const questionById = new Map(questions.map((question) => [question.id, question]));
  const validIds = new Set(questionById.keys());
  const progress = {};
  Object.entries(payload.progress).forEach(([id, record]) => {
    const question = questionById.get(id);
    if (!question) return;
    const normalized = normalizeProgressRecord(record, question);
    if (normalized) progress[id] = normalized;
  });

  const requestedDailyGoal = payload.settings.dailyGoal;
  const dailyGoal = Number.isInteger(requestedDailyGoal)
    ? Math.min(50, Math.max(5, requestedDailyGoal))
    : defaultSettings.dailyGoal;
  const examSize = validExamSizes.has(payload.settings.examSize) ? payload.settings.examSize : defaultSettings.examSize;
  const examHistory = payload.examHistory
    .slice(0, importedExamHistoryEntries)
    .map((item) => normalizeExamResult(item, validIds))
    .filter(Boolean);
  const activity = {};
  Object.entries(payload.activity).forEach(([date, count]) => {
    if (isValidDateKey(date) && Number.isInteger(count) && count > 0) {
      activity[date] = Math.min(count, maxActivityCount);
    }
  });
  const validLessonCategories = new Set(lessons.map((lesson) => lesson.category));
  const lessonProgress = {};
  Object.entries(payload.lessonProgress).forEach(([category, record]) => {
    const completedAt = isRecordObject(record) && normalizeIsoDateTime(record.completedAt);
    if (validLessonCategories.has(category) && completedAt) lessonProgress[category] = { completedAt };
  });
  return { progress, settings: { dailyGoal, examSize }, examHistory, activity, lessonProgress };
}

async function importStudyData(file) {
  if (!file || !Number.isFinite(file.size) || file.size < 0 || file.size > maxImportFileBytes || typeof file.text !== "function") {
    throw new Error("学習データは1MiB以下のJSONファイルを選択してください。");
  }
  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    throw new Error("JSONファイルを読み取れませんでした。");
  }
  const imported = sanitizeImportedData(payload);
  state.progress = imported.progress;
  state.settings = imported.settings;
  state.examHistory = imported.examHistory;
  state.activity = imported.activity;
  state.lessonProgress = imported.lessonProgress;
  state.currentIndex = 0;
  saveStudyData();
  render();
}

document.querySelectorAll(".segmented-control button").forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

function moveLesson(direction) {
  const currentIndex = lessons.findIndex((lesson) => lesson.category === state.category);
  const nextIndex = Math.min(lessons.length - 1, Math.max(0, currentIndex + direction));
  state.category = lessons[nextIndex].category;
  render();
  scrollToLesson();
}

elements.prevLessonButton.addEventListener("click", () => moveLesson(-1));
elements.nextLessonButton.addEventListener("click", () => moveLesson(1));

elements.markLessonCompleteButton.addEventListener("click", () => {
  const category = state.category;
  if (state.lessonProgress[category]?.completedAt) {
    delete state.lessonProgress[category];
  } else {
    state.lessonProgress[category] = { completedAt: new Date().toISOString() };
  }
  saveStudyData();
  render();
});

elements.startLessonQuestionsButton.addEventListener("click", () => {
  state.currentIndex = 0;
  state.difficulty = "all";
  elements.difficultyFilter.value = "all";
  setMode("all");
});

elements.revealQuestionButton.addEventListener("click", () => {
  state.showQuestion = true;
  renderQuestion();
  scrollToElement(elements.questionBody);
});

elements.openLessonButton.addEventListener("click", () => {
  const filteredOrder = getFilteredOrder();
  const question = getCurrentQuestion(filteredOrder);
  if (!question) return;
  state.category = question.category;
  setMode("lesson");
});

elements.prevButton.addEventListener("click", () => {
  state.currentIndex = Math.max(0, state.currentIndex - 1);
  state.showQuestion = state.mode === "exam";
  renderQuestion();
  scrollToQuestion();
});

elements.nextButton.addEventListener("click", () => {
  state.currentIndex += 1;
  state.showQuestion = state.mode === "exam";
  renderQuestion();
  scrollToQuestion();
});

elements.retryButton.addEventListener("click", () => {
  const filteredOrder = getFilteredOrder();
  const question = getCurrentQuestion(filteredOrder);
  if (!question || state.mode === "exam") return;
  const current = state.progress[question.id];
  if (!current) return;
  const { bookmarked, bookmarkedAt } = current;
  if (bookmarked) {
    state.progress[question.id] = { bookmarked, bookmarkedAt };
  } else {
    delete state.progress[question.id];
  }
  state.showQuestion = true;
  saveProgress();
  render();
  scrollToQuestion();
});

elements.shuffleButton.addEventListener("click", () => {
  if (state.mode === "exam") {
    startExam();
    return;
  }
  state.order = shuffleIndexes(state.order);
  state.currentIndex = 0;
  state.showQuestion = false;
  renderQuestion();
  scrollToQuestion();
});

elements.restartExamButton.addEventListener("click", () => {
  if (!state.examSubmitted && Object.keys(state.examAnswers).length > 0 && !confirm("現在の模試を終了して、新しい問題を作りますか？")) return;
  startExam();
});

elements.submitExamButton.addEventListener("click", () => submitExam(false));

elements.examSizeSelect.addEventListener("change", (event) => {
  const nextSize = Number(event.target.value) === 60 ? 60 : 20;
  if (!state.examSubmitted && Object.keys(state.examAnswers).length > 0 && !confirm("問題数を変更すると現在の回答は消えます。変更しますか？")) {
    event.target.value = String(state.settings.examSize);
    return;
  }
  state.settings.examSize = nextSize;
  saveStudyData();
  startExam();
});

elements.bookmarkButton.addEventListener("click", () => {
  const filteredOrder = getFilteredOrder();
  const question = getCurrentQuestion(filteredOrder);
  if (!question) return;
  const current = state.progress[question.id] || {};
  state.progress[question.id] = {
    ...current,
    bookmarked: !current.bookmarked,
    bookmarkedAt: !current.bookmarked ? new Date().toISOString() : current.bookmarkedAt
  };
  saveProgress();
  render();
});

elements.result.addEventListener("click", (event) => {
  const button = event.target.closest("[data-review-days]");
  if (!button || state.mode === "exam") return;
  const filteredOrder = getFilteredOrder();
  const question = getCurrentQuestion(filteredOrder);
  const current = question && state.progress[question.id];
  if (!question || current?.selected === undefined) return;
  const days = Math.max(1, Number(button.dataset.reviewDays) || 1);
  state.progress[question.id] = {
    ...current,
    needsReview: true,
    reviewAt: addDaysIso(days),
    confidenceRating: button.dataset.reviewConfidence,
    ratedAt: new Date().toISOString()
  };
  saveProgress();
  renderStats();
  renderDashboard();
  showResult(question, current.selected);
});

elements.searchInput.addEventListener("input", (event) => {
  state.searchTerm = event.target.value;
  state.currentIndex = 0;
  state.showQuestion = state.mode === "exam";
  renderGlossary();
  renderQuestion();
});

elements.difficultyFilter.addEventListener("change", (event) => {
  state.difficulty = event.target.value;
  state.currentIndex = 0;
  state.showQuestion = false;
  renderQuestion();
  scrollToQuestion();
});

elements.studyGuideButton.addEventListener("click", () => {
  elements.studyGuideDialog.showModal();
});

elements.closeStudyGuideButton.addEventListener("click", () => {
  elements.studyGuideDialog.close();
});

elements.studyGuideDialog.addEventListener("click", (event) => {
  if (event.target === elements.studyGuideDialog) elements.studyGuideDialog.close();
});

document.querySelectorAll("[data-guide-category]").forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.guideCategory;
    state.difficulty = "all";
    state.searchTerm = "";
    elements.difficultyFilter.value = "all";
    elements.searchInput.value = "";
    elements.studyGuideDialog.close();
    setMode("lesson");
  });
});

document.querySelectorAll("[data-guide-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    elements.studyGuideDialog.close();
    setMode(button.dataset.guideMode);
  });
});

elements.dailyGoalInput.addEventListener("change", (event) => {
  state.settings.dailyGoal = Math.min(50, Math.max(5, Number(event.target.value) || 10));
  saveStudyData();
  renderDashboard();
});

elements.startDailyButton.addEventListener("click", () => setMode("new"));

elements.continueLessonButton.addEventListener("click", () => {
  state.category = elements.continueLessonButton.dataset.category || lessons[0].category;
  setMode("lesson");
});

elements.exportButton.addEventListener("click", exportStudyData);

elements.importInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    await importStudyData(file);
    alert("学習データを復元しました。");
  } catch (error) {
    alert(`復元できませんでした: ${error.message}`);
  } finally {
    event.target.value = "";
  }
});

elements.resetProgressButton.addEventListener("click", () => {
  if (!confirm("回答履歴・教材読了・模試履歴・学習日数をすべてリセットしますか？")) return;
  state.progress = {};
  state.examHistory = [];
  state.activity = {};
  state.lessonProgress = {};
  saveStudyData();
  render();
});

state.settings.dailyGoal = Math.min(50, Math.max(5, Number(state.settings.dailyGoal) || 10));
state.settings.examSize = Number(state.settings.examSize) === 60 ? 60 : 20;
elements.examSizeSelect.value = String(state.settings.examSize);
render();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { sanitizeImportedData, importStudyData, renderExamHistory, recordActivity, state, elements, questions };
}
