import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopPOS from './components/DesktopPOS';
import MobilePOS from './components/MobilePOS';

export default function POS() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopPOS /> : <MobilePOS />;
}
