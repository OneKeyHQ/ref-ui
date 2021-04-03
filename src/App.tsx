import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from '~components/layout/NavigationBar';
import '~global.css';
import PortfolioPage from '~pages/PortfolioPage';
import TokenManagementPage from '~pages/TokenManagementPage';
import PoolPage from '~pages/PoolPage';
import PoolsPage from '~pages/PoolsPage';
import SwapPage from '~pages/SwapPage';
import { useCurrentStorageBalance } from '~state/account';
import DepositNotification from '~components/alert/DepositNotification';
import { wallet } from '~services/near';

function App() {
  const storageBalances = useCurrentStorageBalance();

  return (
    <Router>
      {wallet.isSignedIn() && storageBalances === null && (
        <DepositNotification open={storageBalances === null} />
      )}
      <div className="h-screen">
        <NavigationBar />
        <div className="flex flex-col justify-center h-4/5 ">
          <Switch>
            <Route path="/portfolio" component={PortfolioPage} />
            <Route path="/management" component={TokenManagementPage} />
            <Route path="/pools/:poolId" component={PoolPage} />
            <Route path="/pools" component={PoolsPage} />
            <Route path="/" component={SwapPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
