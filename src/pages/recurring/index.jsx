import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopRecurring from './components/DesktopRecurring';
import MobileRecurring from './components/MobileRecurring';

export default function Recurring() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopRecurring /> : <MobileRecurring />;
}
