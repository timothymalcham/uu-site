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
    title: "unusual undertaking",
    description:
        "A 1-man studio specializing in art, game dev, and building digital products.",
    socials: [
        {
            label: "Twitter",
            link: "https://twitter.com/uu_studio",
        },
    ],
};

export default presentation;
