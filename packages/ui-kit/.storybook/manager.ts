import { addons } from '@storybook/manager-api';
import ormTheme from './ormTheme';

addons.setConfig({
  theme: ormTheme,
});
