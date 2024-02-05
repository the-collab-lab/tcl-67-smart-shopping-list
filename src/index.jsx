import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.css';
import { UserProvider } from './context/UserProvider';

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</StrictMode>,
);
