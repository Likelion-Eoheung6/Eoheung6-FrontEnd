 

type TagChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function TagChip({ label, selected = false, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        `inline-flex items-center gap-0 px-[10px] py-[10px] rounded-[50px] border-[1px] text-[10px] font-medium leading-[100%] tracking-[-0.025em] text-[#111111] cursor-pointer shrink-0 whitespace-nowrap box-border appearance-none bg-no-repeat ` +
        (selected
          ? 'relative overflow-hidden bg-[#FDFDFD] border-[#00BBFF] before:content-[""] before:absolute before:inset-0 before:rounded-[50px] before:bg-[rgba(149,227,255,0.4)]'
          : 'bg-[#FAFAFA] border-[#E0E0E0]')
      }
    >
      <span aria-hidden className="inline-block text-center relative z-[1]">{selected ? '✓' : '+'}</span>
      <span className="relative z-[1]">{label}</span>
    </button>
  );
}


