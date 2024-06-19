import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../services/excel/excel.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ScreenerService } from '../../services/screener/screener.service';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-equity-data-master',
  standalone: true,
  imports: [
    NzInputModule,
    NzButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzSpinModule

  ],
  templateUrl: './equity-data-master.component.html',
  styleUrl: './equity-data-master.component.css'
})
export class EquityDataMasterComponent  {
  data : any = [];
  dataToDisplay : any = [];
  loginDataForm : FormGroup;
  nestedTableData : any = [];
  loader : boolean = false;

  constructor(
    private excelService : ExcelService,
    private fb : FormBuilder,
    private screenerService : ScreenerService,
    private messageService : NzMessageService
  ) {
    this.loginDataForm = fb.group({
      csrfToken: ['oy2CRUOHwDybkU2hBIpP2kyHjoBvshIq'],
      sessionId: ['utnfgn5qqeag1p3nmhh7mrjjr5st2wia']
    });
  }

  getData() {
    this.dataToDisplay = [];
    
    let parser = new DOMParser();
    let doc = parser.parseFromString(this.data, 'text/html');

    let table = doc.querySelectorAll('table')[5];
    let body = table.querySelectorAll('tbody')[0];
    let trLength = body.querySelectorAll('tr').length;

    for (let i = 0; i < trLength; i++) {
      let Company_Name = (body.querySelectorAll('tr')[i].querySelector('td')?.querySelector('span')?.innerText)?.trim();
      let dividend_type = body.querySelectorAll('tr')[i].querySelectorAll('td')[1]?.innerText;
      let dividend_percentage = body.querySelectorAll('tr')[i].querySelectorAll('td')[2]?.innerText;
      let announcement_Date = body.querySelectorAll('tr')[i].querySelectorAll('td')[3]?.innerText;
      let record_Date = body.querySelectorAll('tr')[i].querySelectorAll('td')[4]?.innerText;
      let ex_dividend_date = body.querySelectorAll('tr')[i].querySelectorAll('td')[5]?.innerText;

      this.dataToDisplay.push( {
        Company_Name,
        dividend_type,
        dividend_percentage,
        announcement_Date,
        record_Date,
        ex_dividend_date
      })
    }
    let today = new Date(Date.now());
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00

    this.dataToDisplay = this.dataToDisplay.filter((item : any) => {
      let exDividendDate = new Date(item.ex_dividend_date);
      return exDividendDate >= today;
    });
  }


  async processData() {
    this.loader = true;
    
    const batchSize = 15; // Number of items to process before waiting
    const delayBetweenBatches = 5000; // 10 seconds in milliseconds
    for (let i = 0; i < this.dataToDisplay.length; i++) {
      this.dataToDisplay[i].expand = false;
      try {
        const data : any = await this.screenerService.getScreenerData(this.dataToDisplay[i].Company_Name, this.loginDataForm.value).toPromise();
        let filteredResult: any[] = data.filter((result: any) => result.id);
        this.dataToDisplay[i].relatedData = filteredResult;
      } catch (error) {
        console.error(`Error fetching data for ${this.dataToDisplay[i].Company_Name}:`, error);
        this.messageService.error(`Error fetching data for ${this.dataToDisplay[i].Company_Name}:`);
        break;
      }
      if ((i + 1) % batchSize === 0 || i === this.dataToDisplay.length - 1) {
        if (i !== this.dataToDisplay.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
      }

    }
    this.nestedTableData = this.dataToDisplay.filter((item : any) => item?.relatedData?.length > 1 || item?.relatedData?.length  < 1);
    this.nestedTableData.forEach((item : any) => {
      item.edit_Company_Name = item.Company_Name;
      item.expand = true;
      item.relatedData.forEach((relatedItem : any) => {
          relatedItem.checked = false;
      });
    });
    this.loader = false;
  }
  
  UpdateTable(data : any) {    
    this.screenerService.getScreenerData(data.edit_Company_Name, this.loginDataForm.value).subscribe((item : any) => {
      item = item.filter((result: any) => result.id);
      item.map((result : any) => result.checked = false);

      if(item.length > 0) {
        let index = this.dataToDisplay.findIndex((item : any) => item.Company_Name === data.Company_Name);
        this.dataToDisplay[index].relatedData = item;
      }
    });
  }

  onItemChecked(selectedData : any , data : any , event : any) {
    if(event) {
      let index = this.dataToDisplay.findIndex((item : any) => item.Company_Name === data.Company_Name);
      let filteredRelatedData = this.dataToDisplay.filter((item : any) => item.Company_Name == data.Company_Name)[0].relatedData.filter((item : any) => item.id === selectedData.id);
      this.dataToDisplay[index].relatedData = filteredRelatedData;
      this.nestedTableData = this.nestedTableData.filter((item : any) => item.Company_Name !== data.Company_Name);
    }
  }

  dowloadData() {

  let excelDownloadData : any = [];
  this.dataToDisplay.forEach((element : any) => {
    excelDownloadData.push({
      Company_Name: element.Company_Name,
      dividend_type : element.dividend_type,
      dividend_percentage : element.dividend_percentage,
      announcement_Date : element.announcement_Date,
      record_Date : element.record_Date,
      ex_dividend_date : element.ex_dividend_date,
      screenerName : element.relatedData[0].name,
      screenerUrl : element.relatedData[0].url,
    })
  });
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentDate = new Date();
    let fileName = `${monthNames[(currentDate.getMonth() + 1)]}Month`;
    let sheetName = `Week_${(Math.floor(currentDate.getDate()/7))+1}`

    this.excelService.exportToExcel(excelDownloadData ,fileName,sheetName);
  }


}
