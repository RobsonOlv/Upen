// imports de util
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// componentes
import { AppComponent } from './app.component';
import { DashBoardComponent } from './screens/dash-board/dash-board.component';
import { DashBoardDetailComponent } from './screens/dash-board-detail/dash-board-detail.component';
import { ListaPneusComponent } from './screens/lista-pneus/lista-pneus.component';
import { FuncionarioComponent } from './screens/funcionario/funcionario.component';
import { ListaVeiculoComponent } from './screens/lista-veiculo/lista-veiculo.component';
import { PneuElementoComponent } from './screens/pneu-elemento/pneu-elemento.component';
import { VeiculoElementoComponent } from './screens/veiculo-elemento/veiculo-elemento.component';
import { LixeiraPneusComponent } from './screens/lista-pneus/lixeira-pneus/lixeira-pneus.component'
import { DialogPermanentRemoval } from "./screens/lista-pneus/lixeira-pneus/DialogPermanentRemoval";

// servicos
import { HistoricoService } from './services/HistoricoService/historico.service';
import { FuncionarioService } from './services/FuncionarioService/funcionario.service';
import { ListaPneusService } from './services/ListaPneuService/lista-pneus.service';
import { ListaVeiculoService } from './services/ListaVeiculoService/lista-veiculo.service';
import { PneuElementoService  } from './services/PneuElementoService/pneu-elemento.service';
import { VeiculoElementoService } from './services/VeiculoElementoService/veiculo-elemento.service'





@NgModule({
  declarations: [
    AppComponent,
    ListaVeiculoComponent,
    PneuElementoComponent,
    FuncionarioComponent,
    VeiculoElementoComponent,
    DashBoardComponent,
    DashBoardDetailComponent,
    ListaPneusComponent,
    LixeiraPneusComponent,
    DialogPermanentRemoval
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot([{path: 'dashboard', component: DashBoardComponent},
    {path: 'dashboard/:tipo', component: DashBoardDetailComponent},
    {path: 'funcionarios', component: FuncionarioComponent},
    { path: 'pneus', component: ListaPneusComponent },
    { path: 'pneus/:id', component:PneuElementoComponent},
    { path: 'veiculos', component: ListaVeiculoComponent },
    { path: 'veiculos/:placa', component: VeiculoElementoComponent },
    { path: 'lixeirapneus', component: LixeiraPneusComponent }])
  ],
  providers: [
    HistoricoService, FuncionarioService,
    ListaPneusService, ListaVeiculoService,
    PneuElementoService, VeiculoElementoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
