import React from "react";

// Shows a preview of the biodata before export
const BiodataPreview = ({ values, template, onExport }) => {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Biodata Preview ({template?.label})</h2>
      {/* Render fields dynamically */}
      <div className="space-y-2">
        {Object.entries(values).map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <span className="font-semibold">{key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onExport("pdf")}
          className="bg-[#D4AF37] text-white px-4 py-2 rounded">Export PDF</button>
        <button onClick={() => onExport("word")}
          className="bg-[#6E1E1E] text-white px-4 py-2 rounded">Export Word</button>
        <button onClick={() => onExport("image")}
          className="bg-[#3182ce] text-white px-4 py-2 rounded">Export Image</button>
        <button onClick={() => onExport("share")}
          className="bg-green-600 text-white px-4 py-2 rounded">Share</button>
      </div>
    </div>
  );
};

export default BiodataPreview;
