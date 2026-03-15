function resizeSelect(select) {
  const tmp = document.createElement('span');
  document.body.appendChild(tmp);

  tmp.style.visibility = 'hidden';
  tmp.style.position = 'absolute';
  tmp.style.whiteSpace = 'nowrap';
  tmp.style.font = window.getComputedStyle(select).font;

  let maxWidth = 0;
  for (const option of select.options) {
    tmp.textContent = option.text;
    const w = tmp.getBoundingClientRect().width;
    if (w > maxWidth) maxWidth = w;
  }

  document.body.removeChild(tmp);

  select.style.width = `${maxWidth + 40}px`; // 40px buffer voor dropdown arrow
}

const select = document.getElementById('mySelect');
resizeSelect(select);

// Optioneel: als opties dynamisch veranderen
select.addEventListener('change', () => resizeSelect(select));
async function checkSubdomain() {
  const sub = document.getElementById("sub").value.trim();
  const domain = document.getElementById("selection").value;
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
