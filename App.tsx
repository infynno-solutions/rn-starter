import React from 'react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import store from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

let persistor = persistStore(store);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default App;
