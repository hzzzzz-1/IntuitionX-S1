import svgPaths from "../imports/svg-s4e0ijz15u";
import { formatTime, type VideoSegmentData } from "../data/videoTimelineData";

interface ExpandedPanelProps {
  segments: VideoSegmentData[];
  currentTime: number;
  onSeekTo: (time: number) => void;
}

export function ExpandedPanel({ segments, currentTime, onSeekTo }: ExpandedPanelProps) {
  // 判断段落是否处于播放状态
  const isSegmentActive = (segment: VideoSegmentData) => {
    return currentTime >= segment.startTime && currentTime <= segment.endTime;
  };

  return (
    <div className="absolute contents left-[calc(16.67%+19.67px)] top-[207px]">
      {/* Background Gradient */}
      <div className="absolute bg-gradient-to-b from-[#ffffff] h-[248px] left-[calc(16.67%+19.67px)] opacity-[0.55] rounded-[6px] shadow-[0px_4px_4px_4px_rgba(255,120,120,0.2)] to-[#ff7878] top-[207px] w-[143px]" />

      {/* Collapse Arrow */}
      <div className="absolute flex h-[22px] items-center justify-center left-[calc(25%+43px)] top-[227px] w-[17px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-[17px] relative w-[22px]">
            <div className="absolute bottom-1/4 left-[11.22%] right-[11.22%] top-[3.95%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0653 12.0793">
                <path d={svgPaths.pf6682f2} fill="#E32C25" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-[calc(16.67%+23.67px)] top-[214px] w-[131px]">
        {/* Tabs */}
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="bg-[#e0130b] content-stretch flex h-[12px] items-center justify-center px-[4px] py-[2px] relative rounded-[2px] shrink-0 w-[34px]">
            <p className="font-['Alibaba_PuHuiTi_3.0:55_Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[6px] text-nowrap text-white">视频段落</p>
          </div>
          <div className="bg-white content-stretch flex h-[12px] items-center justify-center px-[7px] py-[2px] relative rounded-[2px] shrink-0 w-[34px]">
            <p className="font-['Alibaba_PuHuiTi_3.0:55_Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#e0130b] text-[6px] text-nowrap">字幕帧</p>
          </div>
          <div className="bg-white content-stretch flex h-[12px] items-center justify-center px-[4px] py-[2px] relative rounded-[2px] shrink-0 w-[34px]">
            <p className="font-['Alibaba_PuHuiTi_3.0:55_Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#e0130b] text-[6px] text-nowrap">精华信息</p>
          </div>
        </div>

        {/* Segment List Items */}
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
          {segments.map((segment, index) => {
            const isActive = isSegmentActive(segment);

            return (
              <div
                key={index}
                className={`content-stretch flex gap-[2px] items-start relative shrink-0 w-full cursor-pointer hover:scale-[1.02] transition-transform ${isActive ? 'opacity-100' : 'opacity-80'}`}
                onClick={() => onSeekTo(segment.startTime)}
              >
                {/* Active Indicator Dot */}
                <div className="relative shrink-0 size-[6px] mt-[2px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                    <circle
                      cx="3"
                      cy="3"
                      fill={isActive ? "#E0130B" : "white"}
                      r="3"
                    />
                  </svg>
                </div>

                {/* Segment Content */}
                <div className="content-stretch flex flex-col items-start leading-[normal] not-italic relative shrink-0 flex-1">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <p className={`font-['Alibaba_PuHuiTi_3.0:65_Medium',sans-serif] h-[10px] relative shrink-0 text-[8px] ${isActive ? 'text-[#E0130B] font-bold' : 'text-black'} w-full transition-colors`}>
                      {segment.title}
                    </p>
                    <p className="[text-underline-position:from-font] decoration-solid font-['Alibaba_PuHuiTi_3.0:55_Regular',sans-serif] relative shrink-0 text-[6px] text-white underline w-full">
                      {formatTime(segment.startTime)}-{formatTime(segment.endTime)}
                    </p>
                  </div>
                  <p className="font-['Alibaba_PuHuiTi_3.0:55_Regular',sans-serif] min-w-full relative shrink-0 text-[6px] text-white w-[min-content] line-clamp-3">
                    {segment.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
