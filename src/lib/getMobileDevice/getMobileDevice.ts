export const getMobileDevice = () => {
  const userAgent = navigator.userAgent;

  return (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
    /Mobile/i.test(userAgent)
  );
};
