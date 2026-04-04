import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopInsights from './components/DesktopInsights';
import MobileInsights from './components/MobileInsights';

export default function Insights() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopInsights /> : <MobileInsights />;
}