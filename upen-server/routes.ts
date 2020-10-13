const express = require('express');
const routes = express.Router();
import { Request, Response } from "express";

import { Pneu } from '../common/pneu';
import { Veiculo } from '../common/veiculo';
import { Historico } from '../common/historico'
import { Funcionario } from '../common/funcionario';
import { CadastroVeiculo } from './cadastroVeiculo';
import { CadastroHistorico} from './cadastroHistorico'
import { CadastroDePneu } from './cadastroPneu';
import { CadastroFuncionario } from './cadastroFuncionario';

const cdHistorico: CadastroHistorico = new CadastroHistorico()
const cdFuncionario: CadastroFuncionario = new CadastroFuncionario();
const cdPneu: CadastroDePneu = new CadastroDePneu();
const cdVeiculo: CadastroVeiculo = new CadastroVeiculo(); 


export { routes };
