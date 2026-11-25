const fs = require('fs');
const path = require('path');

const projectDir = 'C:\\Users\\User\\.gemini\\antigravity\\scratch\\nice-computer-education-reviews';
const logoPath = path.join(projectDir, 'assets', 'original-logo.jpg');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');

// Require the 100% compliant QR generator
const { QRCodeModel, QRErrorCorrectLevel } = require('C:\\Users\\User\\.gemini\\antigravity\\brain\\05484334-ccda-405f-9135-8b7f36ded179\\scratch\\qr-engine.js');

// Target URL
const reviewUrl = 'https://nicegoooglereview.vercel.app';

// Generate QR Code Model (Version 4, Error Correction M - 33x33 modules)
const qr = new QRCodeModel(4, QRErrorCorrectLevel.M);
qr.addData(reviewUrl);
qr.make();
const count = qr.getModuleCount(); // 33

// Build QR SVG with a mandatory 2-module Quiet Zone (37x37 total grid)
const quietZone = 2;
const totalGrid = count + quietZone * 2; // 37
const qrBoxSize = 600;
const modSize = qrBoxSize / totalGrid;

let qrSvgRects = '';
for (let r = 0; r < count; r++) {
  for (let c = 0; c < count; c++) {
    if (qr.isDark(r, c)) {
      const x = ((c + quietZone) * modSize).toFixed(2);
      const y = ((r + quietZone) * modSize).toFixed(2);
      const w = (modSize + 0.1).toFixed(2);
      const h = (modSize + 0.1).toFixed(2);
      qrSvgRects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f172a" />`;
    }
  }
}

// Full clean, 100% unobstructed, high-contrast QR SVG
const qrFullSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qrBoxSize} ${qrBoxSize}" width="${qrBoxSize}" height="${qrBoxSize}">
  <!-- Crisp pure white quiet zone background -->
  <rect width="${qrBoxSize}" height="${qrBoxSize}" fill="#ffffff" />
  <!-- Exact standard modules -->
  ${qrSvgRects}
</svg>
`;

function getStandeeInnerHtml() {
  return `
    <!-- Outer Frame Border (28px inset) -->
    <div class="outer-frame"></div>

    <!-- Top Left Google 4-Color Dots -->
    <div class="corner-dots left">
      <span class="g-dot dot-blue"></span>
      <span class="g-dot dot-red"></span>
      <span class="g-dot dot-yellow"></span>
      <span class="g-dot dot-green"></span>
    </div>

    <!-- Top Right Google 4-Color Dots -->
    <div class="corner-dots right">
      <span class="g-dot dot-blue"></span>
      <span class="g-dot dot-red"></span>
      <span class="g-dot dot-yellow"></span>
      <span class="g-dot dot-green"></span>
    </div>

    <!-- Top Brand Logo & Business Name -->
    <div class="brand-header">
      <div class="logo-container">
        <img src="data:image/jpeg;base64,${logoBase64}" alt="NICE Logo" class="brand-logo-img">
      </div>
      <div class="brand-title-wrap">
        <span class="brand-nice">NICE</span>
        <span class="brand-computer-edu">COMPUTER EDUCATION</span>
      </div>
      <div class="sub-badge">
        <span>🎓 SCHOOL OF CODING • OFFICIAL IT TRAINING CENTER</span>
      </div>
    </div>

    <!-- Google Reviews Heading -->
    <div class="google-section">
      <div class="google-logo-row">
        <span class="google-g">G</span><span class="google-o1">o</span><span class="google-o2">o</span><span class="google-g2">g</span><span class="google-l">l</span><span class="google-e">e</span>
        <span class="google-reviews-text">Reviews</span>
      </div>
      <div class="scan-headline">
        SCAN TO LEAVE US A REVIEW
      </div>
    </div>

    <!-- Large 740px Outer QR Container with 4-Color Signature Border -->
    <div class="qr-outer-wrapper">
      <div class="qr-border-box">
        <div class="qr-inner-card">
          ${qrFullSvg}
        </div>
      </div>
      
      <!-- Scan Instruction Pill & Direct URL -->
      <div class="instruction-wrap">
        <div class="camera-pill">
          <span class="camera-icon">📷</span>
          <span>Point Your Phone Camera to Scan</span>
        </div>
        <div class="url-display">
          nicegoooglereview.vercel.app
        </div>
      </div>
    </div>

    <!-- Appreciation & 5 Golden Stars -->
    <div class="appreciation-section">
      <div class="stars-row">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <div class="thank-you-text">THANK YOU</div>
      <div class="appreciate-subtext">We appreciate your valuable feedback &amp; support!</div>
    </div>

    <!-- Showroom / Institute Footer -->
    <div class="footer-section">
      <div class="footer-business-title">NICE COMPUTER EDUCATION • YAVATMAL</div>
      <div class="footer-info">
        📍 Plot No. 45, Bharathi Layout, Near Darda Nagar, Wadgaon, Yavatmal – 445001
      </div>
      <div class="footer-info">
        📞 Shailesh Sambhe: +91 97675 41889 &nbsp;•&nbsp; Namrata Sambhe: +91 97637 17418 (Call &amp; WhatsApp) &nbsp;•&nbsp; computereducation.nice@gmail.com
      </div>
    </div>
  `;
}

const cssStyles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
    }
    /* MASTER CANVAS: Exact 1400 x 2000 px Flat 2D Artwork */
    .standee-canvas {
      width: 1400px;
      height: 2000px;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 60px 70px 50px 70px;
    }

    /* Outer Clean Border Frame */
    .outer-frame {
      position: absolute;
      top: 28px;
      left: 28px;
      right: 28px;
      bottom: 28px;
      border: 3.5px solid #e2e8f0;
      border-radius: 28px;
      pointer-events: none;
    }

    /* Top Google 4-Color Dots in Corners */
    .corner-dots {
      position: absolute;
      top: 52px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 10;
    }
    .corner-dots.left {
      left: 62px;
    }
    .corner-dots.right {
      right: 62px;
    }
    .g-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
    .dot-blue { background-color: #4285F4; }
    .dot-red { background-color: #EA4335; }
    .dot-yellow { background-color: #FBBC05; }
    .dot-green { background-color: #34A853; }

    /* Top Brand Center */
    .brand-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10px;
    }
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .brand-logo-img {
      width: 124px;
      height: 124px;
      border-radius: 26px;
      object-fit: cover;
      box-shadow: 0 6px 20px rgba(6, 78, 59, 0.15);
      border: 3px solid #ecfdf5;
    }
    .brand-title-wrap {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 16px;
      line-height: 1.1;
      margin-bottom: 14px;
    }
    .brand-nice {
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
      font-size: 58px;
      font-weight: 900;
      color: #064E3B;
      letter-spacing: -0.02em;
    }
    .brand-computer-edu {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      font-size: 42px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    
    /* Dealer / Sub-badge */
    .sub-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #ecfdf5;
      border: 2px solid #a7f3d0;
      padding: 10px 28px;
      border-radius: 9999px;
      color: #047857;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    /* Google Reviews Section */
    .google-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin: 15px 0 10px 0;
    }
    .google-logo-row {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 58px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }
    .google-g { color: #4285F4; }
    .google-o1 { color: #EA4335; }
    .google-o2 { color: #FBBC05; }
    .google-g2 { color: #4285F4; }
    .google-l { color: #34A853; }
    .google-e { color: #EA4335; }
    .google-reviews-text {
      color: #1e293b;
      font-weight: 700;
      margin-left: 14px;
    }
    .scan-headline {
      font-size: 46px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      line-height: 1.2;
    }

    /* Large QR Code Container */
    .qr-outer-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
    .qr-border-box {
      width: 740px;
      height: 740px;
      padding: 14px;
      border-radius: 46px;
      background: linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-inner-card {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    /* Scan Instructions & Pill */
    .instruction-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 24px;
    }
    .camera-pill {
      background: #0f172a;
      color: #ffffff;
      padding: 16px 42px;
      border-radius: 9999px;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.02em;
      display: inline-flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
    }
    .camera-icon {
      font-size: 26px;
    }
    .url-display {
      color: #475569;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    /* Appreciation & 5 Stars */
    .appreciation-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10px;
    }
    .stars-row {
      display: flex;
      gap: 12px;
      color: #FBBC04;
      font-size: 44px;
      margin-bottom: 8px;
      filter: drop-shadow(0 2px 4px rgba(251, 188, 4, 0.35));
    }
    .thank-you-text {
      font-size: 42px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .appreciate-subtext {
      font-size: 21px;
      color: #475569;
      font-weight: 600;
      margin-top: 6px;
    }

    /* Footer Section */
    .footer-section {
      width: 100%;
      text-align: center;
      border-top: 2px solid #e2e8f0;
      padding-top: 22px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .footer-business-title {
      font-size: 25px;
      font-weight: 800;
      color: #064E3B;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .footer-info {
      font-size: 19px;
      color: #64748b;
      font-weight: 600;
      line-height: 1.4;
    }
`;

// 1. Generate standee-canvas.html (Exact 1400x2000 px edge-to-edge)
const canvasHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NICE Google Review Standee Canvas (1400x2000)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${cssStyles}
    body {
      width: 1400px;
      height: 2000px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <div class="standee-canvas">
    ${getStandeeInnerHtml()}
  </div>
</body>
</html>
`;
fs.writeFileSync(path.join(projectDir, 'standee-canvas.html'), canvasHtml);
console.log('Saved standee-canvas.html');

// 2. Generate standee-master.html (Browser preview)
const masterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NICE Computer Education - Tabletop Standee (1400x2000 HD)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${cssStyles}
    body {
      background-color: #f1f5f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    .action-bar {
      margin-bottom: 25px;
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .btn-download {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #ffffff;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .btn-download:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(5, 150, 105, 0.45);
    }
    .btn-secondary {
      background: #ffffff;
      color: #334155;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 12px;
      border: 1px solid #cbd5e1;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .standee-canvas {
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
      border-radius: 32px;
    }
    @media print {
      body {
        padding: 0;
        background: none;
      }
      .action-bar {
        display: none !important;
      }
      .standee-canvas {
        box-shadow: none !important;
        border-radius: 0 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Print & Download Control Bar -->
  <div class="action-bar no-print">
    <button onclick="window.print()" class="btn-download">
      🖨️ Print Direct Artwork (A4/A5)
    </button>
    <a href="standee-master-1400x2000.png" download="NICE_Google_Review_Standee_1400x2000.png" class="btn-secondary">
      📥 Download 1400x2000 HD Image (PNG)
    </a>
    <a href="index.html" class="btn-secondary">
      ← Student Review App
    </a>
  </div>

  <div id="standeeArtwork" class="standee-canvas">
    ${getStandeeInnerHtml()}
  </div>

</body>
</html>
`;
fs.writeFileSync(path.join(projectDir, 'standee-master.html'), masterHtml);
console.log('Saved standee-master.html');
