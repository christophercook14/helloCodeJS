//reducers/index.js
import { combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import store from '../store';

import code from './code';
import edges from './edges';
import nodes from './nodes';
import username from './username';
import repos from './repos';
import activeRepo from './activeRepo';
import repoContents from './repoContents';
import activeFile from './activeFile';
import activeFileContent from './activeFileContent';

const rootReducer = combineReducers({code, edges, nodes, username, repos, activeRepo, repoContents, activeFile, activeFileContent, routing: routerReducer });

export default rootReducer;

