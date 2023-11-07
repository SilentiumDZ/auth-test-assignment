import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { InLogDTO } from './dto/in.log.dto';

@Injectable()
export class LogService {
  async logToCsv(logData: InLogDTO) {
    const csvWriter = createCsvWriter({
      path: 'log.csv',
      header: [
        {id: 'token', title: 'TOKEN'},
        {id: 'operation', title: 'OPERATION'},
        {id: 'username', title: 'username'},
      ],
      append: true,
    });

    const records = [
      { token: logData.token,  operation: logData.operation, username: logData.username },
    ];

    await csvWriter.writeRecords(records);
  }
}
