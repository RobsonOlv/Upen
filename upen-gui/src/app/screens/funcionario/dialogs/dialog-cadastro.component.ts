import { Component, Inject } from "@angular/core";
import { Funcionario } from '../../../../../../common/funcionario'
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-cadastro',
    templateUrl: 'dialog-cadastro.html'
  })
  export class DialogCadastro {

    form: FormGroup;
    funcionario: Funcionario = new Funcionario;
    cpfduplicado: Boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private funcL: Funcionario[],
        private FormBuilder: FormBuilder,
        private dialogRef: MatDialogRef<DialogCadastro> ) {}

        ngOnInit() {
            console.log(this.funcL)
            this.form = this.FormBuilder.group({
                nome: ['',
                        Validators.compose([
                            Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(60)
                ])
            ],
                cpf: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ])
            ],
                funcao: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20)
                ])
            ],
                telefone: ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ])
            ],
                veiculos: [[]]
            })
        }
    
        submit(form) {
            if (!this.funcL.find(a=> a.cpf == form.value.cpf)) {
                this.dialogRef.close(this.form.value);
            } else{
                this.cpfduplicado = true;
            }
            
        }

        onMove(): void {
            this.cpfduplicado = false;
        }
  }