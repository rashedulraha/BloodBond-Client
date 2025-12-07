import { Link } from "react-router-dom";

type BannerLink = {
  to: string;
  span: string;
  Icon: string;
  className: string;
};
const BannerLink = ({ to, span, Icon, className }: BannerLink) => {
  return (
    <Link
      to={`/${to}`}
      className={`btn   px-10 py-4 rounded-full flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 ${className}`}>
      {Icon && <Icon />} {span}
    </Link>
  );
};

export default BannerLink;
