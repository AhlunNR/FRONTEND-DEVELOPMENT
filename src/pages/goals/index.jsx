import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopGoals from './components/DesktopGoals';
import MobileGoals from './components/MobileGoals';

export default function Goals() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopGoals /> : <MobileGoals />;
}
