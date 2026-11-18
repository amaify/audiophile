export default function SubFooter() {
  return (
    <section className="flex flex-col-reverse w-full gap-16 mb-48 relative -z-10 sm:mb-[9.6rem] lg:mb-64 lg:flex-row lg:gap-50">
      <div className="w-full self-center mr-0 text-center lg:w-[60%] lg:mr-auto lg:text-left xl:w-1/2">
        <h2 className="heading-2 mb-[3.2rem] font-normal">
          <span className="block">bringing you the</span>
          <span>
            <span className="text-primary">best</span> audio gear
          </span>
        </h2>
        <p className="body-text opacity-50">
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones,
          speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to
          browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who
          make Audiophile the best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="rounded-lg w-full h-120 bg-best-gear-mobile bg-cover sm:bg-best-gear-tablet sm:bg-center lg:w-216 lg:h-[58.8rem] lg:bg-best-gear-desktop" />
    </section>
  );
}
