import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import { join } from 'path';

export interface Config {
  [key: string]: any;
}

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';

const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);
const envPath = join(
  __dirname,
  '../config',
  `config.${process.env.NODE_ENV || 'development'}.yml`,
);

export default () => {
  const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
  if (typeof commonConfig !== 'object' || commonConfig === null) {
    throw new Error('Invalid YAML configuration');
  }

  const envConfig = yaml.load(readFileSync(envPath, 'utf8'));
  if (typeof envConfig !== 'object' || envConfig === null) {
    throw new Error('Invalid YAML configuration');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return _.merge<Config, Config>(commonConfig as Config, envConfig as Config);
};
