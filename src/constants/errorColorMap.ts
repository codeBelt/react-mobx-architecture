import { ToastStatus } from './ToastStatus';
import { SemanticCOLORS } from 'semantic-ui-react';

export const errorColorMap: Record<ToastStatus, SemanticCOLORS> = {
  [ToastStatus.Error]: 'red',
  [ToastStatus.Warning]: 'orange',
  [ToastStatus.Success]: 'green',
};
