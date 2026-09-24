// ProximaCita.jsx — Sección bajo Notas de Evolución
// La doctora agenda la próxima cita del paciente; genera recordatorios automáticos
// por WSPP y correo 1 semana antes, 1 día antes y 3 horas antes.
// Lógica de disponibilidad IGUAL a la landing: horario visible completo,
// solo martes y miércoles 11am-8pm habilitados; el resto se muestra "Ocupado".
import { useState } from 'react';
import { supabase } from '../../supabase';

// Días que SÍ tienen disponibilidad real (martes=2, miércoles=3)
const DIAS_LIBRES = [2, 3];
// Hora a partir de la cual hay disponibilidad (11:00)
const HORA_LIBRE_INICIO = 11;
// Horarios visibles en pantalla (10:00 - 20:00)
const HORARIOS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00"
];

export default function ProximaCita({ pacienteId }) {
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [form, setForm] = useState({
    fecha: '', hora: '', motivo: '', notas: '',
    rec_wspp: true, rec_email: true,
  });

  const diaValido = form.fecha ? DIAS_LIBRES.includes(new Date(form.fecha + 'T12:00:00').getDay()) : true;

  const handleFechaChange = (e) => {
    const f = e.target.value;
    if (!f) { setHorariosOcupados([]); setForm({ ...form, fecha: '', hora: '' }); return; }
    const dia = new Date(f + 'T12:00:00').getDay();
    const nuevosOcupados = [];
    if (!DIAS_LIBRES.includes(dia)) {
      // Día sin disponibilidad: todas las horas ocupadas
      HORARIOS.forEach(h => nuevosOcupados.push(h));
    } else {
      // Martes/miércoles: solo desde las 11:00 en adelante
      HORARIOS.forEach(h => {
        const hh = parseInt(h.slice(0, 2), 10);
        if (hh < HORA_LIBRE_INICIO) nuevosOcupados.push(h);
      });
    }
    setHorariosOcupados(nuevosOcupados);
    setForm({ ...form, fecha: f, hora: '' });
  };

  async function guardar(e) {
    e.preventDefault();
    if (!pacienteId) return alert('Guarda primero la filiación del paciente.');
    if (!diaValido) return alert('Ese día no hay disponibilidad. Elige otro en el calendario.');
    if (horariosOcupados.includes(form.hora)) return alert('Ese horario ya no está disponible. Elige uno de los turnos resaltados.');
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
      setHorariosOcupados([]);
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
              onChange={handleFechaChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm" />
            {form.fecha && !diaValido && (
              <p className="text-[11px] text-amber-600 mt-1">Ese día no hay disponibilidad. Elige otro en el calendario.</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-[#003B5C] mb-1">Hora de la cita</label>
            <select required value={form.hora}
              onChange={(e) => setForm({ ...form, hora: e.target.value })}
              disabled={!form.fecha}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm disabled:bg-gray-100">
              <option value="">-- Hora --</option>
              {HORARIOS.map(h => {
                const ocupado = horariosOcupados.includes(h);
                return (
                  <option key={h} value={h} disabled={ocupado}>
                    {h} {ocupado ? '· Ocupado' : ''}
                  </option>
                );
              })}
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

        <button type="submit" disabled={guardando || !form.fecha || !form.hora || horariosOcupados.includes(form.hora)}
          className="w-full py-2.5 rounded-xl bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm">
          <span className="material-symbols-outlined">notifications_active</span>
          {guardando ? 'Guardando…' : 'Guardar Próxima Cita'}
        </button>
      </form>
    </div>
  );
}
