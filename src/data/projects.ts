import naverLogo from '../assets/images/naver-logo.png';
import cityhallLogo from '../assets/images/cityhall-logo1.png';
import danoLogo from '../assets/images/dano-logo.png';
import aesopLogo from '../assets/images/Aesop-Logo.png';
import dalkommLogo from '../assets/images/dalkomm-logo.svg';
import baeminLogo from '../assets/images/baemin-logo.svg';
import webtoonLogo from '../assets/images/webtoon-logo.png';
import samsungDesignLogo from '../assets/images/samsung-design.png';
import devsistersLogo from '../assets/images/orange_devsisters-logo.png';
import toyotaLogo from '../assets/images/toyota-logo.png';
import tmapLogo from '../assets/images/tmap-logo.png';
import cjLogo from '../assets/images/cj-group-logo.png';
import blissooLogo from '../assets/images/blissoo_logo.png';
import imkLogo from '../assets/images/imk-logo.png';

export interface ProjectLink {
  type: 'page' | 'review';
  label: string;
  href: string;
}

export interface Project {
  title: string;
  /** 줄바꿈이 필요한 경우 배열로 나눠서 작성 */
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
    title: 'Naver',
    desc: '네이버 공식 사이트를 클론코딩하여 만든 적응형 PC버전 웹사이트 입니다.',
    thumb: { src: naverLogo, alt: '네이버 로고', href: 'https://ohr0226.github.io/naver/' },
    links: [page('https://ohr0226.github.io/naver/'), review('https://velog.io/@ohl1234/naver/')],
    shadow: true,
  },
  {
    title: 'Seoul City Hall',
    desc: '웹 접근성을 준수하여 모든 컨텐츠를 탭으로 이동할 수 있도록 구현한 서울시청 적응형 PC버전 웹사이트 입니다.',
    thumb: { src: cityhallLogo, alt: '서울시청 로고', href: 'https://ohr0226.github.io/Seoul_CityHall/' },
    links: [
      page('https://ohr0226.github.io/Seoul_CityHall/'),
      review('https://velog.io/@ohl1234/%EC%84%9C%EC%9A%B8%EC%8B%9C%EC%B2%AD-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9'),
    ],
    skills: ['SCSS', 'J-QUERY', 'Swiper'],
    shadow: true,
  },
  {
    title: 'DANO SHOP',
    desc: '동일한 Class명을 사용하여 공통 디자인을 적용하고,비동기 데이터 통신을 활용하여 클론코딩한 다노샵 적응형 Mobile버전 웹사이트 입니다.',
    thumb: { src: danoLogo, alt: '다노샵 logo', href: 'https://ohr0226.github.io/danoshop/' },
    links: [
      page('https://ohr0226.github.io/danoshop/'),
      review('https://velog.io/@ohl1234/%EB%8B%A4%EB%85%B8%EC%83%B5-Clone-coding'),
    ],
    skills: ['SCSS', 'J-QUERY', 'Java-Script', 'JSON', 'Swiper'],
    shadow: true,
  },
  {
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
    title: 'Naver Webtoon',
    desc: '웹 접근성을 준수하고 비동기 데이터 통신을 활용하여 클론코딩한 네이버 웹툰 적응형 Mobile버전 웹사이트 입니다.',
    thumb: { src: webtoonLogo, alt: '네이버 웹툰 로고', href: 'https://ohr0226.github.io/naverwebtoon/' },
    links: [
      page('https://ohr0226.github.io/naverwebtoon/'),
      review('https://velog.io/@ohl1234/%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%A0%81%EC%9D%91%ED%98%95-%EB%84%A4%EC%9D%B4%EB%B2%84%EC%9B%B9%ED%88%B0-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9'),
    ],
    skills: ['SCSS', 'J-QUERY', 'Java-Script', 'Swiper'],
  },
  {
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
    title: 'Devsisters',
    desc: '웹사이트 리뉴얼 및 서브페이지 작업',
    thumb: { src: devsistersLogo, alt: '데브시스터즈 로고', href: 'https://www.devsisters.com/' },
    links: [page('https://www.devsisters.com/')],
    skills: ['SCSS', 'React', 'Next.js'],
  },
  {
    title: 'Toyota',
    desc: ['웹사이트 리뉴얼 및 페이지 운영', ' data seo 변환 기능 추가'],
    thumb: { src: toyotaLogo, alt: '토요타 로고', href: 'https://www.toyota.co.kr/' },
    links: [page('https://www.toyota.co.kr/')],
    skills: ['SCSS', 'React', 'Vite'],
  },
  {
    title: 'Tmap Mobility',
    desc: ['웹사이트 리뉴얼 및 페이지 컴포넌트화 작업', ' 인터렉션 적용'],
    thumb: { src: tmapLogo, alt: '티맵모빌리티 로고', href: 'https://www.tmapmobility.com/' },
    links: [page('https://www.tmapmobility.com/')],
    skills: ['SCSS', 'React', 'Next.js'],
  },
  {
    title: 'CJ Group',
    desc: ['웹사이트 리뉴얼, 웹접근성 준수, 인터렉션 적용', 'WEB AWARD KOREA 2024 UI/UX 혁신대상 수상'],
    thumb: { src: cjLogo, alt: 'cj 로고', href: 'https://www.cj.net/' },
    links: [page('https://www.cj.net/')],
    skills: ['SCSS', 'ejs', 'canvas', 'GSAP'],
  },
  {
    title: 'BLISSOO',
    desc: '웹사이트 신규 제작 및 인터렉션 적용',
    thumb: { src: blissooLogo, alt: '블리수 로고', href: 'https://blissoo.co.kr/' },
    links: [page('https://blissoo.co.kr/')],
    skills: ['SCSS', 'Handler.js'],
  },
  {
    title: 'IMarketKorea',
    desc: ['웹사이트 리뉴얼 및 인터렉션 적용', ' Sanity를 활용한 데이터 바인딩'],
    thumb: { src: imkLogo, alt: '아이마켓코리아 로고', href: 'https://www.imarketkorea.com/' },
    links: [page('https://www.imarketkorea.com/')],
    skills: ['SCSS', 'React', 'Next.js', 'Lottie json', 'Sanity'],
  },
];
