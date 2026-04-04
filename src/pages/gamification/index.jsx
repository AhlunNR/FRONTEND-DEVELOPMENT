import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopGamification from './components/DesktopGamification';
import MobileGamification from './components/MobileGamification';

export default function Gamification() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopGamification /> : <MobileGamification />;
}
