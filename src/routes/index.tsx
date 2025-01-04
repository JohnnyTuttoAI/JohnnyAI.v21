import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Landing from '../pages/Landing';
import ChatInterface from '../components/ChatInterface';
import Docs from '../pages/Docs';
import MarketAgent from '../pages/agents/MarketAgent';
import TradingAgent from '../pages/agents/TradingAgent';
import SocialAgent from '../pages/agents/SocialAgent';
import ContractAgent from '../pages/agents/ContractAgent';
import CorpAudit from '../pages/agents/CorpAudit';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/market-agent" element={<MarketAgent />} />
        <Route path="/trading-agent" element={<TradingAgent />} />
        <Route path="/social-agent" element={<SocialAgent />} />
        <Route path="/contract-agent" element={<ContractAgent />} />
        <Route path="/corp-audit" element={<CorpAudit />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}