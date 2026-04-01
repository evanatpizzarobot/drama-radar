export interface Author {
  key: string;
  displayName: string;
  bio: string;
  avatar: string;
  role: string;
  signoff?: string;
  isDefault?: boolean;
  isGuest?: boolean;
}

export const AUTHORS: Record<string, Author> = {
  "the-drama-desk": {
    key: "the-drama-desk",
    displayName: "The Drama Desk",
    bio: "DramaRadar's editorial team. We see everything. We judge accordingly.",
    avatar: "/images/avatars/drama-desk.svg",
    role: "Editorial Team",
    isDefault: true,
  },
  "carlys-intern": {
    key: "carlys-intern",
    displayName: "Carly's Intern",
    bio: "Underpaid, overworked, and deeply invested in who's hooking up on Below Deck. Reporting live from the group chat.",
    avatar: "/images/avatars/carlys-intern.svg",
    role: "Junior Correspondent",
    signoff: "Back to scrolling.",
  },
  "bb": {
    key: "bb",
    displayName: "BB",
    bio: "The friend who texts you screenshots at 2am with 'LOOK AT THIS.' Has opinions. Will share them. Loudly.",
    avatar: "/images/avatars/bb.svg",
    role: "Senior Drama Analyst",
    signoff: "You're welcome.",
  },
  "bbs-assistant": {
    key: "bbs-assistant",
    displayName: "BB's Assistant",
    bio: "Technically here to help BB, but honestly doing all the work. The quiet one who notices everything.",
    avatar: "/images/avatars/bbs-assistant.svg",
    role: "Research & Receipts",
    signoff: "Receipts attached.",
  },
  "the-producer": {
    key: "the-producer",
    displayName: "The Producer",
    bio: "Sees the bigger picture. Knows the edit. Understands why they showed that confessional AFTER the dinner party.",
    avatar: "/images/avatars/the-producer.svg",
    role: "Industry Analyst",
    signoff: "Cut to confessional.",
  },
  "guest": {
    key: "guest",
    displayName: "Guest Contributor",
    bio: "A friend of the pod. A friend of the site. Probably someone you follow.",
    avatar: "/images/avatars/guest.svg",
    role: "Guest Writer",
    isGuest: true,
  },
};

export function getAuthor(key: string): Author {
  return AUTHORS[key] || AUTHORS["the-drama-desk"];
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}
