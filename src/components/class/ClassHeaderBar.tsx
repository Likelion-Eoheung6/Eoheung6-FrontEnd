import BackIcon from '../../assets/common/back.svg';

interface ClassHeaderBarProps {
  title: string;
}

const ClassHeaderBar: React.FC<ClassHeaderBarProps> = ({ title }) => {
  return (
    <div className="relative w-full h-16 border-b bg-[lightpink] flex items-center justify-center">
      <div className="absolute left-5">
        <img src={BackIcon} alt="뒤로가기" className="block h-6 w-6" />
      </div>
      <div>
        <p className="text-lg font-bold">{title}</p>
      </div>
    </div>
  );
};

export default ClassHeaderBar;
