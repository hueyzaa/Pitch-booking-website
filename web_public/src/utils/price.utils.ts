/**
 * Utilities for formatting prices and currency in Vietnamese Dong (VND).
 */

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

export const formatPriceShort = (price: number): string => {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'tr';
  }
  return (price / 1000) + 'k';
};
