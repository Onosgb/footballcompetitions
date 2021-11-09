import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: "football-competitions",
  templateUrl: "./footballCompetitions.component.html",
  styleUrls: ["./footballCompetitions.component.scss"],
})
export class FootballCompetitions implements OnInit {
  competitions: Competition[] = [];
  totalPages: number[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getFootBallCompetiton(1);
  }

  getFootBallCompetiton(pageNumber: number) {
    return this.http
      .get<ApiResponse>(
        `https://jsonmock.hackerrank.com/api/football_competitions?page=${pageNumber}`
      )
      .subscribe((data) => {
        this.competitions = data.data;
        this.totalPages = this.numbers(data.total_pages);
      });
  }

  numbers(page: number) {
    const array: number[] = [];
    for (let i = 0; i < page; i++) {
      array.push(i + 1);
    }

    return array;
  }
}
