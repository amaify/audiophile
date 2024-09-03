import React from "react";
import clsx from "clsx";
import { HeroSectionData } from "@/Types/sharedTypes";
import Button from "@/components/shared/Button";
import { Alert } from "@/components/shared/Alert";
import NavigationLayout from "./NavigationLayout";

interface Props {
  heroItem: HeroSectionData["heroSections"];
  error: string;
}

export default function Hero({ heroItem, error }: Props) {
  const { title, description, category } = heroItem[0];
  const heroSlug = `${title.toLowerCase().replaceAll(" ", "-")}-${category.toLowerCase()}`;

  return (
    <header className={clsx("relative", !error ? "[ hero ]" : "[ hero-error ]")}>
      <NavigationLayout />
      {!error ? (
        <section
          className={clsx(
            "w-[32.8rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
            "sm:w-[37.9rem] lg:w-[39.8rem] lg:top-[30%] lg:left-[10.5rem] lg:-translate-x-0 lg:-translate-y-0 lg:text-left",
            "lg:w-[39.8rem] xl:left-[17.5rem]"
          )}
        >
          <p className="[ overline-text ] text-white opacity-50 mb-6">new product</p>
          <h1 className="[ heading-1 ] text-white mb-6">
            <span className="block">{title}</span>
            <span>headphones</span>
          </h1>
          <p className="[ body-text ] text-white opacity-75 w-full mb-10 sm:w-[90%]">{description}</p>
          <div className="w-full flex justify-center lg:justify-start">
            <Button btnText="see product" btnType={1} to={`${category.toLowerCase()}/${heroSlug}`} />
          </div>
        </section>
      ) : (
        <div className="[ layout-padding ]">
          <Alert alertVariant="error" message={error} />
        </div>
      )}
    </header>
  );
}
