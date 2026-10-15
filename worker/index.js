/**
 * HuntHub Cloudflare Worker — Production Edge API (100% Free Plan)
 * Handles Kick.com OAuth 2.1 PKCE exchange and Discord OAuth2 securely.
 * Zero secrets exposed in git. Environment variables managed in Cloudflare Dashboard or .dev.vars.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    // 2. Static Assets binding (Cloudflare Workers Static Assets)
    if (env.ASSETS && !url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    // 3. Healthcheck
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        edgeRegion: request.cf?.colo || 'LOCAL',
        timestamp: Date.now()
      }), { headers: corsHeaders });
    }

    // 3. Kick OAuth 2.1 PKCE Token Exchange Endpoint
    if (url.pathname === '/api/auth/kick/callback' && request.method === 'POST') {
      try {
        const { code, code_verifier, redirect_uri } = await request.json();

        if (!code || !code_verifier) {
          return new Response(JSON.stringify({ error: 'Missing code or code_verifier' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const clientId = env.KICK_CLIENT_ID || 'kick_pub_client_diggitybets';
        const clientSecret = env.KICK_CLIENT_SECRET || '';

        // Exchange code with Kick token endpoint
        const tokenRes = await fetch('https://id.kick.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirect_uri,
            code_verifier: code_verifier,
            code: code
          })
        });

        if (!tokenRes.ok) {
          const errText = await tokenRes.text();
          return new Response(JSON.stringify({ error: 'Kick token exchange failed', details: errText }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const tokenData = await tokenRes.json();

        // Retrieve Kick user profile
        const userRes = await fetch('https://api.kick.com/public/v1/users', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Accept': 'application/json'
          }
        });

        let userData = { username: 'KickViewer', isSub: false };
        if (userRes.ok) {
          const kickApiData = await userRes.json();
          if (kickApiData.data && kickApiData.data[0]) {
            const user = kickApiData.data[0];
            userData.username = user.username;
            userData.avatarUrl = user.profile_picture;
            userData.id = user.id;
          }
        }

        return new Response(JSON.stringify({
          success: true,
          username: userData.username,
          avatarUrl: userData.avatarUrl || '',
          verified: true
        }), { headers: corsHeaders });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 4. Discord OAuth2 Token Exchange Endpoint
    if (url.pathname === '/api/auth/discord/callback' && request.method === 'POST') {
      try {
        const { code, redirect_uri } = await request.json();

        if (!code) {
          return new Response(JSON.stringify({ error: 'Missing code' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const discordClientId = env.DISCORD_CLIENT_ID || '';
        const discordClientSecret = env.DISCORD_CLIENT_SECRET || '';

        const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: discordClientId,
            client_secret: discordClientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri
          })
        });

        if (!tokenRes.ok) {
          const errText = await tokenRes.text();
          return new Response(JSON.stringify({ error: 'Discord token exchange failed', details: errText }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const tokenData = await tokenRes.json();

        // Fetch Discord user profile
        const profileRes = await fetch('https://discord.com/api/users/@me', {
          headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
        });

        let discordUser = { username: 'DiscordMember' };
        if (profileRes.ok) {
          const me = await profileRes.json();
          discordUser.username = me.username + (me.discriminator && me.discriminator !== '0' ? `#${me.discriminator}` : '');
          discordUser.id = me.id;
          if (me.avatar) {
            discordUser.avatarUrl = `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png`;
          }
        }

        return new Response(JSON.stringify({
          success: true,
          username: discordUser.username,
          id: discordUser.id,
          avatarUrl: discordUser.avatarUrl || '',
          verified: true
        }), { headers: corsHeaders });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 5. Default 404 for unknown API routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
