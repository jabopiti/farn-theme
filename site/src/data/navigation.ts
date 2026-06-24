// Navigation model — single source of truth for top nav and mobile drawer.
// URLs annotated with "→" are still transitional; update annotation when migrated.
// DocLayout also uses this data for the group sub-nav (sub-page list).

export interface NavPage  { label: string; href: string; }
export interface NavGroup { id: string; label: string; href: string; pages: NavPage[]; }
export interface NavLink  { label: string; href: string; }
export interface NavCta   { label: string; href: string; primary: boolean; }

export const groups: NavGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    href: '/foundations',
    pages: [
      { label: 'Overview',      href: '/foundations' },
      { label: 'Surfaces',      href: '/foundations/surfaces' },
      { label: 'Layout',        href: '/foundations/layout' },
      { label: 'Responsive',    href: '/foundations/responsive' },
      { label: 'Accessibility', href: '/foundations/accessibility' },
    ],
  },
  {
    id: 'styles',
    label: 'Styles',
    href: '/styles',
    pages: [
      { label: 'Overview',    href: '/styles' },
      { label: 'Color',       href: '/styles/color' },
      { label: 'Typography',  href: '/styles/typography' },
      { label: 'Spacing',     href: '/styles/spacing' },
      { label: 'Motion',      href: '/styles/motion' },
      { label: 'Icons',       href: '/styles/icons' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    href: '/components',
    pages: [
      { label: 'Overview',    href: '/components' },
      { label: 'Layout',      href: '/components/layout' },
      { label: 'Navigation',  href: '/components/navigation' },
      { label: 'Actions',     href: '/components/actions' },
      { label: 'Forms',       href: '/components/forms' },
      { label: 'Data',        href: '/components/data' },
      { label: 'Status',      href: '/components/status' },
    ],
  },
  {
    id: 'templates',
    label: 'Templates',
    href: '/templates',
    pages: [
      { label: 'Overview',      href: '/templates' },
      { label: 'Landing Page',  href: '/templates/landing-page' },
    ],
  },
];

export const links: NavLink[] = [];

export const ctas: NavCta[] = [
  { label: 'Get Started', href: '/getting-started', primary: true },
];
