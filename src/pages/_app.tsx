import Layout from '../components/Layout/layout';
import '../../styles/global.scss';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../store/wrapper';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
