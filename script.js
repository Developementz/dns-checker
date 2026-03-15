async function checkSubdomain() {
  const sub = document.getElementById("sub").value.trim();
  const domain = document.getElementById("selection");
  const host = sub + domain;

  const url = "https://dns.google/resolve?name=" + host + "&type=A";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const p = document.getElementById("result");

    if (data.Answer && data.Answer.length > 0) {
      p.textContent = "Not available"; // already exists
    } else {
      p.textContent = "Available"; // available
    }

  } catch (err) {
    document.getElementById("result").textContent = "Error checking";
  }
}
