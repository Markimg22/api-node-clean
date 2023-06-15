import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Infocus©',
    description: '**Infocus©** project documentation.',
    version: '1.0.1',
    contact: {
      name: 'Marcos Campos',
      email: '',
      url: '',
    },
    license: {
      name: 'MIT License',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'User',
      description: 'APIs for users',
    },
    {
      name: 'Mail',
      description: 'APIs for mail',
    },
    {
      name: 'Tasks',
      description: 'APIs for tasks',
    },
    {
      name: 'Performance',
      description: 'APIs for performance',
    },
    {
      name: 'Token',
      description: 'APIs for token',
    },
  ],
  paths,
  schemas,
  components,
};
