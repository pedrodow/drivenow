// Envio de e-mail via Resend usando a API HTTP direta (sem SDK: uma dependência
// a menos). Variáveis: RESEND_API_KEY e, opcionalmente, RESEND_FROM.
//
// Sem domínio próprio verificado no Resend, o remetente de teste
// (onboarding@resend.dev) só entrega para o e-mail dono da conta Resend —
// suficiente para demonstrar o fluxo.

type Email = { to: string; subject: string; html: string; text: string };

const DEFAULT_FROM = "DriveNow <onboarding@resend.dev>";

export async function sendEmail({ to, subject, html, text }: Email): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("RESEND_API_KEY não configurada: e-mail não enviado.");
    } else {
      // Em desenvolvimento, mostramos o e-mail no terminal em vez de enviar.
      console.log(`\n[e-mail de desenvolvimento] Para: ${to}\nAssunto: ${subject}\n${text}\n`);
    }
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? DEFAULT_FROM,
      to,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    console.error("Resend recusou o envio:", response.status, await response.text());
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function passwordResetEmail(name: string, link: string): Omit<Email, "to"> {
  const firstName = name.split(" ")[0];
  const safeName = escapeHtml(firstName);
  const safeLink = escapeHtml(link);

  return {
    subject: "Redefinir sua senha — DriveNow",
    text: [
      `Olá, ${firstName}!`,
      "",
      "Recebemos um pedido para redefinir a senha da sua conta DriveNow.",
      `Acesse o link abaixo (vale por 1 hora):`,
      link,
      "",
      "Se não foi você, ignore este e-mail: sua senha continua a mesma.",
      "",
      "Projeto de portfólio — a DriveNow é uma locadora fictícia.",
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#222">
<h2 style="margin-bottom:8px">DRIVE<span style="color:#c9a800">NOW</span></h2>
<p>Olá, ${safeName}!</p>
<p>Recebemos um pedido para redefinir a senha da sua conta. O link vale por <strong>1 hora</strong>.</p>
<p><a href="${safeLink}" style="display:inline-block;background:#e9c400;color:#221b00;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Redefinir senha</a></p>
<p style="font-size:13px;color:#666">Se o botão não abrir, copie este endereço no navegador:<br>${safeLink}</p>
<p style="font-size:13px;color:#666">Se não foi você, ignore este e-mail: sua senha continua a mesma.</p>
<p style="font-size:12px;color:#999">Projeto de portfólio — a DriveNow é uma locadora fictícia.</p>
</div>`,
  };
}
