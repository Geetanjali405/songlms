import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { song } from 'src/shared/model/song';
import { OnInit, ViewChild } from '@angular/core';
import { SongserviceService } from 'src/shared/service/songservice.service';

@Component({
  selector: 'app-deletesong',
  templateUrl: './deletesong.component.html',
  styleUrls: ['./deletesong.component.css'],
})
export class DeletesongComponent implements OnInit {
  songs: song[];
  songData: song[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      onDeleteSong(songs: song[]): unknown;
      title: string;
      confirmButton: string;
      cancelButton: string;
      songs: song[];
    },
    private songService: SongserviceService,
    private dialogRef: MatDialogRef<DeletesongComponent>
  ) {
    this.songs = data.songs;
  }
  ngOnInit(): void {
    this.songData = this.songService.songData;

    console.log(this.songs);
  }

  deleteSong() {
    this.songs.forEach((song) => {
      const index = this.songData.findIndex((s) => s.id === song.id);
      if (index !== -1) {
        this.songData.splice(index, 1);
      }
    });
  
    this.songService.songData = this.songData;
    console.log(this.songData.length);
    this.data.onDeleteSong(this.songs);
    this.dialogRef.close(true);
  }
}
