import { AfterViewInit, Component,OnInit} from '@angular/core';
import { AjoutComponent } from '../ajout/ajout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { range } from 'rxjs';



export interface Iliste {
  matricule : string  ,
  nom :string  ,
  prenoms : string  ,
  dateNaiss : Date ,
  mention : string  ,
  niveau : string
}

declare const M : any;
@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [RouterModule,FormsModule,UpperCasePipe,TitleCasePipe,DatePipe],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.scss',
  providers : [AjoutComponent,]
})

export class ListeComponent implements OnInit,AfterViewInit{
  constructor (private ajout : AjoutComponent){}

  ngOnInit(): void {
    this.data=this.ajout.data
  }

  ngAfterViewInit(): void {
    if (typeof M !=='undefined') {
      M.AutoInit();
    }
  }

// propriete
  public data:Iliste[]=[]
  public dataName ='data'
  public filtre!: string
  public selecteditems!:Iliste

// methode
  public get = this.ajout.get(this.dataName)

  trackBy(index: number, item: any): number {
    return item.matricule;
  }

  public open(list : Iliste){
    this.selecteditems = list
  }


  public delete(item:Iliste):void{
    this.selecteditems = item
    const nomItems = item.nom
    const indexItem = this.data.findIndex((res)=>res.nom===nomItems)
    this.data.splice(indexItem,1)
    const newData = this.data

    if(typeof localStorage !== 'undefined'){
      localStorage.setItem(this.dataName,JSON.stringify(newData))
    }
  }

}
