import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './Routers/AppRouter';
import AuthProvider from './Providers/AuthProvider';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
