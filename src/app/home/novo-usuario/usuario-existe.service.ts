import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { map, switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private NovoUsuarioService: NovoUsuarioService) { }

  usuarioJaExiste(){
    return (control:AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) =>
          this.NovoUsuarioService.verificaUsuarioExistente(nomeUsuario)
          ),
        map((usuarioExiste) =>
          usuarioExiste ? {usuarioExistente: true} : null
        ),
        first()
      );
    }
  }
}
