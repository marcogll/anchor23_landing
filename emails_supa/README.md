# ANCHOR:23 — Plantillas de correo para Supabase Auth

Plantillas HTML listas para pegar en **Authentication → URL Configuration / Email Templates** del dashboard de Supabase. Diseño de 600 px, CSS inline y tablas para máxima compatibilidad de clientes.

## Soporte Multiidioma (Español / Inglés)

Las plantillas han sido adaptadas para soportar **Español e Inglés** en un mismo archivo utilizando lógica condicional de Go templates (`{{ if ... }}`). Esto permite que el correo se adapte automáticamente al idioma del usuario sin necesidad de tener múltiples versiones configuradas en Supabase (lo cual no es soportado nativamente).

### Requisito en Frontend
Para que la detección funcione, al registrar o actualizar un usuario desde tu aplicación frontend, debes pasar la preferencia de idioma en los metadatos del usuario (`user_metadata`). Por ejemplo:
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@ejemplo.com',
  password: 'password-seguro',
  options: {
    data: {
      language: navigator.language.startsWith('es') ? 'es' : 'en' // o usar 'locale'
    }
  }
})
```

La plantilla validará tanto `{{ .Data.language }}` como `{{ .Data.locale }}`. Si el valor es `"en"`, se enviará en inglés. En cualquier otro caso, se enviará en español por defecto.

---

## Asuntos Dinámicos para Supabase Dashboard

Para que los asuntos de los correos también se adapten al idioma, puedes copiar y pegar la siguiente lógica condicional en el campo **Subject** de cada plantilla en el Dashboard de Supabase:

| Tipo de Correo | Asunto Condicional (Go Template) a pegar en Supabase |
| :--- | :--- |
| **Confirm sign up** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Confirm your email · ANCHOR:23{{ else }}Confirma tu correo · ANCHOR:23{{ end }}` |
| **Invite user** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}You have been invited to ANCHOR:23{{ else }}Te han invitado a ANCHOR:23{{ end }}` |
| **Magic link** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Your access to ANCHOR:23{{ else }}Tu acceso a ANCHOR:23{{ end }}` |
| **Change email address** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Confirm your new email · ANCHOR:23{{ else }}Confirma tu nuevo correo · ANCHOR:23{{ end }}` |
| **Reset password** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Reset your password · ANCHOR:23{{ else }}Restablece tu contraseña · ANCHOR:23{{ end }}` |
| **Reauthentication** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Confirm your identity · ANCHOR:23{{ else }}Confirma tu identidad · ANCHOR:23{{ end }}` |
| **Password changed** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Password updated · ANCHOR:23{{ else }}Contraseña actualizada · ANCHOR:23{{ end }}` |
| **Email address changed** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Your email changed · ANCHOR:23{{ else }}Tu correo cambió · ANCHOR:23{{ end }}` |
| **Phone number changed** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Phone number updated · ANCHOR:23{{ else }}Teléfono actualizado · ANCHOR:23{{ end }}` |
| **Sign-in method linked** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Sign-in method linked · ANCHOR:23{{ else }}Método de inicio vinculado · ANCHOR:23{{ end }}` |
| **Sign-in method removed** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}Sign-in method removed · ANCHOR:23{{ else }}Método de inicio de sesión eliminado · ANCHOR:23{{ end }}` |
| **MFA method added** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}MFA Enabled · ANCHOR:23{{ else }}MFA Activado · ANCHOR:23{{ end }}` |
| **MFA method removed** | `{{ if or (eq .Data.language "en") (eq .Data.locale "en") }}MFA Disabled · ANCHOR:23{{ else }}MFA Desactivado · ANCHOR:23{{ end }}` |

---

## Mapa de plantillas → tipo de correo Supabase

| Archivo | Tipo en Supabase | Variables usadas |
|---------|------------------|------------------|
| `confirm-signup.html` | Confirm sign up | `{{ .ConfirmationURL }}` |
| `invite-user.html` | Invite user | `{{ .ConfirmationURL }}` |
| `magic-link.html` | Magic link or OTP | `{{ .ConfirmationURL }}`, `{{ .Token }}` |
| `change-email.html` | Change email address | `{{ .ConfirmationURL }}`, `{{ .Email }}`, `{{ .NewEmail }}` |
| `reset-password.html` | Reset password | `{{ .ConfirmationURL }}` |
| `reauthentication.html` | Reauthentication | `{{ .ConfirmationURL }}` |
| `password-changed.html` | Password changed (seguridad) | `{{ .Email }}` |
| `email-changed.html` | Email address changed (seguridad) | `{{ .Email }}`, `{{ .NewEmail }}` |
| `phone-changed.html` | Phone number changed (seguridad) | `{{ .Email }}` |
| `signin-linked.html` | Sign-in method linked (seguridad) | `{{ .Provider }}` |
| `signin-removed.html` | Sign-in method removed (seguridad) | `{{ .Provider }}` |
| `mfa-added.html` | MFA method added (seguridad) | `{{ .FactorType }}` |
| `mfa-removed.html` | MFA method removed (seguridad) | `{{ .FactorType }}` |
