import React from "react";

// Lets user pick a template (with/without picture)
const TemplateSelector = ({ templates, selected, onSelect }) => (
  <div className="flex gap-4">
    {templates.map((tpl) => (
      <div
        key={tpl.id}
        className={`border rounded p-4 cursor-pointer ${selected === tpl.id ? 'border-[#D4AF37] bg-[#FFF8F0]' : 'border-gray-200'}`}
        onClick={() => onSelect(tpl.id)}
      >
        <h3 className="font-bold mb-2">{tpl.label}</h3>
        <div>{tpl.description}</div>
      </div>
    ))}
  </div>
);

export default TemplateSelector;
