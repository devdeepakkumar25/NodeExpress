const { Readable } = require("stream");
const readline = require("readline");

async function fetchResponseBody(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} : ${response.statusText}`);
  }
  return response.body;
}

function createLineReader(webstream) {
  return readline.createInterface({
    input: Readable.fromWeb(webstream),
    crlfDelay: Infinity,
  });
}

async function countWordOccurrences(reader) {
  const wordMap = new Map();
  try {
    for await (const line of reader) {
      const words = line.toLowerCase().match(/[a-z']+/g);
      if (!words || words.length === 0) continue;
      for (const word of words) {
        wordMap.set(word, (wordMap.get(word) ?? 0) + 1);
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  return wordMap;
}

function getTopWords(wordMap, limit = 10) {
  return [...wordMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

function getJSONString(topwrods, space = 2) {
  return JSON.stringify(topwrods, null, space);
}
