import profileJson from "@content/profile.json";

export type Profile = {
  name: string;
  title: string;
  location: string;
  blurb: string;
  photoSrc: string;
  email: string;
  github: string;
  linkedin: string;
};

export const profile: Profile = profileJson;
