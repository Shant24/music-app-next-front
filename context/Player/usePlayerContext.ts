import { useContext } from 'react';
import PlayerContext from './PlayerContext';

const usePlayerContext = () => {
  const playerContext = useContext(PlayerContext);

  return playerContext;
};

export default usePlayerContext;
