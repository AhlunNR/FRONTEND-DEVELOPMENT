import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopProfile from './components/DesktopProfile';
import MobileProfile from './components/MobileProfile';

export default function Profile() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopProfile /> : <MobileProfile />;
}