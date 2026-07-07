import type { Place, Region } from "../types";

const placeImageMap: Record<string, { folder: string; file: string }> = {
  // Bangkok
  "bkk-01": { folder: "bangkok", file: "grand_palace_yufo_temple.jpg" },
  "bkk-02": { folder: "bangkok", file: "wat_pho_reclining_buddha.jpg" },
  "bkk-03": { folder: "bangkok", file: "wat_arun_zhengwang_temple.jpg" },
  "bkk-04": { folder: "bangkok", file: "iconsiam_sooksiam.jpg" },
  "bkk-06": { folder: "bangkok", file: "yaowarat_chinatown.jpg" },
  "bkk-07": { folder: "bangkok", file: "talat_noi_streetart.jpg" },
  "bkk-08": { folder: "bangkok", file: "chao_phraya_river_boat.jpg" },
  "bkk-09": { folder: "bangkok", file: "siam_square_mbk.jpg" },
  "bkk-10": { folder: "bangkok", file: "centralworld_bigc.jpg" },
  "bkk-12": { folder: "bangkok", file: "wat_paknam_giant_buddha.jpg" },
  "bkk-13": { folder: "bangkok", file: "longtail_boat_klong.jpg" },
  "bkk-14": { folder: "bangkok", file: "chatuchak_weekend_market.jpg" },
  "bkk-15": { folder: "bangkok", file: "mahanakhon_skywalk.jpg" },

  // Phuket
  "hkt-01": { folder: "phuket", file: "phuket_old_town.jpg" },
  "hkt-02": { folder: "phuket", file: "lard_yai_sunday_market.jpg" },
  "hkt-03": { folder: "phuket", file: "phuket_old_town.jpg" },
  "hkt-04": { folder: "phuket", file: "wat_chalong.jpg" },
  "hkt-05": { folder: "phuket", file: "big_buddha_phuket.jpg" },
  "hkt-06": { folder: "phuket", file: "karon_viewpoint.jpg" },
  "hkt-07": { folder: "phuket", file: "nai_harn_beach.jpg" },
  "hkt-08": { folder: "phuket", file: "nai_harn_beach.jpg" },
  "hkt-09": { folder: "phuket", file: "nai_harn_beach.jpg" },
  "hkt-10": { folder: "phuket", file: "nai_harn_beach.jpg" },
  "hkt-11": { folder: "phuket", file: "promthep_cape.jpg" },
  "hkt-12": { folder: "phuket", file: "rawai_seafood_market.jpg" },
  "hkt-16": { folder: "phuket", file: "mai_khao_plane_beach.jpg" },
  "hkt-17": { folder: "phuket", file: "phuket_elephant_sanctuary.jpg" },
  "hkt-22": { folder: "phuket", file: "phang_nga_bay.jpg" },
  "hkt-23": { folder: "phuket", file: "phang_nga_bay.jpg" },

  // Koh Yao Yai
  "yya-01": { folder: "koh_yao_yai", file: "santhiya_resort_view.jpg" },
  "yya-02": { folder: "koh_yao_yai", file: "santhiya_beach_pool.jpg" },
  "yya-03": { folder: "koh_yao_yai", file: "koh_yao_yai_pier_view.jpg" },
  "yya-04": { folder: "koh_yao_yai", file: "laem_haad_sandbar.jpg" },
  "yya-05": { folder: "koh_yao_yai", file: "koh_yao_yai_pier_view.jpg" },
  "yya-06": { folder: "koh_yao_yai", file: "koh_yao_yai_pier_view.jpg" },
  "yya-08": { folder: "koh_yao_yai", file: "santhiya_sunset.jpg" },
  "yya-09": { folder: "koh_yao_yai", file: "santhiya_sunset.jpg" },
  "yya-11": { folder: "koh_yao_yai", file: "phang_nga_hong_islands_direction.jpg" },
  "yya-12": { folder: "koh_yao_yai", file: "phang_nga_hong_islands_direction.jpg" },

  // --- Bangkok Restaurants ---
  "bkk-rest-01": { folder: "restaurants/bangkok", file: "rongros_wat_arun.jpg" },
  "bkk-rest-02": { folder: "restaurants/bangkok", file: "supanniga_eating_room.jpg" },
  "bkk-rest-03": { folder: "restaurants/bangkok", file: "thong_smith_boat_noodles.jpg" },
  "bkk-rest-04": { folder: "restaurants/bangkok", file: "jeh_o_chula_tomyum.jpg" },
  "bkk-rest-05": { folder: "restaurants/bangkok", file: "here_hai_crab_rice.jpg" },
  "bkk-rest-06": { folder: "restaurants/bangkok", file: "kor_panich_mango_rice.jpg" },
  "bkk-rest-07": { folder: "restaurants/bangkok", file: "karun_thai_tea.jpg" },
  "bkk-rest-08": { folder: "restaurants/bangkok", file: "pangcha_royal_tea.jpg" },
  "bkk-rest-09": { folder: "restaurants/bangkok", file: "tk_seafood_yaowarat.jpg" },
  "bkk-rest-10": { folder: "restaurants/bangkok", file: "jay_fai_crab_omelet.jpg" },
  "bkk-rest-11": { folder: "restaurants/bangkok", file: "paste_bangkok_gourmet.jpg" },
  "bkk-rest-12": { folder: "restaurants/bangkok", file: "somtum_der_isan.jpg" },
  "bkk-rest-13": { folder: "restaurants/bangkok", file: "blue_elephant_royal_thai.jpg" },

  // --- Phuket Restaurants ---
  "hkt-rest-01": { folder: "restaurants/phuket", file: "raya_restaurant_phuket.jpg" },
  "hkt-rest-02": { folder: "restaurants/phuket", file: "tu_kab_khao_old_town.jpg" },
  "hkt-rest-03": { folder: "restaurants/phuket", file: "one_chun_cafe_n_cuisine.jpg" },
  "hkt-rest-04": { folder: "restaurants/phuket", file: "go_benz_dry_rice_porridge.jpg" },
  "hkt-rest-05": { folder: "restaurants/phuket", file: "mee_ton_poe_hokkien_noodles.jpg" },
  "hkt-rest-06": { folder: "restaurants/phuket", file: "mor_mu_dong_local_seafood.jpg" },
  "hkt-rest-07": { folder: "restaurants/phuket", file: "kanom_jeen_saphan_hin.jpg" },
  "hkt-rest-08": { folder: "restaurants/phuket", file: "torrys_ice_cream.jpg" },
  "hkt-rest-09": { folder: "restaurants/phuket", file: "rawai_seafood_market_dining.jpg" },
  "hkt-rest-10": { folder: "restaurants/phuket", file: "kan_eang_at_pier_seafood.jpg" },
  "hkt-rest-11": { folder: "restaurants/phuket", file: "laem_hin_seafood.jpg" },
  "hkt-rest-12": { folder: "restaurants/phuket", file: "pru_restaurant_michelin.jpg" },
  "hkt-rest-13": { folder: "restaurants/phuket", file: "natural_restaurant_tamachart.jpg" },

  // --- Koh Yao Yai Restaurants ---
  "yya-rest-01": { folder: "restaurants/koh_yao_yai", file: "saaitara_restaurant_santhiya.jpg" },
  "yya-rest-02": { folder: "restaurants/koh_yao_yai", file: "chantara_restaurant_santhiya.jpg" },
  "yya-rest-03": { folder: "restaurants/koh_yao_yai", file: "by_the_sea_bar_santhiya.jpg" },
  "yya-rest-04": { folder: "restaurants/koh_yao_yai", file: "baan_rim_nam_koh_yao_yai.jpg" },
  "yya-rest-05": { folder: "restaurants/koh_yao_yai", file: "koh_yao_yai_seafood.jpg" },
  "yya-rest-06": { folder: "restaurants/koh_yao_yai", file: "laem_haad_beach_dining.jpg" },
};

const defaultRegionImage: Record<Region, { folder: string; file: string }> = {
  bangkok: { folder: "bangkok", file: "wat_arun_zhengwang_temple.jpg" },
  phuket: { folder: "phuket", file: "promthep_cape.jpg" },
  "koh-yao-yai": { folder: "koh_yao_yai", file: "santhiya_resort_view.jpg" },
};

export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getPlaceImage(place: Place, useThumbnail = true): string {
  const info = placeImageMap[place.id] || defaultRegionImage[place.region];
  const baseFolder = useThumbnail ? "/images/thumbnails" : "/images";
  return getAssetUrl(`${baseFolder}/${info.folder}/${info.file}`);
}

export function getRegionHeroImage(region: Region | "all"): string {
  if (region === "bangkok") return getAssetUrl("/images/bangkok/wat_arun_zhengwang_temple.jpg");
  if (region === "phuket") return getAssetUrl("/images/phuket/promthep_cape.jpg");
  if (region === "koh-yao-yai") return getAssetUrl("/images/koh_yao_yai/santhiya_resort_view.jpg");
  return getAssetUrl("/images/koh_yao_yai/santhiya_resort_view.jpg");
}

