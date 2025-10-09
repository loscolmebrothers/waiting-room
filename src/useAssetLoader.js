import { useState, useEffect, useCallback } from "react";
import useImage from "use-image";

const ASSETS_BASE_URL = "https://assets.loscolmebrothers.com";

function useAssetLoader() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [texturesReady, setTexturesReady] = useState(false);

  const [losImage, losStatus] = useImage(
    `${ASSETS_BASE_URL}/logo/slices/vector/LOS.svg`,
  );
  const [colmeImage, colmeStatus] = useImage(
    `${ASSETS_BASE_URL}/logo/slices/vector/COLME.svg`,
  );
  const [brothersImage, brothersStatus] = useImage(
    `${ASSETS_BASE_URL}/logo/slices/vector/BROTHERS.svg`,
  );
  const [paperTexture, paperStatus] = useImage(
    `${ASSETS_BASE_URL}/textures/paper.jpg`,
  );
  const [cartulinaTexture, cartulinaStatus] = useImage(
    `${ASSETS_BASE_URL}/textures/cartulina.jpg`,
  );
  const [daguerreotypeTexture, daguerreotypeStatus] = useImage(
    `${ASSETS_BASE_URL}/textures/daguerreotype.jpg`,
  );

  useEffect(() => {
    trackFontLoading();
  }, []);

  function trackFontLoading() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }

  const imageStatuses = [
    losStatus,
    colmeStatus,
    brothersStatus,
    paperStatus,
    cartulinaStatus,
    daguerreotypeStatus,
  ];

  const loadedImages = imageStatuses.filter(
    (status) => status === "loaded",
  ).length;

  const totalAssets = 7;
  const loadedAssets = loadedImages + (fontsLoaded ? 1 : 0);
  const progress = Math.round((loadedAssets / totalAssets) * 100);

  const allAssetsLoaded = loadedAssets >= totalAssets;

  const preRenderTexturesToGPU = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const textures = [
        paperTexture,
        cartulinaTexture,
        daguerreotypeTexture,
      ].filter(Boolean);

      textures.forEach((texture) => {
        ctx.drawImage(texture, 0, 0, 100, 100);
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTexturesReady(true);
        });
      });
    } else {
      setTexturesReady(true);
    }
  }, [paperTexture, cartulinaTexture, daguerreotypeTexture]);

  useEffect(() => {
    if (allAssetsLoaded && !texturesReady) {
      preRenderTexturesToGPU();
    }
  }, [allAssetsLoaded, texturesReady, preRenderTexturesToGPU]);

  const isLoading = !allAssetsLoaded || !texturesReady;

  return {
    isLoading,
    progress,
    assets: {
      images: {
        losImage,
        colmeImage,
        brothersImage,
        paperTexture,
        cartulinaTexture,
        daguerreotypeTexture,
      },
      fontsLoaded,
    },
  };
}

export default useAssetLoader;
