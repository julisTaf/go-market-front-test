import { Component, OnInit } from '@angular/core';
import {DealService} from '../../shared/deal.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { Deal } from 'src/app/shared/deal';
import { AuthService } from 'src/app/shared/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  deals: Array<Deal>  = [];
  // @ts-ignore
  public p;
  constructor(
    public dealService: DealService,
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    public sanitize:DomSanitizer,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.dealService.getDeals().subscribe(
      (res) => {
        this.deals = res;
        console.log(this.deals)
      }
    )
  }

  dealDetails(id: any){
    this.router.navigate(['deal/'+ id])
  }

  getDealImage(xid: string){
    return this.dealService.getDealImage(xid)
  }
  getSantizeUrl(url : string) {
    return this.sanitize.bypassSecurityTrustUrl(url);
  }

}
