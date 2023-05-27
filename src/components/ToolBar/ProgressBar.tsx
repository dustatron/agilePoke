import { Progress } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useTimeoutState from "../../hooks/useTimeoutState";

function ProgressBar() {
  const [progress, setProgress] = useState<number>(2);
  const timeout = useTimeoutState((state) => state.timeout);

  const handleUpdateProgress = () => {
    setProgress(progress + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateProgress();
    }, (timeout * 60000) / 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <Progress
      colorScheme="green"
      isAnimated
      size="sm"
      hasStripe
      value={progress}
    />
  );
}

export default ProgressBar;
