const loading = document.querySelector(".loading");
const bg = document.querySelector(".bg");

const setUpBackgroundImage = async () => {
  const width = window.outerWidth;
  const height = window.outerHeight;

  const image = await fetch(
    `https://source.unsplash.com/random/${width}x${height}`
  );

  bg.style.background = `url(${image.url})`;
};

(async () => {
  loading.classList.remove("hide");
  await setUpBackgroundImage();
  loading.classList.add("hide");
})();
