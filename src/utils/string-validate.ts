export const validateString = (input: string | undefined): boolean => {
  if(!input) return false;
  const minLength = 8;
  const hasWhitespace = /\s/.test(input);

  return input.length >= minLength && !hasWhitespace;
}