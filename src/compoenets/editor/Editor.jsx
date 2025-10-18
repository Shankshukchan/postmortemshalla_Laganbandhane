import React, { useRef, useState, useContext } from "react";
import { LanguageContext } from "../../LanguageContext";
import { useLocation } from "react-router-dom";

const Editor = () => {
  const location = useLocation();
  const template = location.state?.template;

  // Editor state
  // A4 size at 96dpi: 794 x 1123 px (portrait)
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  // Admin-uploaded images (from public/images)
  const adminPhotos = [
    "/images/banner.png",
    "/images/leaf.png",
    "/images/service.png",
    "/images/temp.png",
    "/images/banner(1)(1).png",
  ];
  // Admin-uploaded borders (add more as needed)
  const adminBorders = [
    "/images/images.png",
    "/images/images.jpeg",
    "/images/u1.png",
    "/images/u2.png",
  ];
  const [photo, setPhoto] = useState(adminPhotos[0]);
  const [border, setBorder] = useState("");
  const [layout, setLayout] = useState("layout1");
  const [font, setFont] = useState("serif");
  // Editable biodata/profile fields
  const [fields, setFields] = useState([
    { id: 1, label: "Name", value: "" },
    { id: 2, label: "Email", value: "" },
    { id: 3, label: "Birthdate", value: "" },
    { id: 4, label: "Caste", value: "" },
    { id: 5, label: "Religion", value: "" },
    { id: 6, label: "Age", value: "" },
    { id: 7, label: "Marriage Status", value: "" },
  ]);
  const canvasRef = useRef(null);

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

  // Download as image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "template.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
    // Draw border if selected
    if (border) {
      const borderImg = new window.Image();
      borderImg.src = border;
      borderImg.onload = () => {
        ctx.save();
        ctx.globalAlpha = 0.95;
        ctx.drawImage(borderImg, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawMainContent();
      };
    } else {
      drawMainContent();
    }

    function drawMainContent() {
      // Padding from margin
      const padX = 60;
      let yStart = 420;
      // Draw photo as circular logo
      if (photo) {
        const img = new window.Image();
        img.src = photo;
        img.onload = () => {
          if (layout === "layout1") {
            // Draw circular logo at top center
            const logoRadius = 90;
            const logoX = canvas.width / 2;
            const logoY = 140;
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
            drawFields(ctx, fields, padX, yStart);
          } else if (layout === "layout2") {
            // Draw circular logo at left
            const logoRadius = 90;
            const logoX = padX + logoRadius;
            const logoY = 200;
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
            drawFields(ctx, fields, padX + 200, 160, "left");
          } else if (layout === "layout3") {
            // Draw circular logo at top center, faded background
            ctx.globalAlpha = 0.7;
            const logoRadius = 90;
            const logoX = canvas.width / 2;
            const logoY = 140;
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
            ctx.globalAlpha = 1.0;
            drawFields(ctx, fields, padX, 300, "center", true);
          }
        };
      } else {
        drawFields(ctx, fields, padX, yStart);
      }
    }
    // eslint-disable-next-line
  }, [photo, layout, font, fields, border]);

  function drawFields(
    ctx,
    fields,
    padX,
    yStart,
    align = "center",
    shadow = false
  ) {
    const lineHeight = 56;
    fields.forEach((field, idx) => {
      ctx.save();
      ctx.font = `bold 20px ${
        fonts.find((f) => f.id === font)?.style || "serif"
      }`;
      ctx.fillStyle = shadow ? "#fff" : "#6E1E1E";
      ctx.textAlign = align;
      if (shadow) {
        ctx.shadowColor = "#6E1E1E";
        ctx.shadowBlur = 8;
      }
      // Label
      const labelX = align === "left" ? padX : A4_WIDTH / 2 - 100;
      const valueX = align === "left" ? padX + 200 : A4_WIDTH / 2 + 60;
      const y = yStart + idx * lineHeight;
      ctx.fillText(field.label + ":", labelX, y);
      // Value
      ctx.font = `bold 28px ${
        fonts.find((f) => f.id === font)?.style || "serif"
      }`;
      ctx.fillText(field.value, valueX, y);
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
                {adminBorders.map((img, idx) => (
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
                {adminPhotos.map((img, idx) => (
                  <option key={img} value={img}>
                    Photo {idx + 1}
                  </option>
                ))}
              </select>
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
                {fonts.map((f) => (
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
              {fields.map((field, idx) => (
                <div key={field.id} style={{ marginBottom: 10 }}>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      setFields(
                        fields.map((f, i) =>
                          i === idx ? { ...f, value: e.target.value } : f
                        )
                      );
                    }}
                    placeholder={field.label}
                    style={{
                      width: "100%",
                      padding: 8,
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      fontSize: "1rem",
                      marginTop: 4,
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleDownload}
              style={{
                background: "linear-gradient(90deg, #6E1E1E 0%, #D4AF37 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                marginTop: 18,
                boxShadow: "0 2px 8px #d4af3733",
                width: "100%",
              }}
            >
              {t.downloadAsImage}
            </button>
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
