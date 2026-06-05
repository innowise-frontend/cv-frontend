import { CvPreviewHeaderProps } from "./types";

export const CvPreviewHeader = ({ cv }: CvPreviewHeaderProps) => {
  const ownerName = cv.user?.profile?.full_name;
  const position = cv.user?.position?.name;

  return (
    <div className="flex items-start justify-between gap-6 pb-8 pr-36">
      <div className="text-left">
        <h1 className="text-[34px] font-normal leading-[42px] text-gray-2">{ownerName}</h1>
        {position && <p className="text-sm uppercase leading-6 text-gray-3">{position}</p>}
      </div>
    </div>
  );
};
