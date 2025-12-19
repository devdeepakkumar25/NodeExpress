async function streamText() {
  const output = document.getElementById("output");
  output.textContent = "";

  try {
    const response = await fetch("http://localhost:3000/stream");

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    // ReadableStream from fetch
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      // Decode streamed bytes → text
      const text = decoder.decode(value, { stream: true });

      // Append to UI
      output.textContent += text;

      console.log("Chunk received:", text);
    }

    // Flush decoder buffer
    output.textContent += decoder.decode();
  } catch (err) {
    console.error("Streaming failed:", err);
    output.textContent = "Error while streaming";
  }
}

streamText();
