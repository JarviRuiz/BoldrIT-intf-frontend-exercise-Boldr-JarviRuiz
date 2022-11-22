import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { WorkService } from '../../services/work.service'
import { Work, Author } from '../../interfaces/WorkResponse'
import { Type } from '../../interfaces/TypeResponse'



@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit, OnDestroy{

  public loading:boolean = true;

  public works:Work[] = [];
  public filter:string = '';
  public types:Type[] = [];
  public type:string = '';
 

  public rows:number = 4;
  public offset:number = 0;
  public pages:Array<number> = [ 1 , 2 ,3 ,4 ,5];


   public work:Work = {};

   private subscription:Subscription[]=[];

  constructor(private _workService: WorkService) { }

  ngOnInit(): void {
    this.getWorks();
    this.getTypes();
  }

  getWorks(){
    this.loading = true;  
    this.subscription.push(
        this._workService.getWorks(this.rows, this.offset).subscribe(
          works=> {
            this.works = works;
            this.loading = false;      
          }, 
          error=> {
            console.log(error)
          })
      )
  }

  getTypes(){
    this.subscription.push(
        this._workService.getTypes().subscribe(
          types =>{
            this.types = types;
          },
          error=>{
            console.log(error)
          })
      )
  }

  onFilter(){
    this.loading = true;  
    this.subscription.push(
        this._workService.filterByType(this.type, this.filter, this.rows, 0).subscribe(
          works => {
            console.log(works)
            this.works = works;
            this.loading = false;  
          },
          error => {
            console.log(error);
          })
      );
  }

  getWork(doi:string){
    this.subscription.push(
        this._workService.getWork(doi).subscribe(
          work => {
            
            this.work = work; 
            if(this.work.title!.length === 0 ){
              this.work.title = ['Title not displayed'];
            }

            if(this.work.published){
             this.work.published = this.formatDate(this.work.published['date-parts'][0]); 
            }else{
              this.work.published = 'Not data';
            }
          },
          error => {
            console.log(error);
          })
      );
  }

  onChangePage(page:any){
    this.loading = true;  
    if(page == 'next'){
      this.offset = this.offset + this.rows ;
    }
    else if(page == 'previous'){
      this.offset = this.offset - this.rows ;
        if(this.offset < 1){
          this.offset = 0;
        }
    }
    else{
      this.offset = this.rows * (page -1);
    }
    this.subscription.push(
        this._workService.filterByType(this.type, this.filter, this.rows, this.offset).subscribe(
          works => {
            this.works = works;
            this.loading = false;  
          },
          error => {
            console.log(error);
          })
      );
  }

  private formatDate(date: Array<number>){
    let format_date:string = '';
    for(let i = date.length - 1; i >= 0; i--){
       format_date =  `${format_date}/${date[i]}`;
    }
    return format_date.slice(1);
  }

  ngOnDestroy():void{
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
