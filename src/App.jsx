import { Provider } from 'react-redux';
import { store } from './features/store';
import ModerationQueue from './pages/ModerationQueue';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ModerationQueue />
      </div>
    </Provider>
  );
}

export default App;