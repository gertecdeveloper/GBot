import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_gBot/Configs/config_sat/retornoSat.dart';
import 'package:flutter_gBot/util/globalValues.dart';
import 'package:flutter_gBot/services/operacaoSat.dart';
import 'package:flutter_gBot/util/common_code.dart';
import 'package:flutter_gBot/widgets/widgetsgertec.dart';
import 'package:flutter_masked_text/flutter_masked_text.dart';

class PageAssociarSat extends StatefulWidget {
  @override
  _PageAssociarSatState createState() => _PageAssociarSatState();
}

class _PageAssociarSatState extends State<PageAssociarSat> {
  final cnpj = MaskedTextController(mask: "00.000.000/0000-00", text: GlobalValues.cnpjContribuente); // CNPJ do contribuinte
  final cnpjSoftHouse = MaskedTextController(mask: "00.000.000/0000-00", text: GlobalValues.cnpjSoftHouse); // CNPJ do Software House

  // Inicializa o código de ativação com um valor global, para o usuario não precisar ficar digitando
  final codigoAtivacao = TextEditingController(text: GlobalValues.codAtivarSat); // Codigo de Ativacao do Sat
  final assinaturaAc = TextEditingController(text: GlobalValues.ac); // Assinatura Ac

  CommonGertec commonGertec = new CommonGertec(); //* Classe que possui partes de código comuns em diversas telas

  // Função para validar os valores digitos pelo usuario e realizar a ativação do SAT
  void associarSat() async {
    GlobalValues.codAtivarSat = codigoAtivacao.text; // Salva  o código de ativação para o usuario não precisar ficar digitando em todas as telas
    if (commonGertec.isCodigoValido(codigoAtivacao.text)) {
      if (assinaturaAc.text.length != 0) {
        if (commonGertec.removeMaskCnpj(cnpj.text).length != 14 || commonGertec.removeMaskCnpj(cnpjSoftHouse.text).length != 14) {
          WidgetsGertec.dialogo("Verifique o CNPJ digitado!", context: context);
        } else {
          //* Chama a função Invocar Operação Sat, que recebe como parâmetro a "operação invocada" e um "Map com as chaves e seus respectivos valores".
          RetornoSat retornoSat = await OperacaoSat.invocarOperacaoSat(
            // Passa como parâmetro um Map de argumentos de valores que deseja enviar
            args: {
              'funcao': "AssociarSAT",
              'random': Random().nextInt(999999),
              'codigoAtivar': codigoAtivacao.text.toString(),
              'cnpj': commonGertec.removeMaskCnpj(cnpj.text),
              'cnpjSoft': commonGertec.removeMaskCnpj(cnpjSoftHouse.text),
              'assinatura': assinaturaAc.text
            },
          );

          //? Caso deseje visualizar o retorno completo basta chamar [retornoSat.getResultadoCompleto]

          //* Está função [OperacaoSat.formataRetornoSat] recebe como parâmetro a operação realizada e um objeto do tipo RetornoSat
          //* Retorna uma String com os valores obtidos do retorno da Operação já formatados e prontos para serem exibidos na tela
          // Recomenda-se acessar a função e entender como ela funciona
          String retornoFormatado = OperacaoSat.formataRetornoSat(retornoSat: retornoSat);
          WidgetsGertec.dialogo(retornoFormatado, context: context);
        }
      } else {
        WidgetsGertec.dialogo("Assinatura AC Inválida!", context: context);
      }
    } else {
      WidgetsGertec.dialogo("Código de Ativação deve ter entre 8 a 32 caracteres!", context: context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          color: Colors.white,
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              SizedBox(
                height: 30,
              ),
              WidgetsGertec.formField(cnpj, "CNPJ Contribuinte: ", textInputType: TextInputType.number, iWidht: 400),
              WidgetsGertec.formField(cnpjSoftHouse, "CNPJ Software House: ", textInputType: TextInputType.number, iWidht: 400),
              WidgetsGertec.formField(codigoAtivacao, "Código de Ativação: ", iWidht: 400),
              WidgetsGertec.formField(assinaturaAc, "Assinatura AC: ", iWidht: 400),
              WidgetsGertec.buttonStandard("ASSOCIAR", callback: () => associarSat()),
            ],
          ),
        ),
      ),
    );
  }
}
