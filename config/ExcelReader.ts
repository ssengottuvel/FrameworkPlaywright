import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';

class ExcelReader {

  static filePath = '';
  static lockFilePath = '';

  static setFilePath(filePath: string) {
    this.filePath = filePath;
    this.lockFilePath = `${filePath}.lock`;
  }

  static lockFileSync() {
    while (fs.existsSync(this.lockFilePath)) {
      console.log('File is locked, waiting...');
      // Synchronous sleep, here using while loop for waiting
      const start = new Date().getTime();
      while (new Date().getTime() - start < 500) {} // Wait 500ms
    }
    fs.writeFileSync(this.lockFilePath, 'locked');
    console.log('File locked.');
  }

  static unlockFileSync() {
    if (fs.existsSync(this.lockFilePath)) {
      fs.unlinkSync(this.lockFilePath);
      console.log('File unlocked.');
    }
  }

  static readCellValue(sheetName: string, key: string, rowIndex: number): string | undefined {
    if (!this.filePath) {
      throw new Error('File path is not set');
    }

    this.lockFileSync();
    
    let workbook;
    try {
      workbook = xlsx.readFile(this.filePath);
      const sheet = workbook.Sheets[sheetName];

      if (!sheet) {
        throw new Error(`Sheet ${sheetName} does not exist in ${this.filePath}`);
      }

      // Convert the sheet to JSON
      const sheetJson = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      if (!sheetJson || sheetJson.length === 0) {
        throw new Error(`Sheet ${sheetName} is empty or could not be converted to JSON`);
      }

      // Find the column index of the given key in the first row
      const firstRow = sheetJson[0]; // firstRow is of type string[]
      const columnIndex = firstRow.indexOf(key);

      if (columnIndex === -1) {
        throw new Error(`Key ${key} not found in the first row of sheet ${sheetName}`);
      }

      // Check if the specified row index is valid
      if (rowIndex >= sheetJson.length) {
        throw new Error(`Row index ${rowIndex} is out of bounds for sheet ${sheetName}`);
      }

      // Return the cell value
      return sheetJson[rowIndex][columnIndex];
    } finally {
      this.unlockFileSync();
    }
  }

  static writeToExcel(cellReference: string, value: string) {
    if (!this.filePath) {
      throw new Error('File path is not set');
    }

    this.lockFileSync();
    
    let workbook;
    try {
      workbook = xlsx.readFile(this.filePath);
      const sheetName = workbook.SheetNames[4]; // Adjust the index or name of the sheet you want
      const worksheet = workbook.Sheets[sheetName];
      worksheet[cellReference] = { t: 's', v: value };
      const outputExcelFilePath = 'data/INNSERV.xlsx';
      xlsx.writeFile(workbook, outputExcelFilePath);
    } finally {
      this.unlockFileSync();
    }
  }
}

export { ExcelReader };
