/**
 * @param {function} callback - the callback to fire when the timeout ends
 * @param {number} milliseconds - the number of ms before the timeout will execute
 * @description When a user's computer goes to sleep, a normal setTimeout will pause which can cause
 * the timeout to execute later after the computer wakes up. 'setStrictTimeout' will execute the callback
 * immediately if the computer wakes and the 'milliseconds' have passed
 */
export const setStrictTimeout = (callback: () => void, milliseconds: number) => {
  const executeTimeoutAtDate = Date.now() + milliseconds;
  const interval = setInterval(() => {
    if (Date.now() >= executeTimeoutAtDate) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
  return interval;
};
