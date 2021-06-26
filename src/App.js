import { Dialog } from '@material-ui/core';
import { AlignmentProvider } from 'alignment-editor-rcl';
import AlignmentEditor from './components/AlignmentEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      
      <Dialog fullWidth={true} maxWidth={'xl'} open={true}>
        <div style={{margin: '12pt'}}>
          <AlignmentProvider>
            <AlignmentEditor />
          </AlignmentProvider>
        </div>
      </Dialog>
    </div>
  );
};

export default App;
