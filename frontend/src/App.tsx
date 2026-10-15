import React, { useState } from 'react';
import Sidebar, { PageId } from './components/Sidebar';
import TopBar from './components/TopBar';
import Overview from './pages/Overview';
import Operations from './pages/Operations';
import SalesAnalytics from './pages/SalesAnalytics';
import Products from './pages/Products';
import Campaigns from './pages/Campaigns';
import Reviews from './pages/Reviews';
import AIAssistant from './pages/AIAssistant';
import Actions from './pages/Actions';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const PAGE_TITLES: Record<PageId, string> = {
  overview: 'Overview',
  operations: 'Operations Monitor',
  analytics: 'Sales Analytics',
  products: 'Products & Menu',
  campaigns: 'Campaigns & Growth',
  reviews: 'Customer Reviews',
  'ai-assistant': 'AI Assistant',
  actions: 'Actions & Tasks',
  reports: 'Reports & Data',
  settings: 'Settings',
};

export default function App() {
  const [page, setPage] = useState<PageId>('overview');
  const [branch, setBranch] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [dateRange, setDateRange] = useState('This month (MTD)');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function navigate(p: string) {
    setPage(p as PageId);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8F7F4' }}>
      <Sidebar
        currentPage={page}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar
          pageTitle={PAGE_TITLES[page]}
          selectedBranch={branch}
          selectedPlatform={platform}
          dateRange={dateRange}
          onBranchChange={setBranch}
          onPlatformChange={setPlatform}
          onDateRangeChange={setDateRange}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(c => !c)}
          onNavigate={navigate}
        />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          background: '#F8F7F4',
        }}>
          {page === 'overview' && <Overview onNavigate={navigate} />}
          {page === 'operations' && <Operations onNavigate={navigate} />}
          {page === 'analytics' && <SalesAnalytics />}
          {page === 'products' && <Products onNavigate={navigate} />}
          {page === 'campaigns' && <Campaigns />}
          {page === 'reviews' && <Reviews onNavigate={navigate} />}
          {page === 'ai-assistant' && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <AIAssistant onNavigate={navigate} />
            </div>
          )}
          {page === 'actions' && <Actions onNavigate={navigate} />}
          {page === 'reports' && <Reports />}
          {page === 'settings' && <Settings />}
        </main>
      </div>

      {/* Demo data badge */}
      <div className="demo-badge">DEMO DATA</div>
    </div>
  );
}
