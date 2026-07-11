import profileJson from "@content/profile.json";

export type Profile = {
  name: string;
  greeting: string;
  title: string;
  location: string;
  blurb: string;
  wisdom: string;
  photoSrc: string;
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = profileJson;
