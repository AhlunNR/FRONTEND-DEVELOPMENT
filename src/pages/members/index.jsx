import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopMembers from './components/DesktopMembers';
import MobileMembers from './components/MobileMembers';

export default function Members() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopMembers /> : <MobileMembers />;
}
