const userName = document.getElementById("name");
const userN = document.getElementById("id");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;

submitBtn.addEventListener("click", () => {
  const nameVal = userName.value;
  const idVal = userN.value;
  
  if (!validateName(nameVal)) {
    alert('Por favor, ingresa un nombre válido (solo letras).');
    return;
  }

  if (!validateID(idVal)) {
    alert('Por favor, ingresa un número de identificación válido (solo números).');
    return;
  }

  generatePDF(nameVal, idVal);
});

const validateName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name);
}

const validateID = (id) => {
  return /^\d+$/.test(id);
}

const generatePDF = async (name, id) => {
  const existingPdfBytes = await fetch("./Certificado.pdf").then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await fetch("./CenturyGothic.ttf").then((res) =>
    res.arrayBuffer()
  );

  const CenturyGothic = await pdfDoc.embedFont(fontBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const textSize = 30;
  const pageWidth = firstPage.getWidth();
  const pageHeight = firstPage.getHeight();

  const nameTextWidth = CenturyGothic.widthOfTextAtSize(name, textSize);
  const nameTextHeight = CenturyGothic.widthOfTextAtSize(name, textSize);
  const idTextWidth = CenturyGothic.widthOfTextAtSize(id, textSize);
  const idTextHeight = CenturyGothic.widthOfTextAtSize(id, textSize);

  const totalTextWidth = Math.max(nameTextWidth, idTextWidth);
  const totalTextHeight = Math.max(nameTextHeight, idTextHeight);
  const centerX = (pageWidth - totalTextWidth) / 2;
  const centerY = (pageHeight - totalTextHeight) / 2;

  firstPage.drawText(name, {
    x: centerX,
    y: 270,
    size: textSize,
  });

  firstPage.drawText(id, {
    x: centerX, 
    y: 245,
    size: 18,
  });

  const pdfBytes = await pdfDoc.save();
  console.log("Certificado Creado");
  var file = new File([pdfBytes], "Certificado de PGC", {
      type: "application/pdf;charset=utf-8",
    }
  );
  saveAs(file);
};
