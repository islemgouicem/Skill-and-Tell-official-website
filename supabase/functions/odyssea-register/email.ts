/**
 * Confirmation email sent to the team leader (or the solo voyager)
 * right after a successful registration. Odyssea brand palette:
 *   Aegean Night #011B2A · Olympian Gold #BC9336 · Parchment #F6E7CA
 *   Odyssey Blue #3C6DAA · Royal White #FDFDFD · Seafoam #4D90A3
 */

export type ConfirmationInput = {
  leaderName: string;
  teamName: string;
  reference: string;
  kind: "team" | "individual";
  teamSize: number;
  mode: "onsite" | "online";
  members: { full_name: string; email: string }[];
  siteUrl: string;
};

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function subjectFor(input: ConfirmationInput) {
  return input.kind === "team"
    ? `Odyssea — ${input.teamName} is registered (${input.reference})`
    : `Odyssea — your place is secured (${input.reference})`;
}

export function textBody(i: ConfirmationInput) {
  const crew = i.members.map((m, n) => `  ${n + 1}. ${m.full_name} <${m.email}>`).join("\n");
  return [
    `Congratulations, voyager.`,
    ``,
    i.kind === "team"
      ? `${i.teamName} is registered for Odyssea by Skill&Tell.`
      : `Your place at Odyssea by Skill&Tell is secured.`,
    ``,
    `Reference:   ${i.reference}`,
    `Crew size:   ${i.teamSize}`,
    `Mode:        ${i.mode === "onsite" ? "Onsite — ENSIA, Sidi Abdellah" : "Online"}`,
    ``,
    i.members.length > 1 ? `Crew:\n${crew}\n` : ``,
    `What happens next`,
    `  1. Keep this reference — every question to us should quote it.`,
    `  2. We review the motivation of every crew and confirm the selected`,
    `     teams by email before the event.`,
    `  3. The full agenda lives at ${i.siteUrl}/odyssea`,
    ``,
    `Questions: skill.and.tell@ensia.edu.dz`,
    ``,
    `Skill&Tell Scientific Club — ENSIA, Sidi Abdellah`,
  ].join("\n");
}

export function htmlBody(i: ConfirmationInput) {
  const crewRows = i.members
    .map(
      (m, n) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid rgba(188,147,54,.25);font:400 14px/20px Georgia,serif;color:#011B2A;">
          <span style="color:#BC9336;font-weight:700;">${n === 0 ? "Leader" : `Member ${n}`}</span>
          &nbsp;·&nbsp; ${esc(m.full_name)}
          <span style="color:rgba(1,27,42,.55);">&nbsp;·&nbsp; ${esc(m.email)}</span>
        </td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subjectFor(i))}</title></head>
<body style="margin:0;padding:0;background:#011B2A;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${i.kind === "team" ? esc(i.teamName) + " is registered for Odyssea." : "Your place at Odyssea is secured."} Reference ${esc(i.reference)}.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#011B2A;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <tr><td align="center" style="padding-bottom:26px;">
          <div style="font:700 30px/1 Georgia,'Times New Roman',serif;letter-spacing:.06em;color:#BC9336;">ODYSSEA</div>
          <div style="margin-top:6px;font:400 11px/1 Georgia,serif;letter-spacing:.34em;color:#D9B464;">BY SKILL&amp;TELL</div>
        </td></tr>

        <tr><td style="background:#F6E7CA;border:2px solid #BC9336;border-radius:6px;padding:34px 30px;">
          <p style="margin:0;font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.24em;color:#BC9336;text-transform:uppercase;">
            Congratulations, voyager
          </p>
          <h1 style="margin:10px 0 0;font:700 28px/1.2 Georgia,'Times New Roman',serif;color:#011B2A;">
            ${i.kind === "team" ? "Your crew is registered" : "Your place is secured"}
          </h1>

          <p style="margin:16px 0 0;font:400 15px/24px Arial,Helvetica,sans-serif;color:rgba(1,27,42,.78);">
            Hello ${esc(i.leaderName.split(" ")[0] || "there")}, we have received
            ${i.kind === "team" ? `the registration of <strong style="color:#011B2A;">${esc(i.teamName)}</strong>` : "your registration"}
            for Odyssea, the Skill&amp;Tell ideathon on well-being.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background:#011B2A;border-radius:4px;">
            <tr><td style="padding:18px 20px;">
              <div style="font:400 10px/1 Arial,Helvetica,sans-serif;letter-spacing:.22em;color:#D9B464;text-transform:uppercase;">Your reference</div>
              <div style="margin-top:8px;font:700 24px/1 'Courier New',monospace;letter-spacing:.14em;color:#BC9336;">${esc(i.reference)}</div>
              <div style="margin-top:12px;font:400 13px/20px Arial,Helvetica,sans-serif;color:rgba(253,253,253,.72);">
                ${i.teamSize} ${i.teamSize > 1 ? "voyagers" : "voyager"} &nbsp;·&nbsp;
                ${i.mode === "onsite" ? "Onsite — ENSIA, Sidi Abdellah" : "Online participation"}
              </div>
            </td></tr>
          </table>

          ${
            i.members.length > 1
              ? `<h2 style="margin:26px 0 4px;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;color:#011B2A;text-transform:uppercase;">The crew</h2>
                 <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${crewRows}</table>`
              : ""
          }

          <h2 style="margin:28px 0 8px;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:.18em;color:#011B2A;text-transform:uppercase;">What happens next</h2>
          <ol style="margin:0;padding-left:18px;font:400 14px/22px Arial,Helvetica,sans-serif;color:rgba(1,27,42,.75);">
            <li style="margin-bottom:6px;">Keep this reference — quote it in every message you send us.</li>
            <li style="margin-bottom:6px;">We read every motivation and confirm the selected crews by email before the event.</li>
            <li>Watch your inbox (and your spam folder) for the call to adventure.</li>
          </ol>

          <div style="margin-top:28px;text-align:center;">
            <a href="${esc(i.siteUrl)}/odyssea"
               style="display:inline-block;background:#011B2A;color:#BC9336;text-decoration:none;
                      padding:13px 30px;border-radius:999px;font:700 13px/1 Arial,Helvetica,sans-serif;letter-spacing:.12em;">
              SEE THE FULL AGENDA
            </a>
          </div>
        </td></tr>

        <tr><td align="center" style="padding:24px 10px 0;">
          <p style="margin:0;font:400 12px/20px Arial,Helvetica,sans-serif;color:rgba(253,253,253,.55);">
            Questions? Reply to this email or write to
            <a href="mailto:skill.and.tell@ensia.edu.dz" style="color:#D9B464;">skill.and.tell@ensia.edu.dz</a><br>
            Skill&amp;Tell Scientific Club — ENSIA, Sidi Abdellah, Algiers
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
