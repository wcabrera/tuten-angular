import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  data: any[]
  busqueda = ""
  booking = []
  parametros: any = {}
  constructor(private userService: UserService, private router: Router) { }
  displayedColumns: string[] = ['id', 'cliente', 'fechaCreacion', 'direcciones', 'precio'];

  serverErrorMessages: string;

  ngOnInit() {

    console.log('datasource', this.userService.getToken())
    this.listBooking()

  }


  listBooking() {
    this.parametros.token = this.userService.getToken()
    this.userService.listBooking(this.parametros).subscribe(
      (res: any) => {
        this.data = res.map((d1) => {
          return {
            bookingId: d1.bookingId.toString(),
            cliente: d1.tutenUserClient.firstName + ' ' + d1.tutenUserClient.lastName,
            bookingTime: d1.bookingTime,
            streetAddress: d1.locationId.streetAddress,
            bookingPrice: d1.bookingPrice.toString()
          }

        })
        this.booking = this.data
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  onLogout() {
    // this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  onClickSalir(){
    this.router.navigateByUrl('login');
  }

  onChange(ev) {
 

    this.userService.listBooking(this.parametros).subscribe(
      (res: any) => {


        if (ev && ev.trim() !== '') {

          this.data = res.map((d1) => {
            return {
              bookingId: d1.bookingId.toString(),
              cliente: d1.tutenUserClient.firstName + ' ' + d1.tutenUserClient.lastName,
              bookingTime: d1.bookingTime,
              streetAddress: d1.locationId.streetAddress,
              bookingPrice: d1.bookingPrice.toString()
            }

          })
          this.booking = this.data.filter(function (e) {

            let bookingId = (e.bookingId.toString()).toLowerCase()
            let bookingPrice = (e.bookingPrice.toString()).toLowerCase()
            return bookingId.indexOf(ev.toLowerCase()) != -1 || bookingPrice.indexOf(ev.toLowerCase()) != -1;
          });


        }

      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );

  }


}
