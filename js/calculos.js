$(window).on("load", function () 
{
    $('#ano').text(new Date().getFullYear());

    var rendaMensal = 0;
    var rendaMensalFormatado;

    var totalHorasDiaria = 0;

    var totalDias = 0;

    var valorTotal = 0;
    var valorTotalFormatado;


    $('#rendaMensal').blur(function () 
    {
        if ($('#rendaMensal').val() == rendaMensalFormatado)
            return

            rendaMensal = $('#rendaMensal').val();

            rendaMensalFormatado = formatMoney(rendaMensal);

            $('#rendaMensal').val(rendaMensalFormatado);
        
    });

    $('#valorTotal').blur(function () 
    {
        if ($('#valorTotal').val() == valorTotalFormatado)
            return

        valorTotal = $('#valorTotal').val();

        valorTotalFormatado = formatMoney($('#valorTotal').val());

        $('#valorTotal').val(valorTotalFormatado);
    });

    $('#BotaoCalcularCustoCem').click(function () 
    {
        $('#features').focus();
        totalMensal = $('#rendaMensal').val();
        totalHorasDiaria = $('#totalHorasDiaria').val();
        totalDias = $('#totalDias').val();
        valorTotal = $('#valorTotal').val();

        CalcularCustoCem(TransformarEmNumeros(totalMensal),totalHorasDiaria,totalDias,TransformarEmNumeros(valorTotal));
       
    });

    $('#BotaoNovaSimulacao').click(function () 
    {
        $('#rendaMensal').val("");
        $('#totalHorasDiaria').val("");
        $('#totalDias').val("");
        $('#valorTotal').val("");
        $('#totalHorasMensal').html('.');
        $('#precoHora').html('.');
        $('#custoCem').html('.');
        $('#totalHorasMensalAdiquirirItem').html('.');
        $('#rendaMensal').focus();
    });

    function CalcularCustoCem(rendaMensal,totalHorasDiaria,totalDias,valorTotal) 
    {
        var totalHorasTrabalhadasMensal = totalHorasDiaria * totalDias;
        var precoHora = rendaMensal / totalHorasTrabalhadasMensal;
        var Xhoras = 100;
        var CustoCem = Xhoras / precoHora;
        var totalHorasMensalAdiquirirItem = valorTotal / precoHora;

        MontarResultado(totalHorasTrabalhadasMensal,precoHora,CustoCem,totalHorasMensalAdiquirirItem);
    }

    function MontarResultado(totalHorasTrabalhadasMensal,precoHora,CustoCem,totalHorasMensalAdiquirirItem) 
    {
        $('#totalHorasMensal').html('<b> Você trabalha ' + ArredondamentoDosCalculos(totalHorasTrabalhadasMensal) + ' horas por mês.</b>');
        $('#precoHora').html('<b>o seu preço/hora é de ' + TransformarEmReais(precoHora) + '</b>');
        $('#custoCem').html('<b>Você precisa de ' + ArredondamentoDosCalculos(CustoCem) + ' horas de trabalho para garantir R$100,00 no bolso.</b>');
        $('#totalHorasMensalAdiquirirItem').html('<b>Você precisa de ' + ArredondamentoDosCalculos(totalHorasMensalAdiquirirItem) + '  de horas de trabalho para adiquirir o item no valor de '+$('#valorTotal').val()+'  </b>');
    }

    function TransformarEmNumeros(valor) 
    {
        ValorPosConversao = valor.replace(".", "").replace(",", ".");
        ValorConvertido = parseFloat(ValorPosConversao);  
        return ValorConvertido;
    }

    function TransformarEmReais(valor)
    {
        const valorFormatado = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor)

        return valorFormatado;
    }

    function ArredondamentoDosCalculos(Valor) 
    {
        var ValorArredondado = 0;
        
        var ValorArredondado = Valor.toFixed(0);
 
        return ValorArredondado;
    }

    function formatMoney(amount, decimalCount, decimal, thousands) {
        if (decimalCount == null)
        {
            decimalCount = 2;
        }
        if (decimal == null){
            decimal = ",";
        }
        if (thousands == null){
            thousands = ".";
        }
        try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    
        const negativeSign = amount < 0 ? "-" : "";
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
    
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    };

});