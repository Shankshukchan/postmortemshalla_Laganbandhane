import React, { useRef, useState, useContext } from "react";
import { LanguageContext } from "../../LanguageContext";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, ImageRun } from "docx";

const Editor = () => {
  const location = useLocation();
  const template = location.state?.template;

  // Editor state
  // A4 size at 96dpi: 794 x 1123 px (portrait)
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  // Admin-uploaded images/borders will be fetched from backend when available
  const [fetchedPhotos, setFetchedPhotos] = useState([]);
  const [fetchedBorders, setFetchedBorders] = useState([]);
  const [uploadedFonts, setUploadedFonts] = useState([]);
  const fontStyleRefs = useRef({});
  // Default built-in assets as fallback
  const builtinPhotos = [
    "/images/banner.png",
    "/images/leaf.png",
    "/images/service.png",
    "/images/temp.png",
    "/images/banner(1)(1).png",
  ];
  const builtinBorders = [
    "/images/images.png",
    "/images/images.jpeg",
    "/images/u1.png",
    "/images/u2.png",
  ];
  const templateType = template?.type || "with-image";
  const allowUserImage = templateType === "with-image";
  const [photo, setPhoto] = useState(builtinPhotos[0]);
  const [localImageFile, setLocalImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [border, setBorder] = useState("");
  const [layout, setLayout] = useState("layout1");
  const [font, setFont] = useState("serif");
  // gods/admin image position (top/bottom) and smaller size option
  const [godsPosition, setGodsPosition] = useState("top");
  const [godsSize, setGodsSize] = useState(60);
  // user-uploaded image controls (size in px and position)
  const [userImageSize, setUserImageSize] = useState(80);
  const [userImagePosition, setUserImagePosition] = useState("top-right");
  // Editable biodata/profile fields
  const [fields, setFields] = useState([
    {
      id: 1,
      label: "Name",
      value: "",
      labelSize: 20,
      valueSize: 28,
      color: "#6E1E1E",
      align: "center",
    },
    {
      id: 2,
      label: "Email",
      value: "",
      labelSize: 18,
      valueSize: 24,
      color: "#6E1E1E",
      align: "center",
    },
    {
      id: 3,
      label: "Birthdate",
      value: "",
      labelSize: 18,
      valueSize: 24,
      color: "#6E1E1E",
      align: "center",
    },
    {
      id: 4,
      label: "Caste",
      value: "",
      labelSize: 18,
      valueSize: 24,
      color: "#6E1E1E",
      align: "center",
    },
    {
      id: 5,
      label: "Religion",
      value: "",
      labelSize: 18,
      valueSize: 24,
      color: "#6E1E1E",
      align: "center",
    },
    {
      id: 6,
      label: "Age",
      value: "",
      labelSize: 18,
      valueSize: 24,
      color: "#6E1E1E",
      align: "center",
    },
    {
      id: 7,
      label: "Marriage Status",
      value: "",
      labelSize: 18,
      valueSize: 24,
      color: "#6E1E1E",
      align: "center",
    },
  ]);
  const [lineHeight, setLineHeight] = useState(56);
  const [autoFit, setAutoFit] = useState(true);
  // create a compact signature for fields so we can subscribe to changes
  const fieldsSignature = JSON.stringify(
    fields.map((f) => ({
      value: f.value,
      labelSize: f.labelSize,
      valueSize: f.valueSize,
      color: f.color,
      align: f.align,
    }))
  );
  const canvasRef = useRef(null);
  const [jpegQuality, setJpegQuality] = useState(0.92);
  const [pdfFormatOption, setPdfFormatOption] = useState("a4");
  const [canvasTainted, setCanvasTainted] = useState(false);

  // Read translations from LanguageContext (safe fallback)
  const langCtx = useContext(LanguageContext) || {};
  const t = langCtx.t || {};

  // Layout options
  const layouts = [
    { id: "layout1", name: "Photo Top, Text Below" },
    { id: "layout2", name: "Photo Left, Text Right" },
    { id: "layout3", name: "Text Over Photo" },
  ];
  const fonts = [
    { id: "serif", name: "Serif", style: "serif" },
    { id: "sans", name: "Sans-serif", style: "sans-serif" },
    { id: "cursive", name: "Cursive", style: "cursive" },
    { id: "monospace", name: "Monospace", style: "monospace" },
  ];

  // Fetch public assets (admin-uploaded) so editor can show admin photos/borders/fonts
  React.useEffect(() => {
    const apiBase =
      (import.meta.env && import.meta.env.VITE_API_URL) ||
      "http://localhost:8000";
    const prefixUrl = (u) => (u && u.startsWith("/") ? `${apiBase}${u}` : u);

    const fetchCategory = async (category) => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(
          `${apiBase}/api/assets/public?category=${encodeURIComponent(
            category
          )}`,
          { headers }
        );
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data || []).map((a) => ({ ...a, url: prefixUrl(a.url) }));
      } catch (err) {
        console.error("fetch public assets error", err);
        return [];
      }
    };

    const load = async () => {
      const [photos, borders, fontsRes] = await Promise.all([
        fetchCategory("adminPhoto"),
        fetchCategory("border"),
        fetchCategory("font"),
      ]);

      if (photos && photos.length) setFetchedPhotos(photos.map((p) => p.url));
      if (borders && borders.length)
        setFetchedBorders(borders.map((b) => b.url));

      if (fontsRes && fontsRes.length) {
        try {
          const regs = [];
          fontsRes.forEach((f) => {
            const fam = `uploaded-font-${f._id}`;
            const url = f.url;
            // avoid duplicate registration
            if (
              !document.querySelector(`style[data-uploaded-font="${f._id}"]`)
            ) {
              const style = document.createElement("style");
              style.setAttribute("data-uploaded-font", f._id);
              let fmt = "";
              if (url.endsWith(".woff2")) fmt = "format('woff2')";
              else if (url.endsWith(".woff")) fmt = "format('woff')";
              else if (url.endsWith(".ttf")) fmt = "format('truetype')";
              style.textContent = `@font-face { font-family: '${fam}'; src: url('${url}') ${fmt}; font-weight: normal; font-style: normal; }`;
              document.head.appendChild(style);
            }
            regs.push({ id: fam, name: f.originalName || fam, style: fam });
          });
          setUploadedFonts(regs);
        } catch (e) {
          console.warn("failed to register uploaded fonts", e);
        }
      }
    };

    load();
    const onStorage = (ev) => {
      if (ev.key === "media_updated_at") load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Download as image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvasTainted) {
      swal(
        "Export blocked",
        "This template uses images that prevent client-side export because they don't allow cross-origin access. See the warning in the editor for fixes.",
        "warning"
      );
      return;
    }
    try {
      const link = document.createElement("a");
      link.download = "template.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("export png failed", err);
      swal(
        "Export failed",
        "Cannot export image. This usually happens when the canvas contains images served from another origin without CORS headers (tainted canvas). Ensure assets allow cross-origin access or use server-side export.",
        "error"
      );
    }
  };

  const handleDownloadJPEG = (quality = 0.92) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvasTainted) {
      swal(
        "Export blocked",
        "This template uses images that prevent client-side export because they don't allow cross-origin access. See the warning in the editor for fixes.",
        "warning"
      );
      return;
    }
    try {
      const link = document.createElement("a");
      link.download = "template.jpg";
      link.href = canvas.toDataURL("image/jpeg", quality ?? jpegQuality);
      link.click();
    } catch (err) {
      console.error("export jpeg failed", err);
      swal(
        "Export failed",
        "Cannot export JPEG. Canvas may be tainted by cross-origin images. Ensure assets have proper CORS headers or use server-side export.",
        "error"
      );
    }
  };

  const handleDownloadPDF = (format = "a4") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvasTainted) {
      swal(
        "Export blocked",
        "This template uses images that prevent client-side export because they don't allow cross-origin access. See the warning in the editor for fixes.",
        "warning"
      );
      return;
    }
    // Convert canvas to image
    try {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: format || pdfFormatOption });
      // Draw image to full page respecting chosen page size
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pw, ph);
      pdf.save("template.pdf");
    } catch (err) {
      console.error("export pdf failed", err);
      swal(
        "Export failed",
        "Cannot export PDF. The canvas may be tainted by cross-origin images. Ensure assets have proper CORS headers or use server-side export.",
        "error"
      );
    }
  };

  const handleDownloadWord = () => {
    // Create a real .docx using docx library with the canvas image embedded
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvasTainted) {
      swal(
        "Export blocked",
        "This template uses images that prevent client-side export because they don't allow cross-origin access. See the warning in the editor for fixes.",
        "warning"
      );
      return;
    }
    let dataUrl;
    try {
      dataUrl = canvas.toDataURL("image/png");
    } catch (err) {
      console.error("export docx failed", err);
      swal(
        "Export failed",
        "Cannot export DOCX. The canvas may be tainted by cross-origin images. Ensure assets have CORS headers or use server-side export.",
        "error"
      );
      return;
    }
    // convert dataURL to Uint8Array
    function dataURLtoUint8Array(dataURL) {
      const base64 = dataURL.split(",")[1];
      const raw = atob(base64);
      const rawLength = raw.length;
      const array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }

    const imageBuffer = dataURLtoUint8Array(dataUrl);
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: { width: 595, height: 842 },
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "template.docx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // Draw preview on canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Background
    ctx.fillStyle = "#fffbe6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const testTaint = () => {
      setTimeout(() => {
        try {
          canvas.toDataURL("image/png");
          setCanvasTainted(false);
        } catch (err) {
          setCanvasTainted(true);
        }
      }, 80);
    };

    function drawMainContent() {
      const padX = 60;
      let yStart = 420;

      // Helper to draw admin/gods image
      const drawGodsImage = (imgSrc, cb) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => cb(null, img);
        img.onerror = () => {
          // retry without crossOrigin but mark tainted
          img.crossOrigin = null;
          img.src = imgSrc;
          setCanvasTainted(true);
          cb(null, img);
        };
        img.src = imgSrc;
      };

      const drawLocalImage = (dataUrl, cb) => {
        const i = new window.Image();
        i.onload = () => cb(null, i);
        i.onerror = (e) => cb(e || new Error("failed to load local image"));
        i.src = dataUrl;
      };

      // Depending on layout draw images differently
      if (layout === "layout1") {
        // center gods image at top or bottom
        if (photo) {
          drawGodsImage(photo, (err, img) => {
            const logoRadius = godsSize || 90;
            const logoX = canvas.width / 2;
            const logoY = godsPosition === "bottom" ? canvas.height - 140 : 140;
            ctx.save();
            ctx.beginPath();
            ctx.arc(logoX, logoY, logoRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(
              img,
              logoX - logoRadius,
              logoY - logoRadius,
              logoRadius * 2,
              logoRadius * 2
            );
            ctx.restore();

            // draw local user uploaded image respecting userImageSize and position
            if (localImageFile) {
              drawLocalImage(localImageFile, (le, li) => {
                const sw = userImageSize || 80;
                let ux = canvas.width - padX - sw;
                let uy = logoY - sw / 2;
                if (userImagePosition === "top-left") {
                  ux = padX;
                  uy = 40;
                } else if (userImagePosition === "top-right") {
                  ux = canvas.width - padX - sw;
                  uy = 40;
                } else if (userImagePosition === "bottom-right") {
                  ux = canvas.width - padX - sw;
                  uy = canvas.height - padX - sw;
                } else if (userImagePosition === "bottom-left") {
                  ux = padX;
                  uy = canvas.height - padX - sw;
                } else if (userImagePosition === "center") {
                  ux = Math.round((canvas.width - sw) / 2);
                  uy = Math.round((canvas.height - sw) / 2);
                }
                ctx.save();
                ctx.beginPath();
                roundRectPath(ctx, ux, uy, sw, sw, 12);
                ctx.clip();
                ctx.drawImage(li, ux, uy, sw, sw);
                ctx.restore();
              });
            }

            drawFields(ctx, fields, padX, yStart);
          });
        } else {
          drawFields(ctx, fields, padX, yStart);
        }
      } else if (layout === "layout2") {
        // gods image left, text right
        const logoRadius = godsSize || 90;
        const logoX = padX + logoRadius;
        const logoY = godsPosition === "bottom" ? canvas.height - 220 : 160;
        if (photo) {
          drawGodsImage(photo, (err, img) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(logoX, logoY, logoRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(
              img,
              logoX - logoRadius,
              logoY - logoRadius,
              logoRadius * 2,
              logoRadius * 2
            );
            ctx.restore();

            // local image placed according to userImagePosition & size
            if (localImageFile) {
              drawLocalImage(localImageFile, (le, li) => {
                const sw = userImageSize || 76;
                let ux = padX + 6;
                let uy = logoY + logoRadius + 12;
                if (userImagePosition === "top-left") {
                  ux = padX;
                  uy = 40;
                } else if (userImagePosition === "top-right") {
                  ux = canvas.width - padX - sw;
                  uy = 40;
                } else if (userImagePosition === "bottom-right") {
                  ux = canvas.width - padX - sw;
                  uy = canvas.height - padX - sw;
                } else if (userImagePosition === "bottom-left") {
                  ux = padX;
                  uy = canvas.height - padX - sw;
                } else if (userImagePosition === "center") {
                  ux = Math.round((canvas.width - sw) / 2);
                  uy = Math.round((canvas.height - sw) / 2);
                }
                ctx.save();
                ctx.beginPath();
                roundRectPath(ctx, ux, uy, sw, sw, 10);
                ctx.clip();
                ctx.drawImage(li, ux, uy, sw, sw);
                ctx.restore();
              });
            }

            drawFields(ctx, fields, padX + logoRadius * 2 + 30, 140, "left");
          });
        } else {
          drawFields(ctx, fields, padX + logoRadius * 2 + 30, 140, "left");
        }
      } else {
        // layout3: text over photo — draw photo as a soft background
        if (photo) {
          const bg = new window.Image();
          bg.crossOrigin = "anonymous";
          bg.onload = () => {
            // draw cover image on top area
            ctx.save();
            ctx.globalAlpha = 0.95;
            ctx.drawImage(
              bg,
              0,
              0,
              canvas.width,
              Math.round(canvas.height * 0.5)
            );
            ctx.restore();
            drawFields(ctx, fields, 60, Math.round(canvas.height * 0.25));
          };
          bg.onerror = () => {
            bg.crossOrigin = null;
            bg.src = photo;
            setCanvasTainted(true);
          };
          bg.src = photo;
        } else {
          drawFields(ctx, fields, 60, Math.round(canvas.height * 0.25));
        }
      }
    }

    // draw border first if any so it sits behind content
    if (border) {
      const borderImg = new window.Image();
      borderImg.crossOrigin = "anonymous";
      borderImg.onload = () => {
        ctx.save();
        ctx.globalAlpha = 0.95;
        ctx.drawImage(borderImg, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawMainContent();
        testTaint();
      };
      borderImg.onerror = () => {
        try {
          borderImg.crossOrigin = null;
          borderImg.src = border;
        } catch (e) {}
        setCanvasTainted(true);
      };
      borderImg.src = border;
    } else {
      drawMainContent();
      testTaint();
    }

    // small helper to draw rounded rect path
    function roundRectPath(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
  }, [
    photo,
    border,
    layout,
    font,
    fieldsSignature,
    godsPosition,
    godsSize,
    localImageFile,
    userImageSize,
    userImagePosition,
    autoFit,
    lineHeight,
  ]);

  // If fetched photos become available and the user hasn't changed photo from the initial builtin,
  // prefer the first fetched photo so editor shows uploaded content.
  React.useEffect(() => {
    if (fetchedPhotos && fetchedPhotos.length > 0) {
      // if current photo is one of the builtinPhotos (not a previously selected uploaded one)
      if (builtinPhotos.includes(photo)) {
        setPhoto(fetchedPhotos[0]);
      }
    }
  }, [fetchedPhotos]);

  const availableBorders =
    fetchedBorders && fetchedBorders.length ? fetchedBorders : builtinBorders;
  const availablePhotos =
    fetchedPhotos && fetchedPhotos.length ? fetchedPhotos : builtinPhotos;
  // If template disallows user images, only show admin-uploaded photos (fetchedPhotos)
  const photosForSelector =
    templateType === "without-image"
      ? fetchedPhotos.length
        ? fetchedPhotos
        : []
      : availablePhotos;
  const availableFonts =
    uploadedFonts && uploadedFonts.length
      ? [...fonts, ...uploadedFonts]
      : fonts;

  function drawFields(
    ctx,
    fields,
    padX,
    yStart,
    align = "center",
    shadow = false
  ) {
    // helper to wrap text into lines not exceeding maxWidth
    function wrapText(ctx, text, maxWidth) {
      if (!text) return [""];
      const words = text.toString().split(/\s+/);
      const lines = [];
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const test = line ? `${line} ${words[i]}` : words[i];
        const w = ctx.measureText(test).width;
        if (w <= maxWidth) {
          line = test;
        } else {
          if (line) lines.push(line);
          line = words[i];
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    fields.forEach((field, idx) => {
      ctx.save();
      const labelSize = field.labelSize || 20;
      let valueSize = field.valueSize || 28;
      const textColor = field.color || (shadow ? "#fff" : "#6E1E1E");
      const textAlignment = field.align || align; // left | center | right

      ctx.fillStyle = textColor;
      ctx.textBaseline = "middle"; // easier vertical centering
      if (shadow) {
        ctx.shadowColor = "#6E1E1E";
        ctx.shadowBlur = 8;
      }

      const family = (fonts.find((f) => f.id === font) || {}).style || "serif";
      const labelText = (field.label || "") + ":";

      // measure label width
      ctx.font = `bold ${labelSize}px ${family}`;
      const labelWidth = ctx.measureText(labelText).width;

      // measure value (initial)
      ctx.font = `bold ${valueSize}px ${family}`;
      let value = field.value ? field.value.toString() : "";
      let valueWidth = ctx.measureText(value).width;

      const gap = 10; // space between label and value
      const yCenter = yStart + idx * lineHeight + Math.round(lineHeight / 2);

      // compute positions depending on alignment
      if (textAlignment === "left") {
        const labelX = padX;
        let valueX = padX + labelWidth + gap;
        // available width for value
        const maxValueWidth = A4_WIDTH - padX - valueX;

        // auto-fit if necessary
        if (autoFit) {
          ctx.font = `bold ${valueSize}px ${family}`;
          while (
            valueSize > 10 &&
            ctx.measureText(value).width > maxValueWidth
          ) {
            valueSize -= 2;
            ctx.font = `bold ${valueSize}px ${family}`;
          }
        }

        // wrap if still too long
        ctx.font = `bold ${valueSize}px ${family}`;
        const lines = wrapText(ctx, value, maxValueWidth);

        // draw label (single line)
        ctx.font = `bold ${labelSize}px ${family}`;
        ctx.textAlign = "left";
        ctx.fillText(labelText, labelX, yCenter);

        // draw value lines starting at valueX
        ctx.font = `bold ${valueSize}px ${family}`;
        ctx.textAlign = "left";
        const valueLineHeight = Math.round(valueSize * 1.2);
        let curY =
          yCenter - Math.floor(((lines.length - 1) * valueLineHeight) / 2);
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], valueX, curY);
          curY += valueLineHeight;
        }
      } else if (textAlignment === "right") {
        // value right aligned at padX from right edge
        const valueX = A4_WIDTH - padX;
        // label will be placed to the left of the value
        const maxValueWidth = A4_WIDTH - padX * 2 - labelWidth - gap;

        if (autoFit) {
          ctx.font = `bold ${valueSize}px ${family}`;
          while (
            valueSize > 10 &&
            ctx.measureText(value).width > maxValueWidth
          ) {
            valueSize -= 2;
            ctx.font = `bold ${valueSize}px ${family}`;
          }
        }

        ctx.font = `bold ${valueSize}px ${family}`;
        const lines = wrapText(ctx, value, maxValueWidth);

        // draw value lines (right aligned)
        ctx.font = `bold ${valueSize}px ${family}`;
        ctx.textAlign = "right";
        const valueLineHeight = Math.round(valueSize * 1.2);
        let curY =
          yCenter - Math.floor(((lines.length - 1) * valueLineHeight) / 2);
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], valueX, curY);
          curY += valueLineHeight;
        }

        // draw label to the left of the first value line
        ctx.font = `bold ${labelSize}px ${family}`;
        ctx.textAlign = "right";
        ctx.fillText(
          labelText,
          valueX - (ctx.measureText(lines[0] || "").width + gap),
          yCenter
        );
      } else {
        // center
        // measure value again and compute total width
        ctx.font = `bold ${valueSize}px ${family}`;
        const maxValueWidth = A4_WIDTH - padX * 2 - gap - 20; // some breathing room

        if (autoFit) {
          ctx.font = `bold ${valueSize}px ${family}`;
          while (
            valueSize > 10 &&
            ctx.measureText(value).width > maxValueWidth
          ) {
            valueSize -= 2;
            ctx.font = `bold ${valueSize}px ${family}`;
          }
        }

        ctx.font = `bold ${valueSize}px ${family}`;
        const valueLines = wrapText(ctx, value, maxValueWidth);
        // compute widths
        ctx.font = `bold ${labelSize}px ${family}`;
        const lw = ctx.measureText(labelText).width;
        ctx.font = `bold ${valueSize}px ${family}`;
        const vw = Math.max(...valueLines.map((l) => ctx.measureText(l).width));
        const totalW = lw + gap + vw;
        const startX = Math.round(A4_WIDTH / 2 - totalW / 2);

        // draw label
        ctx.font = `bold ${labelSize}px ${family}`;
        ctx.textAlign = "left";
        ctx.fillText(labelText, startX, yCenter);

        // draw value lines centered on the remaining block
        ctx.font = `bold ${valueSize}px ${family}`;
        ctx.textAlign = "left";
        const blockX = startX + lw + gap;
        const valueLineHeight = Math.round(valueSize * 1.2);
        let curYv =
          yCenter - Math.floor(((valueLines.length - 1) * valueLineHeight) / 2);
        for (let i = 0; i < valueLines.length; i++) {
          // center each line inside the vw area
          const line = valueLines[i];
          const lineW = ctx.measureText(line).width;
          const lineX = blockX + Math.round((vw - lineW) / 2);
          ctx.fillText(line, lineX, curYv);
          curYv += valueLineHeight;
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    });
  }

  return (
    <div
      className="editor-page"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #fdf6ec 0%, #f7e9d7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1300,
          background: "rgba(255,255,255,0.97)",
          borderRadius: 24,
          boxShadow: "0 8px 40px #d4af3722",
          padding: "40px 32px 32px 32px",
          margin: "40px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.3rem",
            fontWeight: "bold",
            marginBottom: 10,
            color: "#6E1E1E",
            letterSpacing: "1px",
            textShadow: "0 2px 12px #f7e9d7",
          }}
        >
          {t.templateEditorTitle}
        </h2>
        <div
          style={{
            marginBottom: 28,
            color: "#7c5c1e",
            fontSize: "1.1rem",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          {template?.description}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 48,
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* Controls */}
          <div
            style={{
              flex: 1,
              minWidth: 260,
              maxWidth: 340,
              background: "rgba(253,246,236,0.7)",
              borderRadius: 18,
              boxShadow: "0 2px 12px #d4af3722",
              padding: "28px 22px",
              marginBottom: 16,
            }}
          >
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 700, color: "#6E1E1E" }}>
                {t.chooseBorder}
              </label>
              <select
                value={border}
                onChange={(e) => setBorder(e.target.value)}
                style={{
                  display: "block",
                  marginTop: 10,
                  width: "100%",
                  fontSize: "1rem",
                  borderRadius: 8,
                  padding: 8,
                  border: "1px solid #e2e8f0",
                }}
              >
                <option value="">No Border</option>
                {availableBorders.map((img, idx) => (
                  <option key={img} value={img}>
                    Border {idx + 1}
                  </option>
                ))}
              </select>
              {border && (
                <div style={{ marginTop: 10, textAlign: "center" }}>
                  <img
                    src={border}
                    alt="Selected Border"
                    style={{
                      maxWidth: 180,
                      maxHeight: 120,
                      borderRadius: 8,
                      boxShadow: "0 2px 8px #d4af3722",
                      border: "2px solid #D4AF37",
                    }}
                  />
                </div>
              )}
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 700, color: "#6E1E1E" }}>
                {t.chooseAdminPhoto}
              </label>
              <select
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                style={{
                  display: "block",
                  marginTop: 10,
                  width: "100%",
                  fontSize: "1rem",
                  borderRadius: 8,
                  padding: 8,
                  border: "1px solid #e2e8f0",
                }}
              >
                {photosForSelector.length > 0 ? (
                  photosForSelector.map((img, idx) => (
                    <option key={img} value={img}>
                      Photo {idx + 1}
                    </option>
                  ))
                ) : (
                  <option value="">No admin images available</option>
                )}
              </select>

              {/* Upload your own photo button (visible only for with-image templates) */}
              {allowUserImage && (
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    style={{
                      padding: "8px 12px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Upload your own photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files && e.target.files[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setLocalImageFile(ev.target.result);
                      };
                      reader.readAsDataURL(f);
                    }}
                  />
                  {localImageFile && (
                    <img
                      src={localImageFile}
                      alt="uploaded preview"
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  )}
                </div>
              )}
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <img
                  src={photo}
                  alt="Selected"
                  style={{
                    maxWidth: 180,
                    maxHeight: 120,
                    borderRadius: 8,
                    boxShadow: "0 2px 8px #d4af3722",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <label style={{ fontWeight: 700, color: "#6E1E1E" }}>
                  Gods image:
                </label>
                <label style={{ fontSize: "0.9rem" }}>Position</label>
                <select
                  value={godsPosition}
                  onChange={(e) => setGodsPosition(e.target.value)}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
                <label style={{ fontSize: "0.9rem", marginLeft: 8 }}>
                  Size
                </label>
                <select
                  value={godsSize}
                  onChange={(e) => setGodsSize(Number(e.target.value))}
                >
                  <option value={50}>Small</option>
                  <option value={60}>Small-Mid</option>
                  <option value={90}>Medium</option>
                </select>
              </div>

              {/* User image controls: size and position */}
              {allowUserImage && (
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <label style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    Your image
                  </label>
                  <label style={{ fontSize: "0.85rem" }}>Size</label>
                  <select
                    value={userImageSize}
                    onChange={(e) => setUserImageSize(Number(e.target.value))}
                  >
                    <option value={56}>Small</option>
                    <option value={80}>Medium</option>
                    <option value={120}>Large</option>
                  </select>

                  <label style={{ fontSize: "0.85rem", marginLeft: 8 }}>
                    Position
                  </label>
                  <select
                    value={userImagePosition}
                    onChange={(e) => setUserImagePosition(e.target.value)}
                  >
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="center">Center</option>
                  </select>
                </div>
              )}

              {/* (Position/Size controls above) */}

              {/* upload handled by the dedicated button above when allowed */}
              {!allowUserImage && (
                <div style={{ marginTop: 8, color: "#6b7280" }}>
                  This template does not allow user uploads — only
                  admin-provided images are permitted.
                </div>
              )}
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 700, color: "#6E1E1E" }}>
                {t.layoutLabel}
              </label>
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                style={{
                  display: "block",
                  marginTop: 10,
                  width: "100%",
                  fontSize: "1rem",
                  borderRadius: 8,
                  padding: 8,
                  border: "1px solid #e2e8f0",
                }}
              >
                {layouts.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 700, color: "#6E1E1E" }}>
                {t.fontLabel}
              </label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                style={{
                  display: "block",
                  marginTop: 10,
                  width: "100%",
                  fontSize: "1rem",
                  borderRadius: 8,
                  padding: 8,
                  border: "1px solid #e2e8f0",
                }}
              >
                {availableFonts.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 700, color: "#6E1E1E" }}>
                {t.editBiodataFields}
              </label>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <label style={{ fontSize: "0.95rem" }}>Line height</label>
                <input
                  type="range"
                  min={20}
                  max={140}
                  value={lineHeight}
                  onChange={(e) =>
                    setLineHeight(parseInt(e.target.value, 10) || 0)
                  }
                />
                <div
                  style={{
                    minWidth: 48,
                    textAlign: "right",
                    fontSize: "0.9rem",
                  }}
                >
                  {lineHeight}px
                </div>
                <label style={{ marginLeft: 8 }}>
                  Auto-fit
                  <input
                    type="checkbox"
                    checked={autoFit}
                    onChange={(e) => setAutoFit(e.target.checked)}
                    style={{ marginLeft: 6 }}
                  />
                </label>
              </div>
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  style={{
                    marginBottom: 10,
                    border: "1px solid #f0e6d6",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        setFields(
                          fields.map((f, i) =>
                            i === idx ? { ...f, value: e.target.value } : f
                          )
                        )
                      }
                      placeholder={field.label}
                      style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 6,
                        border: "1px solid #e2e8f0",
                        fontSize: "1rem",
                      }}
                    />
                    <select
                      value={field.align}
                      onChange={(e) =>
                        setFields(
                          fields.map((f, i) =>
                            i === idx ? { ...f, align: e.target.value } : f
                          )
                        )
                      }
                      title="Alignment"
                    >
                      <option value="left">L</option>
                      <option value="center">C</option>
                      <option value="right">R</option>
                    </select>
                    <input
                      type="color"
                      value={field.color}
                      onChange={(e) =>
                        setFields(
                          fields.map((f, i) =>
                            i === idx ? { ...f, color: e.target.value } : f
                          )
                        )
                      }
                      title="Text color"
                      style={{
                        width: 40,
                        height: 32,
                        padding: 2,
                        border: "none",
                        background: "none",
                      }}
                    />
                    <select
                      value={field.valueSize}
                      onChange={(e) =>
                        setFields(
                          fields.map((f, i) =>
                            i === idx
                              ? { ...f, valueSize: Number(e.target.value) }
                              : f
                          )
                        )
                      }
                      title="Size"
                    >
                      <option value={20}>S</option>
                      <option value={24}>M</option>
                      <option value={28}>L</option>
                      <option value={34}>XL</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 18,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleDownload}
                  style={{
                    background: "#6E1E1E",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  PNG
                </button>
                <button
                  onClick={() => handleDownloadJPEG()}
                  style={{
                    background: "#1F6FEB",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  JPEG
                </button>
                <select
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(Number(e.target.value))}
                  title="JPEG quality"
                >
                  <option value={0.6}>JPEG: Low</option>
                  <option value={0.8}>JPEG: Medium</option>
                  <option value={0.92}>JPEG: High</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => handleDownloadPDF(pdfFormatOption)}
                  style={{
                    background: "#2ECC71",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  PDF
                </button>
                <select
                  value={pdfFormatOption}
                  onChange={(e) => setPdfFormatOption(e.target.value)}
                  title="PDF page size"
                >
                  <option value="a4">PDF: A4</option>
                  <option value="letter">PDF: Letter</option>
                </select>
              </div>

              <div>
                <button
                  onClick={handleDownloadWord}
                  style={{
                    background: "#8E44AD",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  DOCX
                </button>
              </div>
            </div>
            <div style={{ marginTop: 8, color: "#6b7280", fontSize: "0.9rem" }}>
              <div>PNG: lossless image. Good for editing later.</div>
              <div>
                JPEG: compressed image. Choose quality to balance size vs
                quality.
              </div>
              <div>
                PDF: universal printable document. A4 or Letter sizes available.
              </div>
              <div>DOCX: Word document with embedded image.</div>
            </div>
            {canvasTainted && (
              <div
                style={{
                  marginTop: 12,
                  background: "#fff4f4",
                  color: "#9b1c1c",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #f5c2c2",
                }}
              >
                Warning: Some images used in this template come from a different
                origin and do not allow cross-origin access. Because of browser
                security, exporting from the browser will fail (tainted canvas).
                To fix this:
                <ul style={{ marginTop: 6 }}>
                  <li>
                    Serve images with Access-Control-Allow-Origin: * (or your
                    frontend origin) and load them with crossOrigin='anonymous'.
                  </li>
                  <li>Or use the server-side export endpoint (recommended).</li>
                </ul>
              </div>
            )}
          </div>
          {/* Preview */}
          <div
            style={{
              flex: 2,
              minWidth: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "rgba(255,251,230,0.8)",
              borderRadius: 18,
              boxShadow: "0 2px 12px #d4af3722",
              padding: "28px 22px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                marginBottom: 14,
                color: "#6E1E1E",
                fontSize: "1.1rem",
              }}
            >
              {t.previewLabel}
            </div>
            <canvas
              ref={canvasRef}
              width={A4_WIDTH}
              height={A4_HEIGHT}
              style={{
                borderRadius: 18,
                boxShadow: "0 4px 24px #d4af3733",
                background: "#fffbe6",
                width: 397,
                height: 562,
                border: "2px solid #D4AF37",
              }}
            />
            <div
              style={{ color: "#7c5c1e", fontSize: "0.95rem", marginTop: 8 }}
            >
              (Scaled down for preview, downloads as full A4 size)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
