const addZero = (time: number) => `0${time}`.slice(-2);

export const formatTime = (seconds: number): string => {
  const date = new Date(seconds * 1000);

  const hh = Math.floor(date.getUTCHours());
  const mm = Math.floor(date.getUTCMinutes());
  const ss = addZero(Math.floor(date.getUTCSeconds()));

  return hh !== 0 ? `${hh}:${addZero(mm)}:${ss}` : `${mm}:${ss}`;
};
