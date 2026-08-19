import React, { useState } from 'react';

export default function App() {
  const [loadType, setLoadType] = useState<'general' | 'motor'>('general');
  const [power, setPower] = useState<string>('3.5');
  const [phase, setPhase] = useState<'1' | '3'>('1');
  const [pf, setPf] = useState<string>('0.85');

  const p = parseFloat(power) || 0;
  const pfVal = parseFloat(pf) || 0.85;
  const v = phase === '1' ? 220 : 380;
  
  const iLoad = phase === '1' 
    ? (p * 1000) / (v * pfVal)
    : (p * 1000) / (Math.sqrt(3) * v * pfVal);

  const cbSize = Math.ceil(iLoad * 1.25);
  let wireSize = "2.5";
  if (iLoad > 18) wireSize = "4";
  if (iLoad > 24) wireSize = "6";
  if (iLoad > 31) wireSize = "10";
  if (iLoad > 43) wireSize = "16";

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-4 flex justify-center items-center">
      <div className="max-w-md w-full space-y-4">
        
        {/* --- ส่วนโลโก้หัวโปรแกรม --- */}
        <div className="text-center space-y-2">
          <img 
            src="https://img2.pic.in.th/pic/4528cdbf-cca0-4533-a4da-a0cc7048f529.png" 
            alt="HICRETE Logo" 
            className="w-28 h-auto mx-auto rounded-2xl shadow-xl border border-slate-700/80"
          />
          <h1 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <span>⚡</span> คำนวณขนาดสายไฟ & CB
          </h1>
          <p className="text-xs text-slate-400">มาตรฐานสาย IEC 01 (THW) เดินในท่อร้อยสาย</p>
        </div>

        {/* --- ฟอร์มคำนวณ --- */}
        <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700/50 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              onClick={() => setLoadType('general')}
              className={`py-2 rounded-lg font-medium transition ${loadType === 'general' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              โหลดทั่วไป / แสงสว่าง
            </button>
            <button 
              onClick={() => setLoadType('motor')}
              className={`py-2 rounded-lg font-medium transition ${loadType === 'motor' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              โหลดมอเตอร์ / แอร์
            </button>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1 font-medium">กำลังไฟฟ้า (กิโลวัตต์ / kW):</label>
            <input 
              type="number" 
              value={power} 
              onChange={(e) => setPower(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1 font-medium">ระบบไฟฟ้า (Phase):</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => setPhase('1')}
                className={`py-2 rounded-lg transition ${phase === '1' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                1 เฟส (220V)
              </button>
              <button 
                onClick={() => setPhase('3')}
                className={`py-2 rounded-lg transition ${phase === '3' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                3 เฟส (380V)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1 font-medium">Power Factor (PF):</label>
            <input 
              type="number" 
              value={pf} 
              onChange={(e) => setPf(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* --- ผลลัพธ์ --- */}
        <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700/50 space-y-3 text-center shadow-xl">
          <div className="text-xs text-slate-400">📊 ผลการคำนวณ</div>
          
          <div>
            <div className="text-xs text-slate-400">กระแสโหลดใช้งานจริง (I_load)</div>
            <div className="text-2xl font-bold text-blue-400">{iLoad.toFixed(2)} A</div>
          </div>

          <div className="pt-2 border-t border-slate-700/50">
            <div className="text-xs text-slate-400">ขนาด Main CB ที่แนะนำ</div>
            <div className="text-2xl font-bold text-red-500">{cbSize} A</div>
          </div>

          <div className="pt-2 border-t border-slate-700/50">
            <div className="text-xs text-slate-400">ขนาดสายไฟ THW (IEC 01)</div>
            <div className="text-xl font-bold text-emerald-400">{wireSize} ตร.มม.</div>
          </div>
        </div>

      </div>
    </div>
  );
}
