import React from 'react';

function CustomDropdown({ label, options, selected, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomDropdown;
