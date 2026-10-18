/**
 * site/js/viral-share.js
 * =============================================================================
 * DiggityBets SOTA 2026 Viral Social Card & Promo Banner Generator
 * Inspired by Vercel Satori & modern Canvas Social Card renderers.
 * Outputs pixel-perfect 1200x630 Open Graph / Twitter / Discord cards.
 * =============================================================================
 */

(function(global) {
  'use strict';

  class ViralCardGenerator {
    /**
     * Renders a 1200x630 promo banner on an offscreen canvas and returns a Promise with the Data URI
     * @param {Object} opts
     * @param {string} opts.type - 'koth' | 'tourney' | 'megawin' | 'generic'
     * @param {string} opts.winner - '@username'
     * @param {string} opts.slotName - 'Reactorgames Haunted Hollow'
     * @param {string} opts.studio - 'Reactor Games · Only on Stake'
     * @param {string} opts.slotImage - URL of slot cover
     * @param {string} opts.metric - '$20 USD CASHOUT' or '2,450x MULTIPLIER'
     */
    static async generateCard(opts = {}) {
      const width = 1200;
      const height = 630;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // 1. Base Dark Luxury Gradient
      const bgGrad = ctx.createRadialGradient(600, 315, 50, 600, 315, 700);
      bgGrad.addColorStop(0, '#0d1624');
      bgGrad.addColorStop(0.65, '#06080d');
      bgGrad.addColorStop(1, '#020305');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Corner Atmospheric Glows
      const goldCone = ctx.createRadialGradient(100, 80, 10, 100, 80, 400);
      goldCone.addColorStop(0, 'rgba(255, 215, 0, 0.16)');
      goldCone.addColorStop(1, 'transparent');
      ctx.fillStyle = goldCone;
      ctx.fillRect(0, 0, 600, 400);

      const greenCone = ctx.createRadialGradient(1100, 550, 10, 1100, 550, 450);
      greenCone.addColorStop(0, 'rgba(83, 252, 24, 0.14)');
      greenCone.addColorStop(1, 'transparent');
      ctx.fillStyle = greenCone;
      ctx.fillRect(600, 200, 600, 430);

      // 3. Hairline Gold/Green Outer Border Frame
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.35)';
      ctx.lineWidth = 3;
      ctx.strokeRect(24, 24, width - 48, height - 48);

      // 4. Header: DiggityBets Branding & Stake Affiliate Tag
      ctx.font = 'bold 34px "Chakra Petch", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('DIGGITY', 64, 84);
      const textWidth = ctx.measureText('DIGGITY').width;
      ctx.fillStyle = '#53fc18';
      ctx.fillText('BETS', 64 + textWidth, 84);

      ctx.font = '600 16px "Outfit", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('VIP CASINO & ENGAGEMENT SUITE · DIGGITYBETS.VIP', 64, 112);

      // Top Right Stake Code Badge
      ctx.fillStyle = 'rgba(255, 215, 0, 0.12)';
      ctx.fillRect(width - 360, 52, 296, 50);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(width - 360, 52, 296, 50);

      ctx.font = 'bold 18px "Chakra Petch", sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.fillText('⚡ STAKE CODE: DIGGITY', width - 338, 83);

      // 5. Center Badge (Event Category)
      const badgeText = opts.type === 'koth'
        ? '👑 KING OF THE HILL — 4/4 STREAK VICTORY'
        : (opts.type === 'tourney'
            ? '🏆 8-BRACKET ARENA CHAMPION'
            : (opts.type === 'megawin'
                ? '⚡ ONLY ON STAKE — MASSIVE MULTIPLIER'
                : '💎 CASINO STREAM WINNER'));

      ctx.fillStyle = 'rgba(83, 252, 24, 0.15)';
      ctx.fillRect(64, 156, 520, 36);
      ctx.strokeStyle = '#53fc18';
      ctx.lineWidth = 1;
      ctx.strokeRect(64, 156, 520, 36);

      ctx.font = 'bold 15px "Chakra Petch", sans-serif';
      ctx.fillStyle = '#53fc18';
      ctx.fillText(badgeText, 80, 180);

      // 6. Winner Username & Metric Announcement
      const winnerName = String(opts.winner || '@Winner').toUpperCase();
      ctx.font = '900 58px "Chakra Petch", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(winnerName, 64, 260);

      const metric = opts.metric || '$20 USD PRIZE';
      ctx.font = '900 48px "Chakra Petch", sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.fillText(metric, 64, 326);

      // Slot Details
      const slotName = opts.slotName || 'Wanted Dead or a Wild';
      const studio = opts.studio || 'Stake Exclusive / Hacksaw';
      ctx.font = '700 24px "Outfit", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`Played on: ${slotName}`, 64, 385);

      ctx.font = '600 17px "Outfit", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Studio: ${studio}`, 64, 415);

      // 7. Right Column: Slot Cover Card (3:4 ratio)
      const coverX = 860;
      const coverY = 156;
      const coverW = 240;
      const coverH = 320;

      // Draw shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(coverX + 12, coverY + 12, coverW, coverH);

      // Draw slot cover image if loaded, else fallback card
      let imgLoaded = false;
      if (opts.slotImage) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = opts.slotImage;
          await new Promise((resolve) => {
            img.onload = () => { imgLoaded = true; resolve(); };
            img.onerror = () => resolve();
            setTimeout(resolve, 1500); // 1.5s timeout safety
          });
          if (imgLoaded) {
            ctx.drawImage(img, coverX, coverY, coverW, coverH);
          }
        } catch (_) {}
      }

      if (!imgLoaded) {
        ctx.fillStyle = '#141d2c';
        ctx.fillRect(coverX, coverY, coverW, coverH);
        ctx.font = '48px sans-serif';
        ctx.fillText('🎰', coverX + 96, coverY + 150);
        ctx.font = 'bold 16px "Chakra Petch", sans-serif';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(slotName.slice(0, 16), coverX + 20, coverY + 220);
      }

      // Slot cover frame
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2;
      ctx.strokeRect(coverX, coverY, coverW, coverH);

      // 8. Footer Callout: Stake Promo Code & URL
      ctx.fillStyle = 'rgba(14, 21, 32, 0.9)';
      ctx.fillRect(40, height - 90, width - 80, 54);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, height - 90, width - 80, 54);

      ctx.font = '700 17px "Outfit", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('🎁 Claim VIP Streamer Rewards at https://diggitybets.vip', 64, height - 56);

      ctx.font = 'bold 18px "Chakra Petch", sans-serif';
      ctx.fillStyle = '#53fc18';
      ctx.fillText('CODE: DIGGITY ON STAKE', width - 360, height - 56);

      return canvas.toDataURL('image/png');
    }

    /**
     * Triggers instant browser download of the generated promo PNG card
     */
    static async downloadCard(opts = {}) {
      try {
        const dataUrl = await this.generateCard(opts);
        const a = document.createElement('a');
        const filename = `diggitybets-${(opts.type || 'win')}-${(opts.winner || 'user').replace(/[^a-zA-Z0-9]/g, '')}.png`;
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (window.sonner) {
          window.sonner.toast({
            title: 'Viral Promo Card Downloaded! 📸',
            message: `Saved ${filename} (1200x630px). Ready to share on X/Discord!`,
            type: 'gold'
          });
        }
      } catch (e) {
        console.error('Failed to download card:', e);
      }
    }

    /**
     * Opens Twitter/X Intent with pre-filled text and link
     */
    static shareOnX(opts = {}) {
      const winner = opts.winner || '@Winner';
      const metric = opts.metric || '$20 USD';
      const slot = opts.slotName || 'Casino Slot';
      const tweetText = `👑 Just won ${metric} on ${slot} live at kick.com/diggitybets!\n\nJoin the action, free 8-Bracket Tourneys, and 1v1 Battles at https://diggitybets.vip/\n\n⚡ Use Code: DIGGITY on Stake for VIP perks! @diggitybets`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=420');
    }
  }

  global.ViralCardGenerator = ViralCardGenerator;
})(typeof window !== 'undefined' ? window : this);
