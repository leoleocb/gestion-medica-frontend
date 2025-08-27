import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  usuario: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuariosService.getById(this.id).subscribe((data: any) => {
      this.usuario = data;
    });
  }

  onSubmit() {
    this.usuariosService.updateRole(this.id, this.usuario).subscribe({
      next: () => {
        alert('✅ Rol actualizado correctamente');
        this.router.navigate(['/admin/usuarios']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar usuario');
      }
    });
  }
}
