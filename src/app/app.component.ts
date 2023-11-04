import { Component, OnInit, ViewChild } from '@angular/core';
import { SongserviceService } from 'src/shared/service/songservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { song } from 'src/shared/model/song';
import { AddsongComponent } from './addsong/addsong.component';
import { DeletesongComponent } from './deletesong/deletesong.component';

function convertDuration(durationInSeconds) {
  let minutes = Math.floor(durationInSeconds / 60);
  let seconds = durationInSeconds % 60;
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'songlms';
  songData: song[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isFilter: boolean = false;
  isSearching = false;
  filteredSongs;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  paginatedSongs: song[];
  pageSize: number = 10;
  currentPageIndex = 0;
  pageLength: number;
  booleanValue: any = false;

  tableHeaders = [
    { name: '', propertyName: 'checkbox' },
    { name: 'Song Name', propertyName: 'songName' },
    { name: 'Artist Name', propertyName: 'artistName' },
    { name: 'Number of Streams', propertyName: 'numberOfStreams' },
    { name: 'Release Year', propertyName: 'releaseYear' },
    { name: 'Duration', propertyName: 'durationInSeconds' },
  ];

  searchForm: FormGroup;
  song: any;

  constructor(
    private songService: SongserviceService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
      searchQueryArtist: this.fb.control(''),
    });

    this.songData = this.songService.songData;
    this.filteredSongs = this.songData;
    this.paginateSongs(this.currentPageIndex, this.pageSize);

    this.searchForm.valueChanges.subscribe(() => {
      this.filterSongs();
    });
  }

  paginateSongs(currentPageIndex: number, pageSize: number) {
    this.currentPageIndex = currentPageIndex;
    this.pageSize = pageSize;
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageLength = this.filteredSongs.length;
    this.paginatedSongs = this.filteredSongs.slice(startIndex, endIndex);
  }

  handlePageChange(event: any) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateSongs(this.currentPageIndex, this.pageSize);
  }

  filterSongs() {
    let searchQuery =
      this.searchForm.controls['searchQuery'].value.toLowerCase();
    let searchQueryArtist =
      this.searchForm.controls['searchQueryArtist'].value.toLowerCase();

    this.filteredSongs = this.songData.filter((song) => {
      return (
        song.songName.toLowerCase().includes(searchQuery) &&
        song.artistName.toLowerCase().includes(searchQueryArtist)
      );
    });

    this.paginateSongs(this.currentPageIndex, this.pageSize);
    this.pageLength = this.filteredSongs.length;
  }

  filterOnTitle(): void {
    console.log('inside filter on title');
    if (this.isSearching) {
      return;
    }
    this.isSearching = true;

    const searchQuery = this.searchForm
      .get('searchQuery')
      ?.value?.toLowerCase();

    this.filteredSongs = this.songData.filter((song) => {
      return song.songName.toLowerCase().includes(searchQuery);
    });

    this.paginateSongs(this.currentPageIndex, this.pageSize);
    console.log(this.filteredSongs);
    this.isSearching = false;
    this.pageLength = this.filteredSongs.length;
  }

  filterOnArtist() {
    console.log('inside filter on artist');
    if (this.isSearching) {
      return;
    }
    this.isSearching = true;

    const searchQueryArtist = this.searchForm
      .get('searchQueryArtist')
      ?.value?.toLowerCase();

    this.filteredSongs = this.songData.filter((song) => {
      return song.artistName.toLowerCase().includes(searchQueryArtist);
    });

    this.paginateSongs(this.currentPageIndex, this.pageSize);
    console.log(this.filteredSongs);

    console.log(this.filteredSongs);
  }

  selectedSongs = [];

  onCheckboxChange(event, song) {
    if (event.target.checked) {
      this.selectedSongs.push(song);
    } else {
      
      this.selectedSongs = this.selectedSongs.filter(
        (selectedSong) => selectedSong.songName !== song.songName
      );
    }
  }

  getSongDurationInMinutes(durationInSeconds) {
    return convertDuration(durationInSeconds);
  }

  sort(colName) {
    if (this.sortColumn === colName) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = colName;
      this.sortDirection = 'asc';
    }

    this.filteredSongs.sort((a, b) => {
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      const propA = a[this.sortColumn];
      const propB = b[this.sortColumn];

      if (propA > propB) {
        return dir;
      } else if (propA < propB) {
        return -dir;
      } else {
        return 0;
      }
    });

    this.paginateSongs(0, this.pageSize);
  }

  openDialog(): void {
    var popoup = this.dialog.open(AddsongComponent, {
      width: '800px',
      data: { songg: this.song },
    });
    popoup.afterClosed().subscribe((item) => {
      console.log(item);
    });
  }

  deleteSelectedSongs(): void {
    const dialogRef = this.dialog.open(DeletesongComponent, {
      data: {
        title: 'Delete Song',
        confirmButton: 'Delete',
        cancelButton: 'Cancel',
        songs: this.selectedSongs,
        onDeleteSong: this.onDeleteSong,
      },
    });
  }
  onDeleteSong = (songs: song[]) => {
    // Remove the deleted songs from songData array
    for (let song of songs) {
      const index = this.songData.findIndex((s) => s.id === song.id);
      if (index !== -1) {
        this.songData.splice(index, 1);
      }
    }
  
    // Clear the selectedSongs array
    this.selectedSongs = [];
  
    // Update the songData and selectedSongs in SongserviceService
    this.songService.songData = this.songData;
    this.paginateSongs(this.currentPageIndex, this.pageSize);
    this.selectedSongs = this.selectedSongs;
  };
}
