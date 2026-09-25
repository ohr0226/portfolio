import aesopLogo from '../assets/images/Aesop-Logo.png';
import dalkommLogo from '../assets/images/dalkomm-logo.svg';
import baeminLogo from '../assets/images/baemin-logo.svg';
import samsungDesignLogo from '../assets/images/samsung-design.png';
import devsistersLogo from '../assets/images/orange_devsisters-logo.png';
import toyotaLogo from '../assets/images/toyota-logo.png';
import tmapLogo from '../assets/images/tmap-logo.png';
import cjLogo from '../assets/images/cj-group-logo.png';
import blissooLogo from '../assets/images/blissoo_logo.png';
import imkLogo from '../assets/images/imk-logo.png';
import gradiantLogo from '../assets/images/gradiant_logo.png'
import kiaLogo from '../assets/images/kia-logo.png';

export interface ProjectLink {
  type: 'page' | 'review';
  label: string;
  href: string;
}

export type ProjectCategory = 'renewal' | 'maintenance' | 'personal';

export const projectTabs: { id: ProjectCategory; label: string }[] = [
  { id: 'renewal', label: 'RENEWAL' },
  { id: 'maintenance', label: 'MAINTENANCE' },
  { id: 'personal', label: 'PERSONAL' },
];

export interface Project {
  /** 스타일 클래스(.wrap-{id})에 사용되는 고유 id */
  id: string;
  /** RENEWAL(구축) / MAINTENANCE(운영) / PERSONAL(개인) 탭 분류 */
  category: ProjectCategory;
  title: string;
  /** HTML 태그 사용 가능(<br/> 등). 배열로 나눠도 줄바꿈됨 */
  desc: string | string[];
  thumb: { src: string; alt: string; href: string };
  links: ProjectLink[];
  skills?: string[];
  /** 스크롤 시 어두워지는 dim 레이어 사용 여부 */
  shadow?: boolean;
}

const page = (href: string, label = 'Go Site'): ProjectLink => ({ type: 'page', label, href });
const review = (href: string): ProjectLink => ({ type: 'review', label: 'Code Review', href });

export const projects: Project[] = [
  {
    id: 'aesop',
    category: 'personal',
    title: 'Aesop',
    desc: 'Aesop 공식사이트와 GDWEB,Awwwards 등 레퍼런스 사이트를 참고하여 만든 Aesop 브랜딩 페이지 반응형 웹사이트 입니다.',
    thumb: { src: aesopLogo, alt: 'aesop logo', href: 'https://ohr0226.github.io/Aesop/' },
    links: [
      page('https://ohr0226.github.io/Aesop/'),
      review('https://velog.io/@ohl1234/Aesop-%EB%B0%98%EC%9D%91%ED%98%95-%EB%A6%AC%EB%89%B4%EC%96%BC-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%BD%94%EB%94%A9'),
    ],
    skills: ['SCSS', 'Grid', 'J-QUERY', 'Java-Script', 'GSAP', 'Swiper'],
    shadow: true,
  },
  {
    id: 'dalkomm',
    category: 'personal',
    title: 'Dal.Komm',
    desc: '달콤커피 공식사이트와 GDWEB,Awwwards 등 레퍼런스 사이트를 참고하여 만든 적응형 PC 웹사이트 입니다.',
    thumb: { src: dalkommLogo, alt: '달콤카페 로고', href: 'https://ohr0226.github.io/dalkomm/' },
    links: [
      page('https://ohr0226.github.io/dalkomm/'),
      review('https://velog.io/@ohl1234/DalKomm-coffee-%EC%A0%81%EC%9D%91%ED%98%95PC-%EB%A6%AC%EB%89%B4%EC%96%BC-%EC%BD%94%EB%94%A9'),
    ],
    skills: ['SCSS', 'J-QUERY', 'Java-Script', 'GSAP', 'Swiper'],
    shadow: true,
  },
  {
    id: 'baemin',
    category: 'personal',
    title: 'BAEMIN',
    desc: '배달의 민족 랜딩페이지 사이트와 GDWEB,Awwwards 등 레퍼런스 사이트를 참고하여 만든 반응형 웹사이트 입니다.',
    thumb: { src: baeminLogo, alt: '배달의 민족 로고', href: 'https://ohr0226.github.io/baemin/' },
    links: [
      page('https://ohr0226.github.io/baemin/'),
      review('https://velog.io/@ohl1234/%EB%B0%B0%EB%8B%AC%EC%9D%98-%EB%AF%BC%EC%A1%B1-%EB%B0%98%EC%9D%91%ED%98%95-%EB%A6%AC%EB%89%B4%EC%96%BC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%BD%94%EB%94%A9'),
    ],
    skills: ['SCSS', 'J-QUERY', 'Java-Script', 'GSAP'],
    shadow: true,
  },
  {
    id: 'design-samsung',
    category: 'maintenance',
    title: 'Design Samsung',
    desc: '운영 및 신규 컨텐츠 페이지 퍼블리싱 작업',
    thumb: { src: samsungDesignLogo, alt: '디자인 삼성 로고', href: 'https://design.samsung.com/kr/' },
    links: [
      page('https://design.samsung.com/kr/', 'Go Site Main Page'),
      page('https://design.samsung.com/kr/contents/', 'Go Site Contents Page'),
    ],
    skills: ['SCSS', 'J-QUERY', 'Java-Script', 'Swiper'],
  },
  {
    id: 'devsisters',
    category: 'renewal',
    title: 'Devsisters',
    desc: '웹사이트 리뉴얼 및 서브페이지 작업',
    thumb: { src: devsistersLogo, alt: '데브시스터즈 로고', href: 'https://www.devsisters.com/' },
    links: [page('https://www.devsisters.com/')],
    skills: ['SCSS', 'React', 'Next.js'],
  },
  {
    id: 'toyota',
    category: 'maintenance',
    title: 'Toyota',
    desc: ['웹사이트 리뉴얼 및 페이지 운영', ' data seo 변환 기능 추가'],
    thumb: { src: toyotaLogo, alt: '토요타 로고', href: 'https://www.toyota.co.kr/' },
    links: [page('https://www.toyota.co.kr/')],
    skills: ['SCSS', 'React', 'Vite'],
  },
  {
    id: 'tmap',
    category: 'renewal',
    title: 'Tmap Mobility',
    desc: ['웹사이트 리뉴얼 및 페이지 컴포넌트화 작업', ' 인터렉션 적용'],
    thumb: { src: tmapLogo, alt: '티맵모빌리티 로고', href: 'https://www.tmapmobility.com/' },
    links: [page('https://www.tmapmobility.com/')],
    skills: ['SCSS', 'React', 'Next.js'],
  },
  {
    id: 'cj',
    category: 'renewal',
    title: 'CJ Group',
    desc: ['웹사이트 리뉴얼, 웹접근성 준수, 인터렉션 적용', 'WEB AWARD KOREA 2024 <br/>UI/UX 혁신대상 수상'],
    thumb: { src: cjLogo, alt: 'cj 로고', href: 'https://www.cj.net/' },
    links: [page('https://www.cj.net/')],
    skills: ['SCSS', 'ejs', 'canvas', 'GSAP'],
  },
  {
    id: 'blissoo',
    category: 'renewal',
    title: 'BLISSOO',
    desc: '웹사이트 신규 제작 및 인터렉션 적용',
    thumb: { src: blissooLogo, alt: '블리수 로고', href: 'https://blissoo.co.kr/' },
    links: [page('https://blissoo.co.kr/')],
    skills: ['SCSS', 'Handler.js'],
  },
  {
    id: 'imarketkorea',
    category: 'renewal',
    title: 'IMarketKorea',
    desc: ['웹사이트 리뉴얼 및 인터렉션 적용', ' Sanity를 활용한 데이터 바인딩'],
    thumb: { src: imkLogo, alt: '아이마켓코리아 로고', href: 'https://www.imarketkorea.com/' },
    links: [page('https://www.imarketkorea.com/')],
    skills: ['SCSS', 'React', 'Next.js', 'Lottie json', 'Sanity'],
  },
  {
    id: 'gradiant',
    category: 'renewal',
    title: 'gradiant',
    desc: ['웹사이트 리뉴얼 및 Three.js 활용한 인터렉션 적용', ' Sanity를 활용한 데이터 바인딩'],
    thumb: { src: gradiantLogo, alt: '그래디언트 로고', href: 'https://www.gradiant.co.kr/' },
    links: [page('https://www.gradiant.co.kr/')],
    skills: ['Three.js','SCSS', 'React', 'Next.js', 'Lottie json', 'Sanity'],
  },
  {
    id: 'kia_worldwide',
    category: 'renewal',
    title: 'KIA WorldWide',
    desc: ['웹사이트 리뉴얼 및 Three.js, GSAP를 <br/>활용한 인터렉션 적용', '콘텐츠 페이지 프론트엔드 PL <br/>작업 일정 수립 및 관리'],
    thumb: { src: kiaLogo, alt: '기아 로고', href: 'https://worldwide.kia.com/ko' },
    links: [page('https://worldwide.kia.com/ko')],
    skills: ['Three.js','SCSS', 'React', 'vite'],
  },
];
