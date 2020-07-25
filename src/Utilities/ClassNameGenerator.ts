export const generateRandomClassname = (tagname: string) => {
  const randomNumber =
    Math.round(Math.random() * Math.pow(100, tagname.length)) +
    Math.round(Date.now());

  return `${tagname}-${randomNumber.toString(36)}`;
};
