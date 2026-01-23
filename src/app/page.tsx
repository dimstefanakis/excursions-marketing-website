const imgFinalHeroSlideshow = "http://localhost:3845/assets/d0b0314016527d9d920a19a6c50b13bf9a684da9.png";
const imgRectangle4150 = "http://localhost:3845/assets/d1229d4af18e371cacf7488298b459052700868e.png";
const imgExcursionsGreeceLogoWhite1 = "http://localhost:3845/assets/7c65efb2fa1d98090c98468aaa35d387c1861e63.png";
const imgFrame39847 = "http://localhost:3845/assets/218a41926a12b4903ec6de109c214d107a231f96.png";
const imgRectangle4136 = "http://localhost:3845/assets/74ce84b3eeb62c2d375a08230e978d92f04befdb.png";
const imgRectangle4137 = "http://localhost:3845/assets/e4da5798d491dd1fc6107638faa9a0dbaf77ba9c.png";
const imgRectangle4138 = "http://localhost:3845/assets/9cf1de1c1bd7b100414bea665cb5b3a3d5807b96.png";
const imgArrowRightSvgrepoCom = "http://localhost:3845/assets/1a63df9b34aae05bd6591fd98be2b587689bb979.svg";
const imgBoatSvgrepoCom = "http://localhost:3845/assets/bef47c9f59d6c03c7466b40c4b7eedf72e515265.svg";
const imgBoatSvgrepoCom1 = "http://localhost:3845/assets/42ab8f2e692d6c69fc33a3588c0930057d1db881.svg";
const imgVip2Fill = "http://localhost:3845/assets/715064fcfefe6ae227d85d190f9991801d8280da.svg";
const imgVip2Fill1 = "http://localhost:3845/assets/6b8be2998264be91a431a6a79b084cbd79decc50.svg";
const imgLeafSvgrepoCom = "http://localhost:3845/assets/56d99fb2777d3325cbeb853af7e2202f7f9d96ab.svg";
const imgMapSvgrepoCom = "http://localhost:3845/assets/256577b598257d2632910a97f970ab1b0e628683.svg";
const imgLocationPinAlt1SvgrepoCom1 = "http://localhost:3845/assets/e9101c6a4f82bed2ad7b5d86969ee96018c3ee3c.svg";
const imgBadgeCheckSvgrepoCom = "http://localhost:3845/assets/73623b8d7e6da24d4d253aac9cff6d7018182ea4.svg";
const imgBoatSvgrepoCom2 = "http://localhost:3845/assets/f205a410959c38b8a512cfe1e45890b14b288386.svg";
const imgLocation = "http://localhost:3845/assets/4d102177cb1d68a942de3ec06503c3a4c5565234.svg";
const imgVector6 = "http://localhost:3845/assets/ce1c2b45c00a6997ac729e216f3f9a2dc9d028c8.svg";
const imgGroup39701 = "http://localhost:3845/assets/5b99e17676700906965a8334501760d546abf84e.svg";
const imgGroup39706 = "http://localhost:3845/assets/eefdf4fe2b1f14867f502771d6102389f7508451.svg";
const imgVector7 = "http://localhost:3845/assets/67ec7c54e098a3578bed6641addd917a8f25c03c.svg";
const imgLinkedinRoundSvgrepoCom = "http://localhost:3845/assets/09e7246a0a92a0c7a8aaf4bc8806a5b648a7ac7f.svg";
const imgArrowRightSvgrepoCom2 = "http://localhost:3845/assets/8753322e06c57c18df775bb75c8c774a80912851.svg";
const imgArrowRightSvgrepoCom3 = "http://localhost:3845/assets/b78ff99392c03f16c86cd21b6ca1fd8d20838ec0.svg";

const navItems = ["Home", "Company", "Services", "Destinations", "Contact"];
const logoRowOne = ["ATLAS", "HAPAG", "SAS", "CRYSTAL", "NOBLE"];
const logoRowTwo = ["VIRGIN", "VIKING", "WORLD", "EXPLORA", "ATLAS"];

const stats = [
  { value: "50+", label: "Greek Ports" },
  { value: "30+", label: "Years Experience" },
  { value: "15+", label: "Cruise Lines" },
];

const wrap =
  "mx-auto w-full max-w-[1780px] px-[24px] sm:px-[40px] lg:px-0";

export default function Home() {
  return (
    <div className="bg-white text-[#33305e]">
      <section className="relative">
        <div className={`${wrap} relative min-h-[720px] lg:min-h-[968px]`}>
          <header className="flex items-start justify-between pt-[3px] lg:absolute lg:left-0 lg:right-0 lg:top-[3px]">
            <img
              src={imgExcursionsGreeceLogoWhite1}
              alt="Excursions Greece"
              className="h-[72px] w-[72px] object-contain sm:h-[96px] sm:w-[96px] lg:h-[179px] lg:w-[179px]"
            />
            <nav className="hidden items-center gap-[49px] text-[18px] font-medium lg:flex lg:text-[24px] lg:leading-[80px]">
              {navItems.map((item) => (
                <span
                  key={item}
                  className={
                    item === "Home"
                      ? "font-extrabold text-[#51d2c6]"
                      : "text-[#33305e]"
                  }
                >
                  {item}
                </span>
              ))}
              <span className="font-extrabold text-[#33305e]">Get Quote</span>
            </nav>
            <button className="rounded-full border border-[#33305e]/20 px-4 py-2 text-sm font-semibold text-[#33305e] lg:hidden">
              Menu
            </button>
          </header>

          <div className="lg:pt-[144px]">
            <div className="relative lg:grid lg:grid-cols-[880px_879px] lg:gap-[20px] lg:h-[805px]">
              <div className="relative lg:h-full">
                <h1 className="text-right font-[var(--font-syne)] text-[32px] font-bold leading-[42px] lg:text-[40px] lg:leading-[46px]">
                  Luxury Shore
                  <br />
                  Experiences
                </h1>
                <div className="mt-[28px] flex items-start justify-between gap-6 text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
                  <p className="max-w-[520px]">
                    Curated by Greece&apos;s
                    <br />
                    Most Trusted &amp; Leading DMC
                  </p>
                  <p className="text-right font-[var(--font-sulphur)] text-[20px] leading-[24px] lg:text-[24px] lg:leading-[111px]">
                    since 2013
                  </p>
                </div>
                <div className="mt-[22px] overflow-hidden bg-[#96e0d9] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">
                  <img
                    src={imgRectangle4150}
                    alt="Greece routes map"
                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[575px]"
                  />
                  <button className="absolute bottom-[22px] left-[22px] flex h-[56px] items-center gap-4 bg-white px-6 text-[20px] font-semibold text-[#33305e] shadow-[0_10px_30px_rgba(51,48,94,0.2)] lg:text-[24px]">
                    Explore Routes
                    <img
                      src={imgArrowRightSvgrepoCom}
                      alt="Arrow"
                      className="h-[48px] w-[44px]"
                    />
                  </button>
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden bg-[#96e0d9] lg:mt-0 lg:h-full">
                <img
                  src={imgFinalHeroSlideshow}
                  alt="Aegean waters"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <button className="absolute bottom-[22px] left-[22px] flex items-center gap-4 bg-white px-6 py-3 text-[20px] font-semibold text-[#33305e] shadow-[0_10px_30px_rgba(51,48,94,0.2)] lg:text-[24px]">
                  Contact Us
                  <img
                    src={imgArrowRightSvgrepoCom}
                    alt="Arrow"
                    className="h-[48px] w-[44px]"
                  />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-10 pt-6 lg:pt-[24px]`}>
        <p className="max-w-[1403px] text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
          Where every journey unfolds as a story of elegance and discovery across
          Greece&apos;s storied ports, our bespoke programs serve the world&apos;s most
          distinguished cruise lines.
        </p>
      </section>

      <section className="bg-[#33305e] py-[36px]">
        <div className={`${wrap} grid border-y border-white/40 md:grid-cols-3`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-6 text-center ${
                index < stats.length - 1 ? "md:border-r md:border-white/40" : ""
              }`}
            >
              <div className="font-[var(--font-syne)] text-[32px] font-semibold text-[#96e0d9] sm:text-[36px] lg:text-[40px]">
                {stat.value}
              </div>
              <div className="mt-3 text-[16px] text-white sm:text-[18px] lg:text-[20px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${wrap} py-14`}>
        <h2 className="font-[var(--font-syne)] text-[28px] font-bold leading-[38px] sm:text-[32px] lg:text-[40px] lg:leading-[46px]">
          Chosen by the World’s
          <br />
          Finest Voyages
        </h2>
        <div className="mt-6 border-t border-[#33305e]/30">
          <div className="grid grid-cols-2 text-center text-[20px] font-light leading-[50px] text-[#33305e] sm:grid-cols-3 lg:grid-cols-5 lg:text-[40px] lg:leading-[80px]">
            {logoRowOne.map((logo) => (
              <div key={logo}>{logo}</div>
            ))}
          </div>
          <div className="border-t border-[#33305e]/30" />
          <div className="grid grid-cols-2 text-center text-[20px] font-light leading-[50px] text-[#33305e] sm:grid-cols-3 lg:grid-cols-5 lg:text-[40px] lg:leading-[80px]">
            {logoRowTwo.map((logo) => (
              <div key={logo}>
                {logo === "EXPLORA" ? (
                  <span className="inline-flex w-full items-center justify-center bg-[#51d2c6] px-4 py-1 font-extrabold text-white">
                    {logo}
                  </span>
                ) : (
                  logo
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-[#33305e]/30" />
        </div>
      </section>

      <section className={`${wrap} pb-8`}>
        <h2 className="font-[var(--font-syne)] text-[28px] font-bold leading-[38px] sm:text-[32px] lg:text-[40px] lg:leading-[46px]">
          Bespoke Experiences
          <br />
          Throughout Greece
        </h2>
      </section>

      <section className={`${wrap} pb-16`}>
        <div className="relative overflow-hidden bg-[#96e0d9] px-6 py-10 sm:px-10 lg:min-h-[1094px] lg:px-[80px] lg:py-[48px]">
          <img
            src={imgFrame39847}
            alt="Greek coastline"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="relative mx-auto grid gap-6 lg:max-w-[1620px] lg:grid-cols-4 lg:gap-[36px]">
            <div className="relative bg-white p-6 lg:h-[397px]">
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                Shore
                <br />
                Excursions
              </h3>
              <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                <img
                  src={imgBoatSvgrepoCom}
                  alt="Boat icon"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="relative bg-white p-6 lg:h-[397px]">
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                VIP &amp;
                <br />
                Concierge
              </h3>
              <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                <img
                  src={imgVip2Fill1}
                  alt="VIP icon"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="relative bg-[#33305e] p-6 text-white lg:h-[397px]">
              <p className="text-[18px] leading-[24px] lg:text-[20px] lg:leading-[26px]">
                Comprehensive embarkation and disembarkation support in all Greek
                cruise ports.
              </p>
              <div className="mt-6 border-t border-white/30 pt-4 text-[20px] leading-[29px]">
                <p>Meet &amp; Greet</p>
                <p>Luggage Handling</p>
                <p>Port Transfers</p>
                <p>Check-in Services</p>
              </div>
            </div>
            <div className="relative bg-white p-6 lg:h-[397px]">
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                Cultural
                <br />
                Experts
              </h3>
              <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                <img
                  src={imgVip2Fill}
                  alt="Cultural experts icon"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-6 grid gap-6 lg:max-w-[1206px] lg:grid-cols-3 lg:gap-[36px]">
            <div className="relative bg-white p-6 lg:h-[397px]">
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                Sustainable
                <br />
                Tourism
              </h3>
              <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                <img
                  src={imgLeafSvgrepoCom}
                  alt="Leaf icon"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="relative bg-white p-6 lg:h-[397px]">
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                Land
                <br />
                Programs
              </h3>
              <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                <img
                  src={imgMapSvgrepoCom}
                  alt="Map icon"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="relative bg-white p-6 lg:h-[397px]">
              <h3 className="font-[var(--font-syne)] text-[24px] font-bold leading-[34px] lg:text-[48px] lg:leading-[49px]">
                Boat &amp; Yacht
                <br />
                Charters
              </h3>
              <div className="absolute bottom-[24px] right-[24px] flex h-[60px] w-[60px] items-center justify-center lg:h-[90px] lg:w-[90px]">
                <img
                  src={imgBoatSvgrepoCom1}
                  alt="Yacht icon"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex items-center justify-center border-y border-white/50 py-2">
            <button className="flex h-[56px] items-center gap-4 bg-white px-6 text-[20px] font-semibold text-[#33305e] lg:text-[24px]">
              View All Services
              <img
                src={imgArrowRightSvgrepoCom}
                alt="Arrow"
                className="h-[48px] w-[44px]"
              />
            </button>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-6`}>
        <p className="max-w-[1319px] text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
          At Excursions Greece, excellence is not an aspiration, it is a standard
          refined over decades of service to the world&apos;s most distinguished
          cruise lines.
        </p>
        <p className="mt-6 max-w-[1102px] text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
          What sets us apart is our relentless attention to detail and our
          commitment to creating seamless experiences at every port of call.
        </p>
      </section>

      <section className={`${wrap} py-14`}>
        <h2 className="font-[var(--font-syne)] text-[28px] font-bold lg:text-[40px]">
          Our Distinction
        </h2>
        <div className="relative mt-10 flex items-center justify-center">
          <button className="absolute left-[-8px] hidden h-[60px] w-[55px] items-center justify-center lg:flex">
            <img
              src={imgArrowRightSvgrepoCom3}
              alt="Previous"
              className="h-[60px] w-[55px] rotate-180"
            />
          </button>
          <div className="flex items-start">
            <div className="relative mt-[38px] flex h-[320px] w-[304px] flex-col items-center justify-center gap-6 border border-white bg-[#d5f3f0] text-center text-white">
              <p className="font-[var(--font-syne)] text-[28px] font-bold leading-[38px] lg:text-[36px] lg:leading-[49px]">
                Nationwide Presence
              </p>
              <img
                src={imgLocationPinAlt1SvgrepoCom1}
                alt="Location pin"
                className="h-[87px] w-[87px] lg:h-[113px] lg:w-[113px]"
              />
            </div>
            <div className="relative z-10 -ml-[132px] -mr-[132px] flex h-[397px] w-[378px] flex-col items-center justify-center gap-6 bg-[#96e0d9] px-6 text-center text-white">
              <div className="w-full border-y border-white/60 py-4">
                <p className="font-[var(--font-syne)] text-[32px] font-bold leading-[42px] lg:text-[40px] lg:leading-[49px]">
                  Client
                  <br />
                  Support
                </p>
              </div>
              <p className="text-[18px] leading-[26px] lg:text-[20px]">
                Dedicated operations teams available around the clock, ensuring
                flawless coordination before, during, and after every call.
              </p>
            </div>
            <div className="relative mt-[38px] flex h-[320px] w-[304px] flex-col items-center justify-center gap-6 border border-white bg-[#d5f3f0] text-center text-white">
              <p className="font-[var(--font-syne)] text-[28px] font-bold leading-[38px] lg:text-[36px] lg:leading-[49px]">
                Trusted by Industry Leaders
              </p>
              <img
                src={imgBadgeCheckSvgrepoCom}
                alt="Badge check"
                className="h-[87px] w-[87px] lg:h-[113px] lg:w-[113px]"
              />
            </div>
          </div>
          <button className="absolute right-[-8px] hidden h-[60px] w-[55px] items-center justify-center lg:flex">
            <img
              src={imgArrowRightSvgrepoCom2}
              alt="Next"
              className="h-[60px] w-[55px]"
            />
          </button>
        </div>
      </section>

      <section className={`${wrap} pb-16`}>
        <div className="grid items-center gap-10 lg:grid-cols-[665px_1fr] lg:gap-[36px]">
          <div>
            <img
              src={imgBoatSvgrepoCom2}
              alt="Boat icon"
              className="h-[60px] w-[53px] lg:h-[79px] lg:w-[70px]"
            />
            <p className="mt-6 text-[20px] leading-[28px] sm:text-[24px] lg:text-[32px] lg:leading-[normal]">
              Each journey we design reflects the heritage, precision, and trust
              that have earned us our reputation as Greece&apos;s most trusted and
              leading DMC.
            </p>
          </div>
          <div className="grid gap-[18px] sm:grid-cols-3 lg:gap-[31px]">
            <img
              src={imgRectangle4136}
              alt="Scenic bay"
              className="h-[220px] w-full object-cover lg:h-[397px]"
            />
            <img
              src={imgRectangle4138}
              alt="Aerial coastline"
              className="h-[220px] w-full object-cover lg:h-[397px]"
            />
            <img
              src={imgRectangle4137}
              alt="Harbor view"
              className="h-[220px] w-full object-cover lg:h-[397px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#33305e] text-white">
        <div className={`${wrap} py-12`}>
          <div className="border-y border-white/50 py-6 text-center">
            <h2 className="font-[var(--font-syne)] text-[28px] font-bold sm:text-[32px] lg:text-[40px]">
              Travelife Certified Partner
            </h2>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-[80px]">
            <div>
              <h3 className="font-[var(--font-syne)] text-[28px] font-bold text-[#96e0d9] lg:text-[36px]">
                Company
              </h3>
              <ul className="mt-4 space-y-3 text-[18px] lg:text-[24px]">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Certifications</li>
                <li>Sustainability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-[var(--font-syne)] text-[28px] font-bold text-[#96e0d9] lg:text-[36px]">
                Services
              </h3>
              <ul className="mt-4 space-y-3 text-[18px] lg:text-[24px]">
                <li>Shore Excursions</li>
                <li>VIP Services</li>
                <li>Group Tours</li>
                <li>Private Transfers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-[var(--font-syne)] text-[28px] font-bold text-[#96e0d9] lg:text-[36px]">
                Contact
              </h3>
              <div className="mt-4 space-y-6 text-[18px] lg:text-[24px]">
                <div className="flex items-start gap-4">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <img src={imgLocation} alt="Location" className="h-6 w-6" />
                  </div>
                  <span>
                    123 Marina Boulevard
                    <br />
                    Piraeus, Greece 18537
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <img src={imgVector6} alt="Phone" className="h-6 w-6" />
                  </div>
                  <span>+30 210 456 7890</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <img src={imgGroup39701} alt="Email" className="h-6 w-6" />
                  </div>
                  <span>info@excursionsgreece.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/50 pt-6 text-[16px] text-white/80 lg:text-[20px]">
            <div className="flex items-center gap-4">
              <img
                src={imgGroup39706}
                alt="Social icon"
                className="h-[60px] w-[60px]"
              />
              <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                <img src={imgVector7} alt="Social icon" className="h-6 w-6" />
              </div>
              <img
                src={imgLinkedinRoundSvgrepoCom}
                alt="LinkedIn"
                className="h-[60px] w-[60px]"
              />
            </div>
            <span>© 2025 Excursions Greece. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
