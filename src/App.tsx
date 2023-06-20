import "./App.css";
import { useAuth } from "pages/context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import UnauthenticatedApp from "pages/unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
