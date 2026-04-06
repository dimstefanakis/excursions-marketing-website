import { cn } from "@/lib/utils";

type SiteLogoLockupProps = {
  className?: string;
  logoClassName?: string;
  badgeClassName?: string;
};

export function SiteLogoLockup({
  className,
  logoClassName,
  badgeClassName,
}: SiteLogoLockupProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <img
        src="/images/figma/logo-landscape.jpg"
        alt="Excursions Greece"
        className={cn(
          "h-[52px] w-auto max-w-[210px] object-contain sm:h-[64px] sm:max-w-[260px] lg:h-[92px] lg:max-w-[360px]",
          logoClassName,
        )}
      />
      <img
        src="/TWILGO Logo.jpg"
        alt="The World's Leading Ground Operators certification badge"
        className={cn(
          "mt-2 ml-3 h-[34px] w-[34px] object-contain sm:h-[40px] sm:w-[40px] lg:mt-3 lg:ml-4 lg:h-[48px] lg:w-[48px]",
          badgeClassName,
        )}
      />
    </div>
  );
}

type TravelifeCertificationBadgeProps = {
  className?: string;
};

export function TravelifeCertificationBadge({
  className,
}: TravelifeCertificationBadgeProps) {
  return (
    <img
      src="/Travelife Logo.jpg"
      alt="Travelife Certified sustainability badge"
      className={cn(
        "h-auto w-[220px] max-w-full object-contain sm:w-[250px] lg:w-[280px]",
        className,
      )}
    />
  );
}
