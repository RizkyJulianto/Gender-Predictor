const api = "https://api.genderize.io";

const result = document.getElementById("result");
const beforePredict = document.getElementById("beforePredict");
const input = document.getElementById("inputName");

input.addEventListener("input", function () {
  if (input.value.trim() === "") {
    result.style.display = "none";
    result.style.opacity = "0";

    beforePredict.style.display = "flex";
  }
});

function showResult(name, gender, probability) {
  const probabilityPrecentage = Math.round(probability * 100);

  let genderDecode;

  if (gender == "male") {
    genderDecode = "👨 Laki-laki";
  } else if (gender == "female") {
    genderDecode = "👧 Perempuan";
  } else {
    genderDecode = "Tidak diketahui";
  }

  const content = `
    <span class="title">HASIL PREDIKSI</span>
    <h2 class="name">${name}</h2>
    <h3 class="gender">${genderDecode}</h3>
    <span class="probability">Tingkat keyakinan: ${probabilityPrecentage}%</span>
  `;

  beforePredict.style.display = "none";

  result.innerHTML = content;
  result.style.opacity = "1";
  result.style.display = "flex";
}

async function predict() {
  const name = input.value.trim();

  if (name === "") {
    alert("Masukkan nama terlebih dahulu");
    return;
  }

  const query = `${api}/?name=${name}&country_id=ID`;

  const response = await fetch(query);
  const data = await response.json();

  showResult(data.name, data.gender, data.probability);
}