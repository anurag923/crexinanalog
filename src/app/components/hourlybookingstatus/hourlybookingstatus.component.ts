import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-hourlybookingstatus',
  templateUrl: './hourlybookingstatus.component.html',
  styleUrls: ['./hourlybookingstatus.component.css']
})
export class HourlybookingstatusComponent implements OnInit {
  response: any;
  workstatus: any;
  ongoing = false;
  scheduled = false;
  completed = false
  booking_amount: number;
  hourly_duration: any;
  hourly_rate: any;
  loading = true;
  constructor(private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }
  auth_token = sessionStorage.getItem('auth_token');

  ngOnInit(): void {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/singleorder?booking_id=${sessionStorage.getItem('booking_id')}&id=${sessionStorage.getItem('b_id')}&type=${sessionStorage.getItem('type')}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res)
     if(res.response[0].work_status === 'ongoing'){
      this.response = res.response
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = true;
      this.scheduled = false;
      this.completed = false;
     }
     else if(res.response[0].work_status === 'scheduled'){
      this.response = res.response
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = true;
      this.completed = false;
     }
     else{
      this.response = res.response
      this.workstatus = res.singleresponse.work_status
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = false;
      this.completed = true;
     }
     this.loading = false
    })
  }

}
