import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../services/excel/excel.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ScreenerService } from '../../services/screener/screener.service';


@Component({
  selector: 'app-equity-data-master',
  standalone: true,
  imports: [
    NzInputModule,
    NzButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule
  ],
  templateUrl: './equity-data-master.component.html',
  styleUrl: './equity-data-master.component.css'
})
export class EquityDataMasterComponent {
  data : any = [];
  dataToDisplay : any = [];
  loginDataForm : FormGroup;

  constructor(
    private excelService : ExcelService,
    private fb : FormBuilder,
    private screenerService : ScreenerService,
  ) {
    this.loginDataForm = fb.group({
      csrfToken: [''],
      sessionId: ['']
    });
  }

  getData() {
    this.dataToDisplay = [];
    
    let parser = new DOMParser();
    let doc = parser.parseFromString(this.data, 'text/html');

    // Select the table and its body
    let table = doc.querySelectorAll('table')[5];
    let body = table.querySelectorAll('tbody')[0];

    // Get the number of rows in the tbody
    let trLength = body.querySelectorAll('tr').length;

    // Loop through each row
    for (let i = 0; i < trLength; i++) {
      // Get data from each column in the current row
      let Company_Name = body.querySelectorAll('tr')[i].querySelector('td')?.querySelector('span')?.innerText;
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
  }

  getCookieData() {
    console.log(this.loginDataForm.value);
    this.dataToDisplay.map((item : any) => {
      this.screenerService.getScreenerData(item.Company_Name , this.loginDataForm.value).subscribe((res : any) => item.realtedData = res);
    });

  //   [
  //     {
  //         "id": 38,
  //         "name": "ABM Knowledgeware Ltd",
  //         "url": "/company/531161/"
  //     },
  //     {
  //         "id": null,
  //         "name": "Search everywhere: ABM KNOWLEDGEWARE",
  //         "url": "/full-text-search/?q=ABM+KNOWLEDGEWARE"
  //     }
  // ]
  }

  dowloadData() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentDate = new Date();
    let fileName = `${monthNames[(currentDate.getMonth() + 1)]}Month`;
    let sheetName = `Week_${(Math.floor(currentDate.getDate()/7))+1}`

    this.excelService.exportToExcel(this.dataToDisplay ,fileName,sheetName);
  }


}
