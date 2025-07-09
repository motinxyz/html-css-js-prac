const previewElement = document.getElementById("element");
const cSSCodeDisplayBox = document.getElementById("code");
const sliders = document.querySelectorAll(".sliders input");

sliders.forEach((slider) => slider.addEventListener("input", generateShadow));

function generateShadow() {
  const shadowParams = getShadowParams();
  const writtenShadowProperties = createBoxShadow(...shadowParams);
  applyShadow(previewElement, writtenShadowProperties);
  displayCSSCodeForTheShadow(cSSCodeDisplayBox, writtenShadowProperties);
}

function getShadowParams() {
  const hShadow = parseInt(document.getElementById("h-shadow").value);
  const vShadow = parseInt(document.getElementById("v-shadow").value);
  const blurRadius = parseInt(document.getElementById("blur-radius").value);
  const spreadRadius = parseInt(document.getElementById("spread-radius").value);
  const shadowColor = document.getElementById("shadow-color").value;
  const shadowColorOpacity = parseFloat(
    document.getElementById("shadow-color-opacity").value
  ).toFixed(1);
  const shadowInset = document.getElementById("shadow-inset").checked;

  return [
    hShadow,
    vShadow,
    blurRadius,
    spreadRadius,
    shadowColor,
    shadowColorOpacity,
    shadowInset,
  ];
}

function createBoxShadow(
  hShadow,
  vShadow,
  blurRadius,
  spreadRadius,
  shadowColor,
  shadowColorOpacity,
  shadowInset
) {
  const inset = shadowInset ? "inset" : "";
  const rgbaColor = hexToRgba(shadowColor, shadowColorOpacity);

  return `${inset} ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
}

function hexToRgba(shadowColor, shadowColorOpacity) {
  const r = parseInt(shadowColor.slice(1, 3), 16);
  const g = parseInt(shadowColor.slice(3, 5), 16);
  const b = parseInt(shadowColor.slice(5), 16);
  return `rgba(${r}, ${g}, ${b}, ${shadowColorOpacity})`;
}

function applyShadow(previewElement, writtenShadowProperties) {
  previewElement.style.boxShadow = writtenShadowProperties;
}

function displayCSSCodeForTheShadow(
  cSSCodeDisplayBox,
  writtenShadowProperties
) {
  cSSCodeDisplayBox.textContent = `box-shadow: ${writtenShadowProperties}`;
}

function copyCSSCode() {
  const cssCode = cSSCodeDisplayBox.textContent;
  navigator.clipboard.writeText(cssCode).then(() => {
    alert("Code Copied!");
  });
}
window.onload(generateShadow());
