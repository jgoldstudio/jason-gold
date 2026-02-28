export type SubstackPost = {
  id: string;
  title: string;
  url: string;
  date: string;
  excerpt: string;
};

export type ArchiveItem = {
  slug: string;
  title: string;
  year: number;
  summary: string;
  tags: string[];
  featured?: boolean;
  href?: string;
  detail?: {
    intro: string;
    sections: Array<{
      heading: string;
      body: string;
    }>;
  };
};
