using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

// Action: RandomSlot_Picker (trigger: !random, !slot, !randomslot or OBS control dock button)
// Picks a random slot (optionally filtered by 'stake', 'pragmatic', 'hacksaw', 'nolimit'),
// broadcasts the payload to the OBS overlay wheel via WebSocket, and announces the selected
// slot in Kick chat after the wheel finishes its spin animation.
public class CPHInline
{
    const int ANNOUNCE_DELAY_MS = 6850; // chat message synchronized to 6.85s (exact reel stop + fanfare celebration climax)
    const int BUSY_MS = 11000;           // prevents new spins while one is running

    public class SlotItem
    {
        public string Id;
        public string Name;
        public string Provider;
        public string Category;
        public string MaxWin;
        public string Image;
        public string Badge;
        public string Color;
    }

    public bool Execute()
    {
        long now = NowMs();
        long busyUntil = 0;
        try { busyUntil = CPH.GetGlobalVar<long>("slotWheelBusyUntil", false); } catch (Exception) { }
        if (now < busyUntil)
        {
            CPH.LogInfo("[SlotWheel] A spin is already in progress, ignoring request.");
            return false;
        }

        string requestedCat = ParseCategory();
        List<SlotItem> pool = LoadPool(requestedCat);

        if (pool == null || pool.Count == 0)
        {
            pool = FallbackPool(requestedCat);
        }

        CPH.SetGlobalVar("slotWheelBusyUntil", now + BUSY_MS, false);

        int idx = SecureIndex(pool.Count);
        SlotItem winner = pool[idx];

        string json = BuildJson(now, requestedCat, winner);

        CPH.SetArgument("slotName", winner.Name);
        CPH.SetArgument("slotProvider", winner.Provider);
        CPH.SetArgument("slotMaxWin", winner.MaxWin);
        CPH.SetArgument("slotCategory", requestedCat);

        // Broadcast to WebSocket clients (OBS overlay)
        try { CPH.WebsocketBroadcastJson(json); }
        catch (Exception ex) { CPH.LogWarn("[SlotWheel] WebsocketBroadcastJson failed: " + ex.Message); }

        try { CPH.TriggerEvent("sorteo_slot", true); }
        catch (Exception ex) { CPH.LogWarn("[SlotWheel] TriggerEvent failed: " + ex.Message); }

        CPH.LogInfo(string.Format("[SlotWheel] Spin triggered ({0}): {1} ({2})", requestedCat, winner.Name, winner.Provider));

        // Optional demo flag suppresses chat message
        if (IsDemo()) return true;

        // Announce in Kick chat after spin finishes
        CPH.Wait(ANNOUNCE_DELAY_MS);
        string announcement = string.Format(
            "🎰 [Slot Wheel] The wheel landed on: {0} ({1}) — Max Win: {2}! Good luck on the hunt! 🍀",
            winner.Name, winner.Provider, winner.MaxWin
        );
        CPH.SendKickMessage(announcement, false, true);

        return true;
    }

    string ParseCategory()
    {
        string raw = FirstString(new string[] { "category", "rawInput", "input0", "message" });
        if (string.IsNullOrWhiteSpace(raw)) return "all";

        string lower = raw.Trim().ToLowerInvariant();
        if (lower.Contains("stake") || lower.Contains("only")) return "stake";
        if (lower.Contains("pragmatic") || lower.Contains("pp")) return "pragmatic";
        if (lower.Contains("hacksaw") || lower.Contains("hs")) return "hacksaw";
        if (lower.Contains("nolimit") || lower.Contains("nlc") || lower.Contains("no limit")) return "nolimit";
        return "all";
    }

    List<SlotItem> LoadPool(string category)
    {
        List<SlotItem> result = new List<SlotItem>();
        try
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string[] possiblePaths = new string[] {
                Path.Combine(baseDir, "wheel-slots", "catalog", "slots.json"),
                Path.Combine(baseDir, "wheel-slots", "overlay", "slots.json"),
                Path.Combine(baseDir, "..", "wheel-slots", "catalog", "slots.json")
            };

            string foundPath = null;
            foreach (string p in possiblePaths)
            {
                if (File.Exists(p)) { foundPath = p; break; }
            }

            if (foundPath != null)
            {
                string jsonText = File.ReadAllText(foundPath, Encoding.UTF8);
                result = ParseSimpleJsonArray(jsonText, category);
            }
        }
        catch (Exception ex)
        {
            CPH.LogWarn("[SlotWheel] LoadPool file read failed: " + ex.Message);
        }

        return result;
    }

    List<SlotItem> ParseSimpleJsonArray(string json, string filterCat)
    {
        List<SlotItem> list = new List<SlotItem>();
        if (string.IsNullOrEmpty(json)) return list;

        int idx = 0;
        while (true)
        {
            int start = json.IndexOf('{', idx);
            if (start == -1) break;
            int end = json.IndexOf('}', start);
            if (end == -1) break;

            string objStr = json.Substring(start, end - start + 1);
            SlotItem item = new SlotItem();
            item.Id = ExtractVal(objStr, "id");
            item.Name = ExtractVal(objStr, "name");
            item.Provider = ExtractVal(objStr, "provider");
            item.Category = ExtractVal(objStr, "category");
            item.MaxWin = ExtractVal(objStr, "maxWin");
            item.Image = ExtractVal(objStr, "image");
            item.Badge = ExtractVal(objStr, "badge");
            item.Color = ExtractVal(objStr, "color");

            if (!string.IsNullOrEmpty(item.Name))
            {
                if (filterCat == "all" || string.Equals(item.Category, filterCat, StringComparison.OrdinalIgnoreCase))
                {
                    list.Add(item);
                }
            }

            idx = end + 1;
        }

        return list;
    }

    string ExtractVal(string json, string key)
    {
        string pattern = "\"" + key + "\":\"";
        int i = json.IndexOf(pattern);
        if (i == -1) return "";
        int start = i + pattern.Length;
        int end = json.IndexOf('"', start);
        if (end == -1) return "";
        return json.Substring(start, end - start);
    }

    List<SlotItem> FallbackPool(string category)
    {
        List<SlotItem> fb = new List<SlotItem>();

        fb.Add(new SlotItem { Name = "Wanted Dead or a Wild", Provider = "Hacksaw Gaming", Category = "hacksaw", MaxWin = "12,500x", Badge = "HACKSAW", Color = "#ff5722", Image = "" });
        fb.Add(new SlotItem { Name = "Le Bandit", Provider = "Hacksaw Gaming", Category = "hacksaw", MaxWin = "10,000x", Badge = "HACKSAW", Color = "#ff5722", Image = "" });
        fb.Add(new SlotItem { Name = "Dork Unit", Provider = "Hacksaw Gaming", Category = "hacksaw", MaxWin = "10,000x", Badge = "HACKSAW", Color = "#ff5722", Image = "" });
        fb.Add(new SlotItem { Name = "RIP City", Provider = "Hacksaw Gaming", Category = "hacksaw", MaxWin = "12,500x", Badge = "HACKSAW", Color = "#ff5722", Image = "" });
        fb.Add(new SlotItem { Name = "Chaos Crew 2", Provider = "Hacksaw Gaming", Category = "hacksaw", MaxWin = "20,000x", Badge = "HACKSAW", Color = "#ff5722", Image = "" });

        fb.Add(new SlotItem { Name = "Gates of Olympus 1000", Provider = "Pragmatic Play", Category = "pragmatic", MaxWin = "15,000x", Badge = "PRAGMATIC", Color = "#00e5ff", Image = "" });
        fb.Add(new SlotItem { Name = "Sweet Bonanza 1000", Provider = "Pragmatic Play", Category = "pragmatic", MaxWin = "25,000x", Badge = "PRAGMATIC", Color = "#00e5ff", Image = "" });
        fb.Add(new SlotItem { Name = "Sugar Rush 1000", Provider = "Pragmatic Play", Category = "pragmatic", MaxWin = "25,000x", Badge = "PRAGMATIC", Color = "#00e5ff", Image = "" });
        fb.Add(new SlotItem { Name = "Big Bass Splash", Provider = "Pragmatic Play", Category = "pragmatic", MaxWin = "5,000x", Badge = "PRAGMATIC", Color = "#00e5ff", Image = "" });
        fb.Add(new SlotItem { Name = "The Dog House Megaways", Provider = "Pragmatic Play", Category = "pragmatic", MaxWin = "12,305x", Badge = "PRAGMATIC", Color = "#00e5ff", Image = "" });

        fb.Add(new SlotItem { Name = "San Quentin xWays", Provider = "Nolimit City", Category = "nolimit", MaxWin = "150,000x", Badge = "NOLIMIT", Color = "#e65100", Image = "" });
        fb.Add(new SlotItem { Name = "Mental", Provider = "Nolimit City", Category = "nolimit", MaxWin = "66,666x", Badge = "NOLIMIT", Color = "#e65100", Image = "" });
        fb.Add(new SlotItem { Name = "Tombstone R.I.P.", Provider = "Nolimit City", Category = "nolimit", MaxWin = "300,000x", Badge = "NOLIMIT", Color = "#e65100", Image = "" });
        fb.Add(new SlotItem { Name = "Fire in the Hole 2", Provider = "Nolimit City", Category = "nolimit", MaxWin = "65,000x", Badge = "NOLIMIT", Color = "#e65100", Image = "" });

        fb.Add(new SlotItem { Name = "Sharks!", Provider = "Pragmatic Play", Category = "stake", MaxWin = "10,000x", Badge = "ONLY ON STAKE", Color = "#ffd700", Image = "" });
        fb.Add(new SlotItem { Name = "Dork Show", Provider = "Hacksaw Gaming", Category = "stake", MaxWin = "10,000x", Badge = "ONLY ON STAKE", Color = "#ffd700", Image = "" });
        fb.Add(new SlotItem { Name = "Waylanders Forge", Provider = "Valkyrie", Category = "stake", MaxWin = "80,085x", Badge = "ONLY ON STAKE", Color = "#ffd700", Image = "" });
        fb.Add(new SlotItem { Name = "Ghost Rush", Provider = "Paperclip Gaming", Category = "stake", MaxWin = "10,000x", Badge = "ONLY ON STAKE", Color = "#ffd700", Image = "" });

        if (category == "all") return fb;

        List<SlotItem> filtered = new List<SlotItem>();
        foreach (SlotItem it in fb)
        {
            if (string.Equals(it.Category, category, StringComparison.OrdinalIgnoreCase))
                filtered.Add(it);
        }
        return filtered.Count > 0 ? filtered : fb;
    }

    bool IsDemo()
    {
        object v;
        if (args.TryGetValue("demo", out v) && v != null)
        {
            string s = v.ToString();
            return string.Equals(s, "true", StringComparison.OrdinalIgnoreCase) || s == "1";
        }
        return false;
    }

    string FirstString(string[] keys)
    {
        foreach (string k in keys)
        {
            object v;
            if (args.TryGetValue(k, out v) && v != null)
            {
                string s = v.ToString();
                if (!string.IsNullOrWhiteSpace(s)) return s;
            }
        }
        return null;
    }

    static long NowMs()
    {
        return (long)(DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
    }

    static int SecureIndex(int count)
    {
        byte[] bytes = new byte[4];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }
        return (int)(BitConverter.ToUInt32(bytes, 0) % (uint)count);
    }

    static string BuildJson(long id, string category, SlotItem winner)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("{\"evento\":\"sorteo_slot\",\"id\":").Append(id);
        sb.Append(",\"categoria\":").Append(Q(category));
        sb.Append(",\"ganador\":{");
        sb.Append("\"id\":").Append(Q(winner.Id));
        sb.Append(",\"name\":").Append(Q(winner.Name));
        sb.Append(",\"provider\":").Append(Q(winner.Provider));
        sb.Append(",\"category\":").Append(Q(winner.Category));
        sb.Append(",\"maxWin\":").Append(Q(winner.MaxWin));
        sb.Append(",\"image\":").Append(Q(winner.Image));
        sb.Append(",\"badge\":").Append(Q(winner.Badge));
        sb.Append(",\"color\":").Append(Q(winner.Color));
        sb.Append("}}");
        return sb.ToString();
    }

    static string Q(string s)
    {
        if (s == null) s = "";
        StringBuilder sb = new StringBuilder("\"");
        foreach (char c in s)
        {
            switch (c)
            {
                case '"': sb.Append("\\\""); break;
                case '\\': sb.Append("\\\\"); break;
                case '\n': sb.Append("\\n"); break;
                case '\r': sb.Append("\\r"); break;
                case '\t': sb.Append("\\t"); break;
                default:
                    if (c < 32) sb.Append("\\u").Append(((int)c).ToString("x4"));
                    else sb.Append(c);
                    break;
            }
        }
        return sb.Append('"').ToString();
    }
}
