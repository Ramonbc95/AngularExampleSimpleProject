import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
private client:Client= new Client();
private title:string = "New Client";
private errorList : string[];

  constructor(private clientService: ClientService, 
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  loadClient():void{
    this.activatedRoute.params.subscribe(params => {
      let id= params['id'];
      if(id){
        this.clientService.getClient(id).subscribe((client)=> this.client = client);
        this.title ="Edit Client";
      }
    })
  }

  create():void{
      this.clientService.create(this.client)
      .subscribe(client=>{this.router.navigate(['/clients']),
        swal.fire('New Client', `Client ${client.firstName} created successfully!!`,'success')
      },
      err => {
        this.errorList = err.error.errors as string[];
        console.error('Error code from backend: '+err.status);
        console.error(err.errors.errorList);
      }
      );
  }

  update():void{
    this.clientService.updateClient(this.client).subscribe(
      json=>{ this.router.navigate(['/clients']),
      swal.fire('Client Updated',`${json.message}: ${json.client.firstName}`,'success');
    })
  }

  delete():void{
    this.clientService.deleteClient
  }

}
