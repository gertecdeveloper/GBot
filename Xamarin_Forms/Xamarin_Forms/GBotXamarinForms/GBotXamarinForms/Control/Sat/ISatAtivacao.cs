﻿using System;
using System.Collections.Generic;
using System.Text;

namespace GBotXamarinForms.Controls
{
    public interface ISatAtivacao
    {
        void ativacaoSat(string txtCodAtivacao, string txtCNPJContribuinte, string txtCodConfirmacao, int numeroSessao);
        void mostrarDialogo(string mensagem);

    }
}
