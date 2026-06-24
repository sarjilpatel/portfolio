import { Profile, Experience } from "@/lib/types";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { DateTime } from "luxon";
import Image from "next/image";
import { getGoogleDriveUrl } from "@/lib/utils";
import CountUp from "@/components/CountUp";

export default function About({
  profileData,
  experienceData,
}: {
  profileData: Profile;
  experienceData: Experience[];
}) {
  const profileImageUrl = getGoogleDriveUrl(profileData.profileImage || "");
  const parseDate = (dateStr: string) => {
    if (dateStr.toLowerCase().includes("present")) return DateTime.now();
    return DateTime.fromFormat(dateStr.trim(), "MMM yyyy");
  };

  let totalMonths = 0;
  experienceData.forEach((exp) => {
    const [startPart, endPart] = exp.period.split(/[–-]/).map((s) => s.trim());
    const start = parseDate(startPart);
    const end = parseDate(endPart);
    totalMonths += end.diff(start, "months").months;
  });

  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = Math.round(totalMonths % 12);

  let totalExpStr = "";
  if (totalYears > 0)
    totalExpStr += `${totalYears} yr${totalYears > 1 ? "s" : ""} `;
  if (remainingMonths > 0)
    totalExpStr += `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;

  return (
    <section
      id="about"
      className="py-16 sm:py-24 px-5 sm:px-6 relative overflow-hidden text-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          tag="ABOUT ME"
          subtitle="Passionate developer building modern web solutions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center mt-8 sm:mt-12">
          {/* LEFT — circular profile avatar */}
          <Reveal variant="left" className="relative flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
              {/* Soft ambient glow */}
              <div className="absolute -inset-5 rounded-full bg-linear-to-br from-white/25 via-zinc-400/15 to-white/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Rotating dashed accent ring */}
              <div className="absolute -inset-3 rounded-full border border-dashed border-white/15 animate-[spin_22s_linear_infinite]" />

              {/* Gradient ring + photo */}
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-white via-zinc-400 to-zinc-700 p-0.75 shadow-[0_0_40px_rgba(255,255,255,0.18)]">
                <div className="w-full h-full rounded-full bg-black/70 p-1.5">
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10">
                    {profileImageUrl ? (
                      <Image
                        src={profileImageUrl}
                        alt={profileData.name}
                        fill
                        sizes="(max-width: 640px) 16rem, 20rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-7xl font-bold text-white/10 select-none">
                        SP
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Availability pill */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-400 whitespace-nowrap shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for work
              </div>

              {/* Floating experience badge */}
              <div className="absolute -bottom-2 -right-2 sm:right-0 backdrop-blur-lg p-4! rounded-2xl z-20 text-center">
                <p className="text-2xl font-bold text-white leading-none">
                  <CountUp value={totalYears} suffix="+" />
                </p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mt-1">
                  Years Exp
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT */}
          <Reveal
            variant="right"
            delay={100}
            className="flex flex-col space-y-6"
          >
            <p className="text-xl text-zinc-300 leading-relaxed font-sans">
              {profileData.bio}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              {[
                { label: "Location", value: profileData.location || "India" },
                { label: "Role", value: profileData.role },
                { label: "Availability", value: "Full-time" },
                { label: "Experience", value: totalExpStr },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    {item.label}
                  </span>
                  <span className="text-lg font-medium text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
