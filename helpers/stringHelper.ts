const brackets = ['(', ')', '{', '}', '[', ']', '<', '>', '/', '|', '-'];

export const removeBracketsFromString = (str: string) => {
  return str
    .split(' ')
    .map((word) =>
      word
        .split('')
        .filter((letter) => {
          return !brackets.includes(letter);
        })
        .join('')
    )
    .filter((word) => word !== '')
    .join(' ');
};

export const wordsForKeyWord = (str: string) => {
  return removeBracketsFromString(str).split(' ').join(', ');
};
