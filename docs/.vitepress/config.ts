import { defineConfig } from 'vitepress'

const ccsoLogo = 'https://i.imgur.com/Qokusqs.png'

export default defineConfig({
  title: "CCSO - SOP",
  description: "Caledonia County Sheriff's Office",
  themeConfig: {
    logo: {
      src: ccsoLogo,
      alt: 'CCSO logo'
    },
    siteTitle: "CCSO",
    topbar: {
      logo: ccsoLogo,
      logoAlt: 'CCSO logo',
      title: 'CCSO SOP',
      shortTitle: 'CCSO'
    },
    sop: {
      effectiveDate: 'To be assigned',
      lastRevised: 'May 19, 2026',
      signedBy: [
        {
          iconUrl: 'https://cdn.discordapp.com/avatars/210768103594917888/ed7a7bbf2552f482a3a9bf8c21731699.webp?size=1024',
          username: '1B-03 | Mr. Blouse',
          rank: 'Assistant Undersheriff'
        },
        {
          iconUrl: 'https://cdn.discordapp.com/avatars/1298894263505125431/a_8c8f89c3bc77d0dc73373a89ce4fe682.webp?size=1280&animated=true',
          username: '1B-01 | Sheriff J. Hayes',
          rank: 'Sheriff'
        }
      ]
    },
    nav: [],
    sidebar: [],
    aside: false,
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    outline: {
      level: 'deep'
    }
  },
  appearance: 'dark'
})
