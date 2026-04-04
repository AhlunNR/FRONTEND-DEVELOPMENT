import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopDebts from './components/DesktopDebts';
import MobileDebts from './components/MobileDebts';

export default function Debts() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopDebts /> : <MobileDebts />;
}
