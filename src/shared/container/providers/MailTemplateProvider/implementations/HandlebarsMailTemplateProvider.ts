import fs from 'fs';
import { compile } from 'handlebars';

import { IParseMailTemplateDTO } from '../dtos/IParseMailTemplateDTO';
import { IMailTemplateProvider } from '../models/IMailTemplateProvider';

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = fs.readFileSync(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = compile(templateFileContent);

    return parseTemplate(variables);
  }
}
