import { useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowLeft, ArrowRight, Ban, Clapperboard, ExternalLink, Gamepad2, House, MessageCircle, Music2, Plus, RotateCw, Search, Settings, ShoppingBag, Sparkles, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const shortcuts = [
  { name: 'DuckDuckGo', mark: 'D', style: 'duck', href: 'https://duckduckgo.com/' },
  { name: 'YouTube', mark: 'Y', style: 'youtube', href: 'https://www.youtube.com/' },
  { name: 'ChatGPT', mark: 'C', style: 'chatgpt', href: 'https://chatgpt.com/' },
  { name: 'Discord', mark: 'D', style: 'discord', href: 'https://discord.com/app' },
  { name: 'TikTok', mark: 'T', style: 'tiktok', href: 'https://www.tiktok.com/' },
];
const dockItems = [
  { name: 'home', icon: House }, { name: 'games', icon: Gamepad2 }, { name: 'music', icon: Music2 },
  { name: 'movies', icon: Clapperboard }, { name: 'chat', icon: MessageCircle }, { name: 'ai', icon: Sparkles },
  { name: 'shop', icon: ShoppingBag }, { name: 'no ads', icon: Ban }, { name: 'settings', icon: Settings },
];
type BrowserTab = { id: number; url: string };
function normalizeAddress(raw: string) {
  const value = raw.trim();
  if (!value) return '';
  if (/^(https?:\/\/|about:blank)/i.test(value)) return value;
  if (/^(localhost|[\w-]+\.[a-z]{2,})(:\d+)?([/?#].*)?$/i.test(value)) return `https://${value}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(value)}`;
}
function tabTitle(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, '') || 'New tab'; } catch { return 'New tab'; }
}
function Home({ openSite }: { openSite: (url: string) => void }) {
  const [search, setSearch] = useState('');
  function submit(event: FormEvent) { event.preventDefault(); const url = normalizeAddress(search); if (url) openSite(url); }
  return <>
    <div className="space-scene" aria-hidden="true"><div className="starfield" /><div className="aurora aurora-green" /><div className="aurora aurora-red" /><div className="aurora aurora-glow" /></div>
    <section className="home-content">
      <div className="oxygen-brand"><span className="oxygen-accent" /><h1>CocoX.wtf</h1></div>
      <p className="tagline">bro 2021 da streets blasting bypassed audios was my prime</p>
      <form className="searchbar" onSubmit={submit} role="search">
        <Search size={17} className="search-icon" aria-hidden="true" />
        <input className="search-input" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search or enter a website address" aria-label="Search or enter a website address" data-testid="input-web-search" />
        <button className="search-go" type="submit" aria-label="Search" data-testid="button-search"><ArrowRight size={17} /></button>
      </form>
      <div className="shortcuts" aria-label="Popular websites">{shortcuts.map(site => <button className="shortcut-chip" type="button" onClick={() => openSite(site.href)} key={site.name} aria-label={`Open ${site.name}`} data-testid={`link-${site.name.toLowerCase()}`}><span className={`shortcut-mark ${site.style}`}>{site.mark}</span><span>{site.name}</span></button>)}</div>
    </section><div className="date-line">Thursday, November 12th, 2026</div>
  </>;
}
function BrowserWindow({ tabs, activeId, setActiveId, openTab, closeTab, navigate, goHome }: {
  tabs: BrowserTab[]; activeId: number; setActiveId: (id: number) => void; openTab: () => void;
  closeTab: (id: number) => void; navigate: (url: string) => void; goHome: () => void;
}) {
  const active = tabs.find(tab => tab.id === activeId) ?? tabs[0];
  const [address, setAddress] = useState(active?.url ?? 'about:blank');
  const [reload, setReload] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const url = active?.url ?? 'about:blank';
  function go(raw: string) { const next = normalizeAddress(raw); if (next) { navigate(next); setAddress(next); setShowHelp(false); } }
  function submit(event: FormEvent) { event.preventDefault(); go(address); }
  return <section className="browser-window" aria-label="CocoX.wtf browser">
    <div className="tab-row">{tabs.map(tab => <button key={tab.id} type="button" className={`browser-tab ${tab.id === activeId ? 'active' : ''}`} onClick={() => { setActiveId(tab.id); setAddress(tab.url); }}><span className="tab-dot" /><span className="tab-title">{tab.url === 'about:blank' ? 'New tab' : tabTitle(tab.url)}</span><X size={13} className="tab-close" onClick={e => { e.stopPropagation(); closeTab(tab.id); }} /></button>)}<button type="button" className="new-tab" aria-label="New tab" onClick={openTab}><Plus size={17} /></button></div>
    <div className="address-row"><div className="browser-controls"><button aria-label="Back" onClick={goHome}><ArrowLeft size={15} /></button><button aria-label="Forward" onClick={() => {}}><ArrowRight size={15} /></button><button aria-label="Reload" onClick={() => setReload(n => n + 1)}><RotateCw size={15} /></button><button aria-label="Home" onClick={goHome}><House size={15} /></button></div>
      <form className="address-bar" onSubmit={submit}><input aria-label="Website address" value={address} onChange={e => setAddress(e.target.value)} onFocus={e => e.currentTarget.select()} /><button type="submit" aria-label="Go"><ArrowRight size={14} /></button></form>
      <button className="external-open" type="button" aria-label="Open current website in a regular browser tab" onClick={() => { if (url !== 'about:blank') window.open(url, '_blank', 'noopener,noreferrer'); }}><ExternalLink size={15} /></button>
    </div>
    {url === 'about:blank' ? <div className="browser-empty"><div className="empty-card"><h2>New tab</h2><p>Enter a website address or search words above. Some websites may need to open in a regular browser tab.</p></div></div> : <div className="browser-page"><iframe key={`${activeId}-${url}-${reload}`} src={url} title={`CocoX.wtf browser: ${tabTitle(url)}`} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" /><div className="embed-note"><span>Some websites block being displayed inside another site.</span><button type="button" onClick={() => setShowHelp(v => !v)}>Can't see the page?</button>{showHelp && <p>That site may prohibit iframe embedding. Use the external-open icon to open its official website in a regular browser tab. CocoX.wtf cannot override a site's embedding or sign-in security settings.</p>}</div></div>}
  </section>;
}
function CocoXApp() {
  const [tabs, setTabs] = useState<BrowserTab[]>([]); const [activeId, setActiveId] = useState(0); const [nextId, setNextId] = useState(1);
  const browsing = tabs.length > 0;
  function openSite(url: string) { const id = nextId; setNextId(id + 1); setTabs(prev => [...prev, { id, url }]); setActiveId(id); }
  function openTab() { const id = nextId; setNextId(id + 1); setTabs(prev => [...prev, { id, url: 'about:blank' }]); setActiveId(id); }
  function navigate(url: string) { setTabs(prev => prev.map(tab => tab.id === activeId ? { ...tab, url } : tab)); }
  function closeTab(id: number) { setTabs(prev => { const next = prev.filter(tab => tab.id !== id); if (!next.length) setActiveId(0); else if (id === activeId) setActiveId(next[next.length - 1].id); return next; }); }
  function goHome() { setTabs([]); setActiveId(0); }
  return <main className={`oxygen-page ${browsing ? 'is-browsing' : ''}`}>
    {!browsing ? <header className="browser-chrome home-chrome" aria-label="Browser frame"><div className="tab-row"><div className="browser-tab active"><span className="tab-dot" /><span className="tab-title">Home</span></div><button className="new-tab" type="button" aria-label="New tab" onClick={openTab}><Plus size={17} /></button></div><div className="address-row"><div className="browser-controls"><button aria-label="Home" onClick={goHome}><House size={15} /></button></div><div className="address-bar"><span>cocox://home</span></div></div></header> : <BrowserWindow key={activeId} tabs={tabs} activeId={activeId} setActiveId={setActiveId} openTab={openTab} closeTab={closeTab} navigate={navigate} goHome={goHome} />}
    {!browsing && <Home openSite={openSite} />}
    <nav className="bottom-dock" aria-label="Home navigation">{dockItems.map(({ name, icon: Icon }) => <button type="button" className={`dock-item${name === 'home' && !browsing ? ' selected' : name === 'games' && tabs.some(tab => tab.url.startsWith('https://sites.google.com/classroom.center/view-1/')) ? ' selected' : ''}`} key={name} aria-label={name} onClick={name === 'home' ? goHome : name === 'games' ? () => openSite('https://sites.google.com/classroom.center/view-1/') : undefined}><span className="dock-icon"><Icon size={16} strokeWidth={1.8} /></span><span className="dock-label">{name}</span></button>)}</nav>
  </main>;
}
function Router() { return <RoutedErrorBoundary><Switch><Route path="/" component={CocoXApp} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>; }
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;
