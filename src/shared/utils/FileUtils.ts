import { join } from 'path';

const baseUrl = join(__dirname, '..', '..');

class FileUtils {
  static getPath(...paths: string[]): string {
    return join(...paths);
  }
  
  static getRootPath(...paths: string[]): string {
    return join(baseUrl, ...paths);
  }
}

export default FileUtils;