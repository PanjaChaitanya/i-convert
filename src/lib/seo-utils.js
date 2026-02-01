export const generateMeta = (from, to) => {
  return {
    title: `Convert ${from} to ${to} - Free Online Image Converter`,
    description: `Fastest online ${from} to ${to} converter. Convert image files instantly in your browser. No software installation needed.`,
    keywords: [
      `${from} to ${to}`,
      `convert ${from} to ${to}`,
      "image converter",
      "online image converter",
      "free converter"
    ]
  };
};

export const commonFaqs = [
  {
    question: "Is this image converter free?",
    answer: "Yes, our tool is 100% free and unlimited. You can convert as many images as you like."
  },
  {
    question: "Is it safe to convert images here?",
    answer: "Absolutely. All conversions happen locally in your browser (Client-Side). Your images are never uploaded to our servers, ensuring complete privacy."
  }
];