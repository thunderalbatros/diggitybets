using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

// Action: Giveaway_Tracker30s  (trigger: Kick > Chat Message)
// Remembers who wrote recently (login, timestamp, display name, avatar).
// Filters out emote spammers (:emotename:) to ensure organic chat participation.
// Stores as a robust tab-delimited string in global variable to prevent LiteDB BSON type-cast failures.
public class CPHInline
{
    const string VAR_ACTIVE = "sorteoActivosRaw";
    const int MAX_ENTRIES = 400;
    const long PRUNE_AGE_MS = 5 * 60 * 1000;

    class Chatter
    {
        public string Login;
        public long Ts;
        public string Display;
        public string Avatar;
    }

    public bool Execute()
    {
        LogArgsFirstTimes();

        // Check if message is organic chat or emote spam
        string message = FirstString(new string[] { "message", "rawInput", "messageText", "text" });
        if (message != null && IsEmoteSpam(message))
        {
            // Discard emote spam to keep active pool 100% organic
            return false;
        }

        string login = FirstString(new string[] { "userName", "userLogin", "username", "user" });
        if (string.IsNullOrEmpty(login)) return false;
        login = login.Trim().ToLowerInvariant();

        string display = FirstString(new string[] { "user", "displayName", "userDisplayName", "userName" });
        if (string.IsNullOrEmpty(display)) display = login;

        string avatar = FindAvatar();
        long now = NowMs();

        Dictionary<string, Chatter> chatters = LoadChatters();

        string oldAvatar = "";
        Chatter prev;
        if (chatters.TryGetValue(login, out prev) && !string.IsNullOrEmpty(prev.Avatar))
        {
            oldAvatar = prev.Avatar;
        }
        if (string.IsNullOrEmpty(avatar)) avatar = oldAvatar;

        chatters[login] = new Chatter { Login = login, Ts = now, Display = display, Avatar = avatar };

        if (chatters.Count > MAX_ENTRIES)
        {
            List<string> viejos = new List<string>();
            foreach (KeyValuePair<string, Chatter> kv in chatters)
            {
                if (now - kv.Value.Ts > PRUNE_AGE_MS) viejos.Add(kv.Key);
            }
            foreach (string k in viejos) chatters.Remove(k);
        }

        SaveChatters(chatters);

        try
        {
            string chatterJson = string.Format(
                "{{\"evento\":\"chatter_activo\",\"login\":{0},\"display\":{1},\"avatar\":{2},\"ts\":{3}}}",
                Q(login), Q(display), Q(avatar), now);
            CPH.WebsocketBroadcastJson(chatterJson);
        }
        catch (Exception) { }

        return true;
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

    Dictionary<string, Chatter> LoadChatters()
    {
        Dictionary<string, Chatter> dict = new Dictionary<string, Chatter>(StringComparer.OrdinalIgnoreCase);
        string raw = null;
        try { raw = CPH.GetGlobalVar<string>(VAR_ACTIVE, false); } catch (Exception) { }
        if (string.IsNullOrEmpty(raw)) return dict;

        string[] lines = raw.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
        foreach (string line in lines)
        {
            string[] parts = line.Split('\t');
            if (parts.Length >= 3)
            {
                long ts = 0;
                long.TryParse(parts[1], out ts);
                Chatter c = new Chatter {
                    Login = parts[0],
                    Ts = ts,
                    Display = parts[2],
                    Avatar = parts.Length >= 4 ? parts[3] : ""
                };
                dict[c.Login] = c;
            }
        }
        return dict;
    }

    void SaveChatters(Dictionary<string, Chatter> chatters)
    {
        StringBuilder sb = new StringBuilder();
        foreach (KeyValuePair<string, Chatter> kv in chatters)
        {
            Chatter c = kv.Value;
            sb.Append(c.Login).Append('\t')
              .Append(c.Ts).Append('\t')
              .Append(c.Display).Append('\t')
              .Append(c.Avatar).Append('\n');
        }
        CPH.SetGlobalVar(VAR_ACTIVE, sb.ToString(), false);
    }

    static long NowMs()
    {
        return (long)(DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
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

    string FindAvatar()
    {
        foreach (KeyValuePair<string, object> kv in args)
        {
            if (kv.Value == null) continue;
            string key = kv.Key.ToLowerInvariant();
            if (key.Contains("avatar") || key.Contains("profile") || key.Contains("picture") || key.Contains("image"))
            {
                string v = kv.Value.ToString();
                if (v.StartsWith("http://") || v.StartsWith("https://")) return v;
            }
        }
        return "";
    }

    static bool IsEmoteSpam(string msg)
    {
        if (string.IsNullOrWhiteSpace(msg)) return true;
        // Kick emote pattern :name: (e.g. :pepega:, :kekw:, :sub_emote:)
        string stripped = Regex.Replace(msg, @":[a-zA-Z0-9_\-]+:", " ");
        // Count organic alphanumeric letters
        int organicCount = 0;
        foreach (char c in stripped)
        {
            if (char.IsLetterOrDigit(c)) organicCount++;
        }
        // If message has fewer than 2 organic alphanumeric characters, it is considered pure emote spam
        return organicCount < 2;
    }

    void LogArgsFirstTimes()
    {
        int n = 0;
        try { n = CPH.GetGlobalVar<int>("sorteoArgsLogged", false); } catch (Exception) { }
        if (n >= 3) return;
        CPH.SetGlobalVar("sorteoArgsLogged", n + 1, false);

        StringBuilder sb = new StringBuilder("[Giveaway] Chat trigger args: ");
        foreach (KeyValuePair<string, object> kv in args)
        {
            string v = kv.Value == null ? "" : kv.Value.ToString();
            if (v.Length > 60) v = v.Substring(0, 60);
            sb.Append(kv.Key).Append('=').Append(v).Append(" | ");
        }
        CPH.LogInfo(sb.ToString());
    }
}
