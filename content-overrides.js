(() => {
  const legalSource = "GUGA公式シラバス、個人情報保護委員会・文化庁・裁判所・特許庁などの一次情報を参照";
  const today = "2026-07-13";

  const ref = (sourceId, url, locator, claim) => ({ sourceId, url, locator, claim });

  const overrides = {
    "law-001": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("guga-syllabus-2026", "https://guga.or.jp/assets/syllabus.pdf", "法律・個人情報の出題範囲", "生成AI利用時の個人情報・権利・リスクの理解が出題範囲に含まれる。"),
        ref("ppc-generative-ai", "https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/", "生成AIサービス利用時の注意喚起", "個人情報を生成AIサービスへ入力する場合は、利用目的や安全管理、提供先の扱いを確認する必要がある。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "氏名と住所は、特定の個人を識別できる典型的な個人情報です。",
        "正解。サービス規約、社内ルール、利用目的を確認し、不要な個人情報を入力しないことが基本です。",
        "便利さだけで本人同意や組織ルールを無視して入力するのは不適切です。",
        "入力データの保存・利用・学習利用はサービス設定や契約によって異なり、確認不要とはいえません。"
      ]
    },
    "law-002": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("bunka-ai-copyright", "https://www.bunka.go.jp/seisaku/chosakuken/aiandcopyright.html", "AIと著作権に関する考え方", "AI生成物の利用段階でも、既存著作物との類似性や依拠性が問題になり得る。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "正解。AI生成物でも既存著作物に似ており、依拠性が認められる場合などは著作権上の問題になり得ます。",
        "AIで作成したという理由だけで、常に著作権侵害にならないとはいえません。",
        "有料サービスであっても、他人の著作物を自由に複製できるわけではありません。",
        "著作権は文章だけでなく、画像、音楽、映像などにも関係します。"
      ]
    },
    "law-003": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("ppc-guidelines-general", "https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/", "要配慮個人情報", "要配慮個人情報は、不当な差別や不利益が生じないよう特に配慮を要する個人情報である。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "要配慮個人情報は通常の公開情報と同じように自由に扱えるものではありません。",
        "生成AIに入力しても、情報の性質が自動的に個人情報でなくなるわけではありません。",
        "氏名を削除しても、他の情報から本人を識別できる場合があります。",
        "正解。病歴、信条、犯罪歴などは不利益につながるおそれがあり、特に慎重な取り扱いが必要です。"
      ]
    },
    "law-004": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("ppc-guidelines-anonymous", "https://www.ppc.go.jp/personalinfo/legal/guidelines_anonymous/", "匿名加工情報", "匿名加工情報は、特定の個人を識別できず、元の個人情報を復元できないよう加工された情報である。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "生成AIに入力した文章が自動的に匿名加工情報になるわけではありません。",
        "パスワードの短縮は匿名加工情報の説明ではなく、むしろセキュリティ上危険です。",
        "正解。識別できないことと復元できないことの両方が重要です。",
        "氏名だけの削除では、住所、勤務先、病歴などから再識別できる場合があります。"
      ]
    },
    "law-005": {
      confidence: "high",
      keyword: "プライバシー設定",
      source: legalSource,
      question: "生成AIサービスで入力内容をモデル改善に利用しない設定を確認する説明として最も適切なものはどれか。",
      choices: [
        "入力データの学習利用を停止・拒否できる設定や契約条件が用意されている場合がある",
        "一度入力した情報が必ず全世界に公開される仕組み",
        "個人情報保護法上の第三者提供のオプトアウト制度と常に同じ意味である",
        "AIの回答を必ず正解にする設定"
      ],
      answer: 0,
      explanation: "生成AIサービスでは、入力データをモデル改善に利用しない設定や契約条件が用意されている場合があります。ただし、これは個人情報保護法上の第三者提供のオプトアウト制度と同じ意味とは限らないため、規約や管理設定を確認します。",
      sourceRefs: [
        ref("ppc-generative-ai", "https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/", "生成AIサービス利用時の注意喚起", "入力情報の取扱いはサービスや契約条件により異なるため確認が必要である。"),
        ref("ppc-optout", "https://www.ppc.go.jp/personalinfo/legal/optout/", "オプトアウト届出制度", "個人情報保護法上のオプトアウト制度は第三者提供に関する制度であり、サービス設定上の学習利用停止とは区別する。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "正解。サービスによって、入力内容をモデル改善に使わない設定や法人契約条件が用意される場合があります。",
        "入力した情報が必ず全世界に公開されるとは限りません。保存や利用範囲は規約・設定・契約で確認します。",
        "個人情報保護法上の第三者提供のオプトアウト制度と、AIサービスの学習利用停止設定は同じ概念ではありません。",
        "プライバシー設定は回答の正確性を保証するものではありません。"
      ]
    },
    "law-006": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("guga-syllabus-2026", "https://guga.or.jp/assets/syllabus.pdf", "生成AIサービス利用の注意点", "サービス利用時のルール、権利、リスクの確認が学習範囲に含まれる。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "利用規約を読んでも、AIの回答が正解になるわけではありません。",
        "利用規約は画像生成だけでなく、文章生成、商用利用、データ利用などにも関係します。",
        "利用規約の確認によって著作権が消滅するわけではありません。",
        "正解。入力データの扱い、商用利用、禁止事項、責任範囲は業務利用前に確認すべき条件です。"
      ]
    },
    "law-007": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("ppc-generative-ai", "https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/", "生成AIサービス利用時の注意喚起", "個人情報を扱う場合は、サービス側の利用・保存・提供の扱いを確認する必要がある。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "文字数だけでは、個人情報の扱いを判断できません。",
        "画面デザインはプライバシーポリシーで確認すべき中心事項ではありません。",
        "正解。取得、利用、保存、第三者提供など、個人情報の扱いを確認します。",
        "画像解像度はプライバシーポリシーの中心的な確認事項ではありません。"
      ]
    },
    "law-008": {
      confidence: "high",
      source: legalSource,
      question: "生成AIで実在人物に似た画像を作成・公開する場合の肖像権に関する説明として最も適切なものはどれか。",
      choices: [
        "AI生成画像なら本人に似ていても肖像権の問題は生じない",
        "公開目的、利用態様、必要性、本人が受忍すべき範囲かなどを踏まえて慎重に判断する",
        "肖像権は有名人だけに関係し、一般人には関係しない",
        "顔を少し加工すれば、本人に似ていても必ず自由に広告利用できる"
      ],
      answer: 1,
      explanation: "肖像権は、本人の顔や姿を無断で撮影・公表・利用されない利益に関係します。生成AIで実在人物に似た画像を作成・公開する場合も、目的、態様、必要性、本人の不利益などを踏まえて慎重に判断します。",
      sourceRefs: [
        ref("courts-portrait-2020", "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-89732.pdf", "最高裁令和2年判決", "肖像等の利用は、目的・態様・必要性などの事情を総合考慮して受忍限度を判断する。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "AI生成であっても、本人に似た画像の公開・利用では肖像やプライバシーの問題が生じ得ます。",
        "正解。目的、態様、必要性、本人の不利益などを総合的に見ます。",
        "肖像に関する利益は有名人だけでなく一般人にも関係します。",
        "少し加工しただけで必ず自由に広告利用できるとはいえません。"
      ]
    },
    "law-009": {
      confidence: "high",
      source: legalSource,
      question: "生成AIで企業ロゴやブランド名を使う場合の商標権に関する説明として最も適切なものはどれか。",
      choices: [
        "登録商標と同一・類似の表示を、指定商品・役務と関係する商標的な使い方で用いると問題になり得る",
        "AIが生成したロゴなら既存ブランドと同じでも常に自由に使える",
        "商標権は文章の著作権と同じ制度で、登録の有無は関係しない",
        "ブランド名は短い文字列なので、どのような広告にも自由に使える"
      ],
      answer: 0,
      explanation: "商標権は、商品やサービスの出所を識別する標識を保護します。登録商標と同一・類似の表示を、指定商品・役務と関係する形で使う場合には、誤認や権利侵害に注意が必要です。",
      sourceRefs: [
        ref("jpo-trademark-effect", "https://www.jpo.go.jp/system/trademark/gaiyo/seidogaiyo/shotoha.html", "商標権の効力", "商標権は、登録商標を指定商品・指定役務について独占的に使用できる権利である。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "正解。登録商標、指定商品・役務、同一・類似、商標的使用が重要な観点です。",
        "AI生成という理由だけで既存ブランドと同じロゴを自由に使えるわけではありません。",
        "商標権は著作権とは別制度で、登録や指定商品・役務が重要です。",
        "短い文字列でもブランド名として保護される場合があります。"
      ]
    },
    "law-010": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("courts-publicity-2012", "https://www.courts.go.jp/assets/hanrei/hanrei-pdf-81957.pdf", "最高裁平成24年判決", "氏名・肖像等が持つ顧客吸引力を専ら利用する目的の無断利用は、パブリシティ権侵害となり得る。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "コンテキストウィンドウはAIが参照できる文脈量のことで、権利名ではありません。",
        "教師なし学習は機械学習の方法であり、有名人の広告利用の権利問題ではありません。",
        "OCRは画像内文字の認識技術で、氏名・肖像の顧客吸引力とは別です。",
        "正解。有名人の氏名や肖像を広告で無断利用すると、パブリシティ権が問題になり得ます。"
      ]
    },
    "law-011": {
      confidence: "high",
      source: legalSource,
      question: "個人情報を外部の生成AIサービスへ入力する場合の第三者提供に関する説明として最も適切なものはどれか。",
      choices: [
        "第三者提供に当たるかは契約や処理実態も踏まえて確認し、原則同意や例外の有無を検討する",
        "生成AIに入力すれば第三者提供には絶対に該当しない",
        "個人情報は社外サービスに送っても常に自由に使える",
        "第三者提供は画像データだけに関係する"
      ],
      answer: 0,
      explanation: "個人情報を外部サービスに送る場合、第三者提供、委託、共同利用などのどれに当たるかを契約や処理実態に照らして確認します。第三者提供に当たる場合は、原則として本人同意や法令上の例外の確認が必要です。",
      sourceRefs: [
        ref("ppc-guidelines-general", "https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/", "第三者提供の制限", "個人データの第三者提供には、原則として本人同意等の要件がある。"),
        ref("ppc-thirdparty-platform", "https://www.ppc.go.jp/news/careful_information/use_AP_provided_by_3rdparty/", "外部サービス利用時の注意", "第三者が提供するサービス利用時は、個人情報の取扱い実態を確認する必要がある。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "正解。契約・処理実態を見て、第三者提供、委託、共同利用、例外などを確認します。",
        "生成AIに入力したというだけで、第三者提供の検討が不要になるわけではありません。",
        "社外サービスへの送信は、法令や契約、社内規程に従って判断します。",
        "第三者提供は画像だけでなく、氏名、文章、音声、ログなどの個人データにも関係します。"
      ]
    },
    "law-012": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("ppc-guidelines-general", "https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/", "仮名加工情報", "仮名加工情報は、他の情報と照合しない限り特定の個人を識別できないよう加工した情報であり、匿名加工情報とは異なる。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "誰でも直接識別できるなら、仮名加工情報の説明として不適切です。",
        "仮名加工情報は匿名加工情報と同じではなく、復元可能性や取扱いルールが異なります。",
        "AIが出力した文章が自動的に仮名加工情報になるわけではありません。",
        "正解。他の情報と照合しない限り識別できないように加工した情報です。"
      ]
    },
    "law-013": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("ppc-guidelines-general", "https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/", "委託先の監督", "個人データの取扱いを委託する場合、委託元は委託先を適切に監督する必要がある。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "委託先に必要な範囲の利用目的や取扱条件を伝えないと、適切な管理ができません。",
        "委託のために個人情報を公開する必要はありません。",
        "正解。委託元は委託先を適切に監督する必要があります。",
        "委託しても、委託元の責任が完全になくなるわけではありません。"
      ]
    },
    "law-014": {
      confidence: "high",
      source: legalSource,
      question: "個人情報の目的外利用に関する説明として最も適切なものはどれか。",
      choices: [
        "公開済みの一般情報だけを使うこと",
        "取得時に特定した利用目的の達成に必要な範囲を超えて個人情報を使うこと",
        "利用目的を明確にした範囲内で使うこと",
        "個人を特定できない架空データを使うこと"
      ],
      answer: 1,
      explanation: "目的外利用は、特定した利用目的の達成に必要な範囲を超えて個人情報を利用することです。利用目的の変更が認められる場合や法令上の例外もありますが、生成AI活用でも目的との整合性確認が重要です。",
      sourceRefs: [
        ref("ppc-guidelines-general", "https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/", "利用目的による制限", "個人情報は、特定した利用目的の達成に必要な範囲を超えて取り扱ってはならないのが原則である。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "公開済み一般情報の利用そのものを指す言葉ではありません。",
        "正解。特定した利用目的の範囲を超える利用が目的外利用です。",
        "利用目的の範囲内で使うことは、目的外利用ではありません。",
        "架空データの利用は、個人情報の目的外利用とは別の話です。"
      ]
    },
    "law-015": {
      confidence: "high",
      keyword: "音声と個人情報",
      source: legalSource,
      question: "実在人物の音声を音声生成AIで利用する場合の説明として最も適切なものはどれか。",
      choices: [
        "本人の声に似せた音声は、なりすましや権利侵害のリスクを含むため、同意・利用目的・権利関係を確認する",
        "声は個人と関係しないため、本人確認や同意は常に不要である",
        "音声から本人を識別できても、個人情報になることはない",
        "AIで生成すれば、本人の声に似ていても詐欺や誤認の問題は生じない"
      ],
      answer: 0,
      explanation: "実在人物の音声は、本人を識別できる場合には個人情報に関係し得ます。声紋のように本人認証に使える情報は個人識別符号に当たる場合もあり、音声生成AIでは同意、利用目的、なりすましリスク、権利関係を確認します。",
      sourceRefs: [
        ref("ppc-voice-faq", "https://www.ppc.go.jp/all_faq_index/faq1-q1-11/", "音声・声紋に関するFAQ", "音声や声紋は、本人識別可能性や個人識別符号の観点で個人情報保護法上の検討対象になり得る。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "正解。本人に似せた音声は、同意、利用目的、権利関係、なりすましリスクを確認します。",
        "声でも本人を識別できる場合があり、常に確認不要とはいえません。",
        "本人を識別できる音声は、個人情報に関係し得ます。",
        "AI生成であっても、詐欺、誤認、なりすましの問題は生じ得ます。"
      ]
    },
    "law-016": {
      confidence: "high",
      source: legalSource,
      sourceRefs: [
        ref("ppc-generative-ai", "https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/", "生成AIサービス利用時の注意喚起", "生成AIサービスへ個人情報を入力する場合は必要性と取扱いを確認する必要がある。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "データ最小化は公開を増やす考え方ではありません。",
        "多く集めれば法令確認が不要になるわけではありません。",
        "正解。目的達成に必要な範囲だけを扱う考え方です。",
        "不要な個人情報を多く入力するのは、漏えい・目的外利用・契約違反のリスクを高めます。"
      ]
    },
    "law-ai-002": {
      keyword: "人工知能戦略本部",
      source: "e-Gov法令検索『人工知能関連技術の研究開発及び活用の推進に関する法律』",
      choices: [
        "著作権審判所",
        "生成AI免許局",
        "機械学習監査裁判所",
        "人工知能戦略本部"
      ],
      answer: 3,
      explanation: "AI法では、人工知能基本計画の案の作成や重要施策の総合調整を担う組織として、内閣に人工知能戦略本部を置くことが定められています。",
      sourceRefs: [
        ref("egov-ai-act", "https://laws.e-gov.go.jp/law/507AC0000000053", "第19条・第20条", "AI法は、内閣に人工知能戦略本部を置き、人工知能基本計画案の作成などを所掌させる。")
      ],
      reviewStatus: "approved",
      reviewedAt: today,
      choiceExplanations: [
        "著作権審判所という組織は、AI法に基づき内閣に置かれる組織ではありません。",
        "生成AI免許局という組織は、AI法上の名称ではありません。",
        "機械学習監査裁判所という組織は、AI法上の名称ではありません。",
        "正解。正式名称は人工知能戦略本部です。"
      ]
    }
  };

  window.GENAI_PASSPORT_QUESTION_OVERRIDES = overrides;
  const questions = window.GENAI_PASSPORT_QUESTIONS || [];
  questions.forEach((question) => {
    if (overrides[question.id]) Object.assign(question, overrides[question.id]);
  });
})();
