// Types for Server Management
export interface Server {
  id: string;
  name: string;
  apiKey: string;
  provider: 'whatsapp' | 'telegram' | 'email' | 'sms';
  smsProvider: '5sim' | 'sms-man' | 'vak' | 'onlinesim';
  smsApiKey: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: number;
  updatedAt: number;
  maxRequests?: number;
  requestsUsed?: number;
}

export interface Website {
  id: string;
  name: string;
  url: string;
  serverId: string; // Linked Server
  description?: string;
  status: 'active' | 'inactive';
  createdAt: number;
  updatedAt: number;
  settings?: {
    maxUsers?: number;
    enableCaptcha?: boolean;
    autoApprove?: boolean;
  };
}

// Types for Balance Management
export interface UserBalance {
  userId: string;
  username?: string;
  balance: number;
  currency: 'USD' | 'SAR' | 'AED' | 'EGP';
  tier: 'free' | 'silver' | 'gold' | 'platinum';
  createdAt: number;
  lastUpdated: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit' | 'refund' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  fromUser?: string;
  toUser?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: number;
  approvedBy?: string;
  approvedAt?: number;
}

// Types for Admin System
export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  telegramId: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  createdAt: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  target: string;
  targetId?: string;
  oldValue?: any;
  newValue?: any;
  createdAt: number;
  ipAddress?: string;
}

export interface Dashboard {
  totalUsers: number;
  totalBalance: number;
  totalServers: number;
  activeServers: number;
  totalTransactions: number;
  totalWebsites: number;
  dailyRevenue: number;
  monthlyRevenue: number;
}
