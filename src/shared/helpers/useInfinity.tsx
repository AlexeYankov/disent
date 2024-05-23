import { useCountriesStore } from "@/entities/countri-store";
import React from "react";

export function useInifinity () {
    const [view, setView] = React.useState(0);
    const getWindowPosition = () =>
      setView(window.screen.height + window.scrollY);
    const { countries, countriesInView, setCountriesInView, setCountries } =
      useCountriesStore();
  
    // infinity scroll like
    React.useEffect(() => {
      const getAnchor =
        document.getElementById('anchor')?.getBoundingClientRect().y || 0;
      function setScrollY() {
        window.addEventListener('scroll', getWindowPosition);
        return () => {
          document.removeEventListener('scroll', getWindowPosition);
        };
      }
      setScrollY();
      if (getAnchor - 1800 <= 0) {
        if (countriesInView.length + 20 <= countries.length) {
          const newCountriesInView = [
            ...countriesInView,
            ...countries.slice(
              countriesInView.length,
              countriesInView.length + 20
            ),
          ];
          return setCountriesInView(newCountriesInView);
        }
        if (countriesInView.length < countries.length) {
          setCountriesInView(countries)
        }
      }
    }, [view]);
}