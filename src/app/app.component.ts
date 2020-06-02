import { Component, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { FormsModule } from "@angular/forms";

import { PagerService } from "./services/pager.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  selectedItem: string = "Item 1";
  isReset = false;
  title = "Angular Search Using ng2-search-filter";
  searchText;

  constructor(private http: Http, private pagerService: PagerService) {}

  ngOnInit() {
    this.getData();
  }

  setPage(page: number) {
    if (!this.isReset) {
      if (this.pager) {
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
      }
    }

    this.pager = this.pagerService.getPager(
      this.allItems.length,
      page,
      true,
      96
    );
    console.log("pager", this.pager);

    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    // console.log('pagedItems', this.pagedItems);
  }

  setItem(item: any) {
    console.log(item);
    this.selectedItem = item.name;
  }

  reset() {
    this.isReset = !this.isReset;
    this.getData();
  }
  under() {
    console.log(96);
    this.allItems = this.allItems.filter(item => item.price <= 40);
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    console.log("pagedItems", this.pagedItems);
    console.log(this.pagedItems.length);
  }

  until() {
    console.log(96);
    this.allItems = this.allItems.filter(
      item => item.price >= 100 && item.price <= 200
    );
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    console.log("pagedItems", this.pagedItems);
    console.log(this.pagedItems.length);
  }

  above() {
    this.allItems = this.allItems.filter(item => item.price >= 200);
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    console.log("pagedItems", this.pagedItems);
    console.log(this.pagedItems.length);
  }

  getData() {
    console.log("getData");
    this.http
      .get(
        "https://raw.githubusercontent.com/flagbit/applicant-frontend-senior/master/data/products.json"
      )
      .map((response: Response) => response.json())
      .subscribe(data => {
        console.log(data["items"].length);
        // set items to json response
        this.allItems = data["items"];

        // initialize to page 1
        this.setPage(1);
      });

    this.setPage(1);
  }
}
