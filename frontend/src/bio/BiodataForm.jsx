import React from "react";

// This will render a dynamic form based on admin-configured fields
const BiodataForm = ({ fields, values, onChange, onSubmit }) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}{field.required && <span className="text-red-500">*</span>}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={values[field.name] || ""}
            onChange={onChange}
            required={field.required}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ))}
      <button type="submit" className="bg-[#D4AF37] text-white px-4 py-2 rounded">Save Biodata</button>
    </form>
  );
};

export default BiodataForm;
