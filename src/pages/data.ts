export interface Page {
  id: number
  title: string
  content: string
}

export interface PageDatabase {
  [id: number]: Page
}

export const pagesById: PageDatabase = {
  1: {
    content:
      `<h1>Homepage</h1>` +
      `This is the homepage, and everything starts with a <strong>home</strong>page.`,
    id: 1,
    title: "Homepage",
  },
  2: {
    content: `<h1>Links</h1>` + `Here's where we will give you <i>links</i> to other pages.`,
    id: 2,
    title: "Links",
  },
  3: {
    content:
      `<h1>Social media</h1>` +
      `This is where you'll find links to our social media thing. Find us on Insta!`,
    id: 3,
    title: "Social media",
  },
}
