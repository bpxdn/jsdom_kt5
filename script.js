document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cardForm");
  const cardsTable = document
    .getElementById("cardsTable")
    .getElementsByTagName("tbody")[0];

  const bankLogos = {
    Сбербанк: "СБ",
    Тинькофф: "Т",
    "Альфа-Банк": "А",
    ВТБ: "ВТБ",
    Газпромбанк: "ГПБ",
  };

  const cardColors = {
    VISA: ["#1a1a2e", "#16213e"],
    MasterCard: ["#29323c", "#485563"],
    МИР: ["#0f2027", "#203a43"],
  };

  form.addEventListener("input", function () {
    updateCardPreview();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addCardToTable();
    form.reset();
    resetCardPreview();
  });

  function updateCardPreview() {
    const bankName =
      document.getElementById("bankName").value || "Название банка";
    const cardType = document.getElementById("cardType").value || "VISA";
    const cardNumber =
      formatCardNumber(document.getElementById("cardNumber").value) ||
      "0000 0000 0000 0000";
    const cardHolder =
      document.getElementById("cardHolder").value || "Имя держателя";
    const expiryMonth = document.getElementById("expiryMonth").value || "ММ";
    const expiryYear = document.getElementById("expiryYear").value || "ГГ";

    document.getElementById("previewBank").textContent = bankName;
    document.getElementById("previewNumber").textContent = cardNumber;
    document.getElementById("previewHolder").textContent = cardHolder;
    document.getElementById(
      "previewExpiry"
    ).textContent = `${expiryMonth}/${expiryYear}`;
    document.getElementById("previewType").textContent = cardType;

    const bankLogo = document.getElementById("previewBankLogo");
    if (bankLogos[bankName]) {
      bankLogo.textContent = bankLogos[bankName];
      bankLogo.style.display = "block";
    } else {
      bankLogo.style.display = "none";
    }

    const card = document.querySelector(".card");
    if (cardColors[cardType]) {
      card.style.background = `linear-gradient(135deg, ${cardColors[cardType][0]}, ${cardColors[cardType][1]})`;
    }
  }

  function addCardToTable() {
    const bankName = document.getElementById("bankName").value;
    const cardType = document.getElementById("cardType").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const cardHolder = document.getElementById("cardHolder").value;
    const expiryMonth = document.getElementById("expiryMonth").value;
    const expiryYear = document.getElementById("expiryYear").value;

    if (
      !bankName ||
      !cardType ||
      !cardNumber ||
      !cardHolder ||
      !expiryMonth ||
      !expiryYear
    )
      return;

    const row = cardsTable.insertRow();
    row.innerHTML = `
              <td>${bankName}</td>
              <td>${cardType}</td>
              <td>${formatCardNumber(cardNumber)}</td>
              <td>${cardHolder}</td>
              <td>${expiryMonth}/${expiryYear}</td>
          `;
  }

  function resetCardPreview() {
    document.getElementById("previewBank").textContent = "Название банка";
    document.getElementById("previewNumber").textContent =
      "0000 0000 0000 0000";
    document.getElementById("previewHolder").textContent = "Имя держателя";
    document.getElementById("previewExpiry").textContent = "ММ/ГГ";
    document.getElementById("previewType").textContent = "VISA";
    document.getElementById("previewBankLogo").style.display = "none";
    document.querySelector(".card").style.background =
      "linear-gradient(135deg, #2c3e50, #4ca1af)";
  }

  function formatCardNumber(number) {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  }

  document.getElementById("cardNumber").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  });
});
