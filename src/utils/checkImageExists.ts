// utils/checkImageExists.ts
export const checkImageExists = (url: string, timeoutMs = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url) return resolve(false);

    const img = new Image();
    let timer: number | undefined;

    const done = (result: boolean) => {
      if (timer) clearTimeout(timer);
      img.onload = img.onerror = null;
      resolve(result);
    };

    img.onload = () => done(true);
    img.onerror = () => done(false);
    timer = window.setTimeout(() => done(false), timeoutMs);

    img.src = url;
  });
};
