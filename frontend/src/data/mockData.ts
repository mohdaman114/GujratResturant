export const BRANCHES = [
  { id: 'all', name: 'All Branches', short: 'All' },
  { id: 'royal', name: 'Royal Gujrat', short: 'Royal' },
  { id: 'm26', name: 'Gujrat Restaurant M26', short: 'M26' },
  { id: 'delight', name: 'Delight Gujrat', short: 'Delight' },
  { id: 'naan10', name: 'Naan House ME-10', short: 'NH-10' },
  { id: 'naan11', name: 'Naan House ME-11', short: 'NH-11' },
  { id: 'mafraq', name: 'Mafraq Gujrat', short: 'Mafraq' },
  { id: 'b7', name: 'Branch 7', short: 'B7', pending: true },
  { id: 'b8', name: 'Branch 8', short: 'B8', pending: true },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms', color: '#6B7280' },
  { id: 'talabat', name: 'Talabat', color: '#FF6B00' },
  { id: 'noon', name: 'Noon', color: '#FBC02D' },
  { id: 'careem', name: 'Careem', color: '#1DBF73' },
  { id: 'deliveroo', name: 'Deliveroo', color: '#00CCBC' },
  { id: 'keeta', name: 'Keeta', color: '#E53935' },
  { id: 'smiles', name: 'Smiles', color: '#9C27B0' },
];

export type OperationalStatus = 'Live' | 'Offline' | 'Issue' | 'Unknown' | 'Stale' | 'Scheduled Closed' | 'Not Configured';

export interface BranchPlatformStatus {
  branchId: string;
  platformId: string;
  status: OperationalStatus;
  observedAt: string;
  source: string;
  issues?: string[];
  affectedProducts?: string[];
  owner?: string;
  note?: string;
}

export const OPERATIONAL_MATRIX: BranchPlatformStatus[] = [
  // Royal Gujrat
  { branchId: 'royal', platformId: 'talabat', status: 'Live', observedAt: '2024-01-15 09:42', source: 'Grubtech sync' },
  { branchId: 'royal', platformId: 'noon', status: 'Issue', observedAt: '2024-01-15 09:15', source: 'Grubtech sync', issues: ['Menu sync failed — 3 items missing price'], affectedProducts: ['Chicken Biryani', 'Lamb Karahi', 'Naan Basket'] },
  { branchId: 'royal', platformId: 'careem', status: 'Live', observedAt: '2024-01-15 09:42', source: 'Grubtech sync' },
  { branchId: 'royal', platformId: 'deliveroo', status: 'Live', observedAt: '2024-01-15 09:42', source: 'Grubtech sync' },
  { branchId: 'royal', platformId: 'keeta', status: 'Offline', observedAt: '2024-01-15 07:10', source: 'Grubtech sync', issues: ['Store marked offline since 07:10 — no orders received'], owner: 'Ali Hassan' },
  { branchId: 'royal', platformId: 'smiles', status: 'Not Configured', observedAt: '2024-01-15 09:42', source: 'Settings' },
  // M26
  { branchId: 'm26', platformId: 'talabat', status: 'Live', observedAt: '2024-01-15 09:40', source: 'Grubtech sync' },
  { branchId: 'm26', platformId: 'noon', status: 'Live', observedAt: '2024-01-15 09:40', source: 'Grubtech sync' },
  { branchId: 'm26', platformId: 'careem', status: 'Stale', observedAt: '2024-01-15 06:20', source: 'Grubtech sync', note: 'Last sync over 3 hours ago' },
  { branchId: 'm26', platformId: 'deliveroo', status: 'Live', observedAt: '2024-01-15 09:40', source: 'Grubtech sync' },
  { branchId: 'm26', platformId: 'keeta', status: 'Not Configured', observedAt: '2024-01-15 09:40', source: 'Settings' },
  { branchId: 'm26', platformId: 'smiles', status: 'Not Configured', observedAt: '2024-01-15 09:40', source: 'Settings' },
  // Delight Gujrat
  { branchId: 'delight', platformId: 'talabat', status: 'Live', observedAt: '2024-01-15 09:38', source: 'Grubtech sync' },
  { branchId: 'delight', platformId: 'noon', status: 'Live', observedAt: '2024-01-15 09:38', source: 'Grubtech sync' },
  { branchId: 'delight', platformId: 'careem', status: 'Live', observedAt: '2024-01-15 09:38', source: 'Grubtech sync' },
  { branchId: 'delight', platformId: 'deliveroo', status: 'Issue', observedAt: '2024-01-15 08:55', source: 'Grubtech sync', issues: ['High cancellation rate — 18% in last 2 hours'], owner: 'Fatima Al-Zahra' },
  { branchId: 'delight', platformId: 'keeta', status: 'Live', observedAt: '2024-01-15 09:38', source: 'Grubtech sync' },
  { branchId: 'delight', platformId: 'smiles', status: 'Live', observedAt: '2024-01-15 09:38', source: 'Grubtech sync' },
  // Naan House ME-10
  { branchId: 'naan10', platformId: 'talabat', status: 'Live', observedAt: '2024-01-15 09:35', source: 'Grubtech sync' },
  { branchId: 'naan10', platformId: 'noon', status: 'Scheduled Closed', observedAt: '2024-01-15 09:35', source: 'Settings', note: 'Scheduled to open at 12:00' },
  { branchId: 'naan10', platformId: 'careem', status: 'Live', observedAt: '2024-01-15 09:35', source: 'Grubtech sync' },
  { branchId: 'naan10', platformId: 'deliveroo', status: 'Live', observedAt: '2024-01-15 09:35', source: 'Grubtech sync' },
  { branchId: 'naan10', platformId: 'keeta', status: 'Unknown', observedAt: '2024-01-15 04:10', source: 'Grubtech sync', note: 'No data received since early morning' },
  { branchId: 'naan10', platformId: 'smiles', status: 'Not Configured', observedAt: '2024-01-15 09:35', source: 'Settings' },
  // Naan House ME-11
  { branchId: 'naan11', platformId: 'talabat', status: 'Live', observedAt: '2024-01-15 09:33', source: 'Grubtech sync' },
  { branchId: 'naan11', platformId: 'noon', status: 'Live', observedAt: '2024-01-15 09:33', source: 'Grubtech sync' },
  { branchId: 'naan11', platformId: 'careem', status: 'Offline', observedAt: '2024-01-15 08:30', source: 'Grubtech sync', issues: ['Store went offline at 08:30 — no acknowledgement yet'], owner: 'Unassigned' },
  { branchId: 'naan11', platformId: 'deliveroo', status: 'Live', observedAt: '2024-01-15 09:33', source: 'Grubtech sync' },
  { branchId: 'naan11', platformId: 'keeta', status: 'Live', observedAt: '2024-01-15 09:33', source: 'Grubtech sync' },
  { branchId: 'naan11', platformId: 'smiles', status: 'Not Configured', observedAt: '2024-01-15 09:33', source: 'Settings' },
  // Mafraq Gujrat
  { branchId: 'mafraq', platformId: 'talabat', status: 'Live', observedAt: '2024-01-15 09:30', source: 'Grubtech sync' },
  { branchId: 'mafraq', platformId: 'noon', status: 'Live', observedAt: '2024-01-15 09:30', source: 'Grubtech sync' },
  { branchId: 'mafraq', platformId: 'careem', status: 'Live', observedAt: '2024-01-15 09:30', source: 'Grubtech sync' },
  { branchId: 'mafraq', platformId: 'deliveroo', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'mafraq', platformId: 'keeta', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'mafraq', platformId: 'smiles', status: 'Live', observedAt: '2024-01-15 09:30', source: 'Grubtech sync' },
  // Branch 7 & 8
  { branchId: 'b7', platformId: 'talabat', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b7', platformId: 'noon', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b7', platformId: 'careem', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b7', platformId: 'deliveroo', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b7', platformId: 'keeta', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b7', platformId: 'smiles', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b8', platformId: 'talabat', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b8', platformId: 'noon', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b8', platformId: 'careem', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b8', platformId: 'deliveroo', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b8', platformId: 'keeta', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
  { branchId: 'b8', platformId: 'smiles', status: 'Not Configured', observedAt: '2024-01-15 09:30', source: 'Settings' },
];

export const DAILY_SALES = [
  { hour: '06:00', today: 820, yesterday: 650 },
  { hour: '07:00', today: 1450, yesterday: 1200 },
  { hour: '08:00', today: 2100, yesterday: 1850 },
  { hour: '09:00', today: 2840, yesterday: 2300 },
  { hour: '10:00', today: 3600, yesterday: 3100 },
  { hour: '11:00', today: 5200, yesterday: 4800 },
  { hour: '12:00', today: 8400, yesterday: 7600 },
  { hour: '13:00', today: 11200, yesterday: 9800 },
  { hour: '14:00', today: 9800, yesterday: 8900 },
  { hour: '15:00', today: 7200, yesterday: 6500 },
  { hour: '16:00', today: 5600, yesterday: 5100 },
  { hour: '17:00', today: 7800, yesterday: 7200 },
  { hour: '18:00', today: 12400, yesterday: 10900 },
  { hour: '19:00', today: 16800, yesterday: 14200 },
  { hour: '20:00', today: 18200, yesterday: 15600 },
  { hour: '21:00', today: 15400, yesterday: 13200 },
  { hour: '22:00', today: 10800, yesterday: 9400 },
  { hour: '23:00', today: 7200, yesterday: 6100 },
];

export const MONTHLY_TREND = [
  { day: 'Sep 16', sales: 9200 },
  { day: 'Sep 17', sales: 10800 },
  { day: 'Sep 18', sales: 11200 },
  { day: 'Sep 19', sales: 9800 },
  { day: 'Sep 20', sales: 10400 },
  { day: 'Sep 21', sales: 12600 },
  { day: 'Sep 22', sales: 13800 },
  { day: 'Sep 23', sales: 11400 },
  { day: 'Sep 24', sales: 10900 },
  { day: 'Sep 25', sales: 12200 },
  { day: 'Sep 26', sales: 13600 },
  { day: 'Sep 27', sales: 14200 },
  { day: 'Sep 28', sales: 13100 },
  { day: 'Sep 29', sales: 15400 },
  { day: 'Sep 30', sales: 16200 },
  { day: 'Oct 1', sales: 11800 },
  { day: 'Oct 2', sales: 12400 },
  { day: 'Oct 3', sales: 13900 },
  { day: 'Oct 4', sales: 14600 },
  { day: 'Oct 5', sales: 15200 },
  { day: 'Oct 6', sales: 14800 },
  { day: 'Oct 7', sales: 16800 },
  { day: 'Oct 8', sales: 15600 },
  { day: 'Oct 9', sales: 14200 },
  { day: 'Oct 10', sales: 15800 },
  { day: 'Oct 11', sales: 16400 },
  { day: 'Oct 12', sales: 17200 },
  { day: 'Oct 13', sales: 15900 },
  { day: 'Oct 14', sales: 18400 },
  { day: 'Oct 15', sales: 17800 },
];

export const BRANCH_PERFORMANCE = [
  { branch: 'Royal', sales: 68400, orders: 412, aov: 166, change: 12.4, target: 75000 },
  { branch: 'M26', sales: 52800, orders: 338, aov: 156, change: 8.2, target: 60000 },
  { branch: 'Delight', sales: 48600, orders: 298, aov: 163, change: -3.1, target: 55000 },
  { branch: 'NH-10', sales: 42200, orders: 264, aov: 160, change: 5.6, target: 50000 },
  { branch: 'NH-11', sales: 38900, orders: 245, aov: 159, change: 14.8, target: 45000 },
  { branch: 'Mafraq', sales: 31600, orders: 198, aov: 160, change: -1.4, target: 40000 },
  { branch: 'B7', sales: 0, orders: 0, aov: 0, change: 0, target: 0, pending: true },
  { branch: 'B8', sales: 0, orders: 0, aov: 0, change: 0, target: 0, pending: true },
];

export const PLATFORM_PERFORMANCE = [
  { platform: 'Talabat', sales: 112400, orders: 698, aov: 161, share: 40.2, change: 11.2 },
  { platform: 'Noon', sales: 72600, orders: 448, aov: 162, share: 25.9, change: 6.8 },
  { platform: 'Careem', sales: 48800, orders: 306, aov: 160, share: 17.4, change: 3.2 },
  { platform: 'Deliveroo', sales: 28400, orders: 176, aov: 161, share: 10.1, change: 18.6 },
  { platform: 'Keeta', sales: 12600, orders: 78, aov: 162, share: 4.5, change: 42.1 },
  { platform: 'Smiles', sales: 5700, orders: 49, aov: 116, share: 2.0, change: -8.4 },
];

export const PRODUCTS = [
  { id: 1, name: 'Chicken Biryani', category: 'Biryani', qty: 842, revenue: 67360, aov: 80, growth: 18.2, classification: 'Star', hasCost: true, contribution: 34.2, issues: 0 },
  { id: 2, name: 'Lamb Karahi', category: 'Karahi', qty: 614, revenue: 79820, aov: 130, growth: 8.4, classification: 'Star', hasCost: true, contribution: 28.6, issues: 0 },
  { id: 3, name: 'Garlic Naan', category: 'Breads', qty: 1248, revenue: 18720, aov: 15, growth: 22.1, classification: 'Plowhorse', hasCost: true, contribution: 12.4, issues: 1 },
  { id: 4, name: 'Mutton Biryani', category: 'Biryani', qty: 488, revenue: 58560, aov: 120, growth: 4.2, classification: 'Plowhorse', hasCost: true, contribution: 22.1, issues: 0 },
  { id: 5, name: 'Dal Makhani', category: 'Curries', qty: 392, revenue: 27440, aov: 70, growth: -12.4, classification: 'Puzzle', hasCost: false, contribution: null, issues: 2 },
  { id: 6, name: 'Naan Basket', category: 'Breads', qty: 624, revenue: 9360, aov: 15, growth: -5.8, classification: 'Dog', hasCost: true, contribution: 8.2, issues: 1 },
  { id: 7, name: 'Shish Tawook', category: 'Grills', qty: 286, revenue: 40040, aov: 140, growth: 34.6, classification: 'Star', hasCost: false, contribution: null, issues: 0 },
  { id: 8, name: 'Palak Paneer', category: 'Curries', qty: 214, revenue: 17120, aov: 80, growth: 2.1, classification: 'Puzzle', hasCost: false, contribution: null, issues: 3 },
  { id: 9, name: 'Chicken Tikka', category: 'Starters', qty: 464, revenue: 46400, aov: 100, growth: 9.8, classification: 'Star', hasCost: true, contribution: 31.4, issues: 0 },
  { id: 10, name: 'Mixed Grill Platter', category: 'Grills', qty: 178, revenue: 44500, aov: 250, growth: 22.8, classification: 'Puzzle', hasCost: false, contribution: null, issues: 0 },
];

export const REVIEWS = [
  { id: 1, branch: 'Royal Gujrat', platform: 'Talabat', rating: 5, author: 'Ahmed K.', date: '2024-01-15 08:22', text: 'Best biryani in Abu Dhabi! Arrived hot and perfectly packaged. Will definitely order again.', status: 'Pending', theme: 'Positive', product: 'Chicken Biryani', suggested: 'Thank you so much for your wonderful review, Ahmed! We\'re thrilled the biryani arrived perfectly. We look forward to serving you again soon.' },
  { id: 2, branch: 'Delight Gujrat', platform: 'Deliveroo', rating: 2, author: 'Sara M.', date: '2024-01-15 07:45', text: 'Order arrived 45 minutes late and the food was cold. The karahi was missing from the order entirely.', status: 'Pending', theme: 'Delivery Issue', product: 'Lamb Karahi', suggested: 'We sincerely apologise for this experience, Sara. A late and incomplete delivery is not the standard we hold ourselves to. We have flagged this with our operations team and would like to make this right for you.' },
  { id: 3, branch: 'Naan House ME-10', platform: 'Noon', rating: 4, author: 'Khalid R.', date: '2024-01-15 07:10', text: 'Food was great as always but delivery was slightly late. Naan was soft and fresh though.', status: 'Replied', theme: 'Positive', product: 'Garlic Naan', suggested: null },
  { id: 4, branch: 'M26', platform: 'Careem', rating: 1, author: 'Anonymous', date: '2024-01-14 22:15', text: 'Wrong order delivered. Asked for vegetarian and received meat dishes. Very disappointed.', status: 'Pending', theme: 'Wrong Order', product: 'Dal Makhani', suggested: 'We are deeply sorry for this error. Receiving the wrong order — especially when dietary requirements are involved — is completely unacceptable. We are investigating this immediately with our kitchen team.' },
  { id: 5, branch: 'Royal Gujrat', platform: 'Careem', rating: 5, author: 'Priya S.', date: '2024-01-14 21:30', text: 'Consistent quality every time. The lamb karahi is unmatched. Quick delivery too!', status: 'Replied', theme: 'Positive', product: 'Lamb Karahi', suggested: null },
  { id: 6, branch: 'Mafraq Gujrat', platform: 'Talabat', rating: 3, author: 'Omar F.', date: '2024-01-14 20:45', text: 'Decent food but presentation could be better. Packaging was messy and sauce was spilled.', status: 'Pending', theme: 'Packaging', product: 'Mutton Biryani', suggested: 'Thank you for your feedback, Omar. We take packaging quality seriously and have raised this with the branch team. We hope to give you a better experience on your next order.' },
];

export const TASKS = [
  { id: 1, priority: 'Critical', branch: 'Royal Gujrat', platform: 'Keeta', issue: 'Store offline since 07:10 — revenue loss est. AED 1,200', owner: 'Ali Hassan', dueAt: '10:00', status: 'Assigned', type: 'Operational', requiresEvidence: true },
  { id: 2, priority: 'High', branch: 'Naan House ME-11', platform: 'Careem', issue: 'Store went offline at 08:30 — unacknowledged', owner: null, dueAt: '10:30', status: 'Detected', type: 'Operational', requiresEvidence: false },
  { id: 3, priority: 'High', branch: 'Royal Gujrat', platform: 'Noon', issue: 'Menu sync failure — 3 items missing prices', owner: 'Grubtech Support', dueAt: '12:00', status: 'Confirmed', type: 'Menu', requiresEvidence: true },
  { id: 4, priority: 'Medium', branch: 'Delight Gujrat', platform: 'Deliveroo', issue: 'Cancellation rate 18% — above 10% threshold', owner: 'Fatima Al-Zahra', dueAt: '11:00', status: 'In Progress', type: 'Operational', requiresEvidence: true },
  { id: 5, priority: 'Medium', branch: 'All Branches', platform: 'All Platforms', issue: 'Dal Makhani declining 12.4% — review placement and images', owner: 'Menu Team', dueAt: '2024-01-16', status: 'Assigned', type: 'Menu', requiresEvidence: false },
  { id: 6, priority: 'Low', branch: 'M26', platform: 'Careem', issue: 'Last sync 3+ hours ago — verify connection', owner: null, dueAt: '13:00', status: 'Detected', type: 'Technical', requiresEvidence: false },
  { id: 7, priority: 'Low', branch: 'All Branches', platform: 'All Platforms', issue: 'Palak Paneer missing images on 3 platforms', owner: 'Marketing', dueAt: '2024-01-17', status: 'Assigned', type: 'Menu', requiresEvidence: true },
  { id: 8, priority: 'High', branch: 'Delight Gujrat', platform: 'Deliveroo', issue: 'Review: Late delivery + cold food — response pending', owner: 'Fatima Al-Zahra', dueAt: '14:00', status: 'Assigned', type: 'Review', requiresEvidence: false },
];

export const CAMPAIGNS = [
  { id: 1, name: 'October Value Fest', type: 'Discount', platform: 'Talabat', branch: 'All', budget: 8000, merchantFunded: 5000, platformFunded: 3000, discount: '20% off AED 80+', status: 'Active', startDate: '2024-10-01', endDate: '2024-10-31', revenue: 42800, orders: 268, roas: 5.35, approved: true },
  { id: 2, name: 'Biryani Bundle Deal', type: 'Bundle', platform: 'Noon', branch: 'Royal Gujrat', budget: 3000, merchantFunded: 3000, platformFunded: 0, discount: 'Biryani + Naan + Drink at AED 95', status: 'Active', startDate: '2024-10-08', endDate: '2024-10-22', revenue: 18600, orders: 196, roas: 6.2, approved: true },
  { id: 3, name: 'Free Delivery Weekend', type: 'Free Delivery', platform: 'Careem', branch: 'All', budget: 4500, merchantFunded: 2000, platformFunded: 2500, discount: 'Free delivery all orders', status: 'Scheduled', startDate: '2024-10-19', endDate: '2024-10-20', revenue: 0, orders: 0, roas: null, approved: false },
  { id: 4, name: 'Lunch Saver 25%', type: 'Discount', platform: 'Deliveroo', branch: 'NH-10, NH-11', budget: 2200, merchantFunded: 1200, platformFunded: 1000, discount: '25% off 11:00–14:00', status: 'Completed', startDate: '2024-09-20', endDate: '2024-09-30', revenue: 15400, orders: 124, roas: 7.0, approved: true },
];

export const TARGET_DATA = {
  baseline: 300000,
  target: 500000,
  months: 4,
  currentMonth: 1,
  mtd: 282400,
  projectedMonth: 308000,
  trajectory: [
    { month: 'Oct', target: 350000, actual: 282400, projected: 308000 },
    { month: 'Nov', target: 400000, actual: null, projected: null },
    { month: 'Dec', target: 450000, actual: null, projected: null },
    { month: 'Jan', target: 500000, actual: null, projected: null },
  ]
};

export const OVERVIEW_KPIS = {
  netFoodSales: { value: 282400, period: 'Month-to-date (Oct 1–15)', comparison: 248200, comparisonLabel: 'Same days last month', change: 13.8 },
  completedOrders: { value: 1755, period: 'Month-to-date', comparison: 1542, comparisonLabel: 'Same days last month', change: 13.8 },
  aov: { value: 160.9, period: 'Month-to-date', comparison: 160.9, comparisonLabel: 'Same days last month', change: 0.0 },
  cancellationRate: { value: 4.2, period: 'Month-to-date', comparison: 5.1, comparisonLabel: 'Same days last month', change: -17.6 },
  lastRefresh: '2024-01-15 09:44 UAE/Asia-Dubai',
  coverage: '6 of 8 branches reporting — B7 and B8 awaiting configuration',
};
