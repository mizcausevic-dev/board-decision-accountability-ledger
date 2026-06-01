$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Decision Accountability Ledger", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for decision accountability continuity" -Subtitle "One executive brief for owner-of-record drift, override activity, ownership gaps, ledger coverage, and board confidence." -Bullets @(
  "The overview keeps constrained lanes, accountability-repair moves, and owner-of-record continuity visible in one board-safe surface.",
  "Leadership can see where locking owners, recording overrides, or patching open accountability gaps would recover decision trust.",
  "This layer turns scattered accountability drift into one board-ready intervention packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Accountability lane keeps owner, audience, problem theme, and next move connected" -Subtitle "Every route retains the owner, audience, action, accountability theme, handoff counts, and board confidence." -Bullets @(
  "The accountability-lane view makes it obvious which systems are slowing because of owner drift and which ones need a cleaner owner-of-record before another board packet moves forward.",
  "Board questions stay attached to actual ownership failures instead of vague operating language.",
  "Leadership can tighten the accountability packet before the next board, investor, or operating review begins."
) -OutputPath (Join-Path $screenshots "02-accountability-lane-proof.png")

New-ScenarioImage -Title "Ownership ledger shows where the board cannot ignore owner drift and override activity" -Subtitle "Accountability headlines, owner-of-record signals, override counts, and required evidence stay visible in one board readout." -Bullets @(
  "This view keeps AI, identity, revenue, procurement, FinTech, and biotech lanes tied to the specific accountability failures slowing real decisions.",
  "Thin ledger coverage stays visible before it turns into another memo or investor narrative that outruns actual operating motion.",
  "Leadership can see exactly where one owner lock or override-record repair would strengthen the next board discussion."
) -OutputPath (Join-Path $screenshots "03-ownership-ledger-proof.png")

New-ScenarioImage -Title "Intervention posture keeps action, severity, and accountability exposure tied together" -Subtitle "Composite accountability risk, severity signals, and board-safe action stay grounded in the same operating view." -Bullets @(
  "The intervention-posture view keeps the next board move attached to actual handoff strain, owner drift, and override activity instead of abstract process stories.",
  "Weak board confidence remains visible before leadership assumes the decision path can absorb more scope.",
  "This creates a repeatable packet that can travel into board, diligence, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-intervention-posture-proof.png")
