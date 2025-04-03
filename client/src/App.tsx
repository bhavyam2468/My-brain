import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Entry from "@/pages/Entry";
import AllEntries from "@/pages/AllEntries";
import Layout from "@/components/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thoughts/:slug" component={Entry} />
      <Route path="/all" component={AllEntries} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Layout>
      <Router />
      <Toaster />
    </Layout>
  );
}

export default App;
