export const generateRandomClassname = (
  tagname: string,
  classOverride?: string
) => {
  const randomNumber =
    Math.round(Math.random() * Math.pow(100, tagname.length)) +
    Math.round(Date.now());

  return classOverride || `${tagname}-${randomNumber.toString(36)}`;
};
