async function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "Завантаження...";

  try {

    const url = `https://goroh.pp.ua/Словозміна/${encodeURIComponent(word)}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    const res = await fetch(proxyUrl);

    const data = await res.json();

    const parser = new DOMParser();

    const doc = parser.parseFromString(data.contents, "text/html");

    const heading = doc.querySelector("h1")?.textContent || "Слово не знайдено";

    const sex = doc.querySelector(".taglist")?.textContent || "Рід не визначено";
    
    const table = doc.querySelector("table")?.outerHTML || "<p>Немає відмінків</p>";

    resultBox.innerHTML = `
      <h3>${heading}</h3>
      <div>${sex}</div>
      <div>${table}</div>
    `;

  } catch (err) {
    resultBox.innerHTML = "Помилка при завантаженні";
    console.error(err);
  }
}