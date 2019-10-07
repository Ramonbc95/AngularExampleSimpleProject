import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  title: string = 'Clients';
  clientList: Client[];
  paginator: any;
  //private is injecting the variable to this class
  constructor(private clientService: ClientService, private ActivatedRoute: ActivatedRoute) {
    //this.clientService = clientService; Another way to inject if no use private
  }

  ngOnInit() {

    this.ActivatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clientService.getClients(page).pipe(
        tap((response: any) => {
          console.log('ClientsComponent: tap 3');
          (response.content as Client[]).forEach(client => {
            console.log(client.firstName);
          });
        })
      ).subscribe(
        //Arg (IN) => asign clients to clientList
        response => {
          this.clientList = response.content as Client[];
          this.paginator = response;
        }
        /* The same like above
        function (clients){
          this.clients = clients;
        }*/
      );
    });
  }

  delete(client: Client): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `Do you want delete the client ${client.firstName} ${client.lastName}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(client.id).subscribe(
          response =>
            this.clientList = this.clientList.filter(cli => cli !== client)
        );
        console.log("erfewrfwqerfqef--------------------")
        swalWithBootstrapButtons.fire(
          'Deleted!',
          `Your client ${client.firstName} ${client.lastName} has been deleted.`,
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your client is safe :)',
          'error'
        )
      }
    })
  }

}
