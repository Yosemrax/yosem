import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  items: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.dataService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error al cargar items:', err);
      }
    });
  }

  deleteItem(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      this.dataService.deleteItem(id).subscribe({
        next: () => {
          this.loadItems(); // Recarga la lista después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar item:', err);
        }
      });
    }
  }
}