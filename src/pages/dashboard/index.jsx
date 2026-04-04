import { useMediaQuery } from '../../hooks/useMediaQuery';
import DesktopDashboard from './components/DesktopDashboard';
import MobileDashboard from './components/MobileDashboard';

export default function Dashboard() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopDashboard /> : <MobileDashboard />;
}