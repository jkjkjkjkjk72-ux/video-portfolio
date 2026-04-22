export interface Credit {
  role: string;
  name: string;
}

export interface Work {
  slug: string;
  title: string;
  client: string;
  year: number;
  genre: string[];
  thumbnail: string;
  /** Direct mp4/webm URL for hover preview clip */
  previewVideo?: string;
  videoProvider: "vimeo" | "youtube";
  videoId: string;
  credits: Credit[];
  description: string;
  stills: string[];
}

export const featuredReel = {
  videoProvider: "vimeo" as const,
  videoId: "76979871",
  title: "Reel 2025",
};

export const works: Work[] = [
  {
    slug: "fragments-of-still",
    title: "Fragments of Still",
    client: "Self-initiated",
    year: 2024,
    genre: ["Short Film", "Experimental"],
    thumbnail: "https://placehold.co/1920x1080/111111/333333?text=Fragments+of+Still",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    videoProvider: "vimeo",
    videoId: "148751763",
    credits: [
      { role: "Director", name: "Studio" },
      { role: "Cinematographer", name: "Kim Jiyeon" },
      { role: "Editor", name: "Studio" },
      { role: "Sound Design", name: "Park Sungmin" },
    ],
    description:
      "An experimental short exploring the tension between motion and stillness. Fragments of everyday urban life are reassembled into a meditation on presence and the passage of time.",
    stills: [
      "https://placehold.co/1920x1080/111111/444444?text=Still+01",
      "https://placehold.co/1920x1080/111111/444444?text=Still+02",
      "https://placehold.co/1920x1080/111111/444444?text=Still+03",
    ],
  },
  {
    slug: "between-seasons",
    title: "Between Seasons",
    client: "Arcana Apparel",
    year: 2024,
    genre: ["Commercial", "Fashion"],
    thumbnail: "https://placehold.co/1920x1080/0d0d0d/2a2a2a?text=Between+Seasons",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoProvider: "vimeo",
    videoId: "259411563",
    credits: [
      { role: "Director", name: "Studio" },
      { role: "Cinematographer", name: "Lee Dongwoo" },
      { role: "Stylist", name: "Choi Ara" },
      { role: "Producer", name: "Nam Hyunjin" },
      { role: "Colorist", name: "Studio" },
    ],
    description:
      "A brand film for Arcana Apparel's AW24 collection. Shot across three locations over four days, the film follows a single figure moving between transitional spaces — airports, empty corridors, rooftops at dusk.",
    stills: [
      "https://placehold.co/1920x1080/0d0d0d/303030?text=Still+01",
      "https://placehold.co/1920x1080/0d0d0d/303030?text=Still+02",
      "https://placehold.co/1920x1080/0d0d0d/303030?text=Still+03",
      "https://placehold.co/1920x1080/0d0d0d/303030?text=Still+04",
    ],
  },
  {
    slug: "open-ground",
    title: "Open Ground",
    client: "Korea Rural Community Corp.",
    year: 2023,
    genre: ["Documentary"],
    thumbnail: "https://placehold.co/1920x1080/0f0f0f/383838?text=Open+Ground",
    videoProvider: "youtube",
    videoId: "dQw4w9WgXcQ",
    credits: [
      { role: "Director", name: "Studio" },
      { role: "Producer", name: "Jung Yeri" },
      { role: "Cinematographer", name: "Studio" },
      { role: "Editor", name: "Han Junho" },
      { role: "Narrator", name: "Song Misook" },
    ],
    description:
      "A 28-minute documentary following three farming families over one growing season in the South Korean countryside. The film examines how traditional agricultural knowledge is transmitted across generations in a rapidly changing landscape.",
    stills: [
      "https://placehold.co/1920x1080/0f0f0f/3d3d3d?text=Still+01",
      "https://placehold.co/1920x1080/0f0f0f/3d3d3d?text=Still+02",
      "https://placehold.co/1920x1080/0f0f0f/3d3d3d?text=Still+03",
    ],
  },
  {
    slug: "signal-noise",
    title: "Signal / Noise",
    client: "Yura — Music Video",
    year: 2023,
    genre: ["Music Video"],
    thumbnail: "https://placehold.co/1920x1080/080808/252525?text=Signal+Noise",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    videoProvider: "youtube",
    videoId: "dQw4w9WgXcQ",
    credits: [
      { role: "Director", name: "Studio" },
      { role: "Cinematographer", name: "Oh Seungchan" },
      { role: "Production Designer", name: "Woo Jisoo" },
      { role: "Choreographer", name: "Kim Nara" },
    ],
    description:
      "Music video for Yura's single 'Signal / Noise'. Shot on 16mm and S-16 with heavy optical processing in post, the video traces the dissolving boundary between performance and surveillance.",
    stills: [
      "https://placehold.co/1920x1080/080808/2a2a2a?text=Still+01",
      "https://placehold.co/1920x1080/080808/2a2a2a?text=Still+02",
      "https://placehold.co/1920x1080/080808/2a2a2a?text=Still+03",
      "https://placehold.co/1920x1080/080808/2a2a2a?text=Still+04",
      "https://placehold.co/1920x1080/080808/2a2a2a?text=Still+05",
    ],
  },
  {
    slug: "after-hours-gin",
    title: "After Hours",
    client: "Slant Gin",
    year: 2023,
    genre: ["Commercial", "Beverage"],
    thumbnail: "https://placehold.co/1920x1080/101010/2e2e2e?text=After+Hours",
    videoProvider: "vimeo",
    videoId: "148751763",
    credits: [
      { role: "Director", name: "Studio" },
      { role: "Cinematographer", name: "Bae Jinwook" },
      { role: "Food Stylist", name: "Yoon Sora" },
      { role: "Producer", name: "Lim Chaewon" },
      { role: "Colorist", name: "Studio" },
    ],
    description:
      "Product launch campaign for Slant Gin. Shot entirely at night across Seoul's bar district, the film leans into practical neon light and long exposure to establish the brand's nocturnal identity.",
    stills: [
      "https://placehold.co/1920x1080/101010/333333?text=Still+01",
      "https://placehold.co/1920x1080/101010/333333?text=Still+02",
      "https://placehold.co/1920x1080/101010/333333?text=Still+03",
    ],
  },
  {
    slug: "grid-city",
    title: "Grid City",
    client: "Seoul Architecture Biennale",
    year: 2022,
    genre: ["Documentary", "Architecture"],
    thumbnail: "https://placehold.co/1920x1080/0c0c0c/282828?text=Grid+City",
    videoProvider: "vimeo",
    videoId: "259411563",
    credits: [
      { role: "Director", name: "Studio" },
      { role: "Cinematographer", name: "Shin Yoona" },
      { role: "Editor", name: "Studio" },
      { role: "Composer", name: "Ahn Minjun" },
    ],
    description:
      "Commissioned for the 2022 Seoul Architecture Biennale. A 12-minute meditation on the tension between urban grids and human movement, filmed using drone, handheld, and fixed-camera perspectives across five neighborhoods.",
    stills: [
      "https://placehold.co/1920x1080/0c0c0c/2d2d2d?text=Still+01",
      "https://placehold.co/1920x1080/0c0c0c/2d2d2d?text=Still+02",
      "https://placehold.co/1920x1080/0c0c0c/2d2d2d?text=Still+03",
    ],
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function getWorksByGenre(genre: string): Work[] {
  return works.filter((w) => w.genre.includes(genre));
}

export const allGenres = Array.from(
  new Set(works.flatMap((w) => w.genre))
).sort();
