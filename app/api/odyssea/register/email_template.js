/**
 * The Odyssea confirmation email — short by design.
 *
 * Built mobile-first with a single stacked column: no side-by-side label
 * columns, no fixed pixel widths inside the card, nothing that depends on a
 * media query surviving (Gmail's apps strip or ignore them often enough that a
 * layout must not need them). What renders on a 320px phone is the same shape
 * that renders at 600px, only wider.
 */

const NIGHT = "#011b2a";
const GOLD = "#bc9336";
const GOLD_LIGHT = "#e2c076";
const TITLE = "#fdcc46";
const ORANGE = "#d77a34";
const PARCHMENT = "#f6e7ca";
const INK = "#011b2a";
const INK_SOFT = "rgba(1,27,42,.74)";

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

export function buildHtml({ leaderName, teamName, reference, isTeam, mode, crew, siteUrl, contactEmail }) {
  const summary = [
    escape(teamName),
    isTeam ? `Team of ${crew.length}` : "Individual",
    mode === "online" ? "Online" : "On site, Amsterdam",
  ].join(" &nbsp;&#183;&nbsp; ");

  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Odyssea — registration received</title>
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
      @media only screen and (max-width:600px) {
        .wrap { width:100% !important; }
        .pad { padding-left:26px !important; padding-right:26px !important; }
        .h1 { font-size:26px !important; }
      }
      a { text-decoration:none; }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${NIGHT};-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
      We received your registration — reference ${escape(reference)}. We will confirm soon.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${NIGHT};">
      <tr>
        <td align="center" style="padding:34px 14px 40px;">
          <table role="presentation" class="wrap" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:560px;">

            <!-- masthead -->
            <tr>
              <td align="center" style="padding:0 0 26px;">
                <div style="font:400 26px/1 ${SERIF};letter-spacing:.2em;color:${TITLE};text-indent:.2em;">ODYSSEA</div>
                <div style="margin-top:10px;font:700 9px/1 ${SANS};letter-spacing:.32em;color:${ORANGE};text-indent:.32em;">BY SKILL&amp;TELL</div>
              </td>
            </tr>

            <!-- the plate -->
            <tr>
              <td style="background:${PARCHMENT};border-radius:10px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="height:5px;background:${GOLD};border-radius:10px 10px 0 0;font-size:0;line-height:0;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td class="pad" align="center" style="padding:36px 40px 0;">
                      <div style="font:700 10px/1 ${SANS};letter-spacing:.2em;text-transform:uppercase;color:${GOLD};">Registration received</div>

                      <h1 class="h1" style="margin:16px 0 0;font:400 30px/1.25 ${SERIF};color:${INK};">
                        Thank you, ${escape(firstName(leaderName))}
                      </h1>

                      <p style="margin:14px 0 0;font:400 16px/1.7 ${SANS};color:${INK_SOFT};">
                        We received ${isTeam ? "your team's" : "your"} registration for <strong style="color:${INK};">Odyssea</strong> and will come back to you soon with the final confirmation.
                      </p>
                    </td>
                  </tr>

                  <!-- reference + one-line summary -->
                  <tr>
                    <td class="pad" style="padding:26px 40px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${NIGHT};border-radius:8px;">
                        <tr>
                          <td align="center" style="padding:20px 22px;">
                            <div style="font:700 9px/1 ${SANS};letter-spacing:.2em;color:rgba(226,192,118,.75);">REFERENCE</div>
                            <div style="margin-top:9px;font:700 20px/1.2 ${MONO};letter-spacing:.05em;color:${TITLE};">${escape(reference)}</div>
                            <div style="margin-top:12px;font:400 13px/1.6 ${SANS};color:rgba(253,253,253,.6);">${summary}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- cta -->
                  <tr>
                    <td class="pad" align="center" style="padding:26px 40px 38px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="background:#123e51;border-radius:100px;">
                            <a href="${escape(siteUrl)}/register/odyssea" style="display:block;padding:14px 32px;font:700 11px/1 ${SANS};letter-spacing:.16em;color:${TITLE};text-decoration:none;">
                              THE ODYSSEA PAGE
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td align="center" style="padding:26px 16px 0;">
                <p style="margin:0;font:400 13px/1.7 ${SANS};color:rgba(253,253,253,.55);">
                  Questions? Reply to this email or write to
                  <a href="mailto:${escape(contactEmail)}" style="color:${GOLD_LIGHT};text-decoration:none;">${escape(contactEmail)}</a>
                </p>
                <p style="margin:14px 0 0;font:400 11px/1.7 ${SANS};color:rgba(253,253,253,.3);">
                  Skill&amp;Tell Scientific Club &#183; ENSIA, Sidi Abdellah
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildText({ leaderName, teamName, reference, isTeam, mode, crew, contactEmail }) {
  return [
    "ODYSSEA — BY SKILL&TELL",
    "",
    "REGISTRATION RECEIVED",
    "",
    `Thank you, ${firstName(leaderName)}.`,
    `We received ${isTeam ? "your team's" : "your"} registration for Odyssea and will come back to you`,
    "soon with the final confirmation.",
    "",
    `Reference: ${reference}`,
    `${teamName} · ${isTeam ? `Team of ${crew.length}` : "Individual"} · ${mode === "online" ? "Online" : "On site, Amsterdam"}`,
    "",
    `Questions? Reply to this email or write to ${contactEmail}.`,
    "Skill&Tell Scientific Club · ENSIA, Sidi Abdellah",
  ].join("\n");
}
