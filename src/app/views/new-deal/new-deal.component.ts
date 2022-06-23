import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DealService} from '../../shared/deal.service';
import {User} from '../../shared/user';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';
import { Deal } from 'src/app/shared/deal';

@Component({
  selector: 'app-new-deal',
  templateUrl: './new-deal.component.html',
  styleUrls: ['./new-deal.component.css']
})
export class NewDealComponent implements OnInit {
  newDealForm: FormGroup;
  dealId : string | null = null;
  currentUser = new User();
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public dealService: DealService,
    public router: Router,
    private actRoute: ActivatedRoute,
  ) {
    this.newDealForm = this.fb.group({
      name: [''],
      description: [''],
      author: localStorage.getItem('id'),
      price: ['']

    });
    this.dealId = this.actRoute.snapshot.paramMap.get('id');
  }

  registerDeal(){
    this.dealService.newDeal(this.newDealForm.value)    
  }

  ngOnInit(): void {
    this.authService.getUserDataFromStorage().subscribe(
      res => {
        this.currentUser = res
      }
    )
  }

}
