# WIP! The scaffolding project including `React` + `React-Router` + `Redux` + `Redux-Form`

### Motivation

Decrease a project startup time and reduce the amount rudimentary work with starting.

### Specific features

- [Deferred component](../master/app/modules/deferred-component/index.jsx) — lazy loading of specific files
- [Auth Area](../master/app/containers/auth-area/index.jsx) — password protected area. 
The current implementation contains dummy scenarion using localhost

### TODO
1. [ ] Add babel-env
1. [ ] Rewrite vendor building using `DLLplugin`
1. [ ] Add proper css rules ordering (styleint)
1. [ ] Check IE support
1. [ ] Add testing
1. [ ] Add visual screenshots testing
1. [ ] Add loader progress for lazy loading components
1. [ ] Add using description

### Install and Run

```
yarn install
yarn start
```

Dev server will run as [http://localhost:8000](http://localhost:8000)

## Production build


```
yarn install
yarn run build
```

Or use `npm` instead of `yarn`
