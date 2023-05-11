import produce, { Draft } from 'immer';
import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
export interface State {
  request: HoppRESTRequest;
  edited: boolean;
  response: HoppRESTResponse | null;
  testResult: PostmanTestResult | null;
  consoles: any[];
  environment: Environment;
  theme: 'dark' | 'light';
  locale: string;
}
import { Environment } from '../components/http/data/environment';
import { HoppRESTRequest } from '../components/http/data/rest';
import { HoppRESTResponse } from '../components/http/helpers/types/HoppRESTResponse';
import { PostmanTestResult } from '../components/http/helpers/types/PostmanTestResult';
import { defaultState } from './defaultState';
export const Context = createContext<
  { store: State } & { dispatch: Dispatch<(state: State) => void> }
>({
  store: defaultState,
  dispatch: () => undefined,
});
function reducer(draft: Draft<State>, action: (state: State) => void) {
  return action(draft);
}
const ConfigProvider = ({ children, theme, locale }: any) => {
  const [store, dispatch] = useReducer(produce(reducer), defaultState);
  const { i18n } = useTranslation();
  useEffect(() => {
    dispatch((state) => {
      state.theme = theme;
    });
  }, [theme]);

  useEffect(() => {
    dispatch((state) => {
      state.locale = locale;
    });
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Context.Provider
      value={{
        store,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ConfigProvider;
