import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_kick_panel(
    platform_name,
    tag_text,
    title_text,
    subtitle_text,
    cta_text,
    accent_rgb,
    secondary_rgb,
    logo_path,
    output_name
):
    # Canvas dimensions: 1280 x 400 (renders at 2x and downsamples to 640 x 200 for maximum sharpness)
    W, H = 1280, 400
    
    # 1. Base Dark Solid Canvas
    img = Image.new('RGBA', (W, H), (11, 14, 22, 255))
    draw = ImageDraw.Draw(img)

    # Subtle diagonal background grid pattern for luxury gaming depth
    pattern = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(pattern)
    for i in range(-H, W, 32):
        pdraw.line([(i, 0), (i + H, H)], fill=(255, 255, 255, 4), width=1)
    img = Image.alpha_composite(img, pattern)
    draw = ImageDraw.Draw(img)

    # 2. Right-Side Background Watermark (Big Faded Brand Icon)
    if os.path.exists(logo_path):
        wm_im = Image.open(logo_path).convert('RGBA')
        wm_size = 380
        wm_im = wm_im.resize((wm_size, wm_size), Image.Resampling.LANCZOS)
        
        # Apply low opacity
        wm_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        # Place on far right
        wm_x = W - wm_size + 60
        wm_y = (H - wm_size) // 2
        
        # Reduce alpha to ~12%
        r, g, b, a = wm_im.split()
        a = a.point(lambda p: int(p * 0.08))
        wm_im.putalpha(a)
        
        wm_layer.paste(wm_im, (wm_x, wm_y), wm_im)
        img = Image.alpha_composite(img, wm_layer)
        draw = ImageDraw.Draw(img)

    # 3. Ambient Brand Radial Glow on Left & Right
    ambient = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    adraw = ImageDraw.Draw(ambient)
    adraw.ellipse([-100, -50, 450, 450], fill=(*accent_rgb, 30))
    adraw.ellipse([W - 350, H // 2 - 150, W + 100, H + 100], fill=(*secondary_rgb, 25))
    ambient = ambient.filter(ImageFilter.GaussianBlur(50))
    img = Image.alpha_composite(img, ambient)
    draw = ImageDraw.Draw(img)

    # 4. Outer Border & Neon Framing
    card_inset = 6
    card_rect = [card_inset, card_inset, W - card_inset, H - card_inset]
    draw.rounded_rectangle(card_rect, radius=24, outline=(*accent_rgb, 200), width=3)
    
    # Top edge highlight line
    draw.line([(card_inset + 30, card_inset), (W - card_inset - 30, card_inset)], fill=(255, 255, 255, 120), width=2)

    # 5. Left Icon Squircle Box
    icon_box_size = 280
    icon_x = 55
    icon_y = (H - icon_box_size) // 2
    icon_rect = [icon_x, icon_y, icon_x + icon_box_size, icon_y + icon_box_size]

    # Squircle background
    draw.rounded_rectangle(icon_rect, radius=32, fill=(18, 23, 35, 255), outline=(*accent_rgb, 180), width=3)

    # Put logo inside squircle
    if os.path.exists(logo_path):
        logo_im = Image.open(logo_path).convert('RGBA')
        max_inner = icon_box_size - 64
        ratio = min(max_inner / logo_im.width, max_inner / logo_im.height)
        new_w = int(logo_im.width * ratio)
        new_h = int(logo_im.height * ratio)
        logo_resized = logo_im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        lx = icon_x + (icon_box_size - new_w) // 2
        ly = icon_y + (icon_box_size - new_h) // 2
        img.paste(logo_resized, (lx, ly), logo_resized)

    # 6. Typography & CTA
    font_bold = 'references/repos/skills_repos/anthropics-skills/skills/canvas-design/canvas-fonts/Outfit-Bold.ttf'
    font_regular = 'references/repos/skills_repos/anthropics-skills/skills/canvas-design/canvas-fonts/Outfit-Regular.ttf'

    f_tag = ImageFont.truetype(font_bold, 22)
    f_title = ImageFont.truetype(font_bold, 78)
    f_sub = ImageFont.truetype(font_regular, 32)
    f_cta = ImageFont.truetype(font_bold, 26)

    text_x = icon_x + icon_box_size + 50

    # Top Pill Tag
    tag_y = 55
    tag_bbox = draw.textbbox((0, 0), tag_text, font=f_tag)
    tag_text_w = tag_bbox[2] - tag_bbox[0]
    tag_h = 42
    tag_w = tag_text_w + 50  # includes space for bullet dot
    
    # Pill background
    draw.rounded_rectangle([text_x, tag_y, text_x + tag_w, tag_y + tag_h], radius=21, fill=(*accent_rgb, 35), outline=(*accent_rgb, 160), width=2)
    # Bullet dot
    dot_r = 5
    dot_cx = text_x + 18
    dot_cy = tag_y + tag_h // 2
    draw.ellipse([dot_cx - dot_r, dot_cy - dot_r, dot_cx + dot_r, dot_cy + dot_r], fill=accent_rgb)
    # Tag text
    draw.text((text_x + 32, tag_y + 8), tag_text, font=f_tag, fill=accent_rgb)

    # Main Title
    title_y = tag_y + tag_h + 10
    draw.text((text_x + 3, title_y + 3), title_text, font=f_title, fill=(0, 0, 0, 200))
    draw.text((text_x, title_y), title_text, font=f_title, fill=(255, 255, 255, 255))

    # Subtitle
    sub_y = title_y + 84
    draw.text((text_x, sub_y), subtitle_text, font=f_sub, fill=(155, 175, 205, 255))

    # Bottom CTA Pill Button
    cta_y = sub_y + 54
    cta_bbox = draw.textbbox((0, 0), cta_text, font=f_cta)
    cta_text_w = cta_bbox[2] - cta_bbox[0]
    cta_h = 58
    cta_w = cta_text_w + 54
    
    # CTA button with brand accent
    draw.rounded_rectangle([text_x, cta_y, text_x + cta_w, cta_y + cta_h], radius=29, fill=accent_rgb)
    
    # Text contrast check
    is_bright = (accent_rgb[0] * 299 + accent_rgb[1] * 587 + accent_rgb[2] * 114) / 1000 > 150
    cta_fill = (10, 14, 22) if is_bright else (255, 255, 255)
    draw.text((text_x + 26, cta_y + 12), cta_text, font=f_cta, fill=cta_fill)

    # 7. Resample to standard 640x200 (@2x Retina for Kick) and 320x100 (@1x)
    final_640 = img.resize((640, 200), Image.Resampling.LANCZOS)
    out_640 = f'panels/{output_name}.png'
    final_640.save(out_640, 'PNG', optimize=True)

    final_320 = img.resize((320, 100), Image.Resampling.LANCZOS)
    out_320 = f'panels/{output_name}_320.png'
    final_320.save(out_320, 'PNG', optimize=True)

    print(f'[SUCCESS] {out_640} and {out_320} generated.')

os.makedirs('panels', exist_ok=True)

# 1. DISCORD
create_kick_panel(
    platform_name='discord',
    tag_text='COMUNIDAD OFICIAL',
    title_text='DISCORD',
    subtitle_text='Sorteos, Torneos y Chat 24/7',
    cta_text='UNIRSE AL SERVIDOR >',
    accent_rgb=(88, 101, 242),        # Discord Blurple
    secondary_rgb=(114, 137, 218),
    logo_path='site/images/discord-official-logo.png',
    output_name='discord'
)

# 2. RAINBET
create_kick_panel(
    platform_name='rainbet',
    tag_text='CODIGO: DIGGITYBETS',
    title_text='RAINBET',
    subtitle_text='Bono Exclusivo + Retiros Instantaneos',
    cta_text='JUGAR Y APOSTAR >',
    accent_rgb=(0, 229, 255),         # Rainbet Neon Cyan
    secondary_rgb=(0, 110, 255),
    logo_path='site/images/rainbet-icon.png',
    output_name='rainbet'
)

# 3. INSTAGRAM
create_kick_panel(
    platform_name='instagram',
    tag_text='@DIGGITYBETS',
    title_text='INSTAGRAM',
    subtitle_text='Clips, Historias y Novedades VIP',
    cta_text='SEGUIR EN INSTAGRAM >',
    accent_rgb=(225, 48, 108),        # Instagram Sunset Magenta
    secondary_rgb=(253, 29, 29),
    logo_path='site/images/instagram-official-logo.png',
    output_name='instagram'
)

# 4. STAKE
create_kick_panel(
    platform_name='stake',
    tag_text='USE CODE: diggitybets',
    title_text='STAKE',
    subtitle_text='Bono VIP de Bienvenida + Rakeback',
    cta_text='JUGAR EN STAKE >',
    accent_rgb=(20, 117, 225),        # Stake Brand Blue (#1475E1)
    secondary_rgb=(0, 231, 1),        # Stake Green (#00E701)
    logo_path='site/images/stake-official-logo.png',
    output_name='stake'
)
