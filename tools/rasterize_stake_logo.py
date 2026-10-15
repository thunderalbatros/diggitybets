import subprocess
import os
from PIL import Image

svg_path = os.path.abspath('site/images/stake-official-logo.svg')
html_path = os.path.abspath('temp_stake.html')
png_path = os.path.abspath('site/images/stake-official-logo.png')

with open(svg_path, 'r', encoding='utf-8') as f:
    svg_code = f.read()

# Make all fill="#000" or fill="currentColor" into fill="#ffffff" or keep crisp
# Let's inspect fill in svg
html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{
    width: 600px;
    height: 350px;
    background: transparent !important;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }}
  svg {{
    width: 480px;
    height: auto;
  }}
  path {{
    fill: #ffffff !important;
  }}
</style>
</head>
<body>
{svg_code}
</body>
</html>
"""

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome):
    chrome = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

cmd = [
    chrome,
    "--headless=new",
    "--disable-gpu",
    "--default-background-color=00000000",
    "--window-size=600,350",
    f"--screenshot={png_path}",
    f"file:///{html_path.replace(os.sep, '/')}"
]

res = subprocess.run(cmd, capture_output=True, text=True)

if os.path.exists(png_path):
    im = Image.open(png_path).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im_cropped = im.crop(bbox)
        im_cropped.save(png_path, "PNG")
        print(f"Successfully generated cropped Stake logo: {im_cropped.size} at {png_path}")

if os.path.exists(html_path):
    os.remove(html_path)
