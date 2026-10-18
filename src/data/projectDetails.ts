export interface ProjectDetailSection {
  /** 섹션 제목 (예: GNB · LNB) */
  title: string;
  items: string[];
}

export interface ProjectDetail {
  period: string;
  /** 구축 / 운영 등 작업 구분 */
  type: string;
  /** 맡은 역할 */
  role: string;
  /** 프로젝트 한 줄 소개 (HTML 가능, PC·태블릿 줄바꿈은 <br class="br-pc" />) */
  summary: string;
  /** 상세 히어로 영역 색상 (메인 카드 배경색과 동일하게 맞춤) */
  theme: { bg: string; color: string };
  sections: ProjectDetailSection[];
}

export const projectDetails: Record<string, ProjectDetail> = {
  lexus: {
    period: '2026.05 - 2026.10',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: '렉서스코리아 공식 웹사이트 리뉴얼 프로젝트로, <br class="br-pc" />GNB·LNB와 전 차종 모델 페이지를 맡았습니다.',
    theme: { bg: '#385071', color: '#fff' },
    sections: [
      {
        title: 'GNB · LNB',
        items: [
          'PC · 태블릿 · 모바일 GNB와 모델 메가메뉴(필터 · 검색) 구현',
          '스크롤 모션, 클릭 방식 메뉴 전환, 바깥 영역 클릭 시 닫기 등 사용성 개선',
          '일반 페이지 LNB와 모델 페이지 LNB 분리 설계',
        ],
      },
      {
        title: '백엔드 협업',
        items: [
          'PHP 백엔드 연동을 위한 헤더 · 푸터 내비게이션 데이터 구조 설계',
          '일반 · 딜러용 더미 데이터를 정의해 백엔드에 전달',
        ],
      },
      {
        title: '모델 페이지',
        items: [
          '전 차종 7개 라인업(LS · LX · NX · RX · UX · LM · ES) 모델 페이지 구축',
          '상세 · 액세서리 · 안전사양 팝업 개발, 액세서리 영역 전 모델 공통 컴포넌트화',
          '인디케이터 바 드래그, 앵커 라우팅 · 딥링크, 관심차량 등록 토스트 알림 구현',
          '모델 이미지 WebP 전환 및 공통 이미지 통합으로 리소스 정리',
        ],
      },
    ],
  },
  kia_worldwide: {
    period: '2025.05 - 2026.04',
    type: 'Renewal',
    role: 'Frontend PL (Contents)',
    summary: '기아 글로벌 브랜드 사이트 리뉴얼 프로젝트로, <br class="br-pc" />콘텐츠 페이지 프론트엔드 PL을 맡았습니다.',
    theme: { bg: '#0b0d0e', color: '#fff' },
    sections: [
      {
        title: 'PL',
        items: [
          '콘텐츠 페이지 프론트엔드 작업 일정 수립 · 관리 및 작업 분배',
          '백로그와 QA 회차별 이슈를 관리하고 대응',
        ],
      },
      {
        title: '콘텐츠 페이지',
        items: [
          'Vision, PBV, EV4 · EV5, Seltos, Smart City, Software, Who we are, Social Impact, FIFA 등 콘텐츠 페이지 구축',
          'Three.js · GSAP 기반 마스크 · 히어로 모션 등 페이지별 인터랙션 구현',
          'Milan Design Week 2024 전시 페이지 구축 및 2026 업데이트, 카드 · 슬라이드 · 등장 모션 구현',
        ],
      },
      {
        title: '공통 영역',
        items: ['공통 모달, 헤더 표시 제어, 404 페이지 개발', '2560px 대형 해상도 대응 및 WebP 이미지 전환'],
      },
    ],
  },
  kaos: {
    period: '2025.05 - 2025.07',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: '기초과학 대중화를 이끄는 카오스재단의 <br class="br-pc" />공식 웹사이트를 새로 구축했습니다.',
    theme: { bg: '#fcf2f2', color: '#000' },
    sections: [
      {
        title: '페이지 구축',
        items: [
          '메인, People, 강연, 소식, 활동 페이지 구축',
          'GSAP 이미지 시퀀스와 Framer Motion을 활용한 섹션별 인터랙션 적용',
        ],
      },
      {
        title: '데이터 연동',
        items: ['강연 · People · 소식 페이지 백엔드 API 연동', 'Sanity를 활용한 헤더 · 메인 데이터 바인딩'],
      },
      {
        title: '공통 컴포넌트',
        items: ['PC · 모바일 헤더 · 푸터 개발', '버튼, 모달, People 팝업 컴포넌트 개발 및 조건부 렌더링 처리'],
      },
    ],
  },
  gradiant: {
    period: '2024.11 - 2025.07',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: '그래디언트 공식 웹사이트 리뉴얼 프로젝트로, <br class="br-pc" />메인 인터랙션과 주요 서브 페이지를 맡았습니다.',
    theme: { bg: '#e6e6ea', color: '#000' },
    sections: [
      {
        title: '메인 인터랙션',
        items: [
          'KV 이미지 시퀀스 · 비디오 연출',
          'Business 섹션 스크롤 모션(PC · 모바일 분리), 숫자 카운트, 섹션 그라데이션 구현',
        ],
      },
      {
        title: '서브 페이지',
        items: [
          'About Us(Overview, Vision, Mission, History), Careers, Ethics, IR, 제보하기 페이지 구축',
          'Careers KV 시퀀스, 직무소개 슬라이드, 루프 모션 구현',
        ],
      },
      {
        title: '공통 UI · 개선',
        items: [
          'GNB · 푸터(모바일 드롭다운 메뉴), 모달, 셀렉트박스, Top 버튼 개발',
          '이미지 시퀀스 깜빡임, 태블릿 overflow 등 렌더링 · 레이아웃 이슈 개선',
          'Sanity를 활용한 데이터 바인딩',
        ],
      },
    ],
  },
  imarketkorea: {
    period: '2024.07 - 2025.05',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: '아이마켓코리아 공식 웹사이트 리뉴얼 프로젝트로, <br class="br-pc" />주요 페이지와 공통 UI를 맡았습니다.',
    theme: { bg: '#003595', color: '#fff' },
    sections: [
      {
        title: '페이지 구축',
        items: [
          '메인(히스토리 섹션, 스크롤 모션), 회사소개, 거버넌스, ESG, 사업영역 페이지 구축',
          '인재채용(채용절차 · 직무소개 · 채용공고), 고객지원, 보도자료, IR 자료실 페이지 구축',
        ],
      },
      {
        title: '공통 UI',
        items: ['역스크롤 헤더, 모바일 GNB 개발', '쿼리스트링으로 연결되는 공통 탭, 버튼 · 테이블 컴포넌트 개발'],
      },
      {
        title: '데이터 · 품질',
        items: [
          'Sanity를 활용한 데이터 바인딩, 영문 레이아웃 · GNB 대응',
          'Safari 테이블 · 버튼 버그, 태블릿 레이아웃 이슈 해결',
        ],
      },
    ],
  },
  blissoo: {
    period: '2024.01 - 2024.03',
    type: 'New Build',
    role: 'Frontend Developer',
    summary: '블리수 공식 웹사이트를 새로 구축했고, <br class="br-pc" />프론트엔드 개발을 주도했습니다.',
    theme: { bg: '#99bdd3', color: '#393939' },
    sections: [
      {
        title: '페이지 구축',
        items: ['메인, Filmography, News, Notice 및 상세 페이지 PC · 모바일 구축', '영문 페이지 구축'],
      },
      {
        title: '인터랙션',
        items: ['섹션 스크롤 스냅(키보드 조작 지원), 내비게이션 모션 구현', 'sticky 텍스트 · 뉴스 섹션, hover 효과 구현'],
      },
      {
        title: '데이터 · SEO',
        items: [
          'JSON 기반 뉴스 · 공지 데이터 바인딩 및 더보기 구현',
          '상세 페이지 메타 정보와 폴더 구조 정리로 검색 노출 대응',
          'PC · 모바일 SCSS 분리로 유지보수성 개선',
        ],
      },
    ],
  },
  cj: {
    period: '2023.07 - 2024.01 / 2025.04 - 2025.09',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: 'CJ그룹 공식 웹사이트 리뉴얼(WEB AWARD KOREA 2024 UI/UX 혁신대상)과 <br class="br-pc" />해외법인 사이트 구축에 참여했습니다.',
    theme: { bg: '#fff', color: '#000' },
    sections: [
      {
        title: '2023 CJ그룹 리뉴얼',
        items: [
          '나눔재단 · 문화재단 · 윤리경영 · ESG · 회사소개 · 글로벌 CJ 페이지 구축',
          '키비주얼에 Canvas 이미지 시퀀스와 Lottie 배경 애니메이션 적용',
          '고객센터(문의 폼), IR 자료실, 공지사항 등 푸터 페이지 구축',
        ],
      },
      {
        title: '웹 접근성',
        items: ['alt · title · 탭 인덱스 개선', '고객센터 문의 폼 접근성 스크립트 개선'],
      },
      {
        title: '2025 해외법인 사이트',
        items: [
          '하나의 코드로 지역별(한국 · 미국 · 일본) 빌드하는 구조에서 CJ America · CJ Japan 사이트 구축',
          '회사 소개, 뉴스, CSR, Our Impact 페이지 구축',
          'In the Media API 연동, 채용공고 페이지네이션 · 필터 백엔드 연동',
        ],
      },
    ],
  },
  tmap: {
    period: '2023.04 - 2023.06',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: '티맵모빌리티 공식 웹사이트 리뉴얼 프로젝트로, <br class="br-pc" />공통 컴포넌트 설계와 주요 페이지를 맡았습니다.',
    theme: { bg: '#000', color: '#fff' },
    sections: [
      {
        title: '공통 컴포넌트',
        items: [
          '헤더 · GNB, 버튼, KV, 배너, 아티클, 카테고리, 페이지네이션 등 공통 컴포넌트 개발',
          'Storybook으로 컴포넌트 문서화, 컴포넌트 폴더 구조 · 인터페이스 타입 · 컬러 변수 설계',
        ],
      },
      {
        title: '페이지 구축',
        items: [
          '메인, 티맵 피플, 티맵 이야기, 고객지원 · 제휴문의, 회사소개 페이지 구축',
          '내비 · 운전점수 · 주차 · UAM · 대중교통 등 서비스 소개 페이지 15종 이상 구축',
        ],
      },
      {
        title: '인터랙션',
        items: ['고정 KV, Feature 목업 롤링, 헤더 스크롤 · 마스크 모션 구현', '회사소개 인트로 스크롤 모션 구현'],
      },
    ],
  },
  devsisters: {
    period: '2022.11 - 2023.03',
    type: 'Renewal',
    role: 'Frontend Developer',
    summary: '데브시스터즈 공식 웹사이트 리뉴얼 프로젝트로, <br class="br-pc" />게임 · 스튜디오 소개 페이지를 맡았습니다.',
    theme: { bg: '#232222', color: '#fff' },
    sections: [
      {
        title: '페이지 구축',
        items: [
          'Games(쿠키런: 킹덤 등), Studios, Support, Investors, Contact 페이지 PC · 모바일 구축',
          '스튜디오 상세(Trailer, We Create, Who we are) 페이지 구축',
        ],
      },
      {
        title: '공통 컴포넌트',
        items: ['공통 타이틀, Hero, 슬라이더, Related Stories(hover 인터랙션) 개발', '국 · 영문 QA 및 모바일 대응'],
      },
    ],
  },
  toyota: {
    period: '2023.03 - 2026.09',
    type: 'Renewal + Maintenance',
    role: 'Frontend Developer',
    summary: '토요타코리아 공식 웹사이트를 2023년 리뉴얼로 구축하고, <br class="br-pc" />이후 3년간 운영했습니다.',
    theme: { bg: '#fff', color: '#222' },
    sections: [
      {
        title: '2023 리뉴얼',
        items: ['멤버십(YO TOYOTA, 마일리지, 오너스 매뉴얼), 구매혜택, 오토케어리스, T-TEP, Contact Us 페이지 구축'],
      },
      {
        title: 'SEO 개선',
        items: [
          'JSON 데이터를 SEO용 HTML로 변환하는 Handlebars 헬퍼 적용',
          '메인 · 모델 페이지 데이터 재가공 스크립트 개발 및 리팩토링, 사이트맵 정리',
        ],
      },
      {
        title: '2026 부분 리뉴얼',
        items: [
          '로그인 UI와 마이페이지 API 연동 개편',
          'Toyota Connect 공통 컴포넌트 · 페이지 구축',
          'RAV4 런칭(사전알림 폼, 메인, 모델, 금융옵션) 페이지 개발',
        ],
      },
      {
        title: '운영',
        items: [
          '가주레이싱 · 모터스포츠 · GR86 콘텐츠(가로 스크롤 연혁, 슬라이드, 인트로 모션) 개발',
          '토요타 케어 프로그램, 시즌 이벤트, 신차 · 트림 · 가격 · 스펙 업데이트',
        ],
      },
    ],
  },
  'design-samsung': {
    period: '2022.11 - 2026.04',
    type: 'Maintenance + Renewal',
    role: 'Frontend Developer',
    summary: '삼성전자 디자인 사이트를 3년 6개월간 운영했고, <br class="br-pc" />2025년에는 메인 리뉴얼을 했습니다.',
    theme: { bg: '#fff', color: '#000' },
    sections: [
      {
        title: '콘텐츠 운영',
        items: [
          'Galaxy S25, Galaxy Book3, Family Hub+, Music Frame 등 제품 디자인 스토리 콘텐츠 국 · 영문 퍼블리싱',
          '콘텐츠별 키비주얼 모션, 롤링, 영상 연출 적용',
          '해외 디자인 연구소 · 디자인 멤버십 페이지 연간 업데이트',
        ],
      },
      {
        title: '2025 리뉴얼',
        items: [
          '메인 페이지 리뉴얼(KV 슬라이드, 리스트 모션)',
          'About Us · Explore 페이지 신규 구축',
          '헤더 검색(추천 검색어, 검색 결과 연동) 개발, 기존 콘텐츠와 새 헤더 · 푸터 호환 처리',
        ],
      },
      {
        title: '접근성 · 품질',
        items: ['스크린리더 설명과 alt 보강', 'Safari · 브라우저 줌 이슈 대응, GA 데이터셋 추가'],
      },
    ],
  },
};
