/* ============================================================
   STONEKIM 자재 데이터
   ------------------------------------------------------------
   구조: 제품(product) → 라인(line) → 모델(model) → 사이즈(size)
   
   ★ 수정 방법 ★
   - 새 제품 추가: 아래 MATERIALS 에 콕스톤/스탠리패널 블록을 복사해서 추가
   - 새 모델 추가: 해당 라인의 models 배열에 한 줄 추가
   - 색상/이름 수정: name 값만 고치면 됨
   - look: AI가 참고할 "자재 질감 설명" (시안 품질을 좌우하므로 구체적으로)
   - 이 파일만 고치면 사이트 전체에 자동 반영됩니다.
   ============================================================ */

const MATERIALS = {
  softstone: {
    name: "소프트스톤",
    en: "Soft Stone",
    ready: true,
    lines: {
      travertine: {
        name: "트래버틴 라인",
        en: "Travertine Line",
        surface: "벽",
        look: "자연 트래버틴 특유의 가로결과 미세한 공극(기공)이 보이는 차분한 석재 패널, 무광에 가까운 자연스러운 질감",
        sizes: ["600x1200", "600x2400", "1200x2400"],
        models: [
          { code: "T-A005", name: "Roman White", color: "화이트" },
          { code: "T-A006", name: "Roman Yellow", color: "옐로우" },
          { code: "T-A007", name: "Claybank", color: "베이지" },
          { code: "T-A008", name: "Red", color: "레드" },
          { code: "T-A009", name: "Light Grey", color: "라이트그레이" },
          { code: "T-A013", name: "White", color: "화이트", best: true },
          { code: "T-A014", name: "Yellow", color: "옐로우", best: true },
          { code: "T-A015", name: "Gray", color: "그레이", best: true },
          { code: "T-A069", name: "Red Travertine", color: "레드" },
          { code: "T-A070", name: "Grey Travertine", color: "그레이" },
          { code: "T-A071", name: "Brown Travertine", color: "브라운" },
          { code: "T-A072", name: "White Travertine", color: "화이트", best: true },
          { code: "T-A073", name: "Light Brown Wood", color: "라이트브라운" },
          { code: "T-A074", name: "Yellow Wood", color: "옐로우" },
          { code: "T-A075", name: "Light Grey Wood", color: "라이트그레이" },
          { code: "T-A079", name: "Runa Light Grey", color: "라이트그레이" },
          { code: "T-A080", name: "Runa Light Brown", color: "라이트브라운" },
          { code: "T-A081", name: "Runa Light Yellow", color: "라이트옐로우" },
          { code: "T-A088", name: "Beige", color: "베이지" },
          { code: "T-A089", name: "Cream Yellow", color: "크림옐로우" },
          { code: "T-A090", name: "Grey", color: "그레이" },
          { code: "T-A091", name: "Light Brown", color: "라이트브라운" },
          { code: "T-A092", name: "Taupe", color: "토프" },
          { code: "T-C008", name: "Sardin White", color: "화이트", tag: "NEW" },
          { code: "T-K010", name: "Pure White", color: "퓨어화이트" },
          { code: "T-K011", name: "Beige", color: "베이지" },
          { code: "T-K012", name: "Light Grey", color: "라이트그레이" },
          { code: "T-K013", name: "Medium Grey", color: "미디엄그레이" },
          { code: "T-K014", name: "Dark Grey", color: "다크그레이" },
          { code: "T-K044", name: "Beige", color: "베이지" },
          { code: "T-K045", name: "Pure White", color: "퓨어화이트" },
          { code: "T-K046", name: "Concrete", color: "콘크리트" },
          { code: "T-K047", name: "Gradient Yellow", color: "그라데이션옐로우", best: true },
          { code: "T-K048", name: "Ivory White", color: "아이보리화이트" },
          { code: "T-K049", name: "White Golden", color: "화이트골든" },
          { code: "T-K050", name: "Golden Rust Cave", color: "골든러스트" },
          { code: "T-K051", name: "Golden Grey", color: "골든그레이" },
          { code: "T-S005", name: "Pure White", color: "퓨어화이트", best: true },
          { code: "T-S006", name: "Beige", color: "베이지" },
          { code: "T-S007", name: "Concrete", color: "콘크리트" },
          { code: "T-S008", name: "Gradient Yellow", color: "그라데이션옐로우" },
          { code: "T-S009", name: "White Golden", color: "화이트골든" },
          { code: "T-S010", name: "Golden Grey", color: "골든그레이" },
          { code: "T-S011", name: "Gradient Grey", color: "그라데이션그레이" }
        ]
      },
      concrete: {
        name: "노출콘크리트 라인",
        en: "Exposed Concrete Line",
        surface: "벽",
        look: "매끈하면서 미세한 기공과 얼룩이 자연스럽게 들어간 무광 회색 노출콘크리트 질감, 군더더기 없는 미니멀한 면",
        sizes: ["600x1200", "600x2400", "1200x2400"],
        models: [
          { code: "C-A016", name: "Concrete A16", color: "그레이" },
          { code: "C-A017", name: "Concrete A17", color: "그레이" },
          { code: "C-A018", name: "Concrete A18", color: "그레이" },
          { code: "C-B001", name: "Concrete B01", color: "그레이" },
          { code: "C-B002", name: "Concrete B02", color: "그레이" },
          { code: "C-B003", name: "Concrete B03", color: "그레이" },
          { code: "C-B004", name: "Concrete B04", color: "그레이" },
          { code: "C-B005", name: "Concrete B05", color: "그레이" },
          { code: "C-B006", name: "Concrete B06", color: "그레이" },
          { code: "C-B007", name: "Concrete B07", color: "그레이" },
          { code: "C-B008", name: "Concrete B08", color: "그레이" },
          { code: "C-B013", name: "Concrete B13", color: "그레이" },
          { code: "C-B014", name: "Concrete B14", color: "그레이" },
          { code: "C-B015", name: "Concrete B15", color: "그레이" },
          { code: "C-B016", name: "Concrete B16", color: "그레이" },
          { code: "C-B017", name: "Concrete B17", color: "그레이" },
          { code: "C-B018", name: "Concrete B18", color: "그레이" },
          { code: "C-K001", name: "Concrete K01", color: "그레이" },
          { code: "C-K002", name: "Concrete K02", color: "그레이" },
          { code: "C-K003", name: "Concrete K03", color: "그레이" },
          { code: "C-K004", name: "Concrete K04", color: "그레이" },
          { code: "C-K005", name: "Concrete K05", color: "그레이" },
          { code: "C-K006", name: "Concrete K06", color: "그레이" },
          { code: "C-K007", name: "Beige/Grey/Red", color: "혼합" },
          { code: "C-K017", name: "Beige", color: "베이지" },
          { code: "C-K041", name: "Concrete K41", color: "그레이" },
          { code: "C-K042", name: "Concrete K42", color: "그레이" },
          { code: "C-K043", name: "Gradient Grey", color: "그라데이션그레이" },
          { code: "C-K065", name: "Medium Grey", color: "미디엄그레이" }
        ]
      },
      stone: {
        name: "스톤 라인",
        en: "Stone Line",
        surface: "벽",
        look: "천연석의 자연스러운 색 편차와 입체적인 질감이 살아있는 석재 패널, 표면에 미세한 요철감",
        sizes: ["600x1200", "600x2400", "1200x2400"],
        models: [
          { code: "S-A053", name: "Stone A53", color: "내추럴" },
          { code: "S-A054", name: "Stone A54", color: "내추럴" },
          { code: "S-A058", name: "Stone A58", color: "내추럴" },
          { code: "S-C015", name: "Cartier White", color: "화이트" },
          { code: "S-C018", name: "Shale Brown", color: "브라운" },
          { code: "S-C020", name: "Stone C20", color: "내추럴" },
          { code: "S-C021", name: "Stone C21", color: "내추럴" },
          { code: "S-C036", name: "Andes Yellow", color: "옐로우" },
          { code: "S-C052", name: "White Sesame", color: "화이트" },
          { code: "S-C083", name: "Cartier White", color: "화이트" },
          { code: "S-C117", name: "Stone C117", color: "내추럴" },
          { code: "S-K015", name: "Stone K15", color: "내추럴" },
          { code: "S-K016", name: "Stone K16", color: "내추럴" },
          { code: "S-K030", name: "Stone K30", color: "내추럴" },
          { code: "S-K031", name: "Stone K31", color: "내추럴" },
          { code: "S-K032", name: "Stone K32", color: "내추럴" },
          { code: "S-K035", name: "Stone K35", color: "내추럴" },
          { code: "S-K036", name: "Stone K36", color: "내추럴" },
          { code: "S-K052", name: "Stone K52", color: "내추럴" },
          { code: "S-K053", name: "Stone K53", color: "내추럴" },
          { code: "S-K054", name: "Beige/Yellow/Light Grey", color: "혼합" },
          { code: "S-K055", name: "Stone K55", color: "내추럴" },
          { code: "S-K056", name: "Stone K56", color: "내추럴" },
          { code: "S-K057", name: "Stone K57", color: "내추럴" },
          { code: "S-K058", name: "Stone K58", color: "내추럴" },
          { code: "S-K059", name: "Stone K59", color: "내추럴" },
          { code: "S-K060", name: "Stone K60", color: "내추럴" },
          { code: "S-K061", name: "Beige/Light Grey/Yellow", color: "혼합" },
          { code: "S-K062", name: "Stone K62", color: "내추럴" },
          { code: "S-K063", name: "Stone K63", color: "내추럴" },
          { code: "S-S012", name: "Stone S12", color: "내추럴" },
          { code: "S-S013", name: "Stone S13", color: "내추럴" },
          { code: "S-S014", name: "Stone S14", color: "내추럴" },
          { code: "S-S015", name: "Stone S15", color: "내추럴" },
          { code: "S-S016", name: "Stone S16", color: "내추럴" },
          { code: "S-S038", name: "Stone S38", color: "내추럴" },
          { code: "S-S039", name: "Stone S39", color: "내추럴" },
          { code: "S-S040", name: "Stone S40", color: "내추럴" },
          { code: "S-S041", name: "Stone S41", color: "내추럴" },
          { code: "S-S042", name: "Stone S42", color: "내추럴" }
        ]
      },
      marble: {
        name: "대리석 라인",
        en: "Marble Line",
        surface: "벽",
        look: "선명한 마블 베이닝(결무늬)이 흐르는 고급스러운 대리석 패널, 은은한 광택",
        sizes: ["600x1200", "1200x2400"],
        models: [
          { code: "M-A001", name: "Marble A01", color: "화이트" },
          { code: "M-A002", name: "Marble A02", color: "화이트" },
          { code: "M-A003", name: "Marble A03", color: "화이트" },
          { code: "M-A004", name: "Marble A04", color: "화이트" },
          { code: "M-A025", name: "Marble A25", color: "내추럴" },
          { code: "M-A026", name: "Marble A26", color: "내추럴" },
          { code: "M-A034", name: "Marble A34", color: "내추럴" },
          { code: "M-A035", name: "Marble A35", color: "내추럴" },
          { code: "M-A036", name: "Marble A36", color: "내추럴" },
          { code: "M-A037", name: "Marble A37", color: "내추럴" },
          { code: "M-A038", name: "Marble A38", color: "내추럴" },
          { code: "M-A039", name: "Marble A39", color: "내추럴" },
          { code: "M-C087", name: "Quicksand Red", color: "레드" }
        ]
      },
      wood: {
        name: "스페셜 라인 (우드)",
        en: "Special Line (Wood)",
        surface: "벽",
        look: "따뜻한 나뭇결이 살아있는 우드 패널, 세로 골(리브) 형태로 시공되는 자연스러운 목재 질감",
        sizes: ["600x3000", "1200x3000", "190x1200", "590x2400", "1190x2400"],
        models: [
          { code: "SW-A060", name: "Light Yellow", color: "라이트옐로우" },
          { code: "SW-A061", name: "Yellow", color: "옐로우" },
          { code: "SW-A062", name: "Light Brown", color: "라이트브라운" },
          { code: "SW-A063", name: "Dark Brown", color: "다크브라운" },
          { code: "SW-A064", name: "Dark Brown", color: "다크브라운" },
          { code: "SW-A065", name: "Brown", color: "브라운", best: true },
          { code: "SW-A066", name: "Khaki", color: "카키" },
          { code: "SW-A067", name: "Yellow", color: "옐로우" },
          { code: "SW-A068", name: "Light Brown", color: "라이트브라운" },
          { code: "SW-K037", name: "Original", color: "오리지널" },
          { code: "SW-K038", name: "Red", color: "레드" }
        ]
      },
      herringbone: {
        name: "스페셜 라인 (헤링본)",
        en: "Special Line (Herringbone)",
        surface: "바닥",
        look: "V자로 엇갈리게 시공된 헤링본 패턴, 규칙적이고 리듬감 있는 결, 주로 바닥에 시공",
        sizes: ["기타"],
        models: [
          { code: "SH-C176", name: "Yellow", color: "옐로우" },
          { code: "SH-K078", name: "Herringbone K78", color: "내추럴" },
          { code: "SH-K079", name: "Herringbone K79", color: "내추럴" },
          { code: "SH-K080", name: "Herringbone K80", color: "내추럴" },
          { code: "SH-K081", name: "Herringbone K81", color: "내추럴" },
          { code: "SH-S001", name: "Herringbone S01", color: "내추럴" },
          { code: "SH-S002", name: "Herringbone S02", color: "내추럴" },
          { code: "SH-S003", name: "Herringbone S03", color: "내추럴" },
          { code: "SH-S004", name: "Herringbone S04", color: "내추럴" },
          { code: "SH-S030", name: "Herringbone S30", color: "내추럴" },
          { code: "SH-S031", name: "Herringbone S31", color: "내추럴" },
          { code: "SH-S032", name: "Herringbone S32", color: "내추럴" },
          { code: "SH-S033", name: "Herringbone S33", color: "내추럴" },
          { code: "SH-S034", name: "Herringbone S34", color: "내추럴" },
          { code: "SH-S035", name: "Herringbone S35", color: "내추럴" },
          { code: "SH-S036", name: "Herringbone S36", color: "내추럴" },
          { code: "SH-S037", name: "Herringbone S37", color: "내추럴" }
        ]
      }
    }
  },

  /* ===== 나중에 추가할 제품들 (구조만 잡아둠) ===== */
  cockstone: {
    name: "콕스톤",
    en: "Cock Stone",
    ready: false,        // 준비되면 true 로, lines 채우면 됨
    lines: {}
  },
  stanleypanel: {
    name: "스탠리패널",
    en: "Stanley Panel",
    ready: false,
    lines: {}
  }
};
