const inputTextArea = document.getElementById("input-textarea");

const outputTextArea = document.getElementById("output-textarea");

const replacementTextInput = document.getElementById("replace-text");

const redactBtn = document.getElementById("redact-btn");

const replaceAlt = document.getElementById("replace-alt");

const timeTakenEL = document.getElementById("time_taken");
const charsScrambEl = document.getElementById("chars_scramb");
const wordsScanEl = document.getElementById("words_scan");
const totalCharsEl = document.getElementById("total_chars");

redactBtn.addEventListener("click", e => {
  const startTime = performance.now();
  e.preventDefault();
  const replacementText = replaceAlt.value;

  const redactRes = redactMore(inputTextArea.value, replacementTextInput.value, replacementText);
  console.log(redactRes);
  
  outputTextArea.value = redactRes.result;
  const endTime = performance.now();
  timeTakenEL.innerHTML = `Time taken: ${(endTime - startTime).toFixed(2)} ms`;
  charsScrambEl.innerHTML = `Total characters scrambled: ${redactRes.totalCharsScramb}`;
  wordsScanEl.innerHTML = `Words scanned: ${redactRes.wordCount}`;
  totalCharsEl.innerHTML = `Total characters: ${redactRes.totalChars}`;
});


// function redact(inputText, replace) {
//   let result = "";

//   const inputTextArr = inputText.split(" ");

//   for (text of inputTextArr) {
//     if (text === replace) {
//       result += "**** ";
//     } else {
//       result += text + " ";
//     }
//   }
  
//   return result;
// }




function redactMore(text, repl, replacementText) {
  let result = "";
  let wordCount = 0;
  let totalCharsScramb = 0;
  let totalChars = 0;
  const replace = replacementText.trim() === "" ? "****" : replacementText;

  const textArr = text.trim().split(" ");
  const more = repl.trim().split(" ");

  for (t of textArr) {
    wordCount++;
    totalChars += t.length;
    if (more.includes(t)) {
      result += replace + " ";
      totalCharsScramb += t.length;
    } else {
      result += t + " ";
    }
  }
  
  return {
    result,
    wordCount,
    totalCharsScramb,
    totalChars
  };
}