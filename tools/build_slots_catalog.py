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

# 1. Iconic Pragmatic Play Flagships
PRAGMATIC_FLAGSHIPS = [
    {"name": "Gates of Olympus", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/8b11c97a78ef3a7cfbe3a49257bbdf9360cb4be258b3506927da8fa8c028a25c?w=180&h=236&fit=min&auto=format"},
    {"name": "Gates of Olympus 1000", "maxWin": "15,000x", "image": "https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format"},
    {"name": "Sweet Bonanza", "maxWin": "21,100x", "image": "https://mediumrare.imgix.net/4ef4fc019e0839e144a1fa429813c9a6df27a00f2e82cf594d2ba7cb5b5c92c8?w=180&h=236&fit=min&auto=format"},
    {"name": "Sweet Bonanza 1000", "maxWin": "25,000x", "image": "https://mediumrare.imgix.net/2be43834316fa71dc75a5960ce01783f98292f9d854e4881f215099fbcfe327c?w=180&h=236&fit=min&auto=format"},
    {"name": "Sugar Rush", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/60b940989067b5e9f56475d4ff3db896942ad2f347960fa03892797e8bc6f827?w=180&h=236&fit=min&auto=format"},
    {"name": "Sugar Rush 1000", "maxWin": "25,000x", "image": "https://mediumrare.imgix.net/5d6f6e8e0d6b0b5711c2adad4f3914a38f714eb6c0c55f84eb430e3bb4a3ba45?w=180&h=236&fit=min&auto=format"},
    {"name": "Big Bass Bonanza", "maxWin": "2,100x", "image": "https://mediumrare.imgix.net/a5dcb65fbf77d446dc0320bb00fe79ca0236a2e4ba775ec0b4bfcb80cfec401a?w=180&h=236&fit=min&auto=format"},
    {"name": "Big Bass Splash", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/dddf1cfdf8c991b5d638be0a599f66dc0dfbf813501cb6982f6e91f6ebf8b66f?w=180&h=236&fit=min&auto=format"},
    {"name": "The Dog House", "maxWin": "6,750x", "image": "https://mediumrare.imgix.net/a4e0a775836a0d2f093222da8e1548a3952ba5c3db692257d0aebe60ad0761e3?w=180&h=236&fit=min&auto=format"},
    {"name": "The Dog House Megaways", "maxWin": "12,305x", "image": "https://mediumrare.imgix.net/b404ad170f4cf54f3b60fc851b2fc5d2a931ca81bbd067e4367c3fe5848bb010?w=180&h=236&fit=min&auto=format"},
    {"name": "Starlight Princess", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/6082cbba6a12dc6f4fa6bfec231d7bfd16fc0c9c7e0c46b149b5ae7976e6443c?w=180&h=236&fit=min&auto=format"},
    {"name": "Starlight Princess 1000", "maxWin": "15,000x", "image": "https://mediumrare.imgix.net/b0ec0c8c0bbab167f9d5059d43ad26f3329fc61da0c58a8a3a0ea2195f00e998?w=180&h=236&fit=min&auto=format"},
    {"name": "Fruit Party", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/19ae7e3bf876bc70ffc20173872c67cf7eeadcfb5da1a1f0a28f80457cb14199?w=180&h=236&fit=min&auto=format"},
    {"name": "Madame Destiny Megaways", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/f6f6ef43d3b7623910c69d8b18a3a2c5ce9c222956cf5723f5b2bdfadfe7f780?w=180&h=236&fit=min&auto=format"},
    {"name": "Wild West Gold", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/3d97f2621ad76d337f7a3efd85c186835a589cf8fafe4ee506b1076bfeee3e56?w=180&h=236&fit=min&auto=format"},
    {"name": "Buffalo King Megaways", "maxWin": "5,000x", "image": "https://mediumrare.imgix.net/2e8c25785f7a0dcbb0591f855d0a6bb2aa36733ecce26b6b3e945c8c6a25c6fa?w=180&h=236&fit=min&auto=format"},
    {"name": "Ze Zeus", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/285d85217833a697ce7f74bf0ef2df8be7fce203a94aaee190477cfbdfda735e?w=180&h=236&fit=min&auto=format"}
]

# 2. Iconic Hacksaw Gaming Flagships
HACKSAW_FLAGSHIPS = [
    {"name": "Wanted Dead or a Wild", "maxWin": "12,500x", "image": "https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format"},
    {"name": "Le Bandit", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/dbb3f6630f9a76bc88bfd52a2307ef0cb1e6a3c42878c43026ad1607fa48b8ec?w=180&h=236&fit=min&auto=format"},
    {"name": "Dork Unit", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/14d8eb34c379a00e5720c29f63624e5a99e19d7d3d6666fa5a0f82c40c8fa907?w=180&h=236&fit=min&auto=format"},
    {"name": "RIP City", "maxWin": "12,500x", "image": "https://mediumrare.imgix.net/5a0c36b4ae9cbe588cf4ba27e57c661bb5ad4e85741f23ee9f3907c0879c3d4f?w=180&h=236&fit=min&auto=format"},
    {"name": "Chaos Crew 2", "maxWin": "20,000x", "image": "https://mediumrare.imgix.net/41da24e4d5885fe77bc95f5108fb26d70ae4f3fec14781cfc9fa6a8e805fe9e3?w=180&h=236&fit=min&auto=format"},
    {"name": "Hand of Anubis", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/06a3501a30fcf214b98160fc976aa260a9f5d1797c23bc9eeaa1a97d8bcfdb92?w=180&h=236&fit=min&auto=format"},
    {"name": "Gladiator Legends", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/c0688a264a66a1e367807604f85e3a8e97f66e07e8ef6e4efaa3b1a206be44d9?w=180&h=236&fit=min&auto=format"},
    {"name": "Beam Boys", "maxWin": "12,500x", "image": "https://mediumrare.imgix.net/730b62e45da2a9c379b37803e1c66746816029fe266c2438b4c2b9a7c645ea9d?w=180&h=236&fit=min&auto=format"},
    {"name": "Fist of Destruction", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/f3ba8464a974b8686d11e5509787ffda84ea873832c3f84f0ca71b489c7eb3e3?w=180&h=236&fit=min&auto=format"},
    {"name": "2 Wild 2 Die", "maxWin": "15,000x", "image": "https://mediumrare.imgix.net/c7ef21d3e8e2c659551c6b12d5d85c4a52fa3ea0bf11a37c95e6f6630f1465e9?w=180&h=236&fit=min&auto=format"},
    {"name": "SixSixSix", "maxWin": "16,666x", "image": "https://mediumrare.imgix.net/1344aa1be63a9aa83e60c87fcb101c784f181f7d54203aeae4531405a395c805?w=180&h=236&fit=min&auto=format"},
    {"name": "Densho", "maxWin": "10,000x", "image": "https://mediumrare.imgix.net/d04a625d97f1ca54b321a5ba85cb5b263b827cb6b5c33198a0026e6328329b35?w=180&h=236&fit=min&auto=format"},
    {"name": "Stormforged", "maxWin": "12,500x", "image": "https://mediumrare.imgix.net/b0dc372f5ea14fc0ec8d4f0aa7bb34eb22aebdfca8f0003e06efc6be818e3c3b?w=180&h=236&fit=min&auto=format"}
]

# 3. Iconic Nolimit City Flagships
NOLIMIT_FLAGSHIPS = [
    {"name": "San Quentin xWays", "maxWin": "150,000x", "image": "https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png"},
    {"name": "San Quentin 2: Death Row", "maxWin": "200,000x", "image": "https://fan-cdn.nolimitcity.com/Web_Jumbotron_GATOR_HUNTERS_2_77bafec018.png"},
    {"name": "Mental", "maxWin": "66,666x", "image": "https://mediumrare.imgix.net/05cfbdfcf1c81cfd8c7602f3bb44781df5a48554fe4bf693c126581c8160408d?w=180&h=236&fit=min&auto=format"},
    {"name": "Tombstone R.I.P.", "maxWin": "300,000x", "image": "https://mediumrare.imgix.net/2e276f595fe36e4f3aa79d2ee37e7fe0b8f9e6129841808605eb8037a5e84606?w=180&h=236&fit=min&auto=format"},
    {"name": "Fire in the Hole 2", "maxWin": "65,000x", "image": "https://mediumrare.imgix.net/c5ffbb9920155b991da40b490d1e345cb3f73ae08be6ecfa609d94944ec7ea72?w=180&h=236&fit=min&auto=format"},
    {"name": "Das xBoot", "maxWin": "55,200x", "image": "https://mediumrare.imgix.net/d0bb47b5c87cbfb534e793ea5b07849e83ec0bf7246ba727725d2b1f07da190e?w=180&h=236&fit=min&auto=format"},
    {"name": "Folsom Prison", "maxWin": "71,400x", "image": "https://mediumrare.imgix.net/7ae4a07d6b3531dbfa3e271c6d9bb1ba6d83a1975e52da453ff54ae006248b1d?w=180&h=236&fit=min&auto=format"},
    {"name": "Dead Canary", "maxWin": "65,000x", "image": "https://mediumrare.imgix.net/c528f8042eb6bf1e3b2e59e19d7d92823a01ff4c6c180905952db589b940ae1e?w=180&h=236&fit=min&auto=format"},
    {"name": "Blood & Shadow", "maxWin": "6,666x", "image": "https://mediumrare.imgix.net/2c7fc28eecbfa658d5f49d211eb44d85836c05c317ceba5db7318db4974fe0f9?w=180&h=236&fit=min&auto=format"},
    {"name": "The Crypt", "maxWin": "27,000x", "image": "https://mediumrare.imgix.net/81f8f3b2024db16ceb2158498dcb76892fc2330a6c0cf9be5303dfc8f0003b87?w=180&h=236&fit=min&auto=format"},
    {"name": "Serial", "maxWin": "74,800x", "image": "https://mediumrare.imgix.net/60309608bb9622d9cb7c4199fc99db0622c4f2bb70b1cecbaf7203b94a8e2cb9?w=180&h=236&fit=min&auto=format"},
    {"name": "Punk Toilet", "maxWin": "33,333x", "image": "https://mediumrare.imgix.net/83d5a49934271c35b62e49c716298bb3d23190ab762e53ef788a531b798782fe?w=180&h=236&fit=min&auto=format"},
    {"name": "Misery Mining", "maxWin": "70,000x", "image": "https://mediumrare.imgix.net/4ca42371b6973ba919864a78cb2ca01fe342672bfd69a68a62450ae71b9f6cf3?w=180&h=236&fit=min&auto=format"},
    {"name": "Possessed", "maxWin": "50,000x", "image": "https://mediumrare.imgix.net/cf4a26f8373f71c4c92c83ff56d47b66df21a00a12e3e5066c0fc9846b0e87d4?w=180&h=236&fit=min&auto=format"}
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
