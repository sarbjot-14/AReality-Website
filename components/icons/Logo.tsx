import Image from 'next/image';

const Logo = ({ className = '', ...props }) => (
  <div>
    <Image
      className="rounded-full"
      alt="AReality"
      width={52}
      height={52}
      src="/logo-black-cropped.png"
    ></Image>
  </div>
);

export default Logo;
