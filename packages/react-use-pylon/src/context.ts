import * as React from 'react';

import { PylonContextValues } from './types';

const PylonContext = React.createContext<PylonContextValues | undefined>(
  undefined,
);

export default PylonContext;