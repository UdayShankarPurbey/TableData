import { Component, OnInit } from '@angular/core';
import { GrowwService } from '../../services/groww/groww.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-gainer',
  standalone: true,
  imports: [
    NzTableModule,
    CommonModule,
  ],
  templateUrl: './top-gainer.component.html',
  styleUrl: './top-gainer.component.css'
})
export class TopGainerComponent implements OnInit{
  tableData : any;

  constructor(
    private growwService : GrowwService
  ) {}

  ngOnInit(): void {
    this.growwService.topGainer().subscribe((res : any) => {
      console.log(res);
      this.tableData = res.categoryResponseMap.TOP_GAINERS.items;
    })
  }

}
