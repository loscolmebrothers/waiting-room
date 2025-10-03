import useImage from "use-image";

function useLogoSlices() {
  const [LOS] = useImage(
    "https://assets.loscolmebrothers.com/logo/slices/vector/LOS.svg",
  );
  const [COLME] = useImage(
    "https://assets.loscolmebrothers.com/logo/slices/vector/COLME.svg",
  );

  const [BROTHERS] = useImage(
    "https://assets.loscolmebrothers.com/logo/slices/vector/BROTHERS.svg",
  );

  const isLoading = !LOS || !COLME || !BROTHERS;

  return { isLoading, slices: { LOS, COLME, BROTHERS } };
}

export default useLogoSlices;
