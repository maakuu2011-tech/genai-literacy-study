(() => {
  const question = (window.GENAI_PASSPORT_QUESTIONS || []).find((item) => item.id === "daily-003");
  if (!question) return;

  // Keep the correct answer distribution balanced without changing the concept tested.
  [question.choices[2], question.choices[3]] = [question.choices[3], question.choices[2]];
  [question.choiceExplanations[2], question.choiceExplanations[3]] = [question.choiceExplanations[3], question.choiceExplanations[2]];
  question.answer = 3;
})();
