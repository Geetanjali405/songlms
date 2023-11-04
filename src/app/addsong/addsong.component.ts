import { Component, Inject, OnInit } from '@angular/core';
import { song } from 'src/shared/model/song';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { SongserviceService } from 'src/shared/service/songservice.service';

@Component({
  selector: 'app-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.css']
})
export class AddsongComponent  implements OnInit  {
  inputdata :song[];
    song: song = {
      id: '',
      songName: '',
      artistName: '',
      numberOfStreams: null,
      releaseYear: null,
      durationInSeconds: null
    };
  
    songData: song[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{songg:song},
    public dialog: MatDialog,
    public ref: MatDialogRef<AddsongComponent>,
    private fb: FormBuilder,
    private songService: SongserviceService) { }
  
  ngOnInit() {
    this.song = {
      ...this.data.songg
    };
    this.song.id = Math.floor(Math.random() * 100000).toString();
    this.songData = this.songService.songData;
    this.addSong(this.data);
  }
  
  myForm = this.fb.group({
    songName: this.fb.control(''),
    artistName:  this.fb.control(''),
    numberOfStreams:  this.fb.control(''),
    releaseYear:  this.fb.control(''),
    durationInSeconds: this.fb.control(''),

  });
  
  addSong(song): void {
    if (this.songData.find(s => s.id === this.song.id)) {
      alert('Song already exists!');
    } else {
      this.song.id = Math.floor(Math.random() * 100000).toString();
      this.songData.push(this.song);
      // alert('Song added successfully!');
    }
    console.log(this.song);
    console.log(this.songData.length);
  }
  
    onCancelClick(): void {
      this.ref.close();   
    }
  
    onSaveClick(): void {
      this.ref.close(this.song);
    }
  
  }