import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/common/back.svg';

interface ClassHeaderBarProps {
  title: string;
}

const ClassHeaderBar: React.FC<ClassHeaderBarProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-16 flex items-center justify-center">
      <div className="absolute left-[5px]" onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="뒤로가기" className="block h-6 w-6" />
      </div>
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
};

export default ClassHeaderBar;
