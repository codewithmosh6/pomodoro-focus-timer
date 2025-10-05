import { useRef } from "react";

const useNotificationSound = () => {
  const audioRef = useRef(new Audio("/sounds/ding.mp3"));

  const play = () => {
    audioRef.current.play();
  };

  return play;
};

export default useNotificationSound;
