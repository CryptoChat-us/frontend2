import React from "react";

interface MediaReportCardProps {
title: string;
ticker: string;
subtitle: string;
percentage: string;
}

const MediaReportCard: React.FC<MediaReportCardProps> = ({
title,
ticker,
subtitle,
percentage,
}) => {
return (
<div className="w-[492px] h-48 bg-neutral-950/60 rounded-3xl outline outline-1 outline-offset-[-0.97px] outline-yellow-400 backdrop-blur-blur overflow-hidden relative">
<div className="absolute left-[32.74px] top-[114.87px] text-white text-3xl font-medium leading-10 tracking-tight">
{title}
</div>
<div className="absolute left-[32.38px] top-[85.66px] opacity-80 text-white text-xl font-medium leading-7">
{ticker}
</div>
<div className="absolute left-[80.43px] top-[29.25px] opacity-80 text-white text-xl font-medium leading-7">
{subtitle}
</div>
<div className="absolute left-[387.54px] top-[128.48px] w-20 h-7">
<div className="absolute left-[20.05px] top-0 text-yellow-400 text-xl font-medium leading-7">
{percentage}
</div>
<div className="absolute left-[58.42px] top-[8.28px] w-3.5 h-3.5 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-900 outline outline-[1.58px] outline-offset-[-0.79px] outline-yellow-400" />
</div>
<div className="absolute left-[32.38px] top-[26.11px] w-9 h-9 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-900 rounded-lg overflow-hidden">
<div className="absolute left-[6.27px] top-[7.31px] w-5 h-5 overflow-hidden">
<div className="absolute left-[3.48px] top-0 w-3.5 h-5 bg-black" />
</div>
</div>
<div className="absolute left-[221.45px] top-[19.85px] w-72 h-20">
{Array.from({ length: 6 }).map((_, i) => (
<div
key={i}
className="absolute w-9 h-16 top-[9.4px] rounded-lg"
style={{ left: `${i * 42.83}px`, backgroundColor: "rgba(24,24,27,0.5)" }}
/>
))}
<div className="absolute left-0 top-[9.4px] w-60 h-16 rounded-lg overflow-hidden">
<div className="absolute left-[-9.4px] top-[-17.76px] w-72 h-20 overflow-hidden">
<div className="absolute left-[27.32px] top-[8.28px] w-56 h-16 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-900" />
</div>
</div>
<div className="absolute left-[166.09px] top-0 w-28 h-20 overflow-hidden">
<div className="absolute left-[-148.17px] top-[-0.07px] w-56 h-16 bg-gradient-to-bl from-yellow-300 via-yellow-500 to-yellow-900" />
</div>
</div>
</div>
);
};

export default MediaReportCard;