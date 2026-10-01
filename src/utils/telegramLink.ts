import { ProductItem } from '../types';
import { BOT_TELEGRAM_USERNAME } from '../data/products';

/**
 * Mahsulot -> bot start parametri.
 * Bot (bot.py) quyidagi formatni tushunadi: buy_st_50 / buy_pr_3 / buy_uc_60
 *   st = Telegram Stars, pr = Premium (oy), uc = PUBG UC
 */
export function getBotStartParam(product: ProductItem): string {
  const kind =
    product.category === 'stars' ? 'st' : product.category === 'premium' ? 'pr' : 'uc';
  return `buy_${kind}_${product.quantity}`;
}

/** "50 Stars olish" bosilganda: botga kirib, shu bo'lim avtomat tanlanadi. */
export function getTelegramProductDeepLink(product: ProductItem, ..._unused: unknown[]): string {
  return `https://t.me/${BOT_TELEGRAM_USERNAME}?start=${getBotStartParam(product)}`;
}

export function openTelegramForProduct(product: ProductItem, ..._unused: unknown[]): void {
  if (typeof window === 'undefined') return;
  const link = getTelegramProductDeepLink(product);

  // Telegram Mini App ichida bo'lsa — Telegramning o'z ochish usuli (sahifa yopilmaydi/almashmaydi)
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(link);
    return;
  }

  // Oddiy brauzerda — Telegram ilovasini ochadi
  window.open(link, '_blank', 'noopener,noreferrer');
}
