export interface LogoItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const clientLogos = [
  { src: "/images/clients/res.webp", alt: "RES", width: 578, height: 350 },
  { src: "/images/clients/hca-healthcare.webp", alt: "HCA Healthcare", width: 400, height: 172 },
  { src: "/images/clients/big-rapids-products.webp", alt: "Big Rapids Products", width: 900, height: 240 },
  { src: "/images/clients/broe-real-estate-group.svg", alt: "Broe Real Estate Group", width: 900, height: 439 },
  { src: "/images/clients/green-improvements.webp", alt: "Green Improvements LLC", width: 498, height: 500 },
  { src: "/images/clients/remax.webp", alt: "RE/MAX", width: 900, height: 247 },
  { src: "/images/clients/steelcase.webp", alt: "Steelcase", width: 317, height: 58 },
  { src: "/images/clients/usa-rugby.webp", alt: "USA Rugby", width: 509, height: 500 },
  { src: "/images/clients/american-cancer-society.webp", alt: "American Cancer Society", width: 743, height: 410 },
  { src: "/images/clients/university-of-michigan.webp", alt: "University of Michigan", width: 470, height: 500 },
  { src: "/images/clients/micron.webp", alt: "Micron", width: 817, height: 500 },
] satisfies readonly LogoItem[];

export const guestLectureLogos = [
  { src: "/images/guest-lectures/ferris-state-university.webp", alt: "Ferris State University", width: 191, height: 268 },
  { src: "/images/guest-lectures/university-of-findlay.webp", alt: "University of Findlay", width: 645, height: 500 },
  { src: "/images/guest-lectures/university-of-michigan.webp", alt: "University of Michigan", width: 699, height: 500 },
  { src: "/images/guest-lectures/university-of-colorado-boulder.webp", alt: "University of Colorado Boulder", width: 375, height: 274 },
  { src: "/images/guest-lectures/grand-valley-state-university.webp", alt: "Grand Valley State University", width: 650, height: 500 },
  { src: "/images/guest-lectures/university-of-denver.webp", alt: "University of Denver", width: 722, height: 500 },
  { src: "/images/guest-lectures/brigham-young-university.webp", alt: "Brigham Young University", width: 556, height: 359 },
  { src: "/images/guest-lectures/metropolitan-state-university-denver.svg", alt: "Metropolitan State University of Denver", width: 168, height: 141 },
] satisfies readonly LogoItem[];
