const serviceWorkerInitialised = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js');
    } catch (err) {
      console.log(err);
    }
  }
};

export default serviceWorkerInitialised;
