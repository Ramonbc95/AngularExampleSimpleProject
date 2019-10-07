import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'client-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  client: Client;
  title: string = "Client details";
  private selectedPicture: File;
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.clientService.getClient(id).subscribe(client => {
          this.client = client;
        });
      }
    })
  }

  selectPicture(event){
    this.selectedPicture = event.target.files[0];
    console.log(this.selectedPicture)
  }

  uploadPicture(){
    this.clientService.uploadPicture(this.selectedPicture, this.client.id)
    .subscribe(client => {
      this.client = client;
      swal.fire('The picture has been uploaded completely!!', `The picture has been uploaded successfully: ${this.client.picture}`, 'success');
    })
  }

}
