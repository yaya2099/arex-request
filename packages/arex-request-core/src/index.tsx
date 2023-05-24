import './i18n';
import 'allotment/dist/style.css';

import Collection from './components/collection';
import { HttpProps } from './components/http';
import TestResult from './components/http/components/http/TestResult';
import RequestResultOverview from './components/run/RequestResultOverview';
import Http from './Http';
export { Collection, Http, RequestResultOverview, TestResult };
export type { HttpProps };
