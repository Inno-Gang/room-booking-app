import {
  MaybeElementRef,
  useMouse,
  useMousePressed,
  watchPausable,
} from "@vueuse/core";

export default function useElementMove(el: MaybeElementRef) {
  const { x, y } = useMouse();
  const { pressed } = useMousePressed({ target: el });
  const startX = ref(0);
  const startY = ref(0);
  const totalDeltaX = ref(0);
  const totalDeltaY = ref(0);

  const { pause: pauseX, resume: resumeX } = watchPausable(x, (newX) => {
    if (pressed.value) {
      totalDeltaX.value += newX - startX.value;
      startX.value = newX;
    }
  });

  const { pause: pauseY, resume: resumeY } = watchPausable(y, (newY) => {
    if (pressed.value) {
      totalDeltaY.value += newY - startY.value;
      startY.value = newY;
    }
  });

  watch(pressed, (isPressed) => {
    if (isPressed) {
      startX.value = x.value;
      startY.value = y.value;
      resumeX();
      resumeY();
    } else {
      pauseX();
      pauseY();
    }
  });

  const reset = () => {
    totalDeltaX.value = 0;
    totalDeltaY.value = 0;
  };

  return {
    totalDeltaX,
    totalDeltaY,
    isMoving: pressed,
    reset,
  };
}
