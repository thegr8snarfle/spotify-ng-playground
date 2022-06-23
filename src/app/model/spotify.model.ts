export interface Credentials {
  clientId: string;
  clientSecret: string;
}

export interface Error {
  error: string;
  error_description: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Account {
  display_name: string;
  external_urls: { [key: string]: string },
  followers: {
    href: string,
    total: number
  };
  href: string;
  id: string;
  images: Array<Image>;
  type: string;
  uri: string;
}
