
Vue.component('lista-percorso', {
	template:`
			<div class="" style="margin-top:20px;">
				<template v-if="listaSelezionati.length>0 && !richiedi && !goback">	
				<div class="row" style="margin-bottom:20px;">
					<div class="col-lg-12 col-xs-12">
						<h5 class="blu nopadding nomargin"><b>IL TUO PERCORSO SERVIZI</b></h5>
					</div>
				</div>		
				<div class="row" style="position:relative; overflow:hidden;" v-for="(selezionato,indexparent) in listaSelezionati">
						<div class="greyline"></div>

						<template v-if="selezionato[0].lineaApparte == 'gialla'">
							<div class="col-lg-2 col-xs-2">
								<div class="selezionato_path_gialla"></div>
							</div>
						</template>
						<template v-if="selezionato[0].lineaApparte == 'blu'">
							<div class="col-lg-2 col-xs-2">
								<div class="selezionato_path_blu"></div>
							</div>
						</template>						
						<template v-if="selezionato[0].lineaApparte == 'verde'">
							<div class="col-lg-2 col-xs-2">
								<div class="selezionato_path_verde"></div>
							</div>
						</template>	
						<template v-if="selezionato[0].lineaApparte == 'arancione'">
							<div class="col-lg-2 col-xs-2">
								<div class="selezionato_path_arancione"></div>
							</div>
						</template>							
						<template v-if="selezionato[0].lineaApparte == 'viola'">
							<div class="col-lg-2 col-xs-2">
								<div class="selezionato_path_viola"></div>
							</div>
						</template>	

						<div class="col-lg-10 col-xs-10">
							
							<h6 class="blu nopadding nomargin" style="margin-bottom:15px;">
								<span class="max70"><b>{{selezionato[0].servizio}}</b></span>
								<span class="remove pull-right" v-on:click="rimuovi(indexparent,selezionato[0].lineaApparte,selezionato[0].index)"></span>
							</h6>

							<ul v-for="(sottoser,index) in selezionato[0].sottoservizio">
								<li>
									<h5 class="blu nomargin"><b>{{sottoser.sotnome}}</b></h5> 
									<div v-if="sottoser.sotprezzo>0"><h6>a partire da {{sottoser.sotprezzo}}€ {{sottoser.sotaltri}}</h6></div>
									<div v-if="sottoser.sotprezzo==0 && selezionato[0].lineaApparte !='blu'"><h6>Gratuito</h6></div>
									<div v-if="sottoser.sotprezzo==0 && selezionato[0].lineaApparte =='blu'"><h6></h6></div>
									<span class="removesmall pull-right" v-on:click="rimuoviSotto(index,indexparent,sottoser.sotprezzo)"></span>
								</li>
							</ul>
						</div>
				</div>
				
				<hr/>
				<div class="row">
					<div class="col-lg-12 col-xs-12">
						<template v-if="listaSelezionati[0][0].totale>0">
							<h5 class="blu nomargin"><b>TOTALE PREVENTIVO A PARTIRE DA</b></h5><br/> 
							<h3 class="blu nomargin">
								{{listaSelezionati[0][0].totale}}
								<span class="blu" style="font-size:0.9em">EURO + iva</span>
							</h3>
						</template>		
						<h6>
						Richiedi un preventivo se vuoi essere contattato
						dai nostri referenti al fine di ottenere maggiori informazioni e una quotazione
						personalizzata a seconda delle esigenze della
						tua azienda.
						</h6>
					</div>
				</div>
				<hr/>
				<div class="row">
					<div class="col-lg-10 col-xs-10" style="padding:7px 15px;">
						<b class="blu">VUOI ANNULLARE IL PERCORSO?</b>
					</div>
					<div class="col-lg-2 col-xs-2">
						<div class="removeall pull-right" v-on:click="removeall()"></div>
					</div>
				</div>
	
			   <!--{{listaSelezionati}}<br/><br/-->

				<div id="footer-buttons">
					<div class="container">
						<div class="row">
							<div class="col-lg-12 col-xs-12">
								<div class="col-lg-6 col-xs-6 textcenter" v-on:click="vediAltriServizi()" style="cursor:pointer">
									AGGIUNGI ALTRI SERVIZI
								</div>
								<div class="col-lg-6 col-xs-6 nopadding textcenter" v-on:click="attivaFormPreventivo()" style="cursor:pointer">
									<span class="lineup"></span>
									RICHIEDI UN PREVENTIVO
								</div>
							</div>							
						</div>
					</div>	
				</div>
				</template>
				
				<!-- FORM INVIO PREVENTIVO -->
				<template v-if="listaSelezionati.length>0 && richiedi != false && goback != false">
					<div class="row">
						<div class="col-lg-12 col-xs-12">
							<div class="back pull-left" v-on:click="ritornaLista"></div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12 col-xs-12">
							<h5 class="blu"><b>RICHIEDI UN PREVENTIVO</b></h5>
							<p>Compila il form con i tuoi dati ed invia la tua richiesta.<br/>
							Riceverai il preventivo e maggiori informazioni per i servizi necessari alla tua azienda.</p>
							
						<form>
						  <div class="form-group">
							<input type="text" v-model="uscita.data.nome" class="form-control" v-bind:class="{ errorline: this.errors.nome_err}" placeholder="Nome*" id="nome">
							<template v-if="this.errors.nome.length>0">
								<p class="error">{{errors.nome}}</p>
							</template>
						  </div>	
						  <div class="form-group">
							<input type="text" v-model="uscita.data.cognome" v-bind:class="{ errorline: this.errors.cognome_err}" class="form-control" placeholder="Cognome*" id="nome">
							<template v-if="this.errors.cognome.length>0">
								<p class="error">{{errors.cognome}}</p>
							</template>						  
						  </div>
						  <div class="form-group">
							<input type="text" v-model="uscita.data.nomeazienda" v-bind:class="{ errorline: this.errors.nomeazienda_err}" class="form-control" placeholder="Nome Azienda*" id="nome_azienda">
							<template v-if="this.errors.nomeazienda.length>0">
								<p class="error">{{errors.nomeazienda}}</p>
							</template>
						  </div>	
						  <div class="form-group">
							<input type="text" v-model="uscita.data.ragionesociale" v-bind:class="{ errorline: this.errors.ragionesociale_err}" class="form-control" placeholder="Ragione Sociale" id="ragione_sociale">
							<template v-if="this.errors.ragionesociale.length>0">
								<p class="error">{{errors.ragionesociale}}</p>
							</template>						  
						  </div>	
						  <div class="form-group">
							<input type="text" v-model="uscita.data.piva" v-bind:class="{ errorline: this.errors.piva_err}" class="form-control" placeholder="Partita iva o codice fiscale*" id="piva">
							<template v-if="this.errors.piva.length>0">
								<p class="error">{{errors.piva}}</p>
							</template>							  
						  </div>							  
						  <div class="form-group">
							<input type="number" v-model="uscita.data.telefono" v-bind:class="{ errorline: this.errors.telefono}" class="form-control" placeholder="Telefono*" id="telefono">
							<template v-if="this.errors.telefono.length>0">
								<p class="error">{{errors.telefono}}</p>
							</template>	
						  </div>
						  <div class="form-group">
							<input type="email" v-model="uscita.data.email" v-bind:class="{ errorline: this.errors.email}" class="form-control" placeholder="E-mail*" id="email">
							<template v-if="this.errors.email.length>0">
								<p class="error">{{errors.email}}</p>
							</template>	
						  </div>
						  <div class="form-group">
							<input type="email" v-model="conferma" v-bind:class="{ errorline: this.errors.conferma_err}" class="form-control" placeholder="Conferma E-mail*" id="confemail">
							<template v-if="conferma.length>0">
								<p class="error">{{errors.conferma_msg}}</p>
							</template>
						  </div>						  
						</form>							
						<p>*Tutti i campi sono obbligatori</p>	
						</div>
					</div>
					
					<div class="row" style="margin-bottom:50px;">
						<div class="col-lg-12 col-xs-12">
							<h5 class="blu"><b>CONSENSO INFORMATIVA PRIVACY</b></h5>
							<p> 
								Inviando la seguente richiesta di preventivo, dichiaro di avere letto e accettato				
								<a v-on:click="mostramessage">
									l'informativa in materia di trattamento dei dati personali.
								</a>
							</p>
						</div>
					</div>
					<!--div class="row">
						<div class="col-lg-6 col-xs-6">
							<div class="radio">
							  <label><input type="radio" v-model="uscita.data.checks[1].value" value=true name="marketing">Acconsento</label>
							</div>
						</div>
						<div class="col-lg-6 col-xs-6">
							<div class="radio">
							  <label><input type="radio" v-model="uscita.data.checks[1].value" value=false name="marketing">Non Acconsento</label>
							</div>
						</div>
						<div class="col-xs-12">	
						<a>
							Alle attività di marketing
						</a>
						</div>						
					</div>
					
					<div class="row" style="height:150px;">
						<div class="col-lg-6 col-xs-6">
							<div class="radio">
							  <label><input type="radio" name="profilazione">Acconsento</label>
							</div>
						</div>
						<div class="col-lg-6 col-xs-6">
							<div class="radio">
							  <label><input type="radio" name="profilazione">Non Acconsento</label>
							</div>
						</div>	
						<a>
							<div class="col-xs-12">	
								Alle attività di profilazione
							</div>
						</a>						
					</div-->	
					
					<!--div class="row" style="min-height:800px;">
						{{uscita}}
						<br/><br/>
						<!-- {{errors}} -->
					</div-->				

					<div id="footer-buttons" style="cursor:pointer;">
						<div class="container">
							<div class="row">
								<div class="col-lg-12 col-xs-12">
									<div class="col-lg-10 col-xs-10" v-on:click="sendAllSteps(uscita)">
										INVIA LA TUA RICHIESTA
									</div>
									<div class="col-lg-2 col-xs-2">
										<div class="send pull-right"></div>
									</div>
								</div>
							</div>		
						</div>
					</div>				
				</template>
				
				<template v-if="listaSelezionati.length==0">
					<h5>NON HAI SELEZIONATO NESSUN SERVIZIO</h5>
				</template>
			</div>
		`,
	props: ['selezionati'],
	//props: ['tuttiprezzi'],
	data: function(){
		return{
			"richiedi" : false,
			"goback" : false,
			"daeliminare" : '',

	        //"listaSelezionati": this.selezionati
	        "conferma" : '',
	        "errors" : {
	        	"nome":'',
	        	"nome_err":false,
	        	"cognome":'',
	        	"cognome_err":false,
	        	"nomeazienda":'',
	        	"nomeazienda_err":false,
	        	"ragionesociale":'',
	        	"ragionesociale_err":false,
	        	"piva":'',
	        	"piva_err":false,
	        	"email":'',
	        	"email_err":false,
	        	"telefono":'',
	        	"telefono_err":false,
	        	"conferma_msg":'',
	        	"conferma_err":false,
	        	"check_marketing":'',
	        	"check_privacy":'',
	        	"check_profilazione":'',
	        	"check_terzi":'',
	        },
	        "uscita" : {
	        		"serviziSelezionati":[],
	        		"data":{
						"nome":"",
						"cognome":"",
						"nomeazienda":"",
						"ragionesociale":"",
						"piva":"",
						"email":"",
						"telefono":"",
						"checks":
						[
					      {"name":"privacy", "value":true},
					      {"name":"marketing", "value":true},
					      {"name":"profilazione", "value":true},
					      {"name":"terzi", "value":true}
						]
					}
	        }
		}
	},	
	computed:{
		listaSelezionati: {
			cache: false,
			get: function() {
				return this.selezionati;
			}
		}
    },
	methods:{
	mostramessage: function(){
		$('#message').show();
		    $('.info-message').html('Trattamento Dati Personali');
		    $('.text-message').html("Ti informiamo che i dati che fornirai al gestore del presente sito al momento della tua compilazione del 'form contatti' (o form o form mail) disponibile sul sito stesso, saranno trattati nel rispetto delle disposizioni di cui al d.lgs. 196/2003, Codice in materia di protezione dei dati personali. Il form contatti messo a disposizione sul sito ha il solo scopo di consentire ai visitatori del sito di contattare, qualora lo desiderino, il gestore del sito stesso, inviando tramite il suddetto form una email al gestore. La presente informativa riguarda i dati personali inviati dall'utente visitatore al momento della compilazione del form contatti. Ti informiamo del fatto che i dati che conferirai volontariamente tramite il form verranno tramutati in una email che eventualmente potrà essere conservata all'interno del sistema di ricezione di email utilizzato dal titolare del sito. Questi dati non verranno registrati su altri supporti o dispositivi, nè verranno registrati altri dati derivanti dalla tua navigazione sul sito.");		
	},			
		rimuovi : function(index,lineaApparte,orig_index){
			//invio dati al parent per eliminare valori corrispondenti su i_prezzi
			var prices = [];
			var appartenenza = lineaApparte;
			var first_index = orig_index;
			for (var j = 0; j < this.listaSelezionati[index][0].sottoservizio.length; j++) {
				prices.push(this.listaSelezionati[index][0].sottoservizio[j].sotprezzo);
			};
			this.$emit('rimuoviprezzoparent',{prices,appartenenza,first_index});

			//se è primo e ci sono più oggetti sull'array selezionati
			if(index == 0 && this.listaSelezionati.length>1){

				var totaleTemp = this.listaSelezionati[0][0].totale;
				var subprices = [];

				for(var i = 0; i < this.listaSelezionati[0][0].sottoservizio.length; i++){
					subprices.push(this.listaSelezionati[0][0].sottoservizio[i].sotprezzo);
				}
				var totalefirst = subprices.reduce(function(total, num){ return total + num }  , 0);
				this.listaSelezionati.splice(index,1);

				var totaleNew = totaleTemp - totalefirst;
			
				if(this.listaSelezionati[0].length>=0){
					$.extend(this.listaSelezionati[0], { "totale" :''});
					 this.listaSelezionati[0][0].totale = totaleNew;
				}								
			} 
			//se è l'unico nell'array selezionati
			else if(index == 0 && this.listaSelezionati.length<=1){
				this.listaSelezionati.splice(index,1);			
			}
			//se non è il primo dell'array selezionato
			else if(index != 0){
				var totaleTemp = this.listaSelezionati[0][0].totale;
				var subprices = [];

				for(var i = 0; i < this.listaSelezionati[index][0].sottoservizio.length; i++){
					subprices.push(this.listaSelezionati[index][0].sottoservizio[i].sotprezzo);
				}

				var totalefirst = subprices.reduce(function(total, num){ return total + num }  , 0);
				this.listaSelezionati.splice(index,1);
				var totaleNew = totaleTemp - totalefirst;
				this.listaSelezionati[0][0].totale = totaleNew;								
			}

		},
		rimuoviSotto : function(index,indexparent,prezzo){
			//tolgo il valore a i_prezzi (array padre)
			this.$emit('rimuoviprezzo',{prezzo});

			console.log(JSON.stringify(this.listaSelezionati[indexparent][0].sottoservizio[index].sotprezzo));

			var substractTot = this.listaSelezionati[0][0].totale - this.listaSelezionati[indexparent][0].sottoservizio[index].sotprezzo;
			this.listaSelezionati[0][0].totale = substractTot;
			this.listaSelezionati[indexparent][0].sottoservizio.splice(index,1);
			//Force update view
			this.$forceUpdate();
		},
		attivaFormPreventivo : function(){
			this.richiedi = true;
			this.goback = true;
			this.uscita.serviziSelezionati = this.listaSelezionati;
			window.scrollTo(0, 0);
			return;
			throw new Error("Stopping the function!");
		},
		ritornaLista : function(){
			this.richiedi = false;
			this.goback = false;
			this.uscita.serviziSelezionati = [];
		},
		removeall : function(){
			this.listaSelezionati = [];
			this.$emit('removeall');
		},
		vediAltriServizi : function(){
			this.$emit('vediservizi');
		},
		sendAllSteps : function(uscita){
			//controllo campi
			this.cleanErrors();
			var patternIVA = /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$/;
			var patternMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			
			if(this.uscita.data.nome == '' || isNaN(this.uscita.data.nome) != true || this.uscita.data.nome.length<3){
				this.errors.nome = "il campo nome risulta incompleto o non corretto";
				this.errors.nome_err = true;
				return;
			}
			if(this.uscita.data.cognome == '' || isNaN(this.uscita.data.cognome) != true || this.uscita.data.cognome.length<3){
				this.errors.cognome = "il campo cognome risulta incompleto o non corretto";
				this.errors.cognome_err = true;
				return;
			}
			if(this.uscita.data.nomeazienda == '' || this.uscita.data.nomeazienda.length<2){
				this.errors.nomeazienda = "il campo nome azienda risulta incompleto o non corretto";
				this.errors.nomeazienda_err = true;
				return;
			}
			if(!this.uscita.data.ragionesociale == ''){
				if(isNaN(this.uscita.data.ragionesociale) != true || this.uscita.data.ragionesociale.length>4){			
					this.errors.ragionesociale = "il campo ragione sociale risulta incompleto o non corretto";
					this.errors.ragionesociale_err = true;
					return;
				}
			}
			if(this.uscita.data.piva.length>25 || this.uscita.data.piva.search(patternIVA) == -1){
				this.errors.piva ="il campo C.F / partita iva non risulta corretto o completo";
				this.errors.piva_err = true;
				return;
			}
			if(this.uscita.data.telefono.length>20 || this.uscita.data.telefono.length<9 || this.uscita.data.telefono.length==0){
				this.errors.email ="il campo telefono risulta incompleto o non corretto";
				this.errors.email_err = true;
				return;
			}			
			if(this.uscita.data.email.search(patternMAIL) == -1){
				this.errors.email ="il campo email risulta incompleto o non corretto";
				this.errors.email_err = true;
				return;
			}
			if(this.conferma != this.uscita.data.email || this.uscita.data.email== null ){
				this.errors.conferma_msg = "le mail non combaciano";
				this.errors.conferma_err = true;
				return;
			}			
			else{ 
				this.$emit('mandapreventivo',uscita);
			}
		},
		cleanErrors : function(){
				this.errors.nome = "";
				this.errors.nome_err = false;
				this.errors.cognome = "";
				this.errors.cognome_err = false;
				this.errors.nomeazienda = "";
				this.errors.nomeazienda_err = false;
				this.errors.ragionesociale = "";
				this.errors.ragionesociale_err = false;
				this.errors.piva = '';
				this.errors.piva_err = false;
				this.errors.email = '';
				this.errors.email_err = false;
				this.conferma_msg = '';
				this.conferma_err = false;
		}
	}	
});

