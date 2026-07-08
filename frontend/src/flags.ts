export const FLAGS = {
  // Home page sections hidden for now. Flip to false to bring one back.
  OMIT_SECTIONS: {
    philosophy: true,
    approach: true,
    realStories: true,
    stats: true,
    // "Evidence, not opinion." journal/insights preview on the home page.
    journal: true,
  },
  // About page sections hidden for now. Flip to false to bring one back.
  OMIT_ABOUT_SECTIONS: {
    // "The People Who Walk Beside You." team grid.
    team: true,
    // "Every path is unique." / "Real people. Real change." pebbles overlay.
    pebbles: true,
    // "Your questions. Answered." FAQ.
    faq: true,
    // "Ready to find your path?" / "Begin Your Journey" closing CTA.
    closingCta: true,
  },
  // Nav links hidden while their destination pages are held back.
  OMIT_NAV_LINKS: {
    services: true,
    journal: true,
  },
} as const;
