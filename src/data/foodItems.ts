import type { FoodItem } from "../types";

export const foodItems: FoodItem[] = [
  // --- 曼谷 Bangkok Food Items ---
  {
    id: "bkk-food-01",
    region: "bangkok",
    nameZh: "泰式船面",
    nameEn: "Boat Noodles",
    displayName: "泰式船面 Boat Noodles",
    type: "dish",
    priority: "must-try",
    imagePath: "/images/food/bangkok/bangkok_dish_01_boat_noodles.jpg",
    imageAlt: "浓郁黑汤底的泰式船面配牛肉与牛肉丸",
    recommendedRestaurantIds: ["bkk-rest-03"],
    routeIds: ["bkk-route-b", "bkk-route-c"],
    shortDescription: "泰式传统浓味黑汤面，以猪血或牛血熬制浓郁汤底，搭配牛肉片、牛丸、空心菜与炸猪皮，极具风味。",
    whyTry: "来曼谷必吃的灵魂面食，浓郁咸甜微辣，Thong Smith 把街头小吃做成了干净精致的高端体验，适合情侣用餐。",
    tasteProfile: ["浓郁", "咸甜", "微辣", "鲜美"],
    bestTime: "午餐 / 逛街中途补充体力",
    notes: [
      "汤底较浓重，辣度分级（建议从微辣/0辣开始尝试）",
      "配一份脆皮炸猪皮和冰镇草药茶解腻极佳"
    ]
  },
  {
    id: "bkk-food-02",
    region: "bangkok",
    nameZh: "手标泰奶 / 精品泰奶",
    nameEn: "Thai Milk Tea",
    displayName: "手标泰奶 / 精品泰奶 Thai Milk Tea",
    type: "drink",
    priority: "must-try",
    imagePath: "/images/food/bangkok/bangkok_dish_02_thai_milk_tea.jpg",
    imageAlt: "冰镇泰式红茶炼乳奶茶",
    recommendedRestaurantIds: ["bkk-rest-04", "bkk-rest-10"],
    routeIds: ["bkk-route-b", "bkk-route-c"],
    shortDescription: "用深度烘焙的泰式红茶底搭配炼乳与淡奶，冰块加满，呈独特琥珀橘红色的国民快乐水。",
    whyTry: "炎热天气的解暑救星！Karun 提供金箔高端版与低糖选择，PangCha 更有米其林推荐的泰茶刨冰甜品。",
    tasteProfile: ["香浓", "丝滑", "偏甜", "茶香浓郁"],
    bestTime: "全天 / 下午茶",
    notes: [
      "泰国本土甜度通常极高，点单建议选择 30% 或 50% 甜度",
      "冰块融化前尽快喝完口感最佳"
    ]
  },
  {
    id: "bkk-food-03",
    region: "bangkok",
    nameZh: "冬阴功海鲜妈妈面",
    nameEn: "Tom Yum Mama Noodles",
    displayName: "冬阴功海鲜妈妈面 Tom Yum Mama Noodles",
    type: "dish",
    priority: "recommended",
    imagePath: "/images/food/bangkok/bangkok_dish_03_tomyum_mama.jpg",
    imageAlt: "大碗酸辣冬阴功浓汤海鲜面配生鸡蛋与烧肉",
    recommendedRestaurantIds: ["bkk-rest-08"],
    routeIds: ["bkk-route-b"],
    shortDescription: "曼谷传奇宵夜名物！大盆冬阴功浓汤底煮入 Mama 快熟面，铺满脆皮烧肉、鲜虾、鱿鱼与生蛋黄。",
    whyTry: "米其林必比登连续多年推荐，视觉和味觉双重震撼，浓烈酸辣刺激，适合作为逛完商圈后的痛快宵夜。",
    tasteProfile: ["重酸", "重辣", "浓郁鲜香"],
    bestTime: "晚间至深夜宵夜时段",
    notes: [
      "Jeh O Chula 每天门前排队极长，建议务必提前在 Klook 等平台预订快速通道",
      "分量较大，两个人点一锅中号或小号即可"
    ]
  },
  {
    id: "bkk-food-04",
    region: "bangkok",
    nameZh: "经典芒果糯米饭",
    nameEn: "Mango Sticky Rice",
    displayName: "经典芒果糯米饭 Mango Sticky Rice",
    type: "dessert",
    priority: "recommended",
    imagePath: "/images/food/bangkok/bangkok_dish_04_mango_sticky_rice.jpg",
    imageAlt: "金黄成熟甜芒果切片配温热咸甜椰浆糯米和绿豆脆粒",
    recommendedRestaurantIds: ["bkk-rest-06", "bkk-rest-13"],
    routeIds: ["bkk-route-a", "bkk-route-c"],
    shortDescription: "熟透香甜的金黄芒果，搭配淋满微咸香浓热椰浆的软糯米饭，顶撒香脆绿豆仁。",
    whyTry: "泰国甜品绝对王者！温热微咸的椰浆与冰凉清甜的芒果完美融合，咸甜交织口感奇绝。",
    tasteProfile: ["甜香", "软糯", "微咸回甘", "椰香浓厚"],
    bestTime: "下午茶 / 饭后甜点",
    notes: [
      "Mae Varee 的芒果品质全城公认极佳，只做外带，适合买回酒店享用",
      "糯米饱腹感强，情侣分享一份最合适"
    ]
  },
  {
    id: "bkk-food-05",
    region: "bangkok",
    nameZh: "猛火香辣打抛饭",
    nameEn: "Pad Krapao",
    displayName: "猛火香辣打抛饭 Pad Krapao",
    type: "dish",
    priority: "recommended",
    imagePath: "/images/food/bangkok/bangkok_dish_05_pad_krapao.jpg",
    imageAlt: "猛火爆炒香草肉末搭配油炸酥边流心荷包蛋与香米饭",
    recommendedRestaurantIds: ["bkk-rest-07"],
    routeIds: ["bkk-route-b"],
    shortDescription: "以圣罗勒叶（Krapao）、辣椒、蒜蓉与猪肉或牛肉碎猛火爆炒，盖在香米饭上，配一个外脆内流心的炸荷包蛋。",
    whyTry: "真正的“泰国国民快餐”，比泰式炒粉（Pad Thai）更为地道开胃。Phed Mark 由美食博主开设，锅气极足。",
    tasteProfile: ["咸香", "蒜香", "香草味重", "极度下饭"],
    bestTime: "午餐 / 便餐",
    notes: [
      "正宗打抛辣度非常高！如果不吃辣一定要明确要求“No Spicy”或“Less Spicy (Phed Noi)”",
      "灵魂在于那颗外酥里嫩的炸流心蛋（Kai Dao）"
    ]
  },
  {
    id: "bkk-food-06",
    region: "bangkok",
    nameZh: "水门泰式鸡饭",
    nameEn: "Thai Chicken Rice",
    displayName: "水门泰式鸡饭 Thai Chicken Rice",
    type: "dish",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_06_chicken_rice.jpg",
    imageAlt: "白斩嫩鸡肉切片配鸡油香米饭与特制发酵豆酱",
    recommendedRestaurantIds: ["bkk-rest-09"],
    routeIds: ["bkk-route-b"],
    shortDescription: "泰式海南鸡饭，以鸡汤鸡油蒸煮香米，鸡肉鲜嫩皮滑，灵魂在特制的黑酱油辣椒姜蓉发酵豆酱。",
    whyTry: "清淡不油腻，是连续吃了几顿重口味酸辣泰餐后的绝佳味觉中场休息。Go-Ang 获得过米其林必比登推荐。",
    tasteProfile: ["清淡", "咸鲜", "酱香微辣"],
    bestTime: "午餐 / 早午餐",
    notes: [
      "水门老店人多嘈杂，CentralWorld 商场分店就餐环境更好且无需日晒排队"
    ]
  },
  {
    id: "bkk-food-07",
    region: "bangkok",
    nameZh: "街头铁板蚝煎 / Hoy Tod",
    nameEn: "Hoy Tod / Oyster Omelette",
    displayName: "街头铁板蚝煎 / Hoy Tod Hoy Tod / Oyster Omelette",
    type: "street-food",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_07_hoy_tod.jpg",
    imageAlt: "铁板煎制外脆里嫩的鲜蚝薯粉蛋饼配甜辣酱",
    recommendedRestaurantIds: ["bkk-rest-12", "bkk-rest-13"],
    routeIds: ["bkk-route-c"],
    shortDescription: "把新鲜蚝肉（或青口贝）融入米浆薯粉与鸡蛋，在猛火铁板上煎出极度酥脆的边缘，配炒豆芽与酸甜辣酱。",
    whyTry: "唐人街及米其林必比登名物 Nai Mong 的蚝煎被誉为全曼谷最好吃，外酥内嫩鲜美不腥。",
    tasteProfile: ["外脆里酥", "海鲜咸香", "油润诱人"],
    bestTime: "傍晚 / 晚餐街头觅食",
    notes: [
      "刚出锅超级烫且带有一定油腻度，强烈建议配冷饮或茶",
      "可选择酥脆版 (Gracel/Crispy) 或软嫩版"
    ]
  },
  {
    id: "bkk-food-08",
    region: "bangkok",
    nameZh: "耀华力唐人街小吃巡礼",
    nameEn: "Yaowarat Street Food",
    displayName: "耀华力唐人街小吃巡礼 Yaowarat Street Food",
    type: "street-food",
    priority: "must-try",
    imagePath: "/images/food/bangkok/bangkok_dish_08_yaowarat_snack.jpg",
    imageAlt: "曼谷唐人街夜晚霓虹灯下的各类海鲜小吃摊位",
    recommendedRestaurantIds: ["bkk-rest-12", "bkk-rest-13"],
    routeIds: ["bkk-route-c"],
    shortDescription: "集合了潮汕与泰国风味融合的街头美食天堂！从炭火胡椒猪杂汤、炭烤大头虾到白果燕窝与手摇冰乳茶。",
    whyTry: "感受曼谷最迷人的赛博朋克夜市烟火气，情侣一路走一路吃，既热闹又充满惊喜。",
    tasteProfile: ["复合风味", "街头热烈", "鲜辣香浓"],
    bestTime: "晚上 18:30 - 22:00",
    notes: [
      "注意随身财务，周一为清洁日，许多流动摊贩休业，尽量安排在周二至周日晚上前往"
    ]
  },
  {
    id: "bkk-food-09",
    region: "bangkok",
    nameZh: "香蕉牛油煎饼 / Roti",
    nameEn: "Thai Banana Roti",
    displayName: "香蕉牛油煎饼 / Roti Thai Banana Roti",
    type: "dessert",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_09_roti.jpg",
    imageAlt: "铁板上酥油煎制的香蕉拉饼淋上浓厚炼乳与巧克力酱",
    recommendedRestaurantIds: ["bkk-rest-12", "bkk-rest-13"],
    routeIds: ["bkk-route-b", "bkk-route-c"],
    shortDescription: "印度派生的泰国街头神级甜点！面团拉薄在大量牛油铁板上煎炸，包入新鲜香蕉片，起锅剪块淋满炼乳与砂糖。",
    whyTry: "罪恶感满满但绝对一口入魂！外皮咔嚓香脆，热香蕉软糯香甜，牛油香气直冲脑门。",
    tasteProfile: ["极度酥香", "甜美滚热", "黄油浓郁"],
    bestTime: "晚间夜市逛街路边小吃",
    notes: [
      "牛油和糖分极高，建议两人只买一份分享尝鲜即可"
    ]
  },
  {
    id: "bkk-food-10",
    region: "bangkok",
    nameZh: "炭火酥烤吐司 + 冰纯鲜奶",
    nameEn: "Thai Toast & Milk",
    displayName: "炭火酥烤吐司 + 冰纯鲜奶 Thai Toast & Milk",
    type: "dessert",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_10_toast_milk.jpg",
    imageAlt: "厚切炭火烤吐司淋满香兰叶咖椰酱和泰茶酱配冰块鲜奶",
    recommendedRestaurantIds: ["bkk-rest-11", "bkk-rest-13"],
    routeIds: ["bkk-route-b"],
    shortDescription: "厚切吐司在炭火上烤得外酥里蓬，顶上浇满厚厚的香兰叶咖椰酱（Sankaya）、泰奶酱或浓巧克力，配冰纯鲜奶。",
    whyTry: "曼谷大学生与年轻人最爱的夜市社交甜点！在 Banthat Thong 美食街晚上几家名店气氛火爆。",
    tasteProfile: ["奶香四溢", "温热松脆", "香兰清甜"],
    bestTime: "晚间夜间散步歇脚",
    notes: [
      "推荐尝试香兰（绿色）与泰式红茶（橘色）双色卡士达酱"
    ]
  },
  {
    id: "bkk-food-11",
    region: "bangkok",
    nameZh: "正宗冬阴功鲜虾大汤",
    nameEn: "Tom Yum Goong",
    displayName: "正宗冬阴功鲜虾大汤 Tom Yum Goong",
    type: "dish",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_11_tomyum_goong.jpg",
    imageAlt: "砂锅盛放的鲜红酸辣冬阴功浓汤配香茅与大罗氏虾",
    recommendedRestaurantIds: ["bkk-rest-01", "bkk-rest-02"],
    routeIds: ["bkk-route-a"],
    shortDescription: "以香茅、南姜、箭叶橙叶、辣椒与青柠汁为灵魂的泰国国汤，分浓汤（加椰奶/淡奶）与清汤两种，大虾鲜甜。",
    whyTry: "在郑王庙河景餐厅 Rongros 边看绝美日落边喝一碗滚热正宗的冬阴功，是浪漫行程的最高亮时刻。",
    tasteProfile: ["酸爽醒胃", "辛香层叠", "椰香浓醇"],
    bestTime: "正餐晚餐时段",
    notes: [
      "汤里的香茅段和南姜片质地较硬，仅作为调味香料，不要直接嚼食"
    ]
  },
  {
    id: "bkk-food-12",
    region: "bangkok",
    nameZh: "青木瓜海鲜沙拉",
    nameEn: "Som Tum",
    displayName: "青木瓜海鲜沙拉 Som Tum",
    type: "dish",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_12_somtum.jpg",
    imageAlt: "木质臼中捣制的爽脆青木瓜丝配花生豆角与大虾",
    recommendedRestaurantIds: ["bkk-rest-07", "bkk-rest-13"],
    routeIds: ["bkk-route-b"],
    shortDescription: "泰国东北依善（Isan）招牌冷菜，在木臼中用杵把青木瓜丝、小番茄、花生、豆角与酸辣鱼露青柠调汁捣制入味。",
    whyTry: "极其爽口解腻！酸辣咸甜爽脆五味俱全，吃烤肉或油炸海鲜时搭配一份立竿见影解腻。",
    tasteProfile: ["极度爽脆", "酸辣生猛", "清爽解腻"],
    bestTime: "正餐开胃前菜",
    notes: [
      "泰式本地版有时会加入生腌臭鱼酱（Pla Ra），如果吃不习惯请指明点普通泰式版（Som Tum Thai）"
    ]
  },
  {
    id: "bkk-food-13",
    region: "bangkok",
    nameZh: "街头蜜汁烤猪肉串",
    nameEn: "Moo Ping",
    displayName: "街头蜜汁烤猪肉串 Moo Ping",
    type: "street-food",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_13_moo_ping.jpg",
    imageAlt: "炭火铁网烤制得焦香流油的泰式蜜汁腌猪肉串",
    recommendedRestaurantIds: ["bkk-rest-12", "bkk-rest-13"],
    routeIds: ["bkk-route-c"],
    shortDescription: "选用带膘猪腿肉切片，用椰奶、椰糖、芫荽根与蒜头酱油腌透，在旺火炭炉上烤得滋滋冒油焦香四溢。",
    whyTry: "随处可见的晨间与夜间街头圣品！10 泰铢一串，咬下去软嫩多汁甜咸交织，配一小袋糯米饭即是人间美味。",
    tasteProfile: ["焦香多汁", "蜜甜咸香", "软嫩油润"],
    bestTime: "早上路边摊 / 夜市随手买",
    notes: [
      "必须趁热吃，冷了之后油脂凝固口感会下降"
    ]
  },
  {
    id: "bkk-food-14",
    region: "bangkok",
    nameZh: "椰丝脆皮小煎饼 / Kanom Buang",
    nameEn: "Thai Crispy Pancake",
    displayName: "椰丝脆皮小煎饼 / Kanom Buang Thai Crispy Pancake",
    type: "street-food",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_14_kanom_buang.jpg",
    imageAlt: "如小巧炸可丽饼般的脆饼夹着白色糖霜与黄甜椰丝",
    recommendedRestaurantIds: ["bkk-rest-12", "bkk-rest-13"],
    routeIds: ["bkk-route-c"],
    shortDescription: "如金元宝形状的精巧宫廷传统小甜点。极薄的米浆脆壳，中间填满像蛋白霜般的滑腻绵糖，顶上铺甜金丝或咸虾松。",
    whyTry: "精致美观且一口一个！在 ICONSIAM 的 SookSiam 室内水上市场可以看到现场制作的全过程，极具观赏性。",
    tasteProfile: ["香脆轻盈", "绵甜如云", "咸甜两味"],
    bestTime: "下午茶小吃 / 商场逛吃",
    notes: [
      "黄色的通常为甜口（椰糖金丝），红橘色的通常带有轻微咸鲜葱香（香草虾松）"
    ]
  },
  {
    id: "bkk-food-15",
    region: "bangkok",
    nameZh: "夜市霸气火山排骨",
    nameEn: "Leng Zabb / Volcano Ribs",
    displayName: "夜市霸气火山排骨 Leng Zabb / Volcano Ribs",
    type: "dish",
    priority: "optional",
    imagePath: "/images/food/bangkok/bangkok_dish_15_leng_zabb.jpg",
    imageAlt: "巨型熬汤猪脊骨堆叠成火山高塔淋满青辣椒与香菜鲜汤",
    recommendedRestaurantIds: ["bkk-rest-13"],
    routeIds: ["bkk-route-b"],
    shortDescription: "用带肉猪脊骨软烂炖煮后堆成高耸的火山造型，豪迈地淋上大量青鸟椒碎、大蒜、香菜与清爽酸辣的高汤。",
    whyTry: "Jodd Fairs 夜市最具视觉冲击力的打卡美食！骨头上的瘦肉软烂吸汁，戴上手套大口啃肉喝汤极度爽快。",
    tasteProfile: ["极度鲜酸", "青椒生猛", "肉质酥烂"],
    bestTime: "晚间夜市聚餐",
    notes: [
      "青椒汁威力极大，不能吃辣切勿将骨头肉在汁水里反复浸泡",
      "两人点最小号或中号（XXL以上是专供多人的网红拍照尺寸）"
    ]
  },
  {
    id: "bkk-food-16",
    region: "bangkok",
    nameZh: "泰式鱼露生腌海鲜",
    nameEn: "Thai Raw Marinated Seafood",
    displayName: "泰式鱼露生腌海鲜 Thai Raw Marinated Seafood",
    type: "seafood",
    priority: "situational",
    imagePath: "/images/food/bangkok/bangkok_dish_16_raw_seafood.jpg",
    imageAlt: "鲜甜生虾与螃蟹浸泡在泰式酸辣大蒜青柠鱼露冰汁中",
    recommendedRestaurantIds: ["bkk-rest-12", "bkk-rest-13"],
    routeIds: ["bkk-route-b"],
    shortDescription: "新鲜生海虾、膏蟹或三文鱼，直接浸泡在由鱼露、青柠汁、大量小米辣与生蒜调制的特制冰凉酱汁中生吃。",
    whyTry: "极其鲜甜生猛！海鲜的软糯甜美与酱汁的冰辣酸爽产生爆炸性化学反应，是重度海鲜与刺身爱好者的蜜糖。",
    tasteProfile: ["极鲜极辣", "冰爽生猛", "蒜味浓烈"],
    bestTime: "晚餐时段（建议行程中后段尝试）",
    notes: [
      "⚠️ 【谨慎/避坑提示】肠胃敏感者或水土不服时务必谨慎！请务必选择卫生条件过关、制冷严密的正规餐厅，切忌在酷热露天路边摊随便吃生腌"
    ]
  },

  // --- 普吉岛 Phuket Food Items ---
  {
    id: "hkt-food-01",
    region: "phuket",
    nameZh: "普吉岛地道黄咖喱蟹肉",
    nameEn: "Phuket Crab Curry (Gaeng Pu Bai Cha-plu)",
    displayName: "普吉岛地道黄咖喱蟹肉 Phuket Crab Curry",
    type: "dish",
    priority: "must-try",
    imagePath: "/images/food/phuket/phuket_dish_01_crab_curry.jpg",
    imageAlt: "大块剥壳大闸蟹肉浸泡在香浓金黄椰汁咖喱中配米线",
    recommendedRestaurantIds: ["hkt-rest-01", "hkt-rest-02", "hkt-rest-03"],
    routeIds: ["hkt-route-a"],
    shortDescription: "普吉岛名菜之首！以南部浓郁辛香的黄咖喱与大量高脂椰浆为底，加入假蒌叶与整块厚实剥好的鲜甜花蟹肉块，搭配米线（Kanom Jeen）。",
    whyTry: "完全不用自己动手剥壳的奢侈吃蟹体验！One Chun 和 Tu Kab Khao 的版本蟹肉如大拇指般粗壮，咖喱香浓浇在米线上堪称一绝。",
    tasteProfile: ["极其浓郁", "椰香爆棚", "蟹肉甜嫩", "微辣后劲"],
    bestTime: "普吉老街午餐或晚餐",
    notes: [
      "价格通常在 500-800 泰铢左右，是必点主菜",
      "把白皙的米线分次浸入金黄咖喱汁中食用，切勿一口气全倒进去"
    ]
  },
  {
    id: "hkt-food-02",
    region: "phuket",
    nameZh: "普吉传统红烧猪肉 / Moo Hong",
    nameEn: "Moo Hong",
    displayName: "普吉传统红烧猪肉 / Moo Hong Moo Hong",
    type: "dish",
    priority: "recommended",
    imagePath: "/images/food/phuket/phuket_dish_02_moo_hong.jpg",
    imageAlt: "浓油赤酱软烂入味的厚切五花肉配香菜与蒜头",
    recommendedRestaurantIds: ["hkt-rest-01", "hkt-rest-02", "hkt-rest-03"],
    routeIds: ["hkt-route-a"],
    shortDescription: "源自福建客家移民与普吉娘惹文化融合的传世名肴。选用三层五花肉，用黑酱油、椰糖、黑胡椒、八角慢火煨炖数小时至胶质融化。",
    whyTry: "完全不辣的普吉之光！肉质极其酥烂入味，肥而不腻，黑胡椒的香气中和了甜味，拌饭能吃三大碗。",
    tasteProfile: ["甜咸浓醇", "入口即化", "胡椒香浓", "完全不辣"],
    bestTime: "普吉老街正餐",
    notes: [
      "是搭配咖喱蟹的最佳黄金搭档（一辣一甜，完美互补）"
    ]
  },
  {
    id: "hkt-food-03",
    region: "phuket",
    nameZh: "普吉特色炒福建面",
    nameEn: "Phuket Hokkien Mee",
    displayName: "普吉特色炒福建面 Phuket Hokkien Mee",
    type: "dish",
    priority: "recommended",
    imagePath: "/images/food/phuket/phuket_dish_03_hokkien_mee.jpg",
    imageAlt: "粗圆油润的炒黄色粗面配鲜虾猪肉片与流心半熟蛋",
    recommendedRestaurantIds: ["hkt-rest-04"],
    routeIds: ["hkt-route-a"],
    shortDescription: "标志性的南洋华人融合风味。粗圆的油面与大虾、鱿鱼、猪肉片、菜心在铁锅中炒出浓稠浓香的深色酱汁，顶上敲一颗半熟流心蛋。",
    whyTry: "Moo Ton Poe 钟楼老店已传过七旬，锅气磅礴。趁热把半熟蛋黄戳破拌进浓稠的面条里，醇厚滑润至极。",
    tasteProfile: ["酱香浓醇", "面条顺滑", "蛋黄浓郁"],
    bestTime: "午餐便餐 / 逛完老街街头小歇",
    notes: [
      "地道吃法建议配一串店家桌上现成的红葱头沙爹猪肉串（吃几串结几串钱）"
    ]
  },
  {
    id: "hkt-food-04",
    region: "phuket",
    nameZh: "烟熏虾辣酱配鲜蔬 / Nam Prik Goong Siap",
    nameEn: "Nam Prik Goong Siap",
    displayName: "烟熏虾辣酱配鲜蔬 Nam Prik Goong Siap",
    type: "dish",
    priority: "recommended",
    imagePath: "/images/food/phuket/phuket_dish_04_nam_prik.jpg",
    imageAlt: "小碗浓郁烟熏烤干虾大蒜辣酱搭配整盘鲜脆小黄瓜与生菜",
    recommendedRestaurantIds: ["hkt-rest-01", "hkt-rest-03"],
    routeIds: ["hkt-route-a"],
    shortDescription: "普吉家家户户餐桌必备的灵魂蘸酱。将烟熏烤干虾、生蒜、小辣椒、虾酱与椰糖捣碎，搭配一大盘冰镇爽脆的生黄瓜、白菜与翼豆。",
    whyTry: "体验最纯正的南部海岛农家风味。烟熏大虾的脆香与辣酱的咸鲜交织，用爽脆生菜卷着吃，开胃无比。",
    tasteProfile: ["烟熏浓香", "咸辣生猛", "蔬菜极脆"],
    bestTime: "正餐开胃拼盘",
    notes: [
      "对虾酱或生蒜气味敏感者请先少量蘸取尝鲜"
    ]
  },
  {
    id: "hkt-food-05",
    region: "phuket",
    nameZh: "O-Aew 普吉传统爱玉香蕉刨冰",
    nameEn: "O-Aew",
    displayName: "O-Aew 普吉传统爱玉香蕉刨冰 O-Aew",
    type: "dessert",
    priority: "recommended",
    imagePath: "/images/food/phuket/phuket_dish_05_o_aew.jpg",
    imageAlt: "玻璃碗中晶莹剔透的香蕉香草冻底铺满冰沙与红豆刨冰",
    recommendedRestaurantIds: ["hkt-rest-05", "hkt-rest-12"],
    routeIds: ["hkt-route-a"],
    shortDescription: "普吉岛特有的消暑冰品。利用当地一种叫 O-Aew 的植物种子凝胶与香蕉提取物做成透明嫩滑的果冻，铺上冰沙、红豆与香甘浆。",
    whyTry: "只有普吉岛才能吃到的限定古早甜点！清凉解渴，果冻入口即化，Torry's Ice Cream 把这道传统冰品升级成极具艺术感的精美甜品。",
    tasteProfile: ["清凉透骨", "微甜清爽", "果冻滑嫩"],
    bestTime: "炎热下午老街逛街中途",
    notes: [
      "Torry's Ice Cream 店门面极为复古精美，也是普吉老街最出名的拍照打卡点之一"
    ]
  },
  {
    id: "hkt-food-06",
    region: "phuket",
    nameZh: "Apong 薄脆椰香卷饼",
    nameEn: "Apong",
    displayName: "Apong 薄脆椰香卷饼 Apong",
    type: "snack",
    priority: "optional",
    imagePath: "/images/food/phuket/phuket_dish_06_apong.jpg",
    imageAlt: "炭火小铁锅上摊制的金黄色纸薄酥脆椰米卷饼",
    recommendedRestaurantIds: ["hkt-rest-12"],
    routeIds: ["hkt-route-a"],
    shortDescription: "普吉街头现做现卖的传统糕点。用米浆、椰奶、鸡蛋在炭火烧热的小圆底铁锅上旋转摊成纸一样薄的小饼，卷成圆筒状。",
    whyTry: "边走边吃的极品小零食！刚出锅时两头咔嚓酥脆，中间带有一点点蛋饼的软韧，满嘴淡淡的天然椰香。",
    tasteProfile: ["极度酥脆", "椰香轻盈", "甜度适中"],
    bestTime: "周日 Lard Yai 夜市或老街散步",
    notes: [
      "保质期极短，出锅 10 分钟内吃完口感最好，冷了会变软"
    ]
  },
  {
    id: "hkt-food-07",
    region: "phuket",
    nameZh: "Rawai 拉威渔港现捞海鲜宴",
    nameEn: "Rawai Seafood Feast",
    displayName: "Rawai 拉威渔港现捞海鲜宴 Rawai Seafood",
    type: "seafood",
    priority: "must-try",
    imagePath: "/images/food/phuket/phuket_dish_07_rawai_seafood.jpg",
    imageAlt: "摆满巨大澳龙、皮皮虾与老虎斑的拉威海鲜摊位与料理",
    recommendedRestaurantIds: ["hkt-rest-07", "hkt-rest-08"],
    routeIds: ["hkt-route-c"],
    shortDescription: "南部最核心的海鲜体验！在渔民码头海鲜摊位亲眼挑选刚刚上岸的巨型琵琶虾、锦绣龙虾、蓝蟹与石斑鱼，交给对街餐厅现做。",
    whyTry: "普吉海鲜性价比最高且体验感最强的去处！避开巴东商区的昂贵水分，椒盐蒜蓉皮皮虾肉质弹牙有如龙虾，过口难忘。",
    tasteProfile: ["鲜甜无比", "蒜蓉浓香", "海味爆棚"],
    bestTime: "傍晚 17:00 - 20:00（可结合神仙半岛日落后顺路前往）",
    notes: [
      "💡 【讲价策略】在左侧海鲜市场买活海鲜时务必砍价（通常可按开价的 7-8 折成交，并索要零头优惠）",
      "右侧代工餐厅按重量收费加工费，推荐以蒜蓉蒸、黑胡椒炒和炭烤为主"
    ]
  },
  {
    id: "hkt-food-08",
    region: "phuket",
    nameZh: "炭烤大头虾与海鲜拼盘",
    nameEn: "Grilled Prawns & Seafood Platter",
    displayName: "炭烤大头虾与海鲜拼盘 Grilled Prawns & Seafood Platter",
    type: "seafood",
    priority: "recommended",
    imagePath: "/images/food/phuket/phuket_dish_08_grilled_prawns.jpg",
    imageAlt: "炭火烤制对半剖开满头金黄虾黄的巨型大河虾与海鲜拼盘",
    recommendedRestaurantIds: ["hkt-rest-07", "hkt-rest-09"],
    routeIds: ["hkt-route-c"],
    shortDescription: "巨型活体罗氏大河虾（或海虾）对半剖开在旺火炭网上直烤，虾头塞满金黄诱人的浓郁红油虾黄，虾肉紧实爽脆。",
    whyTry: "吃虾最纯粹、最过瘾的方式！用筷子挖出虾头里香浓的虾黄拌饭，虾肉蘸一口绿色的泰式海鲜青柠汁（Seafood Sauce），灵魂升天。",
    tasteProfile: ["虾黄爆浆", "炭香扑鼻", "酸辣蘸汁提鲜"],
    bestTime: "海边晚餐 / 夜市海鲜大餐",
    notes: [
      "泰式绿色海鲜蘸汁（Nam Jim Seafood）以大量青椒、大蒜、青柠和鱼露打碎而成，极酸极辣，蘸一口令人精神一振"
    ]
  },
  {
    id: "hkt-food-09",
    region: "phuket",
    nameZh: "Lard Yai 周日夜市美食巡礼",
    nameEn: "Lard Yai Night Market Snacks",
    displayName: "Lard Yai 周日夜市美食巡礼 Lard Yai Night Market Snacks",
    type: "street-food",
    priority: "must-try",
    imagePath: "/images/food/phuket/phuket_dish_09_lard_yai.jpg",
    imageAlt: "普吉老街周日晚上中葡建筑下的热烈夜市小吃人潮",
    recommendedRestaurantIds: ["hkt-rest-12"],
    routeIds: ["hkt-route-a"],
    shortDescription: "每周日仅限一晚！普吉老街最具代表性的中葡建筑大街封路变成数千米长的大型夜市，汇聚上百种普吉岛民间特色小吃。",
    whyTry: "每周一会的狂欢！不仅可以吃到现烤海鲜、泰式鱼饼、各类五彩椰糕，现场还有街头音乐人和文创摊位，氛围拉满。",
    tasteProfile: ["品种极其丰富", "人间烟火气", "甜咸兼备"],
    bestTime: "每周日晚 17:30 - 21:30",
    notes: [
      "⚠️ 周日晚上人流极大非常拥挤，如果行程时间吻合一定要去，尽量在 17:30 刚开市人较少时先开吃"
    ]
  },
  {
    id: "hkt-food-10",
    region: "phuket",
    nameZh: "Torry’s 招牌娘惹冰淇淋甜品",
    nameEn: "Torry’s Ice Cream Creations",
    displayName: "Torry’s 招牌娘惹冰淇淋甜品 Torry’s Ice Cream Creations",
    type: "dessert",
    priority: "recommended",
    imagePath: "/images/food/phuket/phuket_dish_10_torrys.jpg",
    imageAlt: "粉金色复古盘中摆放的精美意式冰淇淋搭配普吉传统糕点",
    recommendedRestaurantIds: ["hkt-rest-05"],
    routeIds: ["hkt-route-a"],
    shortDescription: "将意式 Gelato 与普吉地道娘惹传统糕点（如红桃粿、阿波罗饼、黑糯米饭）完美结合的网红精品甜点屋。",
    whyTry: "普吉老街最高颜值必到点！必点 Bi-co-moi（黑糯米椰奶冰淇淋），温热咸香的黑糯米配冰凉醇厚的椰奶冰淇淋，绝配。",
    tasteProfile: ["高级甜美", "椰醇米香", "冰火交织"],
    bestTime: "老街下午茶休息时段",
    notes: [
      "周末下午店内排队较多，可先在门口拍照记名字，到号后再入内享受冷气与甜点"
    ]
  },
  {
    id: "hkt-food-11",
    region: "phuket",
    nameZh: "普吉地道 Kanom Jeen 发酵米线",
    nameEn: "Phuket Kanom Jeen",
    displayName: "普吉地道 Kanom Jeen 发酵米线 Phuket Kanom Jeen",
    type: "breakfast",
    priority: "optional",
    imagePath: "/images/food/phuket/phuket_dish_11_kanom_jeen.jpg",
    imageAlt: "白皙发酵细米线淋上鱼肉咖喱配一大盘任食的新鲜蔬菜草药",
    recommendedRestaurantIds: ["hkt-rest-01"],
    routeIds: ["hkt-route-a"],
    shortDescription: "普吉当地人最爱的传统早餐。雪白带点韧性的微发酵细米线，自助浇上黄咖喱鱼汤或绿咖喱，配桌上免费无限任食的几十种生熟配菜。",
    whyTry: "感受最深度的普吉当地生活。配菜有酸菜、生豆芽、假蒌叶甚至炸小鱼干，拌在一碗里鲜微辣极具个性。",
    tasteProfile: ["发酵微酸", "咖喱辛香", "爽脆多层次"],
    bestTime: "早上至中午早午餐时段",
    notes: [
      "有些传统老店只开早晨，中午卖完即关门"
    ]
  },
  {
    id: "hkt-food-12",
    region: "phuket",
    nameZh: "普吉式南洋早茶与点心",
    nameEn: "Phuket Dim Sum Breakfast",
    displayName: "普吉式南洋早茶与点心 Phuket Dim Sum Breakfast",
    type: "breakfast",
    priority: "optional",
    imagePath: "/images/food/phuket/phuket_dish_12_dim_sum.jpg",
    imageAlt: "摆满一桌小巧蒸笼的泰式改良港式点心与手冲冷热老咖啡",
    recommendedRestaurantIds: ["hkt-rest-06"],
    routeIds: ["hkt-route-a"],
    shortDescription: "受福建与广东移民影响演变出的普吉特色早茶。顾客自己到保鲜柜前挑选小蒸笼（烧卖、虾饺、排骨），交给店家现场猛火蒸熟。",
    whyTry: "搭配一杯底沉炼乳的南洋传统手冲冷热老咖啡（Kopi），在清晨的普吉街头慢悠悠享受南洋时光。",
    tasteProfile: ["温热鲜美", "肉香鲜甜", "浓情南洋"],
    bestTime: "清晨 07:00 - 10:30",
    notes: [
      "点心通常比标准港式早茶略偏甜一点点，配特制的泰式辣酱油极具本土风味"
    ]
  },
  {
    id: "hkt-food-13",
    region: "phuket",
    nameZh: "O-Tao 普吉传统炒芋头蚝肉蛋饼",
    nameEn: "O-Tao",
    displayName: "O-Tao 普吉传统炒芋头蚝肉蛋饼 O-Tao",
    type: "street-food",
    priority: "optional",
    imagePath: "/images/food/phuket/phuket_dish_13_o_tao.jpg",
    imageAlt: "铁板上将软糯芋头粒小蚝肉与薯粉鸡蛋炒制香喷喷的小吃",
    recommendedRestaurantIds: ["hkt-rest-12"],
    routeIds: ["hkt-route-a"],
    shortDescription: "普吉独创的民间小吃。将煮熟的软糯香芋丁、新鲜小蚝肉、薯粉与鸡蛋、蒜蓉在铁板上炒碎，撒上大量香脆炸猪皮粒。",
    whyTry: "比普通蚝煎口感更为特别！芋头的软糯香甜与海蛎的鲜美融为一体，炸猪皮提供咔嚓爽脆的对比，一口入魂。",
    tasteProfile: ["芋香软糯", "蒜香猪皮脆", "咸香海味"],
    bestTime: "傍晚或夜市街头觅食",
    notes: [
      "普吉老街附近有几家专营 30 年以上的 O-Tao 小推车老店"
    ]
  },
  {
    id: "hkt-food-14",
    region: "phuket",
    nameZh: "南部泰式黄咖喱酸汤鱼 / 臭菜炒蛋",
    nameEn: "Southern Thai Curry & Cha-om Egg",
    displayName: "南部泰式黄咖喱酸汤鱼 / 臭菜炒蛋 Southern Thai Curry",
    type: "dish",
    priority: "optional",
    imagePath: "/images/food/phuket/phuket_dish_14_southern_curry.jpg",
    imageAlt: "橙黄色极度浓烈酸辣的南部泰式鱼汤配厚切金黄羽叶金合欢煎蛋",
    recommendedRestaurantIds: ["hkt-rest-01", "hkt-rest-03"],
    routeIds: ["hkt-route-a"],
    shortDescription: "泰国南部菜系的硬核代表：以大量姜黄与鲜辣椒熬制的黄酸汤咖喱鱼（Gaeng Som），配一份厚实金黄的臭菜炒蛋（Cha-om Omelette）。",
    whyTry: "真正辣到灵魂出窍的在地进阶体验！黄汤酸辣生猛极其刺激，把蓬松的臭菜炸蛋浸入汤汁中吸满精华，过瘾无比。",
    tasteProfile: ["硬核重辣", "极酸极爽", "蛋香浓郁"],
    bestTime: "老街正餐（适合想挑战真正泰南重口辣度的情侣）",
    notes: [
      "⚠️ 辣度极高！这是全泰国最辣的菜系之一，点单时可事先要求“微辣”或备好大量冷饮冰块"
    ]
  },

  // --- 瑶亚岛 Koh Yao Yai / Santhiya Food Items ---
  {
    id: "yya-food-01",
    region: "koh-yao-yai",
    nameZh: "Santhiya 半山海景度假自助早餐",
    nameEn: "Santhiya Sea View Breakfast",
    displayName: "Santhiya 半山海景度假自助早餐 Santhiya Sea View Breakfast",
    type: "breakfast",
    priority: "must-try",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_01_resort_breakfast.jpg",
    imageAlt: "传统泰式柚木雕花露台上俯瞰清晨海湾的丰盛自助餐桌",
    recommendedRestaurantIds: ["yya-rest-01"],
    routeIds: ["yya-route-a"],
    shortDescription: "在 Santhiya 标志性的传统全柚木雕花半山餐厅（Saai Restaurant），面对180度全景攀牙湾碧海，享用现做泰式汤粉、热带水果与面包。",
    whyTry: "这也是入住 Santhiya 核心的度假仪式感！清晨海风微拂，边喝现煮鲜奶咖啡边看着阳光洒落海面，松弛感拉满。",
    tasteProfile: ["丰盛多样", "现煮汤粉鲜香", "海风伴餐"],
    bestTime: "清晨 07:30 - 09:30（早去可抢占最前排海景位）",
    notes: [
      "酒店依靠木质双条车班车接驳上山，早高峰可能需排队等待班车，建议预留充裕时间",
      "绝佳的穿着度假白裙拍照时段"
    ]
  },
  {
    id: "yya-food-02",
    region: "koh-yao-yai",
    nameZh: "海滩浪漫日落晚餐 / 七夕纪念日大餐",
    nameEn: "Sunset Dinner / Qixi Dinner",
    displayName: "海滩浪漫日落晚餐 / 七夕纪念日大餐 Sunset Dinner",
    type: "dining-experience",
    priority: "must-try",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_02_sunset_dinner.jpg",
    imageAlt: "夕阳染红海面下摆设烛光与鲜花的私密海边晚餐餐桌",
    recommendedRestaurantIds: ["yya-rest-01", "yya-rest-02", "yya-rest-03"],
    routeIds: ["yya-route-a"],
    shortDescription: "夕阳沉入海平线时分，在 Loh Pared 海滩的细沙上或 Santhiya 悬崖水上餐厅，在烛光与涛声伴随下享用精心烹制的泰式或西式双人大餐。",
    whyTry: "本次情侣度假行程中最浪漫、最核心的记忆刻度！如果适逢七夕或纪念日，更是无可替代的绝美氛围体验。",
    tasteProfile: ["浪漫氛围巅峰", "海鲜精粹", "烛光微醺"],
    bestTime: "傍晚 18:00 开始入座等待 18:30 日落金黄时刻",
    notes: [
      "💡 纪念日或七夕专属晚餐务必提前 3-5 天通过邮件联系 Santhiya 酒店预订私密位",
      "日落后海边稍有蚊虫，建议餐前喷涂驱蚊水"
    ]
  },
  {
    id: "yya-food-03",
    region: "koh-yao-yai",
    nameZh: "海滩炭烤活鱼与海味海鲜",
    nameEn: "Grilled Fish & Island Seafood",
    displayName: "海滩炭烤活鱼与海味海鲜 Grilled Fish & Island Seafood",
    type: "seafood",
    priority: "recommended",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_03_grilled_fish.jpg",
    imageAlt: "塞满香茅与斑斓叶在炭火上外酥里嫩的整条炭烤石斑鱼",
    recommendedRestaurantIds: ["yya-rest-02", "yya-rest-04"],
    routeIds: ["yya-route-a", "yya-route-c"],
    shortDescription: "海岛最质朴粗犷的美味：当天渔民捞起的石斑鱼、海鲈鱼或鲷鱼，肚内塞满香茅与香叶，外层裹盐在炭火上慢烤至皮脆肉嫩。",
    whyTry: "在 Loh Pared 海滩边接地气的沙滩小餐馆，吹着晚风吃外皮微焦、鱼肉洁白如蒜瓣的鲜甜海鱼，性价比极高。",
    tasteProfile: ["鱼肉鲜甜滑嫩", "天然香茅香气", "炭火焦香"],
    bestTime: "海边晚自习 / 晚餐时段",
    notes: [
      "沙滩边的本地餐厅（如 Home Roam 等）价格比度假村内亲民近一半，味道纯正地道"
    ]
  },
  {
    id: "yya-food-04",
    region: "koh-yao-yai",
    nameZh: "鲜煮海鲜冬阴功浓汤",
    nameEn: "Tom Yum Seafood",
    displayName: "鲜煮海鲜冬阴功浓汤 Tom Yum Seafood",
    type: "dish",
    priority: "recommended",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_04_tomyum_seafood.jpg",
    imageAlt: "充满海虾鱿鱼与草菇的热气腾腾椰香海鲜冬阴功大碗",
    recommendedRestaurantIds: ["yya-rest-01", "yya-rest-02", "yya-rest-04"],
    routeIds: ["yya-route-a", "yya-route-c"],
    shortDescription: "使用海岛周边刚刚上岸的各类大虾、鲜鱿和文蛤，加入鲜打椰浆与原生香料现煮的冬阴功汤，鲜度远远甩开内陆城市版本。",
    whyTry: "因为海鲜极致新鲜，汤水自带自然的甜味！微辣微酸的热汤在夜晚海风吹拂时喝下一碗，极为暖胃舒服。",
    tasteProfile: ["海甜爆汁", "温润椰香", "微辣暖身"],
    bestTime: "午餐或晚餐配套汤品",
    notes: [
      "岛上传统渔民做菜讲究食材原味，不会添加过多人工味精，吃的就是一股海味清鲜"
    ]
  },
  {
    id: "yya-food-05",
    region: "koh-yao-yai",
    nameZh: "现开椰子与热带果冰沙",
    nameEn: "Coconut Shake & Tropical Drinks",
    displayName: "现开椰子与热带果冰沙 Coconut Shake & Tropical Drinks",
    type: "drink",
    priority: "recommended",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_05_coconut_shake.jpg",
    imageAlt: "插着吸管的冰镇鲜开青椰与杯壁结霜的芒果香蕉冰沙",
    recommendedRestaurantIds: ["yya-rest-01", "yya-rest-02", "yya-rest-03"],
    routeIds: ["yya-route-a", "yya-route-c"],
    shortDescription: "岛上随处可得的清甜青椰子（开盖即饮），以及用新鲜成熟芒果、香蕉、百香果加上椰奶与碎冰高转速打成的浓稠冰沙（Smoothie）。",
    whyTry: "躺在酒店泳池旁沙滩椅上，或者在海边木屋餐馆休息时，手里必须握着一杯冰凉纯正的热带果冰沙，这才叫海岛度假！",
    tasteProfile: ["清凉爆冰", "天然果甜", "奶香浓郁"],
    bestTime: "全天任何海滩暴晒或泳池放空时刻",
    notes: [
      "椰奶冰沙 (Coconut Shake) 加上一点点炼乳简直是神仙美味，不可错过"
    ]
  },
  {
    id: "yya-food-06",
    region: "koh-yao-yai",
    nameZh: "私人包船跳岛海上午餐 / 野餐",
    nameEn: "Private Boat Lunch / Picnic",
    displayName: "私人包船跳岛海上午餐 / 野餐 Private Boat Lunch / Picnic",
    type: "dining-experience",
    priority: "situational",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_06_boat_picnic.jpg",
    imageAlt: "长尾船头部摆满热带水果三明治与冷饮的绝美海上野餐布置",
    recommendedRestaurantIds: ["yya-rest-06"],
    routeIds: ["yya-route-d"],
    shortDescription: "预订专属长尾船出海前往 Hong Islands 宏岛或无人沙滩时，船家特别准备的泰式炒饭午餐盒、冰镇果汁与切好装盒的热带水果派对。",
    whyTry: "无人打扰的终极私享浪漫！在翠绿如翡翠的无人小海湾白沙滩上铺开野餐垫，面对蔚蓝奇石吃午餐，奢华感满分。",
    tasteProfile: ["海天一色", "轻食野趣", "极致私密"],
    bestTime: "预订出海包船的一整天中午",
    notes: [
      "订船时务必提前与客服或船家确认套餐内是否包含午餐、冰块冰桶以及充足的饮用水"
    ]
  },
  {
    id: "yya-food-07",
    region: "koh-yao-yai",
    nameZh: "海岛原住民地道南部咖喱饭",
    nameEn: "Southern Curry / Local Thai Food",
    displayName: "海岛原住民地道南部咖喱饭 Southern Curry / Local Thai Food",
    type: "dish",
    priority: "optional",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_07_local_curry.jpg",
    imageAlt: "带有当地海岛风味的香辣海鲜咖喱搭配香米饭和炸小虾饼",
    recommendedRestaurantIds: ["yya-rest-04", "yya-rest-02"],
    routeIds: ["yya-route-c"],
    shortDescription: "深入瑶亚岛中部村落 Prunai 码头附近，品尝岛上穆斯林渔民制作的原汁原味地道南部咖喱海鲜与家常快炒。",
    whyTry: "远离商业化度假村，用极为便宜的当地人价格（百余泰铢），吃到香辣劲道、椰香醇厚的最淳朴泰南风味。",
    tasteProfile: ["原汁原味", "家常鲜辣", "高性价比"],
    bestTime: "租用摩托车或打车进行岛内轻量环线探秘时的中午",
    notes: [
      "瑶亚岛居民多数信奉伊斯兰教，岛上本土餐馆绝大多数不提供猪肉与酒精饮料，尊重当地文化习俗"
    ]
  },
  {
    id: "yya-food-08",
    region: "koh-yao-yai",
    nameZh: "泰国热带水果大赏",
    nameEn: "Tropical Fruits",
    displayName: "泰国热带水果大赏 Tropical Fruits",
    type: "snack",
    priority: "optional",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_08_fruits.jpg",
    imageAlt: "剥好的山竹红毛丹成熟小香蕉与芒果装满盘中的热带水果盛宴",
    recommendedRestaurantIds: ["yya-rest-01", "yya-rest-02"],
    routeIds: ["yya-route-a", "yya-route-c"],
    shortDescription: "泰国当季的水果宝库：山竹（水果皇后）、红毛丹、兰撒果（龙贡果）、小芭蕉、释迦与香甜脆甜的绿芒果。",
    whyTry: "在岛上每天吃一顿维生素与糖分爆表的天然鲜果盛宴，既健康解暑，又能体验到很多国内难得一见的奇特品种。",
    tasteProfile: ["甜酸多汁", "天然浓香", "极其新鲜"],
    bestTime: "全天 / 酒店早餐或路边水果摊采购",
    notes: [
      "⚠️ 【酒店规定警示】榴莲与山竹的汁水由于易染色或带有浓烈气味，泰国几乎所有星级酒店和度假村严禁带入客房食用（违者罚款极重），请在外面吃完再回房"
    ]
  },
  {
    id: "yya-food-09",
    region: "koh-yao-yai",
    nameZh: "沙滩酒吧微醺海风特调",
    nameEn: "Beach Bar Drinks & Cocktails",
    displayName: "沙滩酒吧微醺海风特调 Beach Bar Drinks & Cocktails",
    type: "drink",
    priority: "optional",
    imagePath: "/images/food/koh_yao_yai/yaoyai_dish_09_beach_bar.jpg",
    imageAlt: "海风轻拂的草顶沙滩酒吧吧台上色彩斑斓的日落鸡尾酒",
    recommendedRestaurantIds: ["yya-rest-03", "yya-rest-05"],
    routeIds: ["yya-route-a"],
    shortDescription: "夜幕降临后，在 Loh Pared 海滩边的木质或草顶沙滩酒吧（如 Gypsy / 酒店海滩吧），点一杯以当地朗姆、百香果与香茅调制的特色鸡尾酒或无酒精特调（Mocktail）。",
    whyTry: "听着海浪翻滚拍岸的白噪音，头顶繁星，夫妻情侣把酒夜话，享受海岛夜间微醺放空的极致浪漫。",
    tasteProfile: ["微醺果香", "冰爽解暑", "松弛感充盈"],
    bestTime: "晚上 20:00 之后的夜间放空时刻",
    notes: [
      "由于当地穆斯林文化，部分纯本土小村落小店不卖酒，海滩针对游客的酒吧或度假村内则正常提供全系列酒水"
    ]
  }
];
