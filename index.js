const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const nameVal = capitalize(userName.value);

  
  if (nameVal.trim() !== ""  && userName.checkValidity() && userN.checkValidity()) {
    generatePDF(nameVal);
  } else {
    userName.reportValidity();
    userN.reportValidity();
  }
});

const generatePDF = async (name) => {
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


const totalTextWidth = Math.max(nameTextWidth, idTextWidth);
const totalTextHeight = Math.max(nameTextHeight, idTextHeight);
const centerX = (pageWidth - totalTextWidth) / 2;
const centerY = (pageHeight - totalTextHeight) / 2;

firstPage.drawText(name, {
  x: centerX,
  y: 270,
  size: textSize,
});

  const pdfBytes = await pdfDoc.save();
  console.log("Certificado Creado");
  var file = new File([pdfBytes], "Certificado de PGC", {
      type: "application/pdf;charset=utf-8",
    }
  );
  saveAs(file);
};


