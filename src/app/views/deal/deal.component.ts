import { Component, OnInit } from '@angular/core';
import {Deal} from '../../shared/deal';
import {DealService} from '../../shared/deal.service';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  deal = new Deal();
  comment: Array<Comment> = [];
  constructor(
    public dealService: DealService,
    public actRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.dealService.getDeal(id).subscribe(
      res => {
        this.deal = res
      }
    )
    this.dealService.getComment(id).subscribe(
      res => {
        this.comment = res
        console.log(res)
      }
    )
  }


  delDeal(){
    this.dealService.delDeal(this.deal.ID);
  }
}
