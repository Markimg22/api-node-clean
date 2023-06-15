import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

export const handlebarsAdapter = (
  fileNameTemplate: string
): HandlebarsTemplateDelegate => {
  const source = fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'presentation',
      'templates',
      `${fileNameTemplate}.hbs`
    ),
    'utf-8'
  );
  const template = Handlebars.compile(source);
  return template;
};
