import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Download, Filter, Info } from 'lucide-react';
import { getUser, getWallet, getTransactions, type User, type Wallet, type Transaction } from '../services/api';

const Dashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, walletData, transactionsData] = await Promise.all([
          getUser(),
          getWallet(),
          getTransactions()
        ]);
        setUser(userData);
        setWallet(walletData);
        setTransactions(transactionsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card md:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-[8px]">Available Balance</div>
              <div className="text-[36px] font-bold tracking-[-1.5px] mt-1">
                {isLoading ? 'Loading...' : wallet ? `USD ${wallet?.balance.toFixed(2)}` : 'N/A'}
              </div>
            </div>
            <button className="btn-primary">Withdraw</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactions}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  hide 
                  domain={['dataMin - 20000', 'dataMax + 20000']} 
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#F97316" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-normal leading-[16px] mb-4">Ledger Balance</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">
              {isLoading ? 'Loading...' : wallet ? `USD ${wallet?.ledger_balance.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#56616B] font-normal leading-[16px] mb-4">Total Payout</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">{isLoading ? 'Loading...' : wallet ? `USD ${wallet?.total_payout.toFixed(2)}` : 'N/A'}</div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-normal leading-[16px] mb-4">Total Revenue</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">{isLoading ? 'Loading...' : wallet ? `USD ${wallet?.total_revenue.toFixed(2)}` : 'N/A'}</div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Pending Payout</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">
              {isLoading ? 'Loading...' : wallet ? `USD ${wallet?.pending_payout.toFixed(2)}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">{transactions.length} Transactions</h2>
            <p className="text-sm text-gray-600">Your recent transactions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border rounded-full bg-[#EFF1F6]"
              >
                Filter
                <Filter size={16} />
              </button>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Date Range</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="w-full rounded-lg border-gray-300" />
                        <input type="date" className="w-full rounded-lg border-gray-300" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Transaction Type</div>
                      <select className="w-full rounded-lg border-gray-300">
                        <option>Store Transactions</option>
                        <option>Get Tipped</option>
                        <option>Withdrawals</option>
                        <option>Chargebacks</option>
                        <option>Cashbacks</option>
                      </select>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Transaction Status</div>
                      <select className="w-full rounded-lg border-gray-300">
                        <option>Successful</option>
                        <option>Pending</option>
                        <option>Failed</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                        Clear
                      </button>
                      <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500">
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full bg-[#EFF1F6]">
              Export list
              <Download size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="py-4 text-center">Loading transactions...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={2} className="py-4 text-center text-red-600">{error}</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-4 text-center">No transactions found</td>
                </tr>
              ) : transactions.map((transaction) => (
                <tr key={transaction.id} className="group hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction?.type === 'deposit' ? 'bg-green-100' : 'bg-orange-100'}`}>
                        {transaction?.type === 'deposit' ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 4V8M8 12H8.01M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-base text-[#131316] font-semibold leading-[16px] capitalize mb-2">{transaction?.metadata?.product_name || transaction?.type}</p>
                        <p className="text-[14px] text-[#56616B] font-normal leading-[16px]">{transaction?.metadata?.name || transaction?.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <h3 className="font-bold text-base ">USD {transaction.amount.toFixed(2)}</h3>
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;