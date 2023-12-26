import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ICar} from "../../../../interfaces";
import {CarsService} from "../../../../services";


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  @Input() car:ICar
  @ViewChild('fileInput') fileInput:ElementRef<HTMLInputElement>

  constructor(private carsService:CarsService) {
  }
  deleteCar() {
    this.carsService.deleteById(this.car.id).subscribe(()=>{
      this.carsService.setTrigger();
    })
  }

  updateCar() {
    this.carsService.setCarForUpdate(this.car);
  }

  getImageUrl():string {
    return this.car.photo ? this.car.photo : 'assets/empty.jpg';
  }

  handleImageClick():void {
    if (!this.car.photo){
      this.fileInput.nativeElement.click();
    }
  }


  addPhoto(fileInput: HTMLInputElement):void {
    const file:File = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;

    if (file){
      const formData = new FormData();
      formData.append('photo', file);

      this.carsService.addPhotoById(this.car.id, formData).subscribe(()=>{
        this.carsService.setTrigger();
      })
    }
  }
}
