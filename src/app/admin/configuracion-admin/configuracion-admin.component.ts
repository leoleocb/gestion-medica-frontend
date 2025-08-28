import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion-admin.component.html',
  styleUrls: ['./configuracion-admin.component.css']
})
export class ConfiguracionAdminComponent {
  nombreSistema = 'Gestión Médica';
  correoSoporte = 'soporte@clinica.com';
  telefonoSoporte = '+51 999 999 999';

  guardar() {
    alert('✅ Configuración guardada correctamente');
  }
}
