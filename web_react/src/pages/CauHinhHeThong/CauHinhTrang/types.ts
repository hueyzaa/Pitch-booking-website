export interface CauHinhTrangData {
  id: number;
  key: string;
  value: string;
  mo_ta: string;
  loai: 'text' | 'image' | 'number' | 'boolean';
}

export type CauHinhKey =
  | 'HEADER_LOGO'
  | 'HEADER_TITLE'
  | 'FOOTER_LOGO'
  | 'FOOTER_COPYRIGHT'
  | 'FOOTER_DESCRIPTION'
  | 'CONTACT_EMAIL'
  | 'CONTACT_PHONE'
  | 'CONTACT_ADDRESS'
  | 'ABOUT_HEADLINE_SUFFIX'
  | 'HOME_HERO_BADGE'
  | 'HOME_HERO_TITLE_MAIN'
  | 'HOME_HERO_TITLE_ACCENT'
  | 'HOME_HERO_TITLE_SUFFIX'
  | 'HOME_HERO_DESC'
  | 'HOME_HERO_IMG';
