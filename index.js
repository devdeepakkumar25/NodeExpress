const { Readable } = require("stream");
const readline = require("readline");

const URL = "https://norvig.com/big.txt";

async function analyzeDocumentStream(url) {
  console.log(`Starting stream-fetch from: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = readline.createInterface({
    input: Readable.fromWeb(response.body),
    terminal: false,
  });

  const wordCounts = new Map();

  for await (const line of reader) {
    const words = line.toLowerCase().match(/\b[a-z']+\b/g);

    if (words) {
      for (const word of words) {
        wordCounts.set(word, (wordCounts.get(word) ?? 0) + 1);
      }
    }
  }
  return wordCounts;
}

function displayResults(wordMap) {
  const sorted = [...wordMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log("\n...Analysis Result (Top 10 Words)");
  console.table(
    sorted.map(([word, count]) => ({ word: word, Occurrences: count }))
  );
}

function getTop10WordsAsJSON(wordMap) {
  return [...wordMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word: word,
      count: count,
    }));
}

(async () => {
  try {
    const start = Date.now();
    const counts = await analyzeDocumentStream(URL);
    displayResults(counts);
    const top10JSON = getTop10WordsAsJSON(counts);
    console.log(JSON.stringify(top10JSON, null, 2));
    const end = (Date.now() - start) / 1000;
    console.log(`\nAnalysis finished in ${end.toFixed(2)} seconds`);
  } catch (error) {
    console.error("Critical Error: ", error.mesage);
  }
})();
