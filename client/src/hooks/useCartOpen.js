import { useEffect, useState } from "react";

const useCartOpen = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsCartOpen(document.body.classList.contains("cart-open"));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Initial check
    setIsCartOpen(document.body.classList.contains("cart-open"));

    return () => observer.disconnect();
  }, []);

  return isCartOpen;
};

export default useCartOpen;
