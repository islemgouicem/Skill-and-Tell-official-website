/**
 * The Odyssea confirmation email.
 *
 * ── The parchment, and why the type does not sit directly on it ─────────────
 * The failure you kept seeing has one cause, and it is worth naming exactly,
 * because it rules out the obvious layout. Gmail's phone apps repaint a message
 * they judge to be "light": dark text is lightened. They do NOT repaint images.
 * So "dark ink written on the parchment picture" is the one combination that
 * cannot survive — the paper stays light because it is an image, the ink turns
 * light because it is text, and the words vanish. No CSS reaches that pass:
 * not color-scheme, not prefers-color-scheme, not !important.
 *
 * So the parchment is kept, and used as what it actually is — paper. It is the
 * full canvas of the email, with a gilt rule drawn on it, and the message sits
 * on a deep-blue plaque mounted in the middle of that sheet, the way the
 * registration card sits on the page. Every pixel is then one of two things
 * that no client repaints:
 *
 *   · the parchment — an image, and images are never touched;
 *   · the plaque — a mid-band blue (L* 33) carrying cream and gold type, which
 *     is already what a dark-mode pass is trying to produce, so it is left be.
 *
 * Nothing legible is ever on the paper itself, so nothing can go invisible.
 * With remote images blocked (Gmail's default until the reader allows them)
 * the sheet falls back to the deep blue underneath it and the plaque still
 * reads exactly the same — both states are deliberate, and the words never
 * move in either.
 */

const RAW =
  "https://raw.githubusercontent.com/islemgouicem/Skill-and-Tell-official-website/app_in_next_js_v1/assets/images/odyssea";

const PARCHMENT = process.env.ODYSSEA_EMAIL_BG_URL ?? `${RAW}/parchment.webp`;
const WORDMARK = process.env.ODYSSEA_EMAIL_WORDMARK_URL ?? "";

/* the plaque and the fallback sheet: brand blues, mid-band, so no dark-mode
   pass has anything to correct (L* 24 / 33 / 40) */
const SHELL = "#123E51"; /* the register button's dark stop — also the no-image sheet */
const CARD = "#195469"; /* its light stop — the plaque */
const PANEL = "#1E6580"; /* one step up, for the reference block */

const GOLD = "#C9A24B"; /* the plaque's frame */
const GOLD_RULE = "#A07C2E"; /* the rule drawn on the paper — darker, to read on parchment */
const GOLD_SOFT = "#E2C076";
const TITLE = "#FDCC46";
const EMBER = "#F2B478";

const INK = "#F4EAD8";
const INK_SOFT = "#DCE8EE";
const INK_MUTED = "#AFC8D4";

const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',Times,serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Liberation Mono',monospace";

const escape = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const firstName = (value) => String(value ?? "").trim().split(/\s+/)[0] || "Voyager";

export function buildHtml({
  leaderName,
  teamName,
  reference,
  isTeam,
  mode,
  crew,
  eventUrl,
  siteUrl,
  contactEmail,
}) {
  /* eventUrl is built for us; siteUrl is only a fallback for older callers */
  const link = eventUrl || `${String(siteUrl ?? "").replace(/\/$/, "")}/register/odyssea`;

  const summary = [
    escape(teamName),
    isTeam ? `Team of ${crew.length}` : "Individual",
    mode === "online" ? "Online" : "On site, Amsterdam",
  ].join(" &nbsp;&#183;&nbsp; ");

  const mark = WORDMARK
    ? `<img src="${escape(WORDMARK)}" width="230" alt="Odyssea" style="display:block;width:230px;max-width:70%;height:auto;margin:0 auto;" />`
    : `<div style="font:400 27px/1 ${SERIF};letter-spacing:.21em;color:${TITLE};text-indent:.21em;">ODYSSEA</div>`;

  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Odyssea — registration received</title>
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
      a { text-decoration: none; }
      img { border: 0; outline: none; -ms-interpolation-mode: bicubic; }
      body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }

      @media only screen and (max-width:600px) {
        .wrap { width:100% !important; }
        .sheet-pad { padding:24px 16px 28px !important; }
        .mount-pad { padding:18px !important; }
        .card-pad { padding:30px 20px 26px !important; }
        .h1 { font-size:25px !important; }
        .body { font-size:15px !important; }
        .btn a { padding:14px 24px !important; }
      }

      /* Outlook.com relabels colours in dark mode; restating them makes its
         pass a no-op instead of a guess */
      [data-ogsc] .sheet { background-color: ${SHELL} !important; }
      [data-ogsc] .card,
      [data-ogsb] .card { background-color: ${CARD} !important; }
      [data-ogsc] .panel { background-color: ${PANEL} !important; }
      [data-ogsc] .ink { color: ${INK} !important; }
      [data-ogsc] .ink-soft { color: ${INK_SOFT} !important; }
      [data-ogsc] .ink-muted { color: ${INK_MUTED} !important; }
      [data-ogsc] .gold { color: ${TITLE} !important; }
      [data-ogsc] .btn td { background-color: ${TITLE} !important; }
      [data-ogsc] .btn a { color: ${SHELL} !important; }
    </style>
  </head>
  <body class="sheet" bgcolor="${SHELL}" style="margin:0;padding:0;background-color:${SHELL};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
      We received your registration — reference ${escape(reference)}. We will confirm soon.
    </div>

    <!-- the parchment sheet: an image, so no client repaints it, over the blue
         it falls back to when remote images are blocked -->
    <table role="presentation" class="sheet" width="100%" cellpadding="0" cellspacing="0" border="0"
           background="${escape(PARCHMENT)}" bgcolor="${SHELL}"
           style="background-color:${SHELL};background-image:url('${escape(PARCHMENT)}');background-size:cover;background-position:center;background-repeat:no-repeat;">
      <tr>
        <td class="sheet-pad" align="center" style="padding:42px 22px 46px;">

          <!--[if gte mso 9]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;">
            <v:fill type="frame" src="${escape(PARCHMENT)}" color="${SHELL}" />
            <v:textbox inset="0,0,0,0">
          <![endif]-->

          <table role="presentation" class="wrap" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:560px;">
            <tr>
              <!-- a gilt rule drawn straight on the paper; the cell is transparent
                   so the parchment shows through it, and it carries no text -->
              <td class="mount-pad" style="padding:26px;border:1px solid ${GOLD_RULE};">

                <!-- the plaque -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       class="card" bgcolor="${CARD}"
                       style="background-color:${CARD};border:2px solid ${GOLD};border-collapse:separate;">
                  <tr>
                    <td class="card-pad card" align="center" bgcolor="${CARD}" style="background-color:${CARD};padding:40px 36px 32px;">

                      ${mark}
                      <div style="margin-top:10px;font:700 9px/1 ${SANS};letter-spacing:.33em;color:${EMBER};text-indent:.33em;">BY SKILL&amp;TELL</div>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;">
                        <tr>
                          <td style="font-size:0;line-height:0;"><div style="height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</div></td>
                          <td width="30" align="center" style="font:400 12px/1 ${SANS};color:${GOLD_SOFT};">&#10038;</td>
                          <td style="font-size:0;line-height:0;"><div style="height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</div></td>
                        </tr>
                      </table>

                      <div class="gold" style="margin-top:26px;font:700 10px/1 ${SANS};letter-spacing:.21em;text-transform:uppercase;color:${GOLD_SOFT};">Registration received</div>

                      <h1 class="h1 ink" style="margin:15px 0 0;font:400 31px/1.25 ${SERIF};color:${INK};">
                        Thank you, ${escape(firstName(leaderName))}
                      </h1>

                      <p class="body ink-soft" style="margin:14px 0 0;font:400 16px/1.7 ${SANS};color:${INK_SOFT};">
                        We received ${isTeam ? "your team's" : "your"} registration for
                        <strong class="ink" style="color:${INK};font-weight:700;">Odyssea</strong>
                        and will come back to you soon with the final confirmation.
                      </p>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;">
                        <tr>
                          <td class="panel" align="center" bgcolor="${PANEL}" style="background-color:${PANEL};border-radius:8px;padding:19px 18px;">
                            <div style="font:700 9px/1 ${SANS};letter-spacing:.2em;color:${GOLD_SOFT};">REFERENCE</div>
                            <div class="gold" style="margin-top:9px;font:700 20px/1.2 ${MONO};letter-spacing:.05em;color:${TITLE};">${escape(reference)}</div>
                            <div class="ink-soft" style="margin-top:11px;font:400 13px/1.6 ${SANS};color:${INK_SOFT};">${summary}</div>
                          </td>
                        </tr>
                      </table>

                      <!-- a FILLED button: an outlined one borrows the surface
                           behind it, so it is the first thing to look wrong if
                           a client does repaint something -->
                      <table role="presentation" class="btn" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;">
                        <tr>
                          <td align="center" bgcolor="${TITLE}" style="background-color:${TITLE};border-radius:100px;">
                            <a href="${escape(link)}" style="display:block;padding:14px 30px;font:700 11px/1 ${SANS};letter-spacing:.16em;color:${SHELL};text-decoration:none;">
                              THE ODYSSEA PAGE
                            </a>
                          </td>
                        </tr>
                      </table>

                      <div style="margin-top:30px;height:1px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</div>

                      <p class="ink-muted" style="margin:20px 0 0;font:400 13px/1.7 ${SANS};color:${INK_MUTED};">
                        Questions? Reply to this email or write to
                        <a href="mailto:${escape(contactEmail)}" class="gold" style="color:${GOLD_SOFT};text-decoration:none;">${escape(contactEmail)}</a>
                      </p>
                      <p class="ink-muted" style="margin:10px 0 0;font:400 11px/1.7 ${SANS};color:${INK_MUTED};">
                        Skill&amp;Tell Scientific Club &#183; ENSIA, Sidi Abdellah
                      </p>

                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>

          <!--[if gte mso 9]>
            </v:textbox>
          </v:rect>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildText({ leaderName, teamName, reference, isTeam, mode, crew, contactEmail, eventUrl }) {
  return [
    "ODYSSEA — BY SKILL&TELL",
    "",
    "REGISTRATION RECEIVED",
    "",
    `Thank you, ${firstName(leaderName)}.`,
    `We received ${isTeam ? "your team's" : "your"} registration for Odyssea and will come back`,
    "to you soon with the final confirmation.",
    "",
    `Reference: ${reference}`,
    `${teamName} · ${isTeam ? `Team of ${crew.length}` : "Individual"} · ${mode === "online" ? "Online" : "On site, Amsterdam"}`,
    ...(eventUrl ? ["", `The Odyssea page: ${eventUrl}`] : []),
    "",
    `Questions? Reply to this email or write to ${contactEmail}.`,
    "Skill&Tell Scientific Club · ENSIA, Sidi Abdellah",
  ].join("\n");
}
