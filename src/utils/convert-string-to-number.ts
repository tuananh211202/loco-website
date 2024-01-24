export const convertToNumber = (str: string | undefined) => {
  if(!str) return 0;
  const number = parseInt(str);
  
  if(isNaN(number)) return 0;

  return number;
}