import { AlignmentProvider } from 'alignment-editor-rcl';
import AlignmentEditor from './components/AlignmentEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <AlignmentProvider>
        <AlignmentEditor />
      </AlignmentProvider>
      </header>
    </div>
  );
};

export default App;
