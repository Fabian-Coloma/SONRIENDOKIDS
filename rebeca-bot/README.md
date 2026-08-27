# 🦷 Rebeca Bot — WhatsApp para Sonriendo Kids

IA que responde preguntas y **agenda citas por WhatsApp**, conectada a las MISMAS
tablas `pacientes` y `citas` de tu repo SONRIENDOKIDS. Todo lo que agende por
WhatsApp aparece en tu dashboard, y viceversa.

**Sin Meta Developers** — se conecta con QR vía Evolution API.

```
WhatsApp (QR) ⇄ Evolution API ⇄ rebeca-bot (Gemini) ⇄ Supabase (pacientes, citas)
                                                            ↕
                                        Tu landing + dashboard (ya existen)
```

## Qué hace Rebeca

- Responde horarios, servicios, sedes (con la personalidad que ya definiste)
- Agenda citas preguntando: nombre del niño → apoderado → fecha → hora → motivo
- Valida que la hora esté libre ANTES de crear la cita (lee tus `citas`)
- Guarda en `pacientes` (nombre_nino, nombre_apoderado, whatsapp) y `citas`
  con estado `No confirmado` — igual que tu BookingForm

## Puesta en marcha local (para probar)

```bash
cd rebeca-bot
cp .env.example .env   # llena con tus claves de Supabase y Gemini
npm install
npm run dev
```

En otra terminal levanta Evolution API:

```bash
docker run -d --name evolution -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=cambia-esta-clave-secreta \
  -e DATABASE_ENABLED=false -e CACHE_REDIS_ENABLED=false \
  evoapicloud/evolution-api:latest
```

1. Abre http://localhost:8080 → crea instancia `sonriendo` → escanea el QR
   (WhatsApp → Dispositivos vinculados)
2. Configura el webhook:
   ```bash
   curl -X POST http://localhost:8080/webhook/set/sonriendo \
     -H "Content-Type: application/json" -H "apikey: cambia-esta-clave-secreta" \
     -d '{"webhook":{"enabled":true,"url":"http://host.docker.internal:3001/webhook","events":["MESSAGES_UPSERT"]}}'
   ```
3. Escribe *"hola"* a tu número desde otro WhatsApp 🎉

## Despliegue en Railway (~$5/mes)

1. Sube esta carpeta a un repo de GitHub
2. En [railway.app](https://railway.app): New Project → Deploy from GitHub repo
3. Agrega un segundo servicio con la imagen Docker `evoapicloud/evolution-api:latest`
4. Variables del bot: las del `.env.example`
   (`EVOLUTION_URL=http://evolution-api.railway.internal:8080`)
5. Genera dominio público para ambos servicios
6. En el manager web de Evolution: escanea el QR una vez y configura el webhook
   apuntando a la URL pública del bot

## Notas

- Usa `SUPABASE_SERVICE_KEY` solo aquí (servidor), nunca en tu frontend.
- El modelo es `gemini-2.0-flash`; cámbialo en `src/ia.js` si usas otro.
- La memoria de conversación vive en RAM; si Railway reinicia se pierde el hilo
  a mitad de un agendamiento (el padre puede volver a empezar). Se puede mover a Supabase después.
