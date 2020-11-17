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

// ROTAS DE LISTA PNEU / PNEU ELEMENTO

routes.get('/pneus', function (req: Request, res: Response) {
  res.send(JSON.stringify(cdPneu.getPneus()));
});

routes.get('/pneus/:id', function (req: Request, res: Response) {
    res.send(JSON.stringify(cdPneu.getPneu(req.params.id)));
});

routes.post('/pneu', function (req: Request, res: Response) {
    var confirmar: Pneu = <Pneu> req.body;
    var pneu = cdPneu.cadastrar(confirmar);
    if(pneu == "success"){
      var historico = cdHistorico.cadastrar(confirmar.id,"Cadastrou","Pneu"); 
      if (historico) {res.send({"success": "cadastro de pneu com sucesso"});}
    } else {
      res.send({"failed": "cadastro de pneu falhou"});
    }
});

routes.put('/pneu', function (req: Request, res: Response) {
    var pneu: Pneu = <Pneu> req.body;
    pneu = cdPneu.atualizar(pneu);
    if (pneu) {
      res.send({"success": "O pneu foi atualizado com sucesso"});
    } else {
      res.send({"failure": "O pneu não pode ser atualizado"});
    }
});

routes.delete('/pneu/:id', function (req: Request, res: Response){
    var id = req.params.id
      var aux = cdPneu.remover(id);
      if(aux == "success"){
        var historico = cdHistorico.cadastrar(id,"Removeu","Pneu"); 
        if (historico) {res.send({"success": "O pneu foi removido com sucesso"})}
      } else {
        res.send({"failure": "O pneu não pode ser removido"});
      }
  });

routes.get('/pneu/cadastro', (req: Request, res: Response) => {
    var { id } = req.body;

    var bool = cdPneu.idNaoCadastrado(id);
    if(!bool) res.send({"success": "pneu cadastrado"});
    else res.status(404).send({"failure": "pneu nao cadastrado"});
});

routes.delete('/lixeirapneus/:id', function(req: Request, res: Response){
  var id = req.params.id;
  var index = cdPneu.removerPermanente(id);
  if(index != null){
      res.send({"success": "o pneu foi removido permanentemente com sucesso", "index": index});
      var historico = cdHistorico.cadastrar(id,"Removeu Permanentemente","Pneu");
      if (historico) {res.send({"success": "o pneu foi removido com sucesso", "index": index})}
      else { res.status(404).send({"failure": "Remoção de pneu falhou"});}
  }else{
      res.status(404).send({"failure": "Remoção permanente de pneu falhou"});
  }
})

routes.post('/lixeirapneus', (req: Request, res: Response) => {
  var pneu : Pneu = <Pneu> req.body;
  var index = cdPneu.restaurarPneu(pneu);
  if(pneu != null) {
      var historico = cdHistorico.cadastrar(pneu.id,"Cadastrou","Pneu"); 
      if (historico) {res.send({"success": "Pneu cadastrado com sucesso", "index": index});}
      else { res.send({"failure": "Cadastro de pneu falhou"});}
  }
  else 
      res.send({"failure": "Cadastro de pneu falhou"});
})

  routes.get('/lixeirapneus', (req: Request, res: Response) => { 
    res.send(JSON.stringify(cdPneu.listarLixeira()));
  });

// ROTAS DE LISTA VEICULO

routes.get('/veiculos', (req: Request, res: Response) => { 
    res.send(JSON.stringify(cdVeiculo.listarVeiculos()));
});

routes.post('/veiculos', (req: Request, res: Response) => {
    var vel: Veiculo = <Veiculo> req.body;
    var veiculo = cdVeiculo.cadastrarVeiculo(vel);
    if(veiculo) {
        var historico = cdHistorico.cadastrar(vel.placa,"Cadastrou","Veiculo"); 
        if (historico) {res.send({ veiculo });}
        else { res.status(404).send({"falha": "Cadastro de veiculo falhou"});}
    }
    else 
        res.status(404).send({"falha": "Cadastro de veiculo falhou"});
})

routes.delete('/veiculos/:id', function(req: Request, res: Response){
    var id = req.params.id;
    var index = cdVeiculo.removerVeiculo(id);
    if(index != -1){
        var historico = cdHistorico.cadastrar(id,"Removeu","Veiculo"); 
        if (historico) {res.send({"success": "o veículo foi removido com sucesso", "index": index})}
        else { res.status(404).send({"falha": "Remoção de veiculo falhou"});}
    }else{
        res.status(404).send({"falha": "Remoção de veiculo falhou"});
    }
  })

// ROTAS HISTORICO

routes.get('/historicos', (req: Request, res: Response) => { 
    res.send(JSON.stringify(cdHistorico.getHistoricos()));
});

// ROTAS FUNCIONARIO

routes.get('/funcionarios', (req: Request, res: Response) => {
    res.send(cdFuncionario.getFuncionarios());
});

routes.post('/funcionarios', (req: Request, res: Response) => {
    var funcionario: Funcionario = <Funcionario> req.body;
    funcionario = cdFuncionario.cadastrarFuncionario(funcionario);
    if (funcionario) {
      res.send({"success": "o funcionario foi devidamente cadastrado."});
    } else {
        res.status(404).send({"failure": "o funcionario nao pode ser cadastrado"});
    }

});

routes.delete('/funcionarios/:id', (req: Request, res: Response) => {
  var id = req.params.id;
  var aux = cdFuncionario.deletarFuncionario(id);
  if (aux) {
    res.send({"success" : "o funcionario foi devidamente removido."})
  } else{
    res.status(404).send({"failure": "o funcionario nao pode ser cadastrado"});
  }

});

// ROTAS VEICULO ELEMENTO

routes.get('/veiculo/:placa', (req: Request, res: Response) => {
    var placa: string = String(req.params.placa);
  
    var veiculo: Veiculo = cdVeiculo.retornarVeiculo(placa);
    if(!veiculo)  res.status(404).send({"erro": "Veiculo nao cadastrado!"});
  
    res.send({ veiculo });
  });

  routes.put('/veiculo', (req: Request, res: Response) => {
    var veiculo: Veiculo = <Veiculo> req.body;

    veiculo = cdVeiculo.atualizarveiculo(veiculo);
    if(!veiculo) res.status(404).send({"erro": "Veiculo nao cadastrado!"});

    res.send({ veiculo });
});

export { routes };
