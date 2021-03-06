import universal from 'react-universal-component';

import { Loading, Error } from '../client/common/components/Loader';

const initComponent = component => universal(() => component, {
  loading: Loading,
  error: Error,
});

export default [{
  component: initComponent(import('../client/App')),
  routes: [{
    path: '/',
    exact: true,
    component: initComponent(import('../client/App/screens/Home')),
  }, {
    path: '/404',
    component: initComponent(import('../client/common/screens/Error')),
  }, {
    path: '/:type',
    component: initComponent(import('../client/App/screens/Resources')),
    routes: [{
      path: '/:type/:id',
      component: initComponent(import('../client/App/screens/Resources/screens/Resource')),
    }],
  }],
}];
