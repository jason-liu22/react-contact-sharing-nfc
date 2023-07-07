import { SingleField } from "../types";

const SOCIAL_LIST: SingleField[] = [
  {
    name: "facebook",
    label: "Facebook",
    value: "",
    logo: "facebook",
  },
  {
    name: "twitter",
    label: "Twitter",
    value: "",
    logo: "twitter",
  },
  {
    name: "instagram",
    label: "Instagram",
    value: "",
    logo: "instagram",
  },
  {
    name: "snapchat",
    label: "Snapchat",
    value: "",
    logo: "snapchat",
  },
  {
    name: "youtube",
    label: "Youtube",
    value: "",
    logo: "youtube",
  },
  {
    name: "whatsapp",
    label: "Whatsapp",
    value: "",
    logo: "whatsapp",
  },
  {
    name: "linkedin",
    label: "Linkedin",
    value: "",
    logo: "linkedin",
  },
  {
    name: "pinterest",
    label: "Pinterest",
    value: "",
    logo: "pinterest",
  },
  {
    name: "tiktok",
    label: "Tiktok",
    value: "",
    logo: "tiktok",
  },
];

const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  snapchat: "https://snapchat.com/add",
  whatsapp: "https://wa.me",
  linkedin: "https://www.linkedin.com/in",
  pinterest: "https://pinterest.com",
  tiktok: "https://tiktok.com",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDGRID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export { SOCIAL_LIST, SOCIAL_LINKS, firebaseConfig };
