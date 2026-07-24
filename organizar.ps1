# ============================================================
#  ORGANIZAR PROYECTO + UNIR LAS FOTOS DEL CIELO
#  Ejecutar UNA sola vez, en PowerShell.
#  Las carpetas originales de fotos NO se tocan (solo se copian).
# ============================================================

# ---- ✏️ CAMBIA ESTAS 3 RUTAS SI HACE FALTA ----
$proyecto   = "C:\Users\Johitan\Desktop\pag"                    # tu carpeta del proyecto
$origenJpg  = "C:\Users\Johitan\Downloads\Telegram Desktop"      # las 176 en .jpg
$origenJpeg = "C:\Users\Johitan\Downloads"                       # las 39 en .jpeg
# ------------------------------------------------

Set-Location $proyecto

# --- 1. Crear la estructura de carpetas ---
mkdir css, js, audio, img, img\cielo, extras -Force | Out-Null

# --- 2. Mover cada archivo a su lugar ---
$sil = @{ ErrorAction = 'SilentlyContinue' }
Move-Item styles.css, cumple.css  css    @sil
Move-Item script.js,  cumple.js   js     @sil
Move-Item *.mp3                   audio  @sil
Move-Item boton.png, foto*.png    img    @sil
Move-Item *.pdf, *.docx           extras @sil
Remove-Item cielo1.jpg @sil     # copia suelta, se vuelve a generar abajo

# --- 3. Unir y renumerar TODAS las fotos del cielo ---
$i = 1
Get-ChildItem "$origenJpeg\*", "$origenJpg\*" -Include cielo*.jpg, cielo*.jpeg -File |
    Sort-Object @{e = { $_.DirectoryName }}, @{e = { [int]($_.BaseName -replace '\D', '') }} |
    ForEach-Object {
        Copy-Item $_.FullName "$proyecto\img\cielo\cielo$i.jpg"
        $i++
    }

# --- 4. Resultado ---
$total = $i - 1
Write-Host ""
Write-Host "  Fotos del cielo copiadas: $total" -ForegroundColor Green
Write-Host "  Abre js\cumple.js y pon:  const TOTAL_FOTOS_CIELO = $total;" -ForegroundColor Yellow
Write-Host ""
