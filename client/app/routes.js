// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'Artists',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('homePage', reducer.default);
          injectSagas(sagas.default); // Inject the saga

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [{
        path: '/artist/:artistName',
        name: 'artistPage',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/ArtistPage/reducer'),
            import('containers/ArtistPage/sagas'),
            import('containers/ArtistPage'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('artistPage', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
        childRoutes: [{
          path: 'albums/:albumName',
          name: 'albumPage',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/AlbumPage/reducer'),
              import('containers/AlbumPage/sagas'),
              import('containers/AlbumPage'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('albumPage', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }],
      }],
    }, {
      path: '/nowPlaying',
      name: 'Now Playing',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // import('containers/NowPlayingPage/reducer'),
          // import('containers/NowPlayingPage/sagas'),
          import('containers/NowPlayingPage'),
        ]);

        const renderRoute = loadModule(cb);

        // importModules.then(([reducer, sagas, component]) => {
          // injectReducer('nowPlayingPage', reducer.default);
          // injectSagas(sagas.default);
        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
