// Navigation model — single source of truth for top nav and mobile drawer.
// URLs annotated with "→" are still transitional; update annotation when migrated.
// DocLayout also uses this data for the group sub-nav (sub-page list).

export interface NavPage  { label: string; href: string; }
export interface NavGroup { id: string; label: string; href: string; pages: NavPage[]; }
export interface NavCta   { label: string; href: string; primary: boolean; }

export const groups: NavGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    href: '/foundations',
    pages: [
      { label: 'Overview',      href: '/foundations' },
      { label: 'Surfaces',      href: '/foundations/surfaces' },
      // Layout / Responsive / Accessibility land in T-49–T-51
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
      { label: 'Theming',     href: '/styles/theming' },
      // Icons lands in T-52
    ],
  },
  {
    id: 'components',
    label: 'Components',
    href: '/components',
    pages: [
      { label: 'Overview',     href: '/components' },
      { label: 'Badges',       href: '/components/badges' },       // → group pages (T-44)
      { label: 'Buttons',      href: '/components/buttons' },      // → group pages (T-44)
      { label: 'Cards',        href: '/components/cards' },        // → group pages (T-44)
      { label: 'Forms',        href: '/components/forms' },        // → group pages (T-44)
      { label: 'Breadcrumbs',  href: '/components/breadcrumbs' },  // → group pages (T-44)
      { label: 'Dividers',     href: '/components/dividers' },     // → group pages (T-44)
    ],
  },
];

export const ctas: NavCta[] = [
  { label: 'Demo',        href: '/demo',            primary: false },
  { label: 'Get Started', href: '/getting-started', primary: true  },
];
