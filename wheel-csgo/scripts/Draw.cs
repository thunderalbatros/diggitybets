using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

// Action: Giveaway_CSGO  (run from the control button / OBS dock, or from the optional !pickwinner command)
// Picks a winner among viewers who wrote in the last WINDOW_MS, sends the payload to the overlay
// through the Streamer.bot WebSocket server and announces the winner in Kick chat after the animation.
public class CPHInline
{
    const string VAR_ACTIVE = "sorteoActivosRaw";
    const string VAR_RECENT_WINNERS = "sorteoUltimosGanadores";
    const int WINDOW_MS = 90000;          // 90s window (increased from 45s for organic chat accumulation)
    const int MAX_PARTICIPANTS = 30;      // cap (most recent chatters win a slot)
    const int ANNOUNCE_DELAY_MS = 6850;   // chat message synchronized to 6.85s (exact reel stop + fanfare celebration climax)
    const int BUSY_MS = 12000;            // ignores new draws while one is running
    const long WINNER_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes cooldown to prevent repeat winners

    // Broadcaster and automated chat bots are excluded from draws
    static readonly string[] IGNORED = new string[] {
        "diggitybets", "wenbot", "botrix", "nightbot", "streamelements", "streamlabs",
        "kickbot", "moobot", "fossabot", "kickbotapp"
    };

    class Entry
    {
        public string Login;
        public string Display;
        public string Avatar;
        public long Ts;
    }

    public bool Execute()
    {
        long now = NowMs();
        long busyUntil = 0;
        try { busyUntil = CPH.GetGlobalVar<long>("sorteoBusyUntil", false); } catch (Exception) { }
        if (now < busyUntil)
        {
            CPH.LogInfo("[Giveaway] A draw is already running, ignoring request.");
            return false;
        }

        bool demo = IsDemo();
        List<Entry> pool = demo ? DemoPool(now) : RealPool(now);

        if (pool.Count == 0)
        {
            CPH.SendKickMessage("No active chatters in the last 90 seconds. Type in chat to join the giveaway!", false, true);
            return false;
        }

        CPH.SetGlobalVar("sorteoBusyUntil", now + BUSY_MS, false);

        // Anti-Repeat / Winner Cooldown: filter out recent winners if there are alternative active chatters
        Dictionary<string, long> recentWinners = LoadRecentWinners(now);
        List<Entry> eligible = new List<Entry>();
        foreach (Entry e in pool)
        {
            if (!recentWinners.ContainsKey(e.Login))
            {
                eligible.Add(e);
            }
        }

        // If all active chatters won recently, fall back to the full pool so draws never get blocked
        List<Entry> selectionPool = eligible.Count > 0 ? eligible : pool;

        // Provably Fair Cryptographic Random Selection (CSPRNG with Rejection Sampling & HMAC-SHA256)
        string serverSeed = GenerateHexSeed(32);
        string serverSeedHash = ComputeSha256(serverSeed);
        string clientSeed = string.Format("hunthub_{0}_{1}_{2}", pool.Count, selectionPool.Count, now);

        int idx = ProvablyFairIndex(serverSeed, clientSeed, selectionPool.Count);
        Entry winner = selectionPool[idx];

        // Record winner in cooldown registry
        recentWinners[winner.Login] = now;
        SaveRecentWinners(recentWinners);

        string json = BuildJson(now, demo, winner, pool, serverSeed, serverSeedHash, clientSeed);
        CPH.SetArgument("sorteoPayload", json);
        CPH.SetArgument("ganador", winner.Login);
        CPH.SetArgument("numParticipantes", pool.Count);
        CPH.SetArgument("serverSeedHash", serverSeedHash);

        try { CPH.WebsocketBroadcastJson(json); }
        catch (Exception ex) { CPH.LogWarn("[Giveaway] WebsocketBroadcastJson failed: " + ex.Message); }
        try { CPH.TriggerEvent("sorteo", true); }
        catch (Exception ex) { CPH.LogWarn("[Giveaway] TriggerEvent failed: " + ex.Message); }

        CPH.LogInfo("[Giveaway] " + (demo ? "DEMO " : "") + "winner: " + winner.Login + " of " + pool.Count + " (eligible: " + selectionPool.Count + ")");

        if (demo) return true;

        CPH.Wait(ANNOUNCE_DELAY_MS);
        CPH.SendKickMessage(
            string.Format("@{0} has won, have 20 seconds to claim, type something in chat !", winner.Display),
            false, true);
        return true;
    }

    Dictionary<string, long> LoadRecentWinners(long now)
    {
        Dictionary<string, long> dict = new Dictionary<string, long>(StringComparer.OrdinalIgnoreCase);
        string raw = null;
        try { raw = CPH.GetGlobalVar<string>(VAR_RECENT_WINNERS, false); } catch (Exception) { }
        if (string.IsNullOrEmpty(raw)) return dict;

        string[] lines = raw.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
        foreach (string line in lines)
        {
            string[] parts = line.Split('\t');
            if (parts.Length >= 2)
            {
                long ts = 0;
                long.TryParse(parts[1], out ts);
                if (now - ts <= WINNER_COOLDOWN_MS)
                {
                    dict[parts[0].Trim()] = ts;
                }
            }
        }
        return dict;
    }

    void SaveRecentWinners(Dictionary<string, long> dict)
    {
        StringBuilder sb = new StringBuilder();
        foreach (KeyValuePair<string, long> kv in dict)
        {
            sb.Append(kv.Key).Append('\t').Append(kv.Value).Append('\n');
        }
        CPH.SetGlobalVar(VAR_RECENT_WINNERS, sb.ToString(), false);
    }

    static string GenerateHexSeed(int bytesCount)
    {
        byte[] bytes = new byte[bytesCount];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }
        StringBuilder sb = new StringBuilder(bytesCount * 2);
        for (int i = 0; i < bytes.Length; i++)
        {
            sb.Append(bytes[i].ToString("x2"));
        }
        return sb.ToString();
    }

    static string ComputeSha256(string raw)
    {
        using (SHA256 sha = SHA256.Create())
        {
            byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(raw));
            StringBuilder sb = new StringBuilder(hash.Length * 2);
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("x2"));
            }
            return sb.ToString();
        }
    }

    static int ProvablyFairIndex(string serverSeed, string clientSeed, int count)
    {
        if (count <= 1) return 0;
        using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(serverSeed)))
        {
            byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(clientSeed));
            // Zero modulo bias rejection sampling using 4-byte slices
            uint maxValid = uint.MaxValue - (uint.MaxValue % (uint)count);
            for (int offset = 0; offset <= hash.Length - 4; offset += 4)
            {
                uint val = BitConverter.ToUInt32(hash, offset);
                if (val < maxValid)
                {
                    return (int)(val % (uint)count);
                }
            }
        }
        // Fallback CSPRNG with rejection sampling
        return SecureIndex(count);
    }

    static int SecureIndex(int count)
    {
        if (count <= 1) return 0;
        byte[] bytes = new byte[4];
        uint maxValid = uint.MaxValue - (uint.MaxValue % (uint)count);
        uint rand;
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            do
            {
                rng.GetBytes(bytes);
                rand = BitConverter.ToUInt32(bytes, 0);
            } while (rand >= maxValid);
        }
        return (int)(rand % (uint)count);
    }

    List<Entry> RealPool(long now)
    {
        List<Entry> result = new List<Entry>();
        string raw = null;
        try { raw = CPH.GetGlobalVar<string>(VAR_ACTIVE, false); } catch (Exception) { }
        if (string.IsNullOrEmpty(raw)) return result;

        string[] lines = raw.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
        foreach (string line in lines)
        {
            string[] parts = line.Split('\t');
            if (parts.Length < 3) continue;

            string login = parts[0].Trim();
            if (IsIgnored(login)) continue;

            long ts = 0;
            long.TryParse(parts[1], out ts);
            if (now - ts <= WINDOW_MS)
            {
                Entry e = new Entry();
                e.Login = login;
                e.Ts = ts;
                e.Display = parts[2];
                e.Avatar = parts.Length >= 4 ? parts[3] : "";
                result.Add(e);
            }
        }

        result.Sort(delegate (Entry a, Entry b) { return b.Ts.CompareTo(a.Ts); });
        if (result.Count > MAX_PARTICIPANTS) result.RemoveRange(MAX_PARTICIPANTS, result.Count - MAX_PARTICIPANTS);
        return result;
    }

    List<Entry> DemoPool(long now)
    {
        string[] names = new string[] {
            "LuckyChatter", "VegasPro", "SpinKing", "JackpotAce", "Strike777", "SlotMaster",
            "DiamondKing", "NeonWolf", "RoyalFlush", "BigBassBob", "GatesOfOlly", "SweetBonanza"
        };
        List<Entry> result = new List<Entry>();
        foreach (string n in names)
        {
            Entry e = new Entry();
            e.Login = n.ToLowerInvariant();
            e.Display = n;
            e.Avatar = "";
            e.Ts = now;
            result.Add(e);
        }
        return result;
    }

    bool IsIgnored(string login)
    {
        foreach (string s in IGNORED)
            if (string.Equals(s, login, StringComparison.OrdinalIgnoreCase)) return true;
        return false;
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

    static long NowMs()
    {
        return (long)(DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
    }


    static string BuildJson(long id, bool demo, Entry winner, List<Entry> pool, string serverSeed, string serverSeedHash, string clientSeed)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("{\"evento\":\"sorteo\",\"id\":").Append(id);
        sb.Append(",\"demo\":").Append(demo ? "true" : "false");
        sb.Append(",\"ganador\":").Append(Q(winner.Login));

        sb.Append(",\"participantes\":[");
        for (int i = 0; i < pool.Count; i++)
        {
            if (i > 0) sb.Append(',');
            sb.Append(Q(pool[i].Login));
        }
        sb.Append("],\"nombres\":{");
        for (int i = 0; i < pool.Count; i++)
        {
            if (i > 0) sb.Append(',');
            sb.Append(Q(pool[i].Login)).Append(':').Append(Q(pool[i].Display));
        }
        sb.Append("},\"avatares\":{");
        bool first = true;
        foreach (Entry e in pool)
        {
            if (string.IsNullOrEmpty(e.Avatar)) continue;
            if (!first) sb.Append(',');
            first = false;
            sb.Append(Q(e.Login)).Append(':').Append(Q(e.Avatar));
        }
        sb.Append("}");

        // Provably Fair commitment & reveal object
        sb.Append(",\"provably_fair\":{");
        sb.Append("\"server_seed_hash\":").Append(Q(serverSeedHash));
        sb.Append(",\"server_seed\":").Append(Q(serverSeed));
        sb.Append(",\"client_seed\":").Append(Q(clientSeed));
        sb.Append(",\"algorithm\":\"HMAC-SHA256-REJECTION\"");
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
