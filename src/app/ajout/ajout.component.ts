import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Iliste, ListeComponent } from '../liste/liste.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare const M: any;
@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajout.component.html',
  styleUrl: './ajout.component.scss',
  providers: [],
})
export class AjoutComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {}

  // les interfaces
  ngOnInit(): void {
    this.formControlName();
    this.get(this.dataName);
    this.etuFormvalueInit();
  }

  ngAfterViewInit(): void {
    if (typeof M !== 'undefined') {
      M.AutoInit();
    }
  }
  // les proprietes
  public form!: FormGroup;
  public data: Iliste[] = [];
  public dataName: string = 'data';
  public formTitle: string = 'Ajouter';
  public btnTitle: string = 'Ajouter';
  public modif: boolean = false;

  // les methodes
  public get(parm: string) {
    if (typeof localStorage != 'undefined') {
      const getData = localStorage.getItem(parm);
      this.data = JSON.parse(getData!);
    }
  }
  public formControlName() {
    this.form = this.fb.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenoms: [''],
      dateNaiss: ['', Validators.required],
      mention: ['DA2I', Validators.required],
      niveau: ['L1', Validators.required],
    });
  }

  public matriculeIsExist(num: string, tableau: Iliste[]) {
    const tab = tableau.map((tab) => tab.matricule);
    const res = tab.indexOf(num);
    return res;
  }

  public addData() {
    if (typeof localStorage !== 'undefined') {
      if (this.form.valid) {
        const addEtu = this.form.value;
        if (!!this.data) {
          const exist = this.matriculeIsExist(addEtu.matricule, this.data);
          if (exist === -1) {
            this.data.push(addEtu);
            const newData = JSON.stringify(this.data);
            localStorage.setItem(this.dataName, newData);
            alert('Ajout avec succes');
            this.form.reset();
            this.router.navigate(['/liste']);
          } else {
            alert('Ce numero matricule existe deja');
            this.form.setValue({ ...this.form.value, matricule: '' });
          }
        } else {
          this.data = [this.form.value];
          const newData = JSON.stringify(this.data);
          localStorage.setItem(this.dataName, newData);
          alert('Ajout avec succes');
          this.form.reset();
          this.router.navigate(['/liste']);
        }
      } else {
        alert('Veuilez completer tout les champs');
      }
    }
  }

  public update() {
    const matricule = this.routeActive.snapshot.paramMap.get('matricule');
    if (matricule) {
      if (typeof localStorage !== 'undefined') {
        if (this.form.valid) {
          const updEtu = this.form.value;
          const indexEtuUpdate = this.data.findIndex(
            (etu) => etu.matricule === matricule
          );
          this.data.splice(indexEtuUpdate, 1, updEtu);

          localStorage.setItem(this.dataName, JSON.stringify(this.data));
          alert('modification reussi');

          this.router.navigate(['/liste']);
        } else {
          alert("Remplis le fomulaire s'il vous plait");
        }
      }
    }
  }

  public etuFormvalueInit() {
    const matricule = this.routeActive.snapshot.paramMap.get('matricule');
    if (matricule) {
      this.formTitle = 'Modifier';
      this.btnTitle = 'Modifier';
      this.modif = true;

      const indexEtuUpdate = this.data.findIndex(
        (etu) => etu.matricule === matricule
      );
      const dataETu = this.data[indexEtuUpdate];

      this.form.patchValue({
        matricule: dataETu.matricule,
        nom: dataETu.nom,
        prenoms: dataETu.prenoms,
        dateNaiss: dataETu.dateNaiss,
        mention: dataETu.mention,
        niveau: dataETu.niveau,
      });
    } else {
      this.formTitle = 'Ajouter';
      this.btnTitle = 'Ajouter';
    }
  }

  // recherche
}
