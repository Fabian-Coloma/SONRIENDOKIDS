// ProximaCita.jsx — Sección bajo Notas de Evolución
// La doctora agenda la próxima cita del paciente; genera recordatorios automáticos
// por WSPP y correo 1 semana antes, 1 día antes y 3 horas antes.
import { useState } from 'react';
import { supabase } from '../../supabase';

export default function ProximaCita({ pacienteId }) {
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [form, setForm] = useState({
    fecha: '', hora: '', motivo: '', notas: '',
    rec_wspp: true, rec_email: true,
  });

  const diaValido = form.fecha ? [2, 3].includes(new Date(form.fecha + 'T12:00:00').getDay()) : true;

  async function guardar(e) {
    e.preventDefault();
    if (!pacienteId) return alert('Guarda primero la filiación del paciente.');
    if (!diaValido) return alert('📅 Solo martes y miércoles por ahora.');
    setGuardando(true);
    try {
      const { error } = await supabase.from('proximas_citas').insert([{
        paciente_id: pacienteId,
        fecha: form.fecha,
        hora: form.hora,
        motivo: form.motivo || null,
        notas: form.notas || null,
        notificar_whatsapp: form.rec_wspp,
        notificar_email: form.rec_email,
      }]);
      if (error) throw error;
      setGuardado(true);
      setForm({ fecha: '', hora: '', motivo: '', notas: '', rec_wspp: true, rec_email: true });
      setTimeout(() => setGuardado(false), 6000);
    } catch (err) {
      console.error(err);
      alert('Error al guardar la próxima cita.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-2xl border border-orange-200">
      <h3 className="text-lg font-black text-[#003B5C] mb-1 flex items-center gap-2">
        <span className="material-symbols-outlined">event_upcoming</span> Próxima Cita
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Se enviarán recordatorios automáticos al apoderado por WhatsApp y correo:
        <strong> 1 semana antes</strong>, <strong>1 día antes</strong> y <strong>3 horas antes</strong>.
      </p>

      {guardado && (
        <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-xl mb-4 text-sm font-bold">
          ✅ ¡Próxima cita guardada! Los recordatorios quedaron programados.
        </div>
      )}

      <form onSubmit={guardar} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#003B5C] mb-1">Fecha</label>
            <input type="date" required min={new Date().toISOString().slice(0,10)}
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border bg-white text-sm ${form.fecha && !diaValido ? 'border-red-400' : 'border-gray-300'}`} />
            {form.fecha && !diaValido && (
              <p className="text-[11px] text-red-500 mt-1">Solo martes y miércoles.</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-[#003B5C] mb-1">Hora (11am–8pm)</label>
            <select required value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm">
              <option value="">-- Hora --</option>
              {['11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'].map(h =>
                <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        <input type="text" placeholder="Motivo (opcional)" value={form.motivo}
          onChange={(e) => setForm({ ...form, motivo: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
        <textarea placeholder="Notas para la próxima cita (opcional)" rows={2} value={form.notas}
          onChange={(e) => setForm({ ...form, notas: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />

        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.rec_wspp}
              onChange={(e) => setForm({ ...form, rec_wspp: e.target.checked })}
              className="accent-green-600 w-4 h-4" />
            💬 Recordar por WhatsApp
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.rec_email}
              onChange={(e) => setForm({ ...form, rec_email: e.target.checked })}
              className="accent-blue-600 w-4 h-4" />
            📧 Recordar por correo
          </label>
        </div>

        <button type="submit" disabled={guardando || !form.fecha || !form.hora}
          className="w-full py-2.5 rounded-xl bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
          <span className="material-symbols-outlined">notifications_active</span>
          {guardando ? 'Guardando…' : 'Guardar Próxima Cita'}
        </button>
      </form>
    </div>
  );
}
