import React, { useRef } from 'react'
import { FiCalendar } from 'react-icons/fi'

const toDisplayDate = (iso) => {
  if (!iso) return '';
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    return `${m[3]}/${m[2]}/${m[1]}`;
  }
  return iso;
}

const toISODate = (yyyyMmDd) => {
  const m = yyyyMmDd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return yyyyMmDd;
  const mm = yyyyMmDd.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (mm) {
    const dd = mm[1].padStart(2,'0');
    const mn = mm[2].padStart(2,'0');
    const yyyy = mm[3];
    return `${yyyy}-${mn}-${dd}`;
  }
  // fallback: try Date parse
  const d = new Date(yyyyMmDd);
  if (!isNaN(d)) return d.toISOString().split('T')[0];
  return yyyyMmDd;
}

const DateInput = ({ value, onChange, label, placeholder }) => {
  const hiddenRef = useRef(null);

  const handleVisibleChange = (e) => {
    onChange(e.target.value);
  }

  const handleIconClick = () => {
    const input = hiddenRef.current;
    if (!input) return;
    // Prefer showPicker() when supported (Chromium), fallback to focus+click
    try {
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      } else {
        input.focus();
        input.click();
      }
    } catch (err) {
      input.focus();
      input.click();
    }
  }

  const handleHiddenChange = (e) => {
    const iso = e.target.value; // yyyy-mm-dd
    const display = toDisplayDate(iso);
    onChange(display);
  }

  return (
    <div>
      <label className="text-[13px]" style={{ color: 'var(--text)' }}>{label}</label>

      <div className="input-box">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          style={{ color: 'var(--text)' }}
          value={value}
          onChange={handleVisibleChange}
        />

        <FiCalendar size={20} className="text-slate-400 cursor-pointer" onClick={handleIconClick} />

        <input
          type="date"
          ref={hiddenRef}
          value={toISODate(value) || ''}
          onChange={handleHiddenChange}
          // keep the input in the layout but off-screen so programmatic click opens native picker
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
      </div>
    </div>
  )
}

export default DateInput
