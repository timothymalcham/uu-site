type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
};

const presentation: Presentation = {
    mail: "email@unusualundertaking.com",
    title: "unusual\nundertaking",
    description:
        "A studio specializing in art, game dev, and building digital products.",
    socials: [
        {
            label: "Twitter",
            link: "https://twitter.com/uu_studio",
        },
        {
            label: "Discord",
            link: "https://discord.gg/ztctP6EwDf",
        },
        {
            label: "Instagram",
            link: "https://www.instagram.com/unusual_undertaking/",
        },
    ],
};

export default presentation;
