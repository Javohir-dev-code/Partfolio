export interface IProject {
  id: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  image_light?: string | null;
  detail_link: string | null;
  site_link: string | null;
  order_index: number;
  created_at: string;
}

export interface ISkill {
  id: string;
  name: string;
  file: string;
  ext: string;
  order_index: number;
  created_at: string;
}

export interface IExperience {
  id: string;
  date: string;
  title: string;
  company: string;
  logo?: string;
  order_index: number;
  created_at: string;
}

export interface IBlog {
  id: string;
  slug?: string;
  title: string;
  image: string | null;
  tag: string | null;
  read_time: string | null;
  content: string | null;
  date?: string;
  published_at?: string;
  created_at: string;
}

export interface IMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ICertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  credential_link: string | null;
  order_index: number;
  created_at: string;
}