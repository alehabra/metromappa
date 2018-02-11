//chiamata ajax al pulsante continua
var saveProductData = (function(){	
	var querystring = window.location.search.substring(1);
	var urlNextPage = "firmacontratto.2.html";
	if(querystring){
		urlNextPage = urlNextPage + '?' + querystring;
	}
	
	function saveData(){
	}
	
	function goNextPage(){
		location.href=urlNextPage;
	}
	
	return {
		saveData: saveData,
		getUrlNextPage: function(){
			return urlNextPage;
		},
		goNextPage : goNextPage
	}
})();


//Chiamata info moduli
var Callmodule = (function(){
	var urlServletModule = "/bin/servlet/product";

	function getmodules(){
		var req = $.ajax({
			url: urlServletModule,
			data: {canale:'SPT',config:'1',descrizione:'S',costi:'S',benefit:'S',data:'2017-07-30'},	
			dataType: 'json',
			type: 'GET'
		});
		
		req.done(function(data){
			console.log('ajax to '+urlServletModule+' DONE');
			console.log(data);
			console.log('-----------------------------');
		});
		
		req.fail(function( jqXHR, textStatus, errorThrown ) {
			console.log('ajax to '+urlServletModule+' FAIL');
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			console.log('-----------------------------');
		});
		return req;
	}
	return {
		Callgetmodules : getmodules(),
	}
})();

//stato moduli selezionato 
var ModSelected = {
	isSelected:false,
	silverSelected:false,
	goldSelected:false,
	platinumSelected:false,
	espandiSilver:false,
	espandiGold:false,
	espandiPlatinum:false,
	espandiPay:false,
	espandiOne:false
}; 
//dati utente da prodotto per sessionstorage
var User = {
	branchCode:'00200',
	QRCodeAgent:'EE45083',
	mkCampaignCode:'ACQOMGMM',
	mkCampaignProduct:'MYG',
	productCode:'MYGEN',
	productDescription:'',
	packageCode :'',
	holdersNumber :1, 
	cardType:'',
	source:'SPT'
};
var searchInArray = function(inputArray, objectAttribute, Attributevalue){
	var results = $.grep(inputArray, function(object, i){
		return object[objectAttribute] == Attributevalue; 
	});
	
	if(results && results[0]){
		return results[0];
	}
	return undefined;
};

var privacyBlock = {
		errorMessages : {title:'Errore',messages:[]},
		warningMessages : {title:'Attenzione', messages:[]},
		technicalMessages : {title:'Problema Tecnico', messages:[]}
	};

var moduliProdotto = [];
var moduloBenefit = [];
var moduloBenefitCarte = [];
var moduloDefault = {};
var moduliCarte = [];
var cardName = '';
var cardSelect = [];

var VueApp = (function(){

	var VueApp = new Vue({
		el: '#productApp',
		data: {
			user : User,
			moduli : {},
			moduliProdotto:moduliProdotto,
			moduliCarte: moduliCarte,
			moduloDefault : moduloDefault,
			moduloBenefit : moduloBenefit,
			moduloBenefitCarte : moduloBenefitCarte,
			modselected : ModSelected,
			privacyBlock : privacyBlock,
			cardName : cardName,
			cardSelect: cardSelect,
			globalLoadingSpinner : false,
			haveProblem : false
		},
		mounted: function () {},
		methods : {
			getModuleData : function(){				
				var req = Callmodule.Callgetmodules;
				var self = this;
				self.globalLoadingSpinner = true;
				
				req.done(function(data){
					//svuoto i messaggi di errore	
					self.privacyBlock.warningMessages.messages.splice(0,self.privacyBlock.warningMessages.messages.length);
					self.privacyBlock.errorMessages.messages.splice(0,self.privacyBlock.errorMessages.messages.length);
					self.globalLoadingSpinner = false;
					
					self.isko= data['esitoWebService'];
					if(self.isko != 'KO'){
						self.haveProblem = false;
						self.moduli=data.products;
						//moduloDefault
						self.moduloDefault = data.products.outputMap[0].valDet[0];					    
						//assegno default
						self.user.packageCode = self.moduloDefault.formaTecnica;
						self.user.productDescription = self.moduloDefault.descrizione;
						//popolo moduliProdotto
						var prodotti = searchInArray(data.products.outputMap, 'valKey', 'PK');
						if(prodotti){ 
							for (var i=0;i<prodotti.valDet.length;i++){
								self.moduloBenefit[i] = prodotti.valDet[i].benefit.split("#");
							}								
							var topush = prodotti.valDet.splice(1,4);
							self.moduliProdotto=topush;
						}
						//popolo moduliCarte
						var carte = searchInArray(data.products.outputMap, 'valKey', '5D');
							if(carte){
								for (var i=0;i<carte.valDet.length;i++){
									self.moduloBenefitCarte[i] = carte.valDet[i].benefit.split("#");
								}
								self.moduliCarte=carte;
						}
						//GESTIONE WARNING	
							if(self.moduliProdotto.length<3){
								self.privacyBlock.warningMessages.title="ATTENZIONE"
								self.privacyBlock.warningMessages.messages.push({message: "Uno o più prodotti mancanti"});	
								self.haveProblem = false;
								return;
							}
							if(self.moduloDefault.descrizione==='' || self.moduloDefault.descrizione===null){
								self.privacyBlock.warningMessages.title="ATTENZIONE"
								self.privacyBlock.warningMessages.messages.push({message: "Una o più informazioni mancanti"});
								self.haveProblem = false;
								return;
							}
							if(self.moduloDefault.formaTecnica==="" || self.moduloDefault.formaTecnica===null){
								self.privacyBlock.technicalMessages.title="PROBLEMA TECNICO"
								self.privacyBlock.technicalMessages.messages.push({message: "codice prodotto mancante"});
								self.haveProblem = true;
								return;						
							}

					}	else{
						self.haveProblem = true;
						self.privacyBlock.technicalMessages.messages.push({message : 'Servizio popolamento moduli non trovato'});
						return;
					}	
				});
						
				req.fail(function(jqXHR,textStatus,errorThrown){
					self.haveProblem = true;
					self.privacyBlock.technicalMessages.messages.push({message: "Una o più informazioni mancanti"});				
				});	
				
			},
						
			populateByUrl : function(){
				function getUrlProprietes(name){
					var url = window.location.href;
					var name = name.replace(/[\[\]]/g, "\\$&");
					var regex = new RegExp("[?&]"+ name +"(=([^&#]*)|&|#|$)"),results = regex.exec(url);
					if(!results) return null;
					if(!results[2]) return '';
					return decodeURIComponent(results[2].replace(/\+/g," "));				
				}
					this.user.branchCode = getUrlProprietes('branchCode');
					this.user.QRCodeAgent = getUrlProprietes('QRCodeAgent');
					this.user.source = getUrlProprietes('source');
			},

			 gotoNextPage : function(){
				 	this.globalLoadingSpinner = true;
				 	if(this.cardName ==''){
						this.privacyBlock.errorMessages.messages.splice(0,self.privacyBlock.errorMessages.messages.length);
						this.globalLoadingSpinner = false;				 		
				 		this.privacyBlock.errorMessages.messages.push({message:'Per proseguire devi selezionare una carta'});
				 	}else{
					 	var cardcode = this.user.cardType.trim();
					 	var cardname = this.cardName.trim();
						 this.user.branchCode.trim();
						 this.user.QRCodeAgent.trim();
						 this.user.mkCampaignCode.trim();
						 this.user.mkCampaignProduct.trim();
						 this.user.productCode.trim();
						 this.user.productDescription.trim();
						 this.user.packageCode.trim();
						 this.user.cardType = {'cardCode':cardcode,'cardName':cardname};
						 this.user.source.trim();
						 
						 sessionStorage.setItem('sessionProduct',JSON.stringify(this.user));
					 
						var querystring = window.location.search.substring(1);
						var urlNextPage = "openaccount.html";
					
						if(querystring){
							urlNextPage = urlNextPage + '?' + querystring;
						}
						
						if(window.location.pathname.indexOf('/test')>=0){
							urlNextPage = "../"+urlNextPage;
						}
						location.href=urlNextPage;
				 	}
			},

			toggleModule : function(codicemodulo,desc){
				this.modselected.silverSelected = codicemodulo == this.moduliProdotto[0].formaTecnica;
				this.modselected.goldSelected = codicemodulo == this.moduliProdotto[1].formaTecnica;
				this.modselected.platinumSelected = codicemodulo == this.moduliProdotto[2].formaTecnica;
				this.user.packageCode = codicemodulo;
				this.user.productDescription = desc;

			},			
			
			toggleModulePay : function(codicecarta,descrizione,index){
				if(this.user.cardType == codicecarta){
					this.user.cardType='';
					this.cardName = '';
				}else{
					this.user.cardType = codicecarta;
					this.cardName = descrizione;
				}
			}
		},
		 beforeMount:function(){
		    this.getModuleData();
		    //this.populateByUrl();
		 }
	});
	
	return VueApp;
})();


