//desenvolver métodos de setar as informações e pegar e também o modal para chamar os formulários rápidos
//tipos de relacionamentos
    //multi-fields
    //reference
    //single
//função enter não existe mobile
//em que momentos irá auto-adicionar os campos??
    //pode ser pelo js da página
//poder adicionar botões extras como o botão ligar
//pensar em como irá adicionar uma referência de contato nas reservas, ou de produtos
    //pode ser um formulário/modal
    class ExternalForm {
        constructor (configurations) {
            this.config = configurations;
            this.config.url = this.config.id +'.html';
            this.config.urlModal = 'html/partials/modal.html';
            this.config.prefixId = 'modal';
            var externalForm = this;
            //caso ele já exista retorna, só executa a ação de limpar o formulário
            var modal = $('#' + externalForm.config.prefixId + externalForm.config.id);
            if(modal.length > 0 ) {
                modal.modal();
                return;
            }
            $.ajax({
                url: this.config.urlModal,
                success : function(modal){
                    $.ajax({
                        url: externalForm.config.url,
                        success : function(formHTML) {
                            var form = $(formHTML).find('form').parent().html();
                            var idcTitleStart = formHTML.indexOf('<title>');
                            var idcTitleEnd = formHTML.indexOf('</title>');
                            var title = formHTML.substring(idcTitleStart + '<title>'.length, idcTitleEnd)
                            modal = modal.replace('{{id}}', externalForm.config.prefixId + externalForm.config.id)
                                        .replace('{{body}}', form)
                                        .replace('{{title}}',title)
                            //pode esconder os botões e executa a ação depois através do trigger destes botões
                            modal = $(modal);
                            $('body').append(modal)
                            page.bundleDependence(externalForm.config.id)
                            modal.modal();
                        }
                    })
                }
            })
        }
    }