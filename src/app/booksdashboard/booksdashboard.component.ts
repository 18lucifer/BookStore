import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { BooksModel } from './booksdashboard.model';

@Component({
  selector: 'app-books-dashboard',
  templateUrl: './booksdashboard.component.html',
  styleUrls: ['./booksdashboard.component.css']
})
export class booksdashboardcomponent implements OnInit {
  
  booksData:any[] = [];
  formValue !: FormGroup;
  booksmodelobj : BooksModel = new BooksModel();
  // booksData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService) { 
    this.getAllBooks;
  }

  ngOnInit() {
    this.formValue = this.formbuilder.group({
      bookid : [''],
      bookname : [''],
      author : [''],
      price : ['']
    })
    this.getAllBooks();
  }

  clickAddBooks(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postBookDetails() {
    this.booksmodelobj.bookid = this.formValue.value.bookid;
    this.booksmodelobj.bookname = this.formValue.value.bookname;
    this.booksmodelobj.author = this.formValue.value.author;
    this.booksmodelobj.price = this.formValue.value.price;
    // console.log("aaaaaaaaaaaaaaaaaa");

    this.api.postBook(this.booksmodelobj)
    .subscribe(res=>{
      
      console.log(res);
      alert("Book Added Successfully");
      // console.log("aaaaaaaaaaaaaaaaaavvvvv");
      let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getAllBooks();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllBooks(){
    this.api.getBook()
    .subscribe(res=>{
      this.booksData = res;
      console.log(this.booksData);
    })
  }

  deleteEmp(row : any){
    this.api.deleteBook(row.bookid)
    .subscribe(res=>{
      alert("Book Deleted");
      this.getAllBooks();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    // console.log("ssssssssssss")
    this.showUpdate = true;
    // console.log("ssssssssssssaaaaaaaaaaa")
    this.booksmodelobj.bookid = row.bookid;
    // this.formValue.controls['']
    this.formValue.controls['bookid'].setValue(row.bookid);
    this.formValue.controls['bookname'].setValue(row.bookname);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['price'].setValue(row.price);
  }

  updateEmployeeDetails(){
  this.booksmodelobj.bookid = this.formValue.value.bookid;
  this.booksmodelobj.bookname = this.formValue.value.bookname;
  this.booksmodelobj.author = this.formValue.value.author;
  this.booksmodelobj.price = this.formValue.value.price;

  this.api.updateBooks(this.booksmodelobj, this.booksmodelobj.bookid)
  .subscribe(res=>{
    alert("Updated Successfull");
    let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getAllBooks();
  })

  }
}
