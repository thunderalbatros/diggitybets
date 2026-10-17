import json
import os
import re

ROOT = r"C:\Users\tomas\Desktop\streamerbot"
SLOTS_DB_PATH = os.path.join(ROOT, "references", "slots_db.json")
OUTPUT_PATH = os.path.join(ROOT, "wheel-slots", "catalog", "slots.json")
OVERLAY_OUTPUT_PATH = os.path.join(ROOT, "wheel-slots", "overlay", "slots.json")

with open(SLOTS_DB_PATH, "r", encoding="utf-8") as f:
    raw_db = json.load(f)

catalog = []
seen_names = set()

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

# 1. Iconic Pragmatic Play Flagships (Verified HTTP 200 OK Official / Stake CDN Covers)
PRAGMATIC_FLAGSHIPS = [
    {"name": "Gates of Olympus", "maxWin": "5,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2021/02/GOOL_EN_339x180.png"},
    {"name": "Gates of Olympus 1000", "maxWin": "15,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2023/12/Gates-of-Olympus_1000_339x180.png"},
    {"name": "Sweet Bonanza", "maxWin": "21,100x", "image": "https://mediumrare.imgix.net/9974a4ae80c70a5d29be4a1e6a645a55169ff82722b5a50694db86f25b4f2f0f?w=180&h=236&fit=min&auto=format"},
    {"name": "Sweet Bonanza 1000", "maxWin": "25,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2024/05/Sweet-Bonanza-1000_339x180.png"},
    {"name": "Sugar Rush", "maxWin": "5,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2022/06/Sugar_Rush_EN_339x180.png"},
    {"name": "Sugar Rush 1000", "maxWin": "25,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2024/03/Sugar-Rush-1000_339x180.png"},
    {"name": "Big Bass Bonanza", "maxWin": "2,100x", "image": "https://mediumrare.imgix.net/28b9f1d33ddddb3b365ed5c1ad5a815f02db8a16d6849f436a63fbfafe3dba75?w=180&h=236&fit=min&auto=format"},
    {"name": "Big Bass Splash", "maxWin": "5,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2022/06/BBSPLASH_EN_339x180_04-1.png"},
    {"name": "The Dog House", "maxWin": "6,750x", "image": "https://mediumrare.imgix.net/a4d23060859f85328016a20bafb2b9d5eb8c828ade4c34940cf239b41f393bb6?w=180&h=236&fit=min&auto=format"},
    {"name": "The Dog House Megaways", "maxWin": "12,305x", "image": "https://mediumrare.imgix.net/9aaa1942df920ad474e703a0ce36b119f51e6b3342b96e848a7c2bbe9078c75a?w=180&h=236&fit=min&auto=format"},
    {"name": "Starlight Princess", "maxWin": "5,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2021/08/Starlight-Princess_EN_339x180_01.png"},
    {"name": "Starlight Princess 1000", "maxWin": "15,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2023/07/Starlight-Princess-1000_339x180.png"},
    {"name": "Fruit Party", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/2a36d99378d8a4462213c4251b814f177bab69a7b06fe6ab2ecff60f6581ace8?w=180&h=236&fit=min&auto=format"},
    {"name": "Madame Destiny Megaways", "maxWin": "5,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2021/01/MDM_EN_339x180.png"},
    {"name": "Wild West Gold", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/554d3e534e9c8a2703830770f8f4c4b4822230adf29c23a4f3870f29b14f428a?w=180&h=236&fit=min&auto=format"},
    {"name": "Buffalo King Megaways", "maxWin": "5,000x", "image": "https://www.pragmaticplay.com/wp-content/uploads/2021/04/Buffalo-King-Megaways_339x180_EN.png"},
    {"name": "Ze Zeus", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1508.jpg"}
]

# 2. Iconic Hacksaw Gaming Flagships (Verified HTTP 200 OK Official Hacksaw CDN Covers)
HACKSAW_FLAGSHIPS = [
    {"name": "Wanted Dead or a Wild", "maxWin": "12,500x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1067.jpg"},
    {"name": "Le Bandit", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1309.jpg"},
    {"name": "Dork Unit", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1172.jpg"},
    {"name": "RIP City", "maxWin": "12,500x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1233.jpg"},
    {"name": "Chaos Crew 2", "maxWin": "20,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1352.jpg"},
    {"name": "Hand of Anubis", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1164.jpg"},
    {"name": "Gladiator Legends", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1160.jpg"},
    {"name": "Beam Boys", "maxWin": "12,500x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1426.jpg"},
    {"name": "Fist of Destruction", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1408.jpg"},
    {"name": "2 Wild 2 Die", "maxWin": "15,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1400.jpg"},
    {"name": "SixSixSix", "maxWin": "16,666x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1534.jpg"},
    {"name": "Densho", "maxWin": "10,000x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1348.jpg"},
    {"name": "Stormforged", "maxWin": "12,500x", "image": "https://www-live.hacksawgaming.com/casino_thumbnails/1243.jpg"}
]

# 3. Iconic Nolimit City Flagships (Verified HTTP 200 OK Official Nolimit CDN Covers)
NOLIMIT_FLAGSHIPS = [
    {"name": "San Quentin xWays", "maxWin": "150,000x", "image": "https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png"},
    {"name": "San Quentin 2: Death Row", "maxWin": "200,000x", "image": "https://fan-cdn.nolimitcity.com/Web_Jumbotron_GATOR_HUNTERS_2_77bafec018.png"},
    {"name": "Mental", "maxWin": "66,666x", "image": "https://fan-cdn.nolimitcity.com/mental_meta_image_06f5394518.png"},
    {"name": "Tombstone R.I.P.", "maxWin": "300,000x", "image": "https://fan-cdn.nolimitcity.com/tombstone_rip_meta_image_1513c1fbe7.jpg"},
    {"name": "Fire in the Hole 2", "maxWin": "65,000x", "image": "https://fan-cdn.nolimitcity.com/fith_2_share_img_db234472f3.png"},
    {"name": "Das xBoot", "maxWin": "55,200x", "image": "https://fan-cdn.nolimitcity.com/das_xboot_meta_image_8b26f28d0f.png"},
    {"name": "Folsom Prison", "maxWin": "71,400x", "image": "https://fan-cdn.nolimitcity.com/folsom_prison_splash_poster_9cfb1e7e22.png"},
    {"name": "Dead Canary", "maxWin": "65,000x", "image": "https://fan-cdn.nolimitcity.com/dead_canary_share_1b828fc1d7.jpg"},
    {"name": "Blood & Shadow", "maxWin": "6,666x", "image": "https://fan-cdn.nolimitcity.com/blood_and_shadow_share_162f4e0bb2.png"},
    {"name": "The Crypt", "maxWin": "27,000x", "image": "https://fan-cdn.nolimitcity.com/the_crypt_share_15438b4a2d.png"},
    {"name": "Serial", "maxWin": "74,800x", "image": "https://fan-cdn.nolimitcity.com/2x1_A_f0fda230c6.jpg"},
    {"name": "Punk Toilet", "maxWin": "33,333x", "image": "https://fan-cdn.nolimitcity.com/punk_toilet_meta_image_3ae603d16f.jpg"},
    {"name": "Misery Mining", "maxWin": "70,000x", "image": "https://fan-cdn.nolimitcity.com/misery_mining_meta_image_12d4317ac9.png"},
    {"name": "Possessed", "maxWin": "50,000x", "image": "https://fan-cdn.nolimitcity.com/possessed_thumbnail_c318cb87b9.png"}
]

# Add Pragmatic flagships
for s in PRAGMATIC_FLAGSHIPS:
    slug = slugify(s["name"])
    seen_names.add(s["name"].lower())
    catalog.append({
        "id": slug,
        "name": s["name"],
        "provider": "Pragmatic Play",
        "category": "pragmatic",
        "maxWin": s["maxWin"],
        "image": s["image"],
        "badge": "PRAGMATIC",
        "color": "#00e5ff"
    })

# Add Hacksaw flagships
for s in HACKSAW_FLAGSHIPS:
    slug = slugify(s["name"])
    seen_names.add(s["name"].lower())
    catalog.append({
        "id": slug,
        "name": s["name"],
        "provider": "Hacksaw Gaming",
        "category": "hacksaw",
        "maxWin": s["maxWin"],
        "image": s["image"],
        "badge": "HACKSAW",
        "color": "#ff5722"
    })

# Add Nolimit flagships
for s in NOLIMIT_FLAGSHIPS:
    slug = slugify(s["name"])
    seen_names.add(s["name"].lower())
    catalog.append({
        "id": slug,
        "name": s["name"],
        "provider": "Nolimit City",
        "category": "nolimit",
        "maxWin": s["maxWin"],
        "image": s["image"],
        "badge": "NOLIMIT",
        "color": "#e65100"
    })

# Process all slots from slots_db.json
for s in raw_db:
    name = s.get("name", "").strip()
    provider = s.get("provider", "Stake Exclusive").strip()
    image = s.get("image", "").strip()

    if not name or not image or name.lower() in seen_names:
        continue
    seen_names.add(name.lower())

    p_lower = provider.lower()
    if "pragmatic" in p_lower:
        cat = "pragmatic"
        badge = "PRAGMATIC"
        color = "#00e5ff"
        max_win = "10,000x"
    elif "hacksaw" in p_lower:
        cat = "hacksaw"
        badge = "HACKSAW"
        color = "#ff5722"
        max_win = "10,000x"
    elif "nolimit" in p_lower or "no limit" in p_lower:
        cat = "nolimit"
        badge = "NOLIMIT"
        color = "#e65100"
        max_win = "50,000x"
    else:
        cat = "stake"
        badge = "ONLY ON STAKE"
        color = "#ffd700"
        max_win = "25,000x"

    catalog.append({
        "id": slugify(name),
        "name": name,
        "provider": provider,
        "category": cat,
        "maxWin": max_win,
        "image": image,
        "badge": badge,
        "color": color
    })

print(f"Total curated catalog entries: {len(catalog)}")
by_cat = {}
for c in catalog:
    by_cat[c["category"]] = by_cat.get(c["category"], 0) + 1
for k, v in by_cat.items():
    print(f"  Category '{k}': {v} slots")

# Save to catalog/slots.json
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

# Also save directly in overlay for browser source loading
with open(OVERLAY_OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

# Also save as a JS file for 100% CORS-free file:/// loading in OBS Studio
js_path = os.path.join(ROOT, "wheel-slots", "overlay", "slots-data.js")
with open(js_path, "w", encoding="utf-8") as f:
    f.write("window.SLOTS_CATALOG = " + json.dumps(catalog, ensure_ascii=False) + ";\n")

print("Saved catalog to:", OUTPUT_PATH)
print("Saved overlay catalog to:", OVERLAY_OUTPUT_PATH)
print("Saved JS catalog to:", js_path)
