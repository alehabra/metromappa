
Vue.component('lista-servizi-gialla', {
	template:`
		<div class="line-blu-separator">
			<div class="container">
				<div class="col-lg-12 col-xs-12">
					<div class="gialla row" v-on:click="impostaclick(); mostraDescLungaGiallo();" data-toggle="collapse" data-target="#listaGialla">
						<div class="col-lg-8 col-xs-8 nopadding">
							<h5>Linea 3</h5>
							<span class="blu">{{listaServizi.lineaGialla.descrizione}}</span>
						</div>
						<div class="col-lg-4 col-xs-4 nopadding">
							<span class="pull-right" v-bind:class="[GiallaDesc ? 'minus' : !GiallaDesc,'plus']"></span>
						</div>
					</div>
				</div>	
				<div id="listaGialla" class="collapse listes">
					<div class="margin15topbottom">
						<div class="col-lg-12 col-xs-12">
							<div class="row">
								<p class="grigio">{{listaServizi.lineaGialla.descrizione_lunga}}</p>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-xs-12">
						<div class="row">
							<div class="col-lg-8 col-xs-8 nopadding">
								<h5><b>Vedi tutti i servizi della linea</b></h5>
							</div>
							<div class="col-lg-4 col-xs-4 nopadding">
								<span class="pull-right"  v-on:click="mostraServiziGiallo" v-bind:class="[GiallaTutti ? 'minus' : !GiallaTutti,'plus']" data-toggle="collapse" data-target="#tuttiGialla"></span>
							</div>
						</div>
					</div>	
					<div id="tuttiGialla" class="collapse">
						<div class="col-lg-12 col-xs-12"> 	
						    <template v-for="(single,index) in servizi.lineaGialla.servizi">
								<div class="row margin15topbottom servizioInlista" 
									 :key="single.nomeServizio">
								    <div class="col-lg-8 col-xs-8 nopadding">
										<span class="blu">{{single.nomeServizio}}</span>
								    </div>
								    <div class="col-lg-4 col-xs-4 nopadding">
										<span class="pull-right nomargin" 
											  v-on:click="mostraSottoGiallo(index)" 
											  v-bind:class="getClass('GiallaSoto', index)"
											  data-toggle="collapse" 
											  :data-target='"#singoloGialla-" + index'>
										</span>
								    </div>
								</div>
								<div v-bind:id="['singoloGialla-'+index]" class="collapse">
									<div class="row">	
									  <p class="grigio">{{single.descrizione}}</p>
									  <div style="margin-top:20px; inline-block;">
										<b>Visualizza il servizio sulla mappa</b> 
										<span class="pull-right forward" v-on:click="centraNellaMappa(single.nomeServizio,single.x,single.y,single.selected,single.classe,index,single.descrizione,single.descrizione_lunga)"></span>
									  </div>
									</div>  
								</div>
						    </template>
						</div>
					</div>
				</div>
			</div>
		</div>
		`,
	props: ['servizi','extdesktop'],
	data: function(){
		return{
			servizioAggiunto : '',
			'GiallaDesc':false,
			'GiallaTutti':false,
			'GiallaSoto0':true,
			'GiallaSoto1':true,
			'GiallaSoto2':true,
			'GiallaSoto3':true,
			'GiallaSoto4':true,
			'estremo':this.extdesktop,
			'enterbymenu':false		
		}
	},	
	computed: {
		listaServizi() {
			return this.servizi
		}
    },
    watch: {
    	extdesktop: function(val){
    		this.mostraDescLungaGiallo();
    	}
    },    
	methods:{
		impostaclick : function(){
			this.enterbymenu = true;
		},
		mostraDescLungaGiallo : function(){
			//se GiallaDesc false ritorna piu
			//attivazione da pallino e linea
			if(this.extdesktop == 'gialla' && this.GiallaDesc == false){
				this.GiallaDesc = true;
				this.apriDesc('gialla');
				$('#listaGialla').collapse("show");
			}
			//caso attivazione pallino ma vpglio chiudere il modale
			else if(this.extdesktop == 'gialla' && this.GiallaDesc == true && this.enterbymenu == true){
				$('#listaGialla').collapse("hide");
				this.GiallaDesc = false;
				this.enterbymenu = false;
				this.$forceUpdate();
			}						
			//caso in cui non si sia scelto nessun pallino all'inizio
			else if(this.extdesktop == '' && this.GiallaDesc == false){
				this.GiallaDesc = true;
				this.apriDesc('gialla');
				this.enterbymenu = false;
				this.$forceUpdate();
				$('#listaGialla').collapse("hide");
			}
			//caso nel quale cerco di richiudere la descrizione con pallino selezionato
			else if(this.extdesktop == '' && this.GiallaDesc == true){
				this.GiallaDesc = false;
				$('#listaGialla').collapse("hide");
			}
			else if(this.extdesktop != 'gialla' && this.GiallaDesc == true){
				this.GiallaDesc = false;
				$('#listaGialla').collapse("hide");
			}			
			//caso nel quale seleziono un pallino di colore diverso e cerco di espandere dal menu questo
			else if(this.extdesktop != 'gialla' && this.GiallaDesc == false && this.enterbymenu == true){
				this.GiallaDesc = true;
				this.enterbymenu = false;
				this.cambiaprop('gialla');
				this.apriDesc('gialla');
				this.$forceUpdate();
			}
			else if(this.extdesktop != 'gialla' && this.GiallaDesc == true && this.enterbymenu == true){
				this.GiallaDesc = false;
				$('#listaGialla').collapse("hide");
			}		
			return this.GiallaDesc;
		},
		mostraServiziGiallo : function(){
			if(this.GiallaTutti == false){
				this.GiallaTutti = true;	
			}
			else{ this.GiallaTutti = false}
			return this.GiallaTutti;
		},
		cambiaprop : function(colore){
			this.$emit('cambiacolore',{colore})
		},
		apriDesc : function(propriety){
		 this.$emit('linebigger',{propriety});
		},			
		 getClass(val, index){
		  return {
			minus: !this['GiallaSoto'+index],
			plus: this['GiallaSoto'+index]
		  }
		},		
		mostraSottoGiallo : function(index){
			if(index==0 && this.GiallaSoto0){this.GiallaSoto0=false}
			else if(index==0 && !this.GiallaSoto0){this.GiallaSoto0=true}
			else if(index==1 && this.GiallaSoto1){this.GiallaSoto1=false}
			else if(index==1 && !this.GiallaSoto1){this.GiallaSoto1=true}
			else if(index==2 && this.GiallaSoto2){this.GiallaSoto2=false}
			else if(index==2 && !this.GiallaSoto2){this.GiallaSoto2=true}	
			else if(index==3 && this.GiallaSoto3){this.GiallaSoto3=false}
			else if(index==3 && !this.GiallaSoto3){this.GiallaSoto3=true}
			else if(index==4 && this.GiallaSoto4){this.GiallaSoto4=false}
			else if(index==4 && !this.GiallaSoto4){this.GiallaSoto4=true}							
		},
		centraNellaMappa : function(nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga){
			this.$emit('centramappa',{nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga});
			this.$forceUpdate();
			return;
		}		
	}	
});

Vue.component('lista-servizi-blu', {
	template:`
		<div class="line-blu-separator">
			<div class="container">
				<div class="col-lg-12 col-xs-12">
					<div class="blue row" v-on:click="impostaclick(); mostraDescLungaBlu();" data-toggle="collapse" data-target="#listaBlu">
						<div class="col-lg-8 col-xs-8 nopadding">
							<h5>Linea 1</h5>
							<span class="blu">{{listaServizi.lineaBlu.descrizione}}</span>
						</div>
						<div class="col-lg-4 col-xs-4 nopadding">
							<span class="pull-right" v-bind:class="[BluDesc ? 'minus' : !BluDesc,'plus']"></span>
						</div>
					</div>
				</div>	
				<div id="listaBlu" class="collapse listes">
					<div class="margin15topbottom">
						<div class="col-lg-12 col-xs-12">
							<div class="row">
								<p class="grigio">{{listaServizi.lineaBlu.descrizione_lunga}}</p>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-xs-12">
						<div class="row">
							<div class="col-lg-8 col-xs-8 nopadding">
								<h5><b>Vedi tutti i servizi della linea</b></h5>
							</div>
							<div class="col-lg-4 col-xs-4 nopadding">
								<span class="pull-right"  v-on:click="mostraServiziBlu" v-bind:class="[BluTutti ? 'minus' : !BluTutti,'plus']" data-toggle="collapse" data-target="#tuttiBlu"></span>
							</div>
						</div>
					</div>	
					<div id="tuttiBlu" class="collapse">
						<div class="col-lg-12 col-xs-12"> 	
						    <template v-for="(single,index) in servizi.lineaBlu.servizi">
								<div class="row margin15topbottom servizioInlista" 
									 :key="single.nomeServizio">
								    <div class="col-lg-8 col-xs-8 nopadding">
										<span class="blu">{{single.nomeServizio}}</span>
								    </div>
								    <div class="col-lg-4 col-xs-4 nopadding">
										<span class="pull-right nomargin" 
											  v-on:click="mostraSottoGiallo(index)" 
											  v-bind:class="getClass('BluSoto', index)"
											  data-toggle="collapse" 
											  :data-target='"#singoloBlu-" + index'>
										</span>
								    </div>
								</div>
								<div v-bind:id="['singoloBlu-'+index]" class="collapse">
									<div class="row">	
									  <p class="grigio">{{single.descrizione}}</p>
									  <div style="margin-top:20px; inline-block;">
										<b>Visualizza il servizio sulla mappa</b> 
										<span class="pull-right forward" v-on:click="centraNellaMappa(single.nomeServizio,single.x,single.y,single.selected,single.classe,index,single.descrizione,single.descrizione_lunga)"></span>
									  </div>
									</div>  
								</div>
						    </template>
						</div>
					</div>
				</div>
			</div>
		</div>
		`,
	props: ['servizi','extdesktop'],
	data: function(){
		return{
			servizioAggiunto : '',
			'BluDesc':false,
			'BluTutti':false,
			'BluSoto0':true,
			'BluSoto1':true,
			'BluSoto2':true,
			'BluSoto3':true,
			'BluSoto4':true,
			'BluSoto5':true,
			'BluSoto6':true,
			'BluSoto7':true,
			'BluSoto8':true,
			'estremo':this.extdesktop,
			'enterbymenu':false			
		}
	},	
	computed: {
		listaServizi() {
			return this.servizi
		}	
    },
    watch: {
    	extdesktop: function(val){
    		this.mostraDescLungaBlu();
    	}
    },
	methods:{
		impostaclick : function(){
			this.enterbymenu = true;
		},		
		mostraDescLungaBlu : function(){
			if(this.extdesktop == 'blu' && this.BluDesc == false){
				this.BluDesc = true;
				this.apriDesc('blu');
				$('#listaBlu').collapse("show");
			}
			else if(this.extdesktop == 'blu' && this.BluDesc == true && this.enterbymenu == true){
				$('#listaBlu').collapse("hide");
				this.BluDesc = false;
				this.enterbymenu = false;
				this.$forceUpdate();
			}			
			else if(this.extdesktop == '' && this.BluDesc == false){
				this.BluDesc = true;
				this.apriDesc('blu');
				this.enterbymenu = false;
				this.$forceUpdate();				
				$('#listaBlu').collapse("hide");
			}
			else if(this.extdesktop == '' && this.BluDesc == true){
				this.BluDesc = false;
				$('#listaBlu').collapse("hide");
			}
			else if(this.extdesktop != 'blu' && this.BluDesc == true){
				this.BluDesc = false;
				$('#listaBlu').collapse("hide");
			}			
			else if(this.extdesktop != 'blu' && this.BluDesc == false && this.enterbymenu == true){
				this.BluDesc = true;
				this.enterbymenu = false;
				this.cambiaprop('blu');
				this.apriDesc('blu');
				this.$forceUpdate();
			}
			else if(this.extdesktop != 'blu' && this.BluDesc == true && this.enterbymenu == true){
				this.BluDesc = false;
				$('#listaBlu').collapse("hide");
			}													
			return this.BluDesc;
		},
		mostraServiziBlu : function(){
			if(this.BluTutti == false){
				this.BluTutti = true;	
			}
			else{ this.BluTutti = false}
			return this.BluTutti;
		},
		cambiaprop : function(colore){
			this.$emit('cambiacolore',{colore})
		},		
		apriDesc : function(propriety){
		 this.$emit('linebigger',{propriety});
		},			
		 getClass(val, index){
		  return {
			minus: !this['BluSoto'+index],
			plus: this['BluSoto'+index]
		  }
		},		
		mostraSottoGiallo : function(index){
			if(index==0 && this.BluSoto0){this.BluSoto0=false}
			else if(index==0 && !this.BluSoto0){this.BluSoto0=true}
			else if(index==1 && this.BluSoto1){this.BluSoto1=false}
			else if(index==1 && !this.BluSoto1){this.BluSoto1=true}
			else if(index==2 && this.BluSoto2){this.BluSoto2=false}
			else if(index==2 && !this.BluSoto2){this.BluSoto2=true}	
			else if(index==3 && this.BluSoto3){this.BluSoto3=false}
			else if(index==3 && !this.BluSoto3){this.BluSoto3=true}
			else if(index==4 && this.BluSoto4){this.BluSoto4=false}
			else if(index==4 && !this.BluSoto4){this.BluSoto4=true}	
			else if(index==5 && this.BluSoto5){this.BluSoto5=false}
			else if(index==5 && !this.BluSoto5){this.BluSoto5=true}
			else if(index==6 && this.BluSoto6){this.BluSoto6=false}
			else if(index==6 && !this.BluSoto6){this.BluSoto6=true}				
			else if(index==7 && this.BluSoto7){this.BluSoto7=false}
			else if(index==7 && !this.BluSoto7){this.BluSoto7=true}	
			else if(index==8 && this.BluSoto8){this.BluSoto8=false}
			else if(index==8 && !this.BluSoto8){this.BluSoto8=true}					

		},
		centraNellaMappa : function(nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga){
			this.$emit('centramappa',{nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga});
			this.$forceUpdate();
			return;
		}	
	}	
});

Vue.component('lista-servizi-verde', {
	template:`
		<div class="line-blu-separator">
			<div class="container">
				<div class="col-lg-12 col-xs-12">
					<div class="verde row" v-on:click="impostaclick(); mostraDescLungaVerde();" data-toggle="collapse" data-target="#listaVerde">
						<div class="col-lg-8 col-xs-8 nopadding">
							<h5>Linea 2</h5>
							<span class="blu">{{listaServizi.lineaVerde.descrizione}}</span>
						</div>
						<div class="col-lg-4 col-xs-4 nopadding">
							<span class="pull-right" v-bind:class="[VerdeDesc ? 'minus' : !VerdeDesc,'plus']"></span>
						</div>
					</div>
				</div>	
				<div id="listaVerde" class="collapse listes">
					<div class="margin15topbottom">
						<div class="col-lg-12 col-xs-12">
							<div class="row">
								<p class="grigio">{{listaServizi.lineaVerde.descrizione_lunga}}</p>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-xs-12">
						<div class="row">
							<div class="col-lg-8 col-xs-8 nopadding">
								<h5><b>Vedi tutti i servizi della linea</b></h5>
							</div>
							<div class="col-lg-4 col-xs-4 nopadding">
								<span class="pull-right"  v-on:click="mostraServiziVerde" v-bind:class="[VerdeTutti ? 'minus' : !VerdeTutti,'plus']" data-toggle="collapse" data-target="#tuttiVerde"></span>
							</div>
						</div>
					</div>	
					<div id="tuttiVerde" class="collapse">
						<div class="col-lg-12 col-xs-12"> 	
						    <template v-for="(single,index) in servizi.lineaVerde.servizi">
								<div class="row margin15topbottom servizioInlista" 
									 :key="single.nomeServizio">
								    <div class="col-lg-8 col-xs-8 nopadding">
										<span class="blu">{{single.nomeServizio}}</span>
								    </div>
								    <div class="col-lg-4 col-xs-4 nopadding">
										<span class="pull-right nomargin" 
											  v-on:click="mostraSottoGiallo(index)" 
											  v-bind:class="getClass('VerdeSoto', index)"
											  data-toggle="collapse" 
											  :data-target='"#singoloVerde-" + index'>
										</span>
								    </div>
								</div>
								<div v-bind:id="['singoloVerde-'+index]" class="collapse">
									<div class="row">	
									  <p class="grigio">{{single.descrizione}}</p>
									  <div style="margin-top:20px; inline-block;">
										<b>Visualizza il servizio sulla mappa</b> 
										<span class="pull-right forward" v-on:click="centraNellaMappa(single.nomeServizio,single.x,single.y,single.selected,single.classe,index,single.descrizione,single.descrizione_lunga)"></span>
									  </div>
									</div>  
								</div>
						    </template>
						</div>
					</div>
				</div>
			</div>
		</div>
		`,
	props: ['servizi','extdesktop'],
	data: function(){
		return{
			servizioAggiunto : '',
			'VerdeDesc':false,
			'VerdeTutti':false,
			'VerdeSoto0':true,
			'VerdeSoto1':true,
			'VerdeSoto2':true,
			'VerdeSoto3':true,
			'VerdeSoto4':true,
			'VerdeSoto5':true,
			'estremo':this.extdesktop,
			'enterbymenu':false	
		}
	},	
	computed: {
		listaServizi() {
			return this.servizi
		}
    },
    watch: {
    	extdesktop: function(val){
    		this.mostraDescLungaVerde();
    	}
    },    
	methods:{
		impostaclick : function(){
			this.enterbymenu = true;
		},		
		mostraDescLungaVerde : function(){
			if(this.extdesktop == 'verde' && this.VerdeDesc == false){
				this.VerdeDesc = true;
				this.apriDesc('verde');
				$('#listaVerde').collapse("show");
			}
			else if(this.extdesktop == 'verde' && this.VerdeDesc == true && this.enterbymenu == true){
				$('#listaVerde').collapse("hide");
				this.VerdeDesc = false;
				this.enterbymenu = false;
				this.$forceUpdate();
			}		
			else if(this.extdesktop == '' && this.VerdeDesc == false){
				this.VerdeDesc = true;
				this.apriDesc('verde');
				this.enterbymenu = false;
				this.$forceUpdate();				
				$('#listaVerde').collapse("hide");
			}
			else if(this.extdesktop == '' && this.VerdeDesc == true){
				this.VerdeDesc = false;
				$('#listaVerde').collapse("hide");
			}
			else if(this.extdesktop != 'verde' && this.VerdeDesc == true){
				this.VerdeDesc = false;
				$('#listaVerde').collapse("hide");
			}			
			else if(this.extdesktop != 'verde' && this.VerdeDesc == false && this.enterbymenu == true){
				this.VerdeDesc = true;
				this.enterbymenu = false;
				this.cambiaprop('verde');
				this.apriDesc('verde');
				this.$forceUpdate();
			}
			else if(this.extdesktop != 'verde' && this.VerdeDesc == true && this.enterbymenu == true){
				this.VerdeDesc = false;
				$('#listaVerde').collapse("hide");
			}															
			return this.VerdeDesc;
		},
		mostraServiziVerde : function(){
			if(this.VerdeTutti == false){
				this.VerdeTutti = true;	
			}
			else{ this.VerdeTutti = false}
			return this.VerdeTutti;
		},
		apriDesc : function(propriety){
		 this.$emit('linebigger',{propriety});
		},
		cambiaprop : function(colore){
			this.$emit('cambiacolore',{colore})
		},					
		 getClass(val, index){
		  return {
			minus: !this['VerdeSoto'+index],
			plus: this['VerdeSoto'+index]
		  }
		},		
		mostraSottoGiallo : function(index){
			if(index==0 && this.VerdeSoto0){this.VerdeSoto0=false}
			else if(index==0 && !this.VerdeSoto0){this.VerdeSoto0=true}
			else if(index==1 && this.VerdeSoto1){this.VerdeSoto1=false}
			else if(index==1 && !this.VerdeSoto1){this.VerdeSoto1=true}
			else if(index==2 && this.VerdeSoto2){this.VerdeSoto2=false}
			else if(index==2 && !this.VerdeSoto2){this.VerdeSoto2=true}	
			else if(index==3 && this.VerdeSoto3){this.VerdeSoto3=false}
			else if(index==3 && !this.VerdeSoto3){this.VerdeSoto3=true}
			else if(index==4 && this.VerdeSoto4){this.VerdeSoto4=false}
			else if(index==4 && !this.VerdeSoto4){this.VerdeSoto4=true}	
			else if(index==5 && this.VerdeSoto5){this.VerdeSoto5=false}
			else if(index==5 && !this.VerdeSoto5){this.VerdeSoto5=true}					
		},
		centraNellaMappa : function(nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga){
			this.$emit('centramappa',{nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga});
			this.$forceUpdate();
			return;
		}	
	}	
});

Vue.component('lista-servizi-arancione', {
	template:`
		<div class="line-blu-separator">
			<div class="container">
				<div class="col-lg-12 col-xs-12">
					<div class="arancione row" v-on:click="impostaclick(); mostraDescLungaArancione();" data-toggle="collapse" data-target="#listaArancione">
						<div class="col-lg-8 col-xs-8 nopadding">
							<h5>Linea 4</h5>
							<span class="blu">{{listaServizi.lineaArancione.descrizione}}</span>
						</div>
						<div class="col-lg-4 col-xs-4 nopadding">
							<span class="pull-right" v-bind:class="[ArancioneDesc ? 'minus' : !ArancioneDesc,'plus']"></span>
						</div>
					</div>
				</div>	
				<div id="listaArancione" class="collapse listes">
					<div class="margin15topbottom">
						<div class="col-lg-12 col-xs-12">
							<div class="row">
								<p class="grigio">{{listaServizi.lineaArancione.descrizione_lunga}}</p>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-xs-12">
						<div class="row">
							<div class="col-lg-8 col-xs-8 nopadding">
								<h5><b>Vedi tutti i servizi della linea</b></h5>
							</div>
							<div class="col-lg-4 col-xs-4 nopadding">
								<span class="pull-right"  v-on:click="mostraServiziArancione" v-bind:class="[ArancioneTutti ? 'minus' : !ArancioneTutti,'plus']" data-toggle="collapse" data-target="#tuttiArancione"></span>
							</div>
						</div>
					</div>	
					<div id="tuttiArancione" class="collapse">
						<div class="col-lg-12 col-xs-12"> 	
						    <template v-for="(single,index) in servizi.lineaArancione.servizi">
								<div class="row margin15topbottom servizioInlista" 
									 :key="single.nomeServizio">
								    <div class="col-lg-8 col-xs-8 nopadding">
										<span class="blu">{{single.nomeServizio}}</span>
								    </div>
								    <div class="col-lg-4 col-xs-4 nopadding">
										<span class="pull-right nomargin" 
											  v-on:click="mostraSottoGiallo(index)" 
											  v-bind:class="getClass('ArancioneSoto', index)"
											  data-toggle="collapse" 
											  :data-target='"#singoloArancione-" + index'>
										</span>
								    </div>
								</div>
								<div v-bind:id="['singoloArancione-'+index]" class="collapse">
									<div class="row">	
									  <p class="grigio">{{single.descrizione}}</p>
									  <div style="margin-top:20px; inline-block;">
										<b>Visualizza il servizio sulla mappa</b> 
										<span class="pull-right forward" v-on:click="centraNellaMappa(single.nomeServizio,single.x,single.y,single.selected,single.classe,index,single.descrizione,single.descrizione_lunga)"></span>
									  </div>
									</div>  
								</div>
						    </template>
						</div>
					</div>
				</div>
			</div>
		</div>
		`,
	props: ['servizi','extdesktop'],
	data: function(){
		return{
			servizioAggiunto : '',
			'ArancioneDesc':false,
			'ArancioneTutti':false,
			'ArancioneSoto0':true,
			'ArancioneSoto1':true,
			'ArancioneSoto2':true,
			'ArancioneSoto3':true,
			'ArancioneSoto4':true,
			'estremo':this.extdesktop,
			'enterbymenu':false	
		}
	},	
	computed: {
		listaServizi() {
			return this.servizi
		}
    },
    watch: {
    	extdesktop: function(val){
    		this.mostraDescLungaArancione();
    	}
    },    
	methods:{
		impostaclick : function(){
			this.enterbymenu = true;
		},		
		mostraDescLungaArancione : function(){
			if(this.extdesktop == 'arancione' && this.ArancioneDesc == false){
				this.ArancioneDesc = true;
				this.apriDesc('arancione');
				$('#listaArancione').collapse("show");
			}
			else if(this.extdesktop == 'arancione' && this.ArancioneDesc == true && this.enterbymenu == true){
				$('#listaArancione').collapse("hide");
				this.ArancioneDesc = false;
				this.enterbymenu = false;
				this.$forceUpdate();
			}			
			else if(this.extdesktop == '' && this.ArancioneDesc == false){
				this.ArancioneDesc = true;
				this.apriDesc('arancione');
				this.enterbymenu = false;
				this.$forceUpdate();				
				$('#listaArancione').collapse("hide");
			}
			else if(this.extdesktop == '' && this.ArancioneDesc == true){
				this.ArancioneDesc = false;
				$('#listaArancione').collapse("hide");
			}
			else if(this.extdesktop != 'arancione' && this.ArancioneDesc == true){
				this.ArancioneDesc = false;
				$('#listaArancione').collapse("hide");
			}			
			else if(this.extdesktop != 'arancione' && this.ArancioneDesc == false && this.enterbymenu == true){
				this.ArancioneDesc = true;
				this.enterbymenu = false;
				this.cambiaprop('arancione');
				this.apriDesc('arancione');
				this.$forceUpdate();
			}	
			else if(this.extdesktop != 'arancione' && this.ArancioneDesc == true && this.enterbymenu == true){
				this.ArancioneDesc = false;
				$('#listaArancione').collapse("hide");
			}																
			return this.ArancioneDesc;
		},
		mostraServiziArancione : function(){
			if(this.ArancioneTutti == false){
				this.ArancioneTutti = true;	
			}
			else{ this.ArancioneTutti = false}
			return this.ArancioneTutti;
		},
		apriDesc : function(propriety){
		 this.$emit('linebigger',{propriety});
		},
		cambiaprop : function(colore){
			this.$emit('cambiacolore',{colore})
		},					
		 getClass(val, index){
		  return {
			minus: !this['ArancioneSoto'+index],
			plus: this['ArancioneSoto'+index]
		  }
		},		
		mostraSottoGiallo : function(index){
			if(index==0 && this.ArancioneSoto0){this.ArancioneSoto0=false}
			else if(index==0 && !this.ArancioneSoto0){this.ArancioneSoto0=true}
			else if(index==1 && this.ArancioneSoto1){this.ArancioneSoto1=false}
			else if(index==1 && !this.ArancioneSoto1){this.ArancioneSoto1=true}
			else if(index==2 && this.ArancioneSoto2){this.ArancioneSoto2=false}
			else if(index==2 && !this.ArancioneSoto2){this.ArancioneSoto2=true}	
			else if(index==3 && this.ArancioneSoto3){this.ArancioneSoto3=false}
			else if(index==3 && !this.ArancioneSoto3){this.ArancioneSoto3=true}
			else if(index==4 && this.ArancioneSoto4){this.ArancioneSoto4=false}
			else if(index==4 && !this.ArancioneSoto4){this.ArancioneSoto4=true}	

		},
		centraNellaMappa : function(nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga){
			this.$emit('centramappa',{nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga});
			this.$forceUpdate();
			return;
		}	
	}	
});

Vue.component('lista-servizi-viola', {
	template:`
		<div class="line-blu-separator">
			<div class="container">
				<div class="col-lg-12 col-xs-12">
					<div class="viola row" v-on:click="impostaclick(); mostraDescLungaViola();" data-toggle="collapse" data-target="#listaViola">
						<div class="col-lg-8 col-xs-8 nopadding">
							<h5>Linea 5</h5>
							<span class="blu">{{listaServizi.lineaViola.descrizione}}</span>
						</div>
						<div class="col-lg-4 col-xs-4 nopadding">
							<span class="pull-right" v-bind:class="[ViolaDesc ? 'minus' : !ViolaDesc,'plus']"></span>
						</div>
					</div>
				</div>	
				<div id="listaViola" class="collapse listes">
					<div class="margin15topbottom">
						<div class="col-lg-12 col-xs-12">
							<div class="row">
								<p class="grigio">{{listaServizi.lineaViola.descrizione_lunga}}</p>
							</div>
						</div>
					</div>
					<div class="col-lg-12 col-xs-12">
						<div class="row">
							<div class="col-lg-8 col-xs-8 nopadding">
								<h5><b>Vedi tutti i servizi della linea</b></h5>
							</div>
							<div class="col-lg-4 col-xs-4 nopadding">
								<span class="pull-right"  v-on:click="mostraServiziViola" v-bind:class="[ViolaTutti ? 'minus' : !ViolaTutti,'plus']" data-toggle="collapse" data-target="#tuttiViola"></span>
							</div>
						</div>
					</div>	
					<div id="tuttiViola" class="collapse">
						<div class="col-lg-12 col-xs-12"> 	
						    <template v-for="(single,index) in servizi.lineaViola.servizi">
								<div class="row margin15topbottom servizioInlista" 
									 :key="single.nomeServizio">
								    <div class="col-lg-8 col-xs-8 nopadding">
										<span class="Viola">{{single.nomeServizio}}</span>
								    </div>
								    <div class="col-lg-4 col-xs-4 nopadding">
										<span class="pull-right nomargin" 
											  v-on:click="mostraSottoGiallo(index)" 
											  v-bind:class="getClass('ViolaSoto', index)"
											  data-toggle="collapse" 
											  :data-target='"#singoloViola-" + index'>
										</span>
								    </div>
								</div>
								<div v-bind:id="['singoloViola-'+index]" class="collapse">
									<div class="row">	
									  <p class="grigio">{{single.descrizione}}</p>
									  <div style="margin-top:20px; inline-block;">
										<b>Visualizza il servizio sulla mappa</b> 
										<span class="pull-right forward" v-on:click="centraNellaMappa(single.nomeServizio,single.x,single.y,single.selected,single.classe,index,single.descrizione,single.descrizione_lunga)"></span>
									  </div>
									</div>  
								</div>
						    </template>
						</div>
					</div>
				</div>
			</div>
		</div>
		`,
	props: ['servizi','extdesktop'],
	data: function(){
		return{
			servizioAggiunto : '',
			'ViolaDesc':false,
			'ViolaTutti':false,
			'ViolaSoto0':true,
			'ViolaSoto1':true,
			'ViolaSoto2':true,
			'ViolaSoto3':true,
			'ViolaSoto4':true,
			'ViolaSoto5':true,
			'estremo':this.extdesktop,
			'enterbymenu':false				
		}
	},	
	computed: {
		listaServizi() {
			return this.servizi
		}
    },
    watch: {
    	extdesktop: function(val){
    		this.mostraDescLungaViola();
    	}
    },       
	methods:{
		impostaclick : function(){
			this.enterbymenu = true;
		},		
		mostraDescLungaViola : function(){
			if(this.extdesktop == 'viola' && this.ViolaDesc == false){
				this.ViolaDesc = true;
				this.apriDesc('viola');
				$('#listaViola').collapse("show");
			}
			else if(this.extdesktop == 'viola' && this.ViolaDesc == true && this.enterbymenu == true){
				$('#listaViola').collapse("hide");
				this.ViolaDesc = false;
				this.enterbymenu = false;
				this.$forceUpdate();
			}						
			else if(this.extdesktop == '' && this.ViolaDesc == false){
				this.ViolaDesc = true;
				this.apriDesc('viola');
				this.enterbymenu = false;
				this.$forceUpdate();
				$('#listaViola').collapse("hide");
			}
			else if(this.extdesktop == '' && this.ViolaDesc == true){
				this.ViolaDesc = false;
				$('#listaViola').collapse("hide");
			}
			else if(this.extdesktop != 'viola' && this.ViolaDesc == true){
				this.ViolaDesc = false;
				$('#listaViola').collapse("hide");
			}			
			else if(this.extdesktop != 'viola' && this.ViolaDesc == false && this.enterbymenu == true){
				this.ViolaDesc = true;
				this.enterbymenu = false;
				this.cambiaprop('viola');
				this.apriDesc('viola');
				this.$forceUpdate();
			}
			else if(this.extdesktop != 'viola' && this.ViolaDesc == true && this.enterbymenu == true){
				this.ViolaDesc = false;
				$('#listaViola').collapse("hide");
			}		
			return this.ViolaDesc;
		},
		mostraServiziViola : function(){
			if(this.ViolaTutti == false){
				this.ViolaTutti = true;	
			}
			else{ this.ViolaTutti = false}
			return this.ViolaTutti;
		},
		apriDesc : function(propriety){
		 this.$emit('linebigger',{propriety});
		},
		cambiaprop : function(colore){
			this.$emit('cambiacolore',{colore})
		},					
		 getClass(val, index){
		  return {
			minus: !this['ViolaSoto'+index],
			plus: this['ViolaSoto'+index]
		  }
		},		
		mostraSottoGiallo : function(index){
			if(index==0 && this.ViolaSoto0){this.ViolaSoto0=false}
			else if(index==0 && !this.ViolaSoto0){this.ViolaSoto0=true}
			else if(index==1 && this.ViolaSoto1){this.ViolaSoto1=false}
			else if(index==1 && !this.ViolaSoto1){this.ViolaSoto1=true}
			else if(index==2 && this.ViolaSoto2){this.ViolaSoto2=false}
			else if(index==2 && !this.ViolaSoto2){this.ViolaSoto2=true}	
			else if(index==3 && this.ViolaSoto3){this.ViolaSoto3=false}
			else if(index==3 && !this.ViolaSoto3){this.ViolaSoto3=true}
			else if(index==4 && this.ViolaSoto4){this.ViolaSoto4=false}
			else if(index==4 && !this.ViolaSoto4){this.ViolaSoto4=true}	
			else if(index==5 && this.ViolaSoto5){this.ViolaSoto5=false}
			else if(index==5 && !this.ViolaSoto5){this.ViolaSoto5=true}					
		},
		centraNellaMappa : function(nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga){
			this.$emit('centramappa',{nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga});
			this.$forceUpdate();
			return;
		}		
	}	
});


Vue.component('reference', {
	template:`
			<div class="container" style="margin-top:30px;">
				<div class="row">
					<div class="col-lg-12 col-xs-12">
						<div class="back pull-right" v-on:click="hideReferente" ></div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12 col-xs-12">
						<h5 class="blu">CONTATTA I NOSTRI REFERENTI</h5>
					</div>
				</div>

				<template v-if="refererentedi[0].lineaApparte == 'gialla'">
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-12 col-xs-12">
							<h5 class="gialla" style="margin-bottom:0px;"><b>Linea 3</b></h5>
							<p>{{refererentedi[0].servizio}}</p>
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">ANGELICA COSTANZA</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614437">0321 614437</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:costanza@confcommercio.net">costanza@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:50px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">EUGENIO MAFFEI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614411">0321 614411</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:maffei@confcommercio.net">maffei@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>						
				</template>

				<template v-if="refererentedi[0].lineaApparte == 'blu'">
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-12 col-xs-12">
							<h5 class="blu" style="margin-bottom:0px;"><b>Linea 1</b></h5>
							<p>{{refererentedi[0].servizio}}</p>
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">MARGHERITA PILONE</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614410">0321 614410</a><br/>
							<a href="tel:+393492874518">349 2874518</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:pilone@confcommercio.net">pilone@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:50px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">EUGENIO MAFFEI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614411">0321 614411</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:maffei@confcommercio.net">maffei@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>																
				</template>	

				<template v-if="refererentedi[0].lineaApparte == 'verde'">
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-12 col-xs-12">
							<h5 class="verde" style="margin-bottom:0px;"><b>Linea 2</b></h5>
							<p>{{refererentedi[0].servizio}}</p>
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">STEFANO BORALI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614405">0321 614405</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:borali@confcommercio.net">borali@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:50px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">EUGENIO MAFFEI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614411">0321 614411</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:maffei@confcommercio.net">maffei@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>					
				</template>		

				<template v-if="refererentedi[0].lineaApparte == 'arancione'">
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-12 col-xs-12">
							<h5 class="arancione" style="margin-bottom:0px;"><b>Linea 4</b></h5>
							<p>{{refererentedi[0].servizio}}</p>
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">ANNA BUSTI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614455">0321 614455</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:busti@confcommercio.net">busti@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:50px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">EUGENIO MAFFEI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614411">0321 614411</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:maffei@confcommercio.net">maffei@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>						
				</template>				

				<template v-if="refererentedi[0].lineaApparte == 'viola'">
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-12 col-xs-12">
							<h5 class="viola" style="margin-bottom:0px;"><b>Linea 5</b></h5>
							<p>{{refererentedi[0].servizio}}</p>
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">MARGHERITA PILONE</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614410">0321 614410</a><br/>
							<a href="tel:+393492874518">349 2874518</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:pilone@confcommercio.net">pilone@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:50px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>

					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/contatto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10">
							<h6 class="blu">EUGENIO MAFFEI</h6>
						</div>
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/telefono.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="tel:+390321614411">0321 614411</a><br/>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img src="img/mailto.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
							<a href="mailto:maffei@confcommercio.net">maffei@confcommercio.net</a>
						</div>	
					</div>
					<div class="row" style="margin-bottom:15px;">
						<div class="col-lg-2 col-xs-2">
							<img class="img-responsive" src="img/fax.svg"/>
						</div>
						<div class="col-lg-10 col-xs-10 grigio">
						 0321 35781
						</div>
					</div>						
				</template>		
			</div>
		`,
	props: ['perservizio'],
	data: function(){
		return {}
	},	
	computed: {
		refererentedi() {
			return this.perservizio
		}
    },
	methods:{
		hideReferente : function(){
			this.$emit('hideref');
		}					
	}	
});

Vue.component('cerca', {
	template:`
			<div class="container" style="margin-top:30px;">
				<div class="row">
					<div class="col-lg-1 col-xs-1">
						<div class="back pull-left" v-on:click="ritornaMappa"></div>
					</div>
					<div class="col-lg-10 col-xs-10">
						<input type="text" style="width:100%; padding:5px;" v-model="searchString" placeholder="Il servizio che cerchi inizia per..." />
					</div>
				</div>
				<div class="row">
					<div class="col-lg-9 col-xs-9 col-lg-offset-1 col-xs-offset-1">
				    <ul style="margin-top:15px;">
						<li v-for="article in filteredArticles" class="blu">
							<p v-on:click="centraNellaMappa(article.nomeServizio,article.x,article.y,article.selected,article.classe,article.index,article.descrizione,article.descrizione_lunga)">
								{{article.origName}}
							</p>
						</li>
					</ul>
					</div>
				</div>				
			</div>
		`,
	data: function(){
		return{
			searchString: "",
			 articles: [
  {"origName":"CONVENZIONI NAZIONALI","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"DIRITTI MUSICALI SIAE-SCF","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"ASSICURAZIONI","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"CREDITO E POS","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"PAGINE EBAY","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"VIAGGI E TURISMO","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"AUTO E VEICOLI COMMERCIALI","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},
                            {"origName":"SICUREZZA IN AZIENDA","nomeServizio":"CONVENZIONI NAZIONALI","x":221,"y":77,"selected":false,"classe":"blu","index":1,"descrizione":"Le opportunità commerciali dei partner nazionali di Confcommercio per agevolare le imprese con scontistica su obblighi di legge come i diritti musicali e offerte esclusive su molti servizi.","descrizione_lunga":"Solo chi conosce bene le esigenze delle imprese può offrire convenzioni utili e mirate come gli importanti sconti sulla musica d’ambiente Siae ed Scf e agevolazioni su polizze assicurative, pagamenti elettronici con POS, noleggio e acquisto di auto e furgoni, spedizioni, sicurezza, viaggi e turismo, business information."},

                            {"origName":"CONVENZIONI LOCALI","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"SHOPPING CARD","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"SPESE SANITARIE","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"IMPIANTISITICA E NOLEGGI","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"ENERGIA ELETTRICA E GAS","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"REGISTRATORI FISCALI","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"CINEMA E TEATRO","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},
                            {"origName":"SOCIAL MEDIA WEB","nomeServizio":"CONVENZIONI LOCALI","x":439,"y":77,"selected":false,"classe":"blu","index":0,"descrizione":"Agevolazioni e sconti su servizi e prodotti per l’imprenditore, i dipendenti e i familiari. Occasioni esclusive di risparmio grazie ad accordi con aziende locali.","descrizione_lunga":"Con la Shopping card sconti su energia elettrica e gas, registratori fiscali, spese sanitarie, impiantistica, noleggi, ingressi a teatro, spedizioni e molto altro. Tutti gli imprenditori associati possono promuovere la propria attività attraverso sconti e agevolazioni ai colleghi. Modulistica per proporre la convenzione."},

                            {"origName":"SERVIZI ALLE CATEGORIE","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"MODULISTICA","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"CARTELLI OBBLIGATORI","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"CARTA DI ESERCIZIO","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"VENDITE STRAORDINARIE","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"MODELLI RIES","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"HACCP E SICUREZZA","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},
                            {"origName":"VALUTAZIONE IMPATTO ACUSTICO","nomeServizio":"SERVIZI ALLE CATEGORIE","x":521,"y":132,"selected":false,"classe":"blu","index":7,"descrizione":"Esperienza e competenza al servizio di ogni settore merceologico del Terziario. Legislazione di categoria, modulistica, gruppi di lavoro, consulenza, assistenza, pratiche amministrative.","descrizione_lunga":"Modulistica per le agenzie immobiliari, cartellonistica orari pubblici esercizi, tabelle orafi, consulenza sicurezza in azienda, haccp, valutazione di impatto acustico, carta di esercizio ambulanti, compilazione Ries, pratiche amministrative per vendite straordinarie, gruppi di categoria, incontri con la pubblica amministrazione."},

                            {"origName":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"AUTORIZZAZIONI E CONCESSIONI","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"CONSULENZA LEGISLATIVA","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"CONSULENZA LEGALE","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"CONSULENZA DEL LAVORO","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"RELAZIONI SINDACALI","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"CONTRATTUALISTICA","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},
                            {"origName":"RITIRO DOCUMENTI A DOMICILIO","nomeServizio":"ASSISTENZA SINDACALE E CONSULENZE AI SOCI","x":581,"y":219,"selected":false,"classe":"blu","index":6,"descrizione":"Come orientarsi nella vita quotidiana dell’impresa, tra leggi e normative complesse. Tanti servizi in un solo sportello.","descrizione_lunga":"Una risposta a tutte le esigenze del fare impresa: legislazione, autorizzazioni, rapporti con le pubbliche amministrazioni, richiesta di concessioni, subentri. E inoltre, consulenza legale e assicurativa, assistenza nei contratti di lavoro, relazioni sindacali, gestione del personale, assistenza nelle vertenze individuali e collettive."},

                            {"origName":"NEWSLETTER E INFORMAZIONI","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"ECO DEL COMMERCIO","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"SITO ASSOCIATIVO ","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"GESTIONE PAGINE FACEBOOK","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"NEWSLETTER","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"PROMOZIONE AZIENDALE","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"CONSULENZA GRAFICA E REDAZIONALE","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},
                            {"origName":"CONVENZIONI PUBBLICITÀ","nomeServizio":"NEWSLETTER E INFORMAZIONI","x":602,"y":369,"selected":false,"classe":"blu","index":2,"descrizione":"Novità e aggiornamenti sempre freschi sul mondo delle imprese, dell’economia e della società. Sempre presenti con le nostre newsletter mirate per categorie e territori.","descrizione_lunga":"Tra tante informazioni, quali sono quelle corrette? Avere chi le filtra e le trasferisce è fondamentale per chi fa impresa. Da noi l’informazione è curata, attraverso il periodico cartaceo L’eco del commercio, le e-mail, il sito associativo, le pagine di facebook e le telefonate, gli sms che ricordano le scadenze. Ogni momento è buono per comunicare."},

                            {"origName":"EVENTI CONVEGNI MANIFESTAZIONI","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"INCONTRI E WORKSHOP","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"CONVEGNI DI CATEGORIA","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"EVENTI GASTRONOMIA","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"MERCATINI E FIERE","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"RASSEGNE TURISMO","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"INIZIATIVE PROMOZIONALI","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},
                            {"origName":"PUBBLICITÀ AZIENDALE","nomeServizio":"EVENTI CONVEGNI MANIFESTAZIONI","x":486,"y":556,"selected":false,"classe":"blu","index":3,"descrizione":"Organizzare incontri e convegni di formazione e aggiornamento, promuovere le attività attraverso iniziative, eventi e manifestazioni è il nostro mestiere.","descrizione_lunga":"Workshop, convegni, incontri con esperti, laboratori sono tutte occasioni per fare vita associativa e per essere sempre aggiornati. Poi mercatini, feste di via, degustazioni, percorsi gastronomici, notturni di quartiere e tante altre iniziative per promuovere e valorizzare le nostre imprese."},

                            {"origName":"ENTE BILATERALE","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"INDENNITÀ DI MALATTIA","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"CONTRIBUTO SPESE SANITARIE","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"CONTRIBUTO ASSISTENZA PARENTALE","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"CONTRIBUTI FORMAZIONE","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"SERVIZIO VIDEOSORVEGLIANZA","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"CONCILIAZIONE","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},
                            {"origName":"SERVIZIO RAPPRESENTANTE LAVORATORI","nomeServizio":"ENTE BILATERALE","x":340,"y":605,"selected":false,"classe":"blu","index":5,"descrizione":"Previsti dai Contratti Collettivi Nazionali di Lavoro sono il punto di incontro tra imprese e lavoratori. Assistenza, sostegno, riqualificazione del personale, contributi, indennità.","descrizione_lunga":"L’Ente Bilaterale Turismo e l’Ente Bilaterale Terziario sono costituiti tra Confcommercio e le Organizzazioni sindacali dei lavoratori. Per i lavoratori indennità di malattia, sussidio alle spese sanitarie, premio di natalità; per le imprese contributi alla formazione e alle assunzioni."},

                            {"origName":"UFFICIO STUDI","nomeServizio":"UFFICIO STUDI","x":233,"y":587,"selected":false,"classe":"blu","index":4,"descrizione":"Analisi, indagini, statistiche su economia e società. Osservatorio dei prezzi, Borsino immobiliare, indagini conoscitive saldi, sondaggi tra le imprese.","descrizione_lunga":"Conoscere la realtà economica e sociale e la sua evoluzione è fondamentale per avviare e far crescere un’impresa. Attraverso il nostro Osservatorio monitoriamo l’evoluzione della società e ne anticipiamo gli orientamenti. Indagini e approfondimenti in sintonia con l’Ufficio studi nazionale."},
                            {"origName":"ANALISI STATISTICHE","nomeServizio":"UFFICIO STUDI","x":233,"y":587,"selected":false,"classe":"blu","index":4,"descrizione":"Analisi, indagini, statistiche su economia e società. Osservatorio dei prezzi, Borsino immobiliare, indagini conoscitive saldi, sondaggi tra le imprese.","descrizione_lunga":"Conoscere la realtà economica e sociale e la sua evoluzione è fondamentale per avviare e far crescere un’impresa. Attraverso il nostro Osservatorio monitoriamo l’evoluzione della società e ne anticipiamo gli orientamenti. Indagini e approfondimenti in sintonia con l’Ufficio studi nazionale."},
                            {"origName":"BORSINO IMMOBILIARE","nomeServizio":"UFFICIO STUDI","x":233,"y":587,"selected":false,"classe":"blu","index":4,"descrizione":"Analisi, indagini, statistiche su economia e società. Osservatorio dei prezzi, Borsino immobiliare, indagini conoscitive saldi, sondaggi tra le imprese.","descrizione_lunga":"Conoscere la realtà economica e sociale e la sua evoluzione è fondamentale per avviare e far crescere un’impresa. Attraverso il nostro Osservatorio monitoriamo l’evoluzione della società e ne anticipiamo gli orientamenti. Indagini e approfondimenti in sintonia con l’Ufficio studi nazionale."},
                            {"origName":"SONDAGGI E QUESTIONARI","nomeServizio":"UFFICIO STUDI","x":233,"y":587,"selected":false,"classe":"blu","index":4,"descrizione":"Analisi, indagini, statistiche su economia e società. Osservatorio dei prezzi, Borsino immobiliare, indagini conoscitive saldi, sondaggi tra le imprese.","descrizione_lunga":"Conoscere la realtà economica e sociale e la sua evoluzione è fondamentale per avviare e far crescere un’impresa. Attraverso il nostro Osservatorio monitoriamo l’evoluzione della società e ne anticipiamo gli orientamenti. Indagini e approfondimenti in sintonia con l’Ufficio studi nazionale."},
                            {"origName":"OSSERVATORIO ECONOMICO","nomeServizio":"UFFICIO STUDI","x":233,"y":587,"selected":false,"classe":"blu","index":4,"descrizione":"Analisi, indagini, statistiche su economia e società. Osservatorio dei prezzi, Borsino immobiliare, indagini conoscitive saldi, sondaggi tra le imprese.","descrizione_lunga":"Conoscere la realtà economica e sociale e la sua evoluzione è fondamentale per avviare e far crescere un’impresa. Attraverso il nostro Osservatorio monitoriamo l’evoluzione della società e ne anticipiamo gli orientamenti. Indagini e approfondimenti in sintonia con l’Ufficio studi nazionale."},
                            {"origName":"SVILUPPO PROGETTI INNOVAZIONE","nomeServizio":"UFFICIO STUDI","x":233,"y":587,"selected":false,"classe":"blu","index":4,"descrizione":"Analisi, indagini, statistiche su economia e società. Osservatorio dei prezzi, Borsino immobiliare, indagini conoscitive saldi, sondaggi tra le imprese.","descrizione_lunga":"Conoscere la realtà economica e sociale e la sua evoluzione è fondamentale per avviare e far crescere un’impresa. Attraverso il nostro Osservatorio monitoriamo l’evoluzione della società e ne anticipiamo gli orientamenti. Indagini e approfondimenti in sintonia con l’Ufficio studi nazionale."},


                            {"origName":"FISCALE E REDDITI","nomeServizio":"FISCALE E REDDITI","x":466,"y":334,"selected":false,"classe":"verde","index":0,"descrizione":"Consulenza e assistenza per la gestione degli adempimenti fiscali. Costituzione, variazione e cessazione dell’impresa, analisi di bilancio, dichiarazione dei redditi, Iva e bilanci di esercizio.","descrizione_lunga":"Inizio, variazione e cessazione di attività. Predisposizione e presentazione telematica dei documenti; dichiarazione dei redditi; compilazione questionari Istat e studi di settore; assistenza in caso di visite ispettive; stampa e consegna delega di versamento mod.F24; invio telematico dichiarazioni fiscali."},
                            {"origName":"MODELLO 730","nomeServizio":"FISCALE E REDDITI","x":466,"y":334,"selected":false,"classe":"verde","index":0,"descrizione":"Consulenza e assistenza per la gestione degli adempimenti fiscali. Costituzione, variazione e cessazione dell’impresa, analisi di bilancio, dichiarazione dei redditi, Iva e bilanci di esercizio.","descrizione_lunga":"Inizio, variazione e cessazione di attività. Predisposizione e presentazione telematica dei documenti; dichiarazione dei redditi; compilazione questionari Istat e studi di settore; assistenza in caso di visite ispettive; stampa e consegna delega di versamento mod.F24; invio telematico dichiarazioni fiscali."},
                            {"origName":"COSTITUZIONE D'IMPRESA","nomeServizio":"FISCALE E REDDITI","x":466,"y":334,"selected":false,"classe":"verde","index":0,"descrizione":"Consulenza e assistenza per la gestione degli adempimenti fiscali. Costituzione, variazione e cessazione dell’impresa, analisi di bilancio, dichiarazione dei redditi, Iva e bilanci di esercizio.","descrizione_lunga":"Inizio, variazione e cessazione di attività. Predisposizione e presentazione telematica dei documenti; dichiarazione dei redditi; compilazione questionari Istat e studi di settore; assistenza in caso di visite ispettive; stampa e consegna delega di versamento mod.F24; invio telematico dichiarazioni fiscali."},
                            {"origName":"ANALISI DI BILANCIO","nomeServizio":"FISCALE E REDDITI","x":466,"y":334,"selected":false,"classe":"verde","index":0,"descrizione":"Consulenza e assistenza per la gestione degli adempimenti fiscali. Costituzione, variazione e cessazione dell’impresa, analisi di bilancio, dichiarazione dei redditi, Iva e bilanci di esercizio.","descrizione_lunga":"Inizio, variazione e cessazione di attività. Predisposizione e presentazione telematica dei documenti; dichiarazione dei redditi; compilazione questionari Istat e studi di settore; assistenza in caso di visite ispettive; stampa e consegna delega di versamento mod.F24; invio telematico dichiarazioni fiscali."},

                            {"origName":"CONTABILITÀ","nomeServizio":"CONTABILITÀ","x":159,"y":299,"selected":false,"classe":"verde","index":1,"descrizione":"Tenuta contabilità aziendale, semplificata e ordinaria. Ricezione periodica dei documenti anche con servizio di ritiro presso l’azienda.","descrizione_lunga":"Imputazione ed elaborazione dei dati contabili; elaborazione e liquidazione IVA periodica; vidimazione registri contabili; compilazione questionari Istat e studi di settore; stesura situazioni contabili; invio telematico dichiarazioni fiscali."},
                            {"origName":"CONTABILITÀ ORDINARIA","nomeServizio":"CONTABILITÀ","x":159,"y":299,"selected":false,"classe":"verde","index":1,"descrizione":"Tenuta contabilità aziendale, semplificata e ordinaria. Ricezione periodica dei documenti anche con servizio di ritiro presso l’azienda.","descrizione_lunga":"Imputazione ed elaborazione dei dati contabili; elaborazione e liquidazione IVA periodica; vidimazione registri contabili; compilazione questionari Istat e studi di settore; stesura situazioni contabili; invio telematico dichiarazioni fiscali."},
                            {"origName":"CONTABILITÀ SEMPLIFICATA","nomeServizio":"CONTABILITÀ","x":159,"y":299,"selected":false,"classe":"verde","index":1,"descrizione":"Tenuta contabilità aziendale, semplificata e ordinaria. Ricezione periodica dei documenti anche con servizio di ritiro presso l’azienda.","descrizione_lunga":"Imputazione ed elaborazione dei dati contabili; elaborazione e liquidazione IVA periodica; vidimazione registri contabili; compilazione questionari Istat e studi di settore; stesura situazioni contabili; invio telematico dichiarazioni fiscali."},
                            {"origName":"ANALISI SITUAZIONE CONTABILE","nomeServizio":"CONTABILITÀ","x":159,"y":299,"selected":false,"classe":"verde","index":1,"descrizione":"Tenuta contabilità aziendale, semplificata e ordinaria. Ricezione periodica dei documenti anche con servizio di ritiro presso l’azienda.","descrizione_lunga":"Imputazione ed elaborazione dei dati contabili; elaborazione e liquidazione IVA periodica; vidimazione registri contabili; compilazione questionari Istat e studi di settore; stesura situazioni contabili; invio telematico dichiarazioni fiscali."},
                            {"origName":"RITIRO DOCUMENTI","nomeServizio":"CONTABILITÀ","x":159,"y":299,"selected":false,"classe":"verde","index":1,"descrizione":"Tenuta contabilità aziendale, semplificata e ordinaria. Ricezione periodica dei documenti anche con servizio di ritiro presso l’azienda.","descrizione_lunga":"Imputazione ed elaborazione dei dati contabili; elaborazione e liquidazione IVA periodica; vidimazione registri contabili; compilazione questionari Istat e studi di settore; stesura situazioni contabili; invio telematico dichiarazioni fiscali."},

                            {"origName":"PAGHE","nomeServizio":"PAGHE","x":513,"y":287,"selected":false,"classe":"verde","index":2,"descrizione":"Consulenza, gestione e assistenza nell’applicazione dei Contratti Collettivi Nazionali di Lavoro; individuazione della miglior soluzione per il personale aziendale; elaborazione dei cedolini.","descrizione_lunga":"Apertura posizioni assicurative e rapporti ordinari con gli Istituti previdenziali, assistenziali e del lavoro;assunzioni/cessazioni; elaborazione cedolini paga e riassuntivi mensili; compilazione denunce contributi mensili; statistiche costi del personale; calcolo tfr, maternità, malattia, infortuni; trattamento di fine rapporto; compilazioni modd. CUD - 770."},
                            {"origName":"ELABORAZIONE CEDOLINI","nomeServizio":"PAGHE","x":513,"y":287,"selected":false,"classe":"verde","index":2,"descrizione":"Consulenza, gestione e assistenza nell’applicazione dei Contratti Collettivi Nazionali di Lavoro; individuazione della miglior soluzione per il personale aziendale; elaborazione dei cedolini.","descrizione_lunga":"Apertura posizioni assicurative e rapporti ordinari con gli Istituti previdenziali, assistenziali e del lavoro;assunzioni/cessazioni; elaborazione cedolini paga e riassuntivi mensili; compilazione denunce contributi mensili; statistiche costi del personale; calcolo tfr, maternità, malattia, infortuni; trattamento di fine rapporto; compilazioni modd. CUD - 770."},
                            {"origName":"ASSUNZIONI/AVVIAMENTO LAVORO","nomeServizio":"PAGHE","x":513,"y":287,"selected":false,"classe":"verde","index":2,"descrizione":"Consulenza, gestione e assistenza nell’applicazione dei Contratti Collettivi Nazionali di Lavoro; individuazione della miglior soluzione per il personale aziendale; elaborazione dei cedolini.","descrizione_lunga":"Apertura posizioni assicurative e rapporti ordinari con gli Istituti previdenziali, assistenziali e del lavoro;assunzioni/cessazioni; elaborazione cedolini paga e riassuntivi mensili; compilazione denunce contributi mensili; statistiche costi del personale; calcolo tfr, maternità, malattia, infortuni; trattamento di fine rapporto; compilazioni modd. CUD - 770."},
                            {"origName":"ASSISTENZA VERTENZE AZIENDALI","nomeServizio":"PAGHE","x":513,"y":287,"selected":false,"classe":"verde","index":2,"descrizione":"Consulenza, gestione e assistenza nell’applicazione dei Contratti Collettivi Nazionali di Lavoro; individuazione della miglior soluzione per il personale aziendale; elaborazione dei cedolini.","descrizione_lunga":"Apertura posizioni assicurative e rapporti ordinari con gli Istituti previdenziali, assistenziali e del lavoro;assunzioni/cessazioni; elaborazione cedolini paga e riassuntivi mensili; compilazione denunce contributi mensili; statistiche costi del personale; calcolo tfr, maternità, malattia, infortuni; trattamento di fine rapporto; compilazioni modd. CUD - 770."},

                            {"origName":"CONSULENZA AZIENDALE","nomeServizio":"CONSULENZA AZIENDALE","x":136,"y":244,"selected":false,"classe":"verde","index":3,"descrizione":"Nel proprio ciclo di vita ogni azienda affronta diverse fasi che richiedono soluzioni specifiche. Orientamento alla prevenzione e/o alla soluzione di strategia, gestione e direzione d’impresa.","descrizione_lunga":"Pratiche metodologie di intervento consentono di supportare gli imprenditori nell’individuare la aree critiche della gestione e nel pianificare e realizzare uno sviluppo sostenibile dell’impresa. Pianificazione e controllo di gestione, supporto allo sviluppo aziendale, riorganizzazione e riposizionamento, marketing strategico e operativo."},
                            {"origName":"PIANIFICAZIONE/CONTROLLO GESTIONE","nomeServizio":"CONSULENZA AZIENDALE","x":136,"y":244,"selected":false,"classe":"verde","index":3,"descrizione":"Nel proprio ciclo di vita ogni azienda affronta diverse fasi che richiedono soluzioni specifiche. Orientamento alla prevenzione e/o alla soluzione di strategia, gestione e direzione d’impresa.","descrizione_lunga":"Pratiche metodologie di intervento consentono di supportare gli imprenditori nell’individuare la aree critiche della gestione e nel pianificare e realizzare uno sviluppo sostenibile dell’impresa. Pianificazione e controllo di gestione, supporto allo sviluppo aziendale, riorganizzazione e riposizionamento, marketing strategico e operativo."},
                            {"origName":"MARKETING STRATEGICO","nomeServizio":"CONSULENZA AZIENDALE","x":136,"y":244,"selected":false,"classe":"verde","index":3,"descrizione":"Nel proprio ciclo di vita ogni azienda affronta diverse fasi che richiedono soluzioni specifiche. Orientamento alla prevenzione e/o alla soluzione di strategia, gestione e direzione d’impresa.","descrizione_lunga":"Pratiche metodologie di intervento consentono di supportare gli imprenditori nell’individuare la aree critiche della gestione e nel pianificare e realizzare uno sviluppo sostenibile dell’impresa. Pianificazione e controllo di gestione, supporto allo sviluppo aziendale, riorganizzazione e riposizionamento, marketing strategico e operativo."},

                            {"origName":"SICUREZZA E HACCP","nomeServizio":"SICUREZZA E HACCP","x":330,"y":451,"selected":false,"classe":"verde","index":4,"descrizione":"Organizzazione e gestione della sicurezza in azienda, prevenzione dei rischi, corretta applicazione del D.Lgs. 81/2008 e delle normative igienico-sanitarie nazionali e regionali.","descrizione_lunga":"Consulenza e redazione, anche tramite soggetti convenzionati, del Documento Valutazione Rischi e del Piano di autocontrollo Haccp; corsi obbligatori Legge 81/08; valutazione di impatto acustico; nomina medico competente; sorveglianza sanitaria; convenzioni estintori e materiale antincendio; contatti e incontri periodici di aggiornamento con Asl e Spresal."},
                            {"origName":"DOCUMENTO VALUTAZIONE RISCHI","nomeServizio":"SICUREZZA E HACCP","x":330,"y":451,"selected":false,"classe":"verde","index":4,"descrizione":"Organizzazione e gestione della sicurezza in azienda, prevenzione dei rischi, corretta applicazione del D.Lgs. 81/2008 e delle normative igienico-sanitarie nazionali e regionali.","descrizione_lunga":"Consulenza e redazione, anche tramite soggetti convenzionati, del Documento Valutazione Rischi e del Piano di autocontrollo Haccp; corsi obbligatori Legge 81/08; valutazione di impatto acustico; nomina medico competente; sorveglianza sanitaria; convenzioni estintori e materiale antincendio; contatti e incontri periodici di aggiornamento con Asl e Spresal."},
                            {"origName":"PIANO AUTOCONTROLLO HACCP","nomeServizio":"SICUREZZA E HACCP","x":330,"y":451,"selected":false,"classe":"verde","index":4,"descrizione":"Organizzazione e gestione della sicurezza in azienda, prevenzione dei rischi, corretta applicazione del D.Lgs. 81/2008 e delle normative igienico-sanitarie nazionali e regionali.","descrizione_lunga":"Consulenza e redazione, anche tramite soggetti convenzionati, del Documento Valutazione Rischi e del Piano di autocontrollo Haccp; corsi obbligatori Legge 81/08; valutazione di impatto acustico; nomina medico competente; sorveglianza sanitaria; convenzioni estintori e materiale antincendio; contatti e incontri periodici di aggiornamento con Asl e Spresal."},
                            {"origName":"SOPRALLUOGO IN AZIENDA","nomeServizio":"SICUREZZA E HACCP","x":330,"y":451,"selected":false,"classe":"verde","index":4,"descrizione":"Organizzazione e gestione della sicurezza in azienda, prevenzione dei rischi, corretta applicazione del D.Lgs. 81/2008 e delle normative igienico-sanitarie nazionali e regionali.","descrizione_lunga":"Consulenza e redazione, anche tramite soggetti convenzionati, del Documento Valutazione Rischi e del Piano di autocontrollo Haccp; corsi obbligatori Legge 81/08; valutazione di impatto acustico; nomina medico competente; sorveglianza sanitaria; convenzioni estintori e materiale antincendio; contatti e incontri periodici di aggiornamento con Asl e Spresal."},


                            {"origName":"CORSI ABILITANTI","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"AGENTI DI COMMERCIO","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"AGENTI IMMOBILIARI","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"SOMMINISTRAZIONE ALIMENTI E BEVANDE","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"VENDITA ALIMENTARE","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"AMMINISTRATORI CONDOMINIO","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"CONDUTTORI CARRELLI ELEVATORI","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},
                            {"origName":"CONDUZIONE AGENZIA FUNEBRE","nomeServizio":"CORSI ABILITANTI","x":330,"y":198,"selected":false,"classe":"gialla","index":0,"descrizione":"Per avviare alcune attività d’impresa e professionali occorre frequentare specifici corsi abilitanti presso agenzie formative accreditate con la Regione Piemonte, come Assoform.","descrizione_lunga":"Corso di 100 ore per la somministrazione di alimenti e bevande e per l’apertura di attività alimentari; corso di 172 ore per agenti immobiliari; corso di 90 ore per agenti di commercio; corso di 72 ore per amministratori di condominio; corso di 60 ore per responsabile conduzione di attività nel settore funebre; corso di 36 ore per operatore funebre; corso di 12 ore per carrelli elevatori."},

                            {"origName":"CORSI OBBLIGATORI","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},
                            {"origName":"APPRENDISTATO","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},
                            {"origName":"SOMMINISTRAZIONE RINNOVO","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},
                            {"origName":"AMMINISTRATORE CONDOMINIO","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},
                            {"origName":"OPERATORE FUNEBRE","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},
                            {"origName":"SICUREZZA D.LGLS 81/08","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},
                            {"origName":"HACCP","nomeServizio":"CORSI OBBLIGATORI","x":260,"y":524,"selected":false,"classe":"gialla","index":1,"descrizione":"La formazione di base e il periodico aggiornamento sono resi obbligatori da normative nazionali e/o regionali per talune attività al fine di una continua professionalizzazione di imprese e addetti.","descrizione_lunga":"Sicurezza in azienda D.Lgs. 81/08 (corsi base e rinnovo rspp, antincendio, primo soccorso, formazione lavoratori, rls) rischio basso e medio; corso triennale obbligatorio di 16 ore per le attività di somministrazione; corso annuale di 15 ore per amministratori di condominio; corso di 8 ore haccp per chi manipola alimenti. Corsi per apprendisti."},

                            {"origName":"FORMAZIONE AZIENDALE","nomeServizio":"FORMAZIONE AZIENDALE","x":206,"y":346,"selected":false,"classe":"gialla","index":2,"descrizione":"La formazione è una delle più importanti leve che un’azienda ha per rimanere competitiva. Una maggiore flessibilità si può ottenere solo attraverso lo sviluppo e il potenziamento delle risorse umane.","descrizione_lunga":"Il processo formativo può assumere un ruolo fondamentale per: far acquisire conoscenze e competenze ai dipendenti; colmare lacune a causa di cambiamenti interni o esterni; creare piani di valorizzazione e sviluppo dei talenti; migliorare l’organizzazione aziendale. Percorsi di formazione anche gratuita sono possibili attraverso l’utilizzo di Fondi regionali e nazionali."},
                            {"origName":"CORSI FINANZIATI","nomeServizio":"FORMAZIONE AZIENDALE","x":206,"y":346,"selected":false,"classe":"gialla","index":2,"descrizione":"La formazione è una delle più importanti leve che un’azienda ha per rimanere competitiva. Una maggiore flessibilità si può ottenere solo attraverso lo sviluppo e il potenziamento delle risorse umane.","descrizione_lunga":"Il processo formativo può assumere un ruolo fondamentale per: far acquisire conoscenze e competenze ai dipendenti; colmare lacune a causa di cambiamenti interni o esterni; creare piani di valorizzazione e sviluppo dei talenti; migliorare l’organizzazione aziendale. Percorsi di formazione anche gratuita sono possibili attraverso l’utilizzo di Fondi regionali e nazionali."},
                            {"origName":"CORSI AGGIORNAMENTO","nomeServizio":"FORMAZIONE AZIENDALE","x":206,"y":346,"selected":false,"classe":"gialla","index":2,"descrizione":"La formazione è una delle più importanti leve che un’azienda ha per rimanere competitiva. Una maggiore flessibilità si può ottenere solo attraverso lo sviluppo e il potenziamento delle risorse umane.","descrizione_lunga":"Il processo formativo può assumere un ruolo fondamentale per: far acquisire conoscenze e competenze ai dipendenti; colmare lacune a causa di cambiamenti interni o esterni; creare piani di valorizzazione e sviluppo dei talenti; migliorare l’organizzazione aziendale. Percorsi di formazione anche gratuita sono possibili attraverso l’utilizzo di Fondi regionali e nazionali."},
                            {"origName":"CORSI SOCIAL MEDIA MARKETING","nomeServizio":"FORMAZIONE AZIENDALE","x":206,"y":346,"selected":false,"classe":"gialla","index":2,"descrizione":"La formazione è una delle più importanti leve che un’azienda ha per rimanere competitiva. Una maggiore flessibilità si può ottenere solo attraverso lo sviluppo e il potenziamento delle risorse umane.","descrizione_lunga":"Il processo formativo può assumere un ruolo fondamentale per: far acquisire conoscenze e competenze ai dipendenti; colmare lacune a causa di cambiamenti interni o esterni; creare piani di valorizzazione e sviluppo dei talenti; migliorare l’organizzazione aziendale. Percorsi di formazione anche gratuita sono possibili attraverso l’utilizzo di Fondi regionali e nazionali."},

                            {"origName":"AGENZIA PER IL LAVORO","nomeServizio":"AGENZIA PER IL LAVORO","x":163,"y":408,"selected":false,"classe":"gialla","index":3,"descrizione":"Sportello di orientamento e accompagnamento alla ricerca di lavoro, corsi di formazione e altre opportunità per inserirsi o reinserirsi in un mercato del lavoro sempre più complesso e difficile.","descrizione_lunga":"Accoglienza, orientamento, supporto all’inserimento lavorativo e accompagnamento sia per il singolo lavoratore (o persona che cerca lavoro) sia per le imprese. Ricerca e consulenza; incontro tra domanda e offerta di lavoro; inserimento ricollocazione aziendale; attivazione di tirocini e stages; convenzioni e accordi con enti pubblici, istituti scolastici e aziende."},
                            {"origName":"ACCOGLIENZA E CONSULENZA","nomeServizio":"AGENZIA PER IL LAVORO","x":163,"y":408,"selected":false,"classe":"gialla","index":3,"descrizione":"Sportello di orientamento e accompagnamento alla ricerca di lavoro, corsi di formazione e altre opportunità per inserirsi o reinserirsi in un mercato del lavoro sempre più complesso e difficile.","descrizione_lunga":"Accoglienza, orientamento, supporto all’inserimento lavorativo e accompagnamento sia per il singolo lavoratore (o persona che cerca lavoro) sia per le imprese. Ricerca e consulenza; incontro tra domanda e offerta di lavoro; inserimento ricollocazione aziendale; attivazione di tirocini e stages; convenzioni e accordi con enti pubblici, istituti scolastici e aziende."},
                            {"origName":"INCONTRO DOMANDA/OFFERTA LAVORO","nomeServizio":"AGENZIA PER IL LAVORO","x":163,"y":408,"selected":false,"classe":"gialla","index":3,"descrizione":"Sportello di orientamento e accompagnamento alla ricerca di lavoro, corsi di formazione e altre opportunità per inserirsi o reinserirsi in un mercato del lavoro sempre più complesso e difficile.","descrizione_lunga":"Accoglienza, orientamento, supporto all’inserimento lavorativo e accompagnamento sia per il singolo lavoratore (o persona che cerca lavoro) sia per le imprese. Ricerca e consulenza; incontro tra domanda e offerta di lavoro; inserimento ricollocazione aziendale; attivazione di tirocini e stages; convenzioni e accordi con enti pubblici, istituti scolastici e aziende."},
                            {"origName":"ATTIVAZIONE TIROCINI","nomeServizio":"AGENZIA PER IL LAVORO","x":163,"y":408,"selected":false,"classe":"gialla","index":3,"descrizione":"Sportello di orientamento e accompagnamento alla ricerca di lavoro, corsi di formazione e altre opportunità per inserirsi o reinserirsi in un mercato del lavoro sempre più complesso e difficile.","descrizione_lunga":"Accoglienza, orientamento, supporto all’inserimento lavorativo e accompagnamento sia per il singolo lavoratore (o persona che cerca lavoro) sia per le imprese. Ricerca e consulenza; incontro tra domanda e offerta di lavoro; inserimento ricollocazione aziendale; attivazione di tirocini e stages; convenzioni e accordi con enti pubblici, istituti scolastici e aziende."},
                            {"origName":"ACCORDI ISTITUTI SCOLASTICI","nomeServizio":"AGENZIA PER IL LAVORO","x":163,"y":408,"selected":false,"classe":"gialla","index":3,"descrizione":"Sportello di orientamento e accompagnamento alla ricerca di lavoro, corsi di formazione e altre opportunità per inserirsi o reinserirsi in un mercato del lavoro sempre più complesso e difficile.","descrizione_lunga":"Accoglienza, orientamento, supporto all’inserimento lavorativo e accompagnamento sia per il singolo lavoratore (o persona che cerca lavoro) sia per le imprese. Ricerca e consulenza; incontro tra domanda e offerta di lavoro; inserimento ricollocazione aziendale; attivazione di tirocini e stages; convenzioni e accordi con enti pubblici, istituti scolastici e aziende."},

                            {"origName":"CORSI GRATUITI","nomeServizio":"CORSI GRATUITI","x":276,"y":276,"selected":false,"classe":"gialla","index":4,"descrizione":"Corsi finanziati attraverso fondi regionali, nazionali ed europei per la formazione continua di imprenditori e addetti, anche su specifica richiesta della singola azienda.","descrizione_lunga":"Le aziende e i professionisti possono accedere a corsi gratuiti, di volta in volta finanziati attraverso il Fondo For.Te., i progetti della Regione Piemonte e dell’Unione Europea. Corsi per disoccupati e inoccupati attraverso i progetti M.D.L. La durata e il contenuto dei corsi possono essere stabiliti anche su richiesta delle aziende. Formazione diretta in aula, on line e presso l’impresa."},
                            {"origName":"FORMAZIONE IMPRESE","nomeServizio":"CORSI GRATUITI","x":276,"y":276,"selected":false,"classe":"gialla","index":4,"descrizione":"Corsi finanziati attraverso fondi regionali, nazionali ed europei per la formazione continua di imprenditori e addetti, anche su specifica richiesta della singola azienda.","descrizione_lunga":"Le aziende e i professionisti possono accedere a corsi gratuiti, di volta in volta finanziati attraverso il Fondo For.Te., i progetti della Regione Piemonte e dell’Unione Europea. Corsi per disoccupati e inoccupati attraverso i progetti M.D.L. La durata e il contenuto dei corsi possono essere stabiliti anche su richiesta delle aziende. Formazione diretta in aula, on line e presso l’impresa."},
                            {"origName":"LAVORATORI DISOCUPPATI MDL","nomeServizio":"CORSI GRATUITI","x":276,"y":276,"selected":false,"classe":"gialla","index":4,"descrizione":"Corsi finanziati attraverso fondi regionali, nazionali ed europei per la formazione continua di imprenditori e addetti, anche su specifica richiesta della singola azienda.","descrizione_lunga":"Le aziende e i professionisti possono accedere a corsi gratuiti, di volta in volta finanziati attraverso il Fondo For.Te., i progetti della Regione Piemonte e dell’Unione Europea. Corsi per disoccupati e inoccupati attraverso i progetti M.D.L. La durata e il contenuto dei corsi possono essere stabiliti anche su richiesta delle aziende. Formazione diretta in aula, on line e presso l’impresa."},


                            {"origName":"ASCOMFIDI","nomeServizio":"ASCOMFIDI","x":213,"y":213,"selected":false,"classe":"arancione","index":0,"descrizione":"Attraverso la Cooperativa di garanzia Ascom Fidi Novara e VCO, in attività dal 1984, le imprese possono ottenere la garanzia fino al 50% sui finanziamenti erogati dal sistema bancario.","descrizione_lunga":"Finanziamenti bancari da 5 a 400 mila euro per imprese e professionisti finalizzati a investimenti produttivi; all'incremento dell'operatività aziendale, a esigenze di generico credito d'esercizio o di consolidamento e miglioramento della struttura finanziaria. Rimborsi da 12 a 120 mesi, tempi brevi, costi di erogazione estremamente vantaggiosi."},
                            {"origName":"CONSULENZA FINANZIARIA","nomeServizio":"ASCOMFIDI","x":213,"y":213,"selected":false,"classe":"arancione","index":0,"descrizione":"Attraverso la Cooperativa di garanzia Ascom Fidi Novara e VCO, in attività dal 1984, le imprese possono ottenere la garanzia fino al 50% sui finanziamenti erogati dal sistema bancario.","descrizione_lunga":"Finanziamenti bancari da 5 a 400 mila euro per imprese e professionisti finalizzati a investimenti produttivi; all'incremento dell'operatività aziendale, a esigenze di generico credito d'esercizio o di consolidamento e miglioramento della struttura finanziaria. Rimborsi da 12 a 120 mesi, tempi brevi, costi di erogazione estremamente vantaggiosi."},
                            {"origName":"PRATICHE GARANZIA CONSORTILE","nomeServizio":"ASCOMFIDI","x":213,"y":213,"selected":false,"classe":"arancione","index":0,"descrizione":"Attraverso la Cooperativa di garanzia Ascom Fidi Novara e VCO, in attività dal 1984, le imprese possono ottenere la garanzia fino al 50% sui finanziamenti erogati dal sistema bancario.","descrizione_lunga":"Finanziamenti bancari da 5 a 400 mila euro per imprese e professionisti finalizzati a investimenti produttivi; all'incremento dell'operatività aziendale, a esigenze di generico credito d'esercizio o di consolidamento e miglioramento della struttura finanziaria. Rimborsi da 12 a 120 mesi, tempi brevi, costi di erogazione estremamente vantaggiosi."},
                            {"origName":"REDAZIONE BUSINESS PLAN","nomeServizio":"ASCOMFIDI","x":213,"y":213,"selected":false,"classe":"arancione","index":0,"descrizione":"Attraverso la Cooperativa di garanzia Ascom Fidi Novara e VCO, in attività dal 1984, le imprese possono ottenere la garanzia fino al 50% sui finanziamenti erogati dal sistema bancario.","descrizione_lunga":"Finanziamenti bancari da 5 a 400 mila euro per imprese e professionisti finalizzati a investimenti produttivi; all'incremento dell'operatività aziendale, a esigenze di generico credito d'esercizio o di consolidamento e miglioramento della struttura finanziaria. Rimborsi da 12 a 120 mesi, tempi brevi, costi di erogazione estremamente vantaggiosi."},
                            {"origName":"CONVENZIONI ISTITUTI DI CREDITO","nomeServizio":"ASCOMFIDI","x":213,"y":213,"selected":false,"classe":"arancione","index":0,"descrizione":"Attraverso la Cooperativa di garanzia Ascom Fidi Novara e VCO, in attività dal 1984, le imprese possono ottenere la garanzia fino al 50% sui finanziamenti erogati dal sistema bancario.","descrizione_lunga":"Finanziamenti bancari da 5 a 400 mila euro per imprese e professionisti finalizzati a investimenti produttivi; all'incremento dell'operatività aziendale, a esigenze di generico credito d'esercizio o di consolidamento e miglioramento della struttura finanziaria. Rimborsi da 12 a 120 mesi, tempi brevi, costi di erogazione estremamente vantaggiosi."},

                            {"origName":"CONTRIBUTI A FONDO PERDUTO","nomeServizio":"CONTRIBUTI A FONDO PERDUTO","x":338,"y":338,"selected":false,"classe":"arancione","index":1,"descrizione":"Sono finanziamenti erogati da enti pubblici a fronte di un investimento per avviare l’attività o per acquistare beni strumentali o per realizzare opere che hanno effetti durevoli sull’impresa.","descrizione_lunga":"I contributi a fondo perduto sono somme che, una volta ricevute, non devono essere restituite. Sono erogati generalmente da enti pubblici (Unione Europea, Ministeri, Regioni, ecc.) a favore di nuove imprese o di imprese già attive. Normalmente non sono necessarie garanzie per ottenere il contributo, che viene erogato a fronte della presentazione di documentazione di spese."},
                            {"origName":"RICERCA CONTRIBUTI","nomeServizio":"CONTRIBUTI A FONDO PERDUTO","x":338,"y":338,"selected":false,"classe":"arancione","index":1,"descrizione":"Sono finanziamenti erogati da enti pubblici a fronte di un investimento per avviare l’attività o per acquistare beni strumentali o per realizzare opere che hanno effetti durevoli sull’impresa.","descrizione_lunga":"I contributi a fondo perduto sono somme che, una volta ricevute, non devono essere restituite. Sono erogati generalmente da enti pubblici (Unione Europea, Ministeri, Regioni, ecc.) a favore di nuove imprese o di imprese già attive. Normalmente non sono necessarie garanzie per ottenere il contributo, che viene erogato a fronte della presentazione di documentazione di spese."},
                            {"origName":"STESURA/PRESENTAZIONE PROGETTO","nomeServizio":"CONTRIBUTI A FONDO PERDUTO","x":338,"y":338,"selected":false,"classe":"arancione","index":1,"descrizione":"Sono finanziamenti erogati da enti pubblici a fronte di un investimento per avviare l’attività o per acquistare beni strumentali o per realizzare opere che hanno effetti durevoli sull’impresa.","descrizione_lunga":"I contributi a fondo perduto sono somme che, una volta ricevute, non devono essere restituite. Sono erogati generalmente da enti pubblici (Unione Europea, Ministeri, Regioni, ecc.) a favore di nuove imprese o di imprese già attive. Normalmente non sono necessarie garanzie per ottenere il contributo, che viene erogato a fronte della presentazione di documentazione di spese."},
                            {"origName":"RENDICONTO","nomeServizio":"CONTRIBUTI A FONDO PERDUTO","x":338,"y":338,"selected":false,"classe":"arancione","index":1,"descrizione":"Sono finanziamenti erogati da enti pubblici a fronte di un investimento per avviare l’attività o per acquistare beni strumentali o per realizzare opere che hanno effetti durevoli sull’impresa.","descrizione_lunga":"I contributi a fondo perduto sono somme che, una volta ricevute, non devono essere restituite. Sono erogati generalmente da enti pubblici (Unione Europea, Ministeri, Regioni, ecc.) a favore di nuove imprese o di imprese già attive. Normalmente non sono necessarie garanzie per ottenere il contributo, che viene erogato a fronte della presentazione di documentazione di spese."},

                            {"origName":"ASSISTENZA BANDI","nomeServizio":"ASSISTENZA BANDI","x":400,"y":400,"selected":false,"classe":"arancione","index":2,"descrizione":"Conoscere per tempo i bandi pubblici e avvalersi dell’assistenza di professionisti è indispensabile per chi fa impresa. Grazie al nostro servizio non perderete neppure un’occasione di finanziamento.","descrizione_lunga":"Il servizio offerto ricopre l’intero iter informativo e progettuale per accedere ai bandi pubblici: newsletter periodica con la descrizione dei bandi aperti, consulenza e assistenza nella presentazione della domanda e nell’attuazione degli interventi ammessi a finanziamento, rendiconto finale del progetto, valutazione dei risultati."},
                            {"origName":"INFORMAZIONE E NEWSLETTER","nomeServizio":"ASSISTENZA BANDI","x":400,"y":400,"selected":false,"classe":"arancione","index":2,"descrizione":"Conoscere per tempo i bandi pubblici e avvalersi dell’assistenza di professionisti è indispensabile per chi fa impresa. Grazie al nostro servizio non perderete neppure un’occasione di finanziamento.","descrizione_lunga":"Il servizio offerto ricopre l’intero iter informativo e progettuale per accedere ai bandi pubblici: newsletter periodica con la descrizione dei bandi aperti, consulenza e assistenza nella presentazione della domanda e nell’attuazione degli interventi ammessi a finanziamento, rendiconto finale del progetto, valutazione dei risultati."},
                            {"origName":"RICERCA BANDI","nomeServizio":"ASSISTENZA BANDI","x":400,"y":400,"selected":false,"classe":"arancione","index":2,"descrizione":"Conoscere per tempo i bandi pubblici e avvalersi dell’assistenza di professionisti è indispensabile per chi fa impresa. Grazie al nostro servizio non perderete neppure un’occasione di finanziamento.","descrizione_lunga":"Il servizio offerto ricopre l’intero iter informativo e progettuale per accedere ai bandi pubblici: newsletter periodica con la descrizione dei bandi aperti, consulenza e assistenza nella presentazione della domanda e nell’attuazione degli interventi ammessi a finanziamento, rendiconto finale del progetto, valutazione dei risultati."},
                            {"origName":"REDAZIONE BUSINESS PLAN","nomeServizio":"ASSISTENZA BANDI","x":400,"y":400,"selected":false,"classe":"arancione","index":2,"descrizione":"Conoscere per tempo i bandi pubblici e avvalersi dell’assistenza di professionisti è indispensabile per chi fa impresa. Grazie al nostro servizio non perderete neppure un’occasione di finanziamento.","descrizione_lunga":"Il servizio offerto ricopre l’intero iter informativo e progettuale per accedere ai bandi pubblici: newsletter periodica con la descrizione dei bandi aperti, consulenza e assistenza nella presentazione della domanda e nell’attuazione degli interventi ammessi a finanziamento, rendiconto finale del progetto, valutazione dei risultati."},
                            {"origName":"STESURA/PRESENTAZIONE PROGETTO","nomeServizio":"ASSISTENZA BANDI","x":400,"y":400,"selected":false,"classe":"arancione","index":2,"descrizione":"Conoscere per tempo i bandi pubblici e avvalersi dell’assistenza di professionisti è indispensabile per chi fa impresa. Grazie al nostro servizio non perderete neppure un’occasione di finanziamento.","descrizione_lunga":"Il servizio offerto ricopre l’intero iter informativo e progettuale per accedere ai bandi pubblici: newsletter periodica con la descrizione dei bandi aperti, consulenza e assistenza nella presentazione della domanda e nell’attuazione degli interventi ammessi a finanziamento, rendiconto finale del progetto, valutazione dei risultati."},
                            {"origName":"RENDICONTO","nomeServizio":"ASSISTENZA BANDI","x":400,"y":400,"selected":false,"classe":"arancione","index":2,"descrizione":"Conoscere per tempo i bandi pubblici e avvalersi dell’assistenza di professionisti è indispensabile per chi fa impresa. Grazie al nostro servizio non perderete neppure un’occasione di finanziamento.","descrizione_lunga":"Il servizio offerto ricopre l’intero iter informativo e progettuale per accedere ai bandi pubblici: newsletter periodica con la descrizione dei bandi aperti, consulenza e assistenza nella presentazione della domanda e nell’attuazione degli interventi ammessi a finanziamento, rendiconto finale del progetto, valutazione dei risultati."},

                            {"origName":"VERIFICA CONDIZIONI BANCARIE ED ASSICURATIVE","nomeServizio":"VERIFICA CONDIZIONI BANCARIE ED ASSICURATIVE","x":474,"y":451,"selected":false,"classe":"arancione","index":3,"descrizione":"Orientarsi nel sistema bancario e assicurativo è sempre più complesso per le imprese e i lavoratori autonomi. Valutiamo insieme le migliori opportunità di investimento, credito, tutela assicurativa.","descrizione_lunga":"Verifica del rating bancario. Convenzioni con gli istituti di credito per gestione conto corrente, POS, tassi dei finanziamenti. Convenzione polizze assicurative RC e tutela impresa e famiglia. Analisi delle condizioni dei contratti in corso e/o di futura stipula. Monitoraggio del mercato assicurativo per trovare le migliori condizioni contrattuali ed economiche."},
                            {"origName":"CONSULENZA FINANZIARIA E ASSICURATIVA","nomeServizio":"VERIFICA CONDIZIONI BANCARIE ED ASSICURATIVE","x":474,"y":451,"selected":false,"classe":"arancione","index":3,"descrizione":"Orientarsi nel sistema bancario e assicurativo è sempre più complesso per le imprese e i lavoratori autonomi. Valutiamo insieme le migliori opportunità di investimento, credito, tutela assicurativa.","descrizione_lunga":"Verifica del rating bancario. Convenzioni con gli istituti di credito per gestione conto corrente, POS, tassi dei finanziamenti. Convenzione polizze assicurative RC e tutela impresa e famiglia. Analisi delle condizioni dei contratti in corso e/o di futura stipula. Monitoraggio del mercato assicurativo per trovare le migliori condizioni contrattuali ed economiche."},


                            {"origName":"SPORTELLO CREAZIONE D'IMPRESA","nomeServizio":"SPORTELLO CREAZIONE D'IMPRESA","x":244,"y":136,"selected":false,"classe":"viola","index":0,"descrizione":"Assistervi nel trasformare un’idea in un progetto e quindi in un’impresa è il nostro mestiere. Professionisti accreditati vi accompagnano in un percorso a tappe, fornendo consulenza e assistenza.","descrizione_lunga":"Valutazione delle attitudini e della fattibilità dell’idea. Analisi di mercato. Assistenza personalizzata basata su azioni di informazione, aggiornamento delle competenze, consulenza (giuridica, commerciale, economica, fiscale, del lavoro, ecc.), assistenza alla predisposizione di business plan, ricerca di finanziamenti, tutoraggio nei primi due anni di vita dell’azienda."},
                            {"origName":"ACCOGLIENZA","nomeServizio":"SPORTELLO CREAZIONE D'IMPRESA","x":244,"y":136,"selected":false,"classe":"viola","index":0,"descrizione":"Assistervi nel trasformare un’idea in un progetto e quindi in un’impresa è il nostro mestiere. Professionisti accreditati vi accompagnano in un percorso a tappe, fornendo consulenza e assistenza.","descrizione_lunga":"Valutazione delle attitudini e della fattibilità dell’idea. Analisi di mercato. Assistenza personalizzata basata su azioni di informazione, aggiornamento delle competenze, consulenza (giuridica, commerciale, economica, fiscale, del lavoro, ecc.), assistenza alla predisposizione di business plan, ricerca di finanziamenti, tutoraggio nei primi due anni di vita dell’azienda."},
                            {"origName":"ANALISI BUSINESS PLAN","nomeServizio":"SPORTELLO CREAZIONE D'IMPRESA","x":244,"y":136,"selected":false,"classe":"viola","index":0,"descrizione":"Assistervi nel trasformare un’idea in un progetto e quindi in un’impresa è il nostro mestiere. Professionisti accreditati vi accompagnano in un percorso a tappe, fornendo consulenza e assistenza.","descrizione_lunga":"Valutazione delle attitudini e della fattibilità dell’idea. Analisi di mercato. Assistenza personalizzata basata su azioni di informazione, aggiornamento delle competenze, consulenza (giuridica, commerciale, economica, fiscale, del lavoro, ecc.), assistenza alla predisposizione di business plan, ricerca di finanziamenti, tutoraggio nei primi due anni di vita dell’azienda."},
                            {"origName":"AGGIORNAMENTO COMPETENZE/FORMAZIONE","nomeServizio":"SPORTELLO CREAZIONE D'IMPRESA","x":244,"y":136,"selected":false,"classe":"viola","index":0,"descrizione":"Assistervi nel trasformare un’idea in un progetto e quindi in un’impresa è il nostro mestiere. Professionisti accreditati vi accompagnano in un percorso a tappe, fornendo consulenza e assistenza.","descrizione_lunga":"Valutazione delle attitudini e della fattibilità dell’idea. Analisi di mercato. Assistenza personalizzata basata su azioni di informazione, aggiornamento delle competenze, consulenza (giuridica, commerciale, economica, fiscale, del lavoro, ecc.), assistenza alla predisposizione di business plan, ricerca di finanziamenti, tutoraggio nei primi due anni di vita dell’azienda."},
                            {"origName":"RICERCA FINANZIAMENTI/BANDI","nomeServizio":"SPORTELLO CREAZIONE D'IMPRESA","x":244,"y":136,"selected":false,"classe":"viola","index":0,"descrizione":"Assistervi nel trasformare un’idea in un progetto e quindi in un’impresa è il nostro mestiere. Professionisti accreditati vi accompagnano in un percorso a tappe, fornendo consulenza e assistenza.","descrizione_lunga":"Valutazione delle attitudini e della fattibilità dell’idea. Analisi di mercato. Assistenza personalizzata basata su azioni di informazione, aggiornamento delle competenze, consulenza (giuridica, commerciale, economica, fiscale, del lavoro, ecc.), assistenza alla predisposizione di business plan, ricerca di finanziamenti, tutoraggio nei primi due anni di vita dell’azienda."},
                            {"origName":"TUTORAGGIO E ACCOMPAGNAMENTO","nomeServizio":"SPORTELLO CREAZIONE D'IMPRESA","x":244,"y":136,"selected":false,"classe":"viola","index":0,"descrizione":"Assistervi nel trasformare un’idea in un progetto e quindi in un’impresa è il nostro mestiere. Professionisti accreditati vi accompagnano in un percorso a tappe, fornendo consulenza e assistenza.","descrizione_lunga":"Valutazione delle attitudini e della fattibilità dell’idea. Analisi di mercato. Assistenza personalizzata basata su azioni di informazione, aggiornamento delle competenze, consulenza (giuridica, commerciale, economica, fiscale, del lavoro, ecc.), assistenza alla predisposizione di business plan, ricerca di finanziamenti, tutoraggio nei primi due anni di vita dell’azienda."},

                            {"origName":"E-COMMERCE","nomeServizio":"E-COMMERCE","x":416,"y":260,"selected":false,"classe":"viola","index":1,"descrizione":"In costante crescita, il mercato on line interessa tutte le attività, anche le più piccole. Con il nostro aiuto cominciare è facile, passo dopo passo dalla vetrina tradizionale all’e-commerce.","descrizione_lunga":"Promozione nel sito epiemonte.it per muovere i primi passi nel mondo on line; convenzioni per aprire un negozio su ebay; incontri informativi, prima consulenza gratuita. Assistenza nella realizzazione e implementazione di siti e-commerce. Database gestione ordini e clienti, gestione magazzino, web marketing, convenzioni con corrieri e Poste per spedizioni"},
                            {"origName":"CONSULENZA","nomeServizio":"E-COMMERCE","x":416,"y":260,"selected":false,"classe":"viola","index":1,"descrizione":"In costante crescita, il mercato on line interessa tutte le attività, anche le più piccole. Con il nostro aiuto cominciare è facile, passo dopo passo dalla vetrina tradizionale all’e-commerce.","descrizione_lunga":"Promozione nel sito epiemonte.it per muovere i primi passi nel mondo on line; convenzioni per aprire un negozio su ebay; incontri informativi, prima consulenza gratuita. Assistenza nella realizzazione e implementazione di siti e-commerce. Database gestione ordini e clienti, gestione magazzino, web marketing, convenzioni con corrieri e Poste per spedizioni"},
                            {"origName":"SITO EPIEMONTE.IT","nomeServizio":"E-COMMERCE","x":416,"y":260,"selected":false,"classe":"viola","index":1,"descrizione":"In costante crescita, il mercato on line interessa tutte le attività, anche le più piccole. Con il nostro aiuto cominciare è facile, passo dopo passo dalla vetrina tradizionale all’e-commerce.","descrizione_lunga":"Promozione nel sito epiemonte.it per muovere i primi passi nel mondo on line; convenzioni per aprire un negozio su ebay; incontri informativi, prima consulenza gratuita. Assistenza nella realizzazione e implementazione di siti e-commerce. Database gestione ordini e clienti, gestione magazzino, web marketing, convenzioni con corrieri e Poste per spedizioni"},
                            {"origName":"REALIZZAZIONE SITI E PORTALI","nomeServizio":"E-COMMERCE","x":416,"y":260,"selected":false,"classe":"viola","index":1,"descrizione":"In costante crescita, il mercato on line interessa tutte le attività, anche le più piccole. Con il nostro aiuto cominciare è facile, passo dopo passo dalla vetrina tradizionale all’e-commerce.","descrizione_lunga":"Promozione nel sito epiemonte.it per muovere i primi passi nel mondo on line; convenzioni per aprire un negozio su ebay; incontri informativi, prima consulenza gratuita. Assistenza nella realizzazione e implementazione di siti e-commerce. Database gestione ordini e clienti, gestione magazzino, web marketing, convenzioni con corrieri e Poste per spedizioni"},
                            {"origName":"ACCORDI SPEDIZIONI","nomeServizio":"E-COMMERCE","x":416,"y":260,"selected":false,"classe":"viola","index":1,"descrizione":"In costante crescita, il mercato on line interessa tutte le attività, anche le più piccole. Con il nostro aiuto cominciare è facile, passo dopo passo dalla vetrina tradizionale all’e-commerce.","descrizione_lunga":"Promozione nel sito epiemonte.it per muovere i primi passi nel mondo on line; convenzioni per aprire un negozio su ebay; incontri informativi, prima consulenza gratuita. Assistenza nella realizzazione e implementazione di siti e-commerce. Database gestione ordini e clienti, gestione magazzino, web marketing, convenzioni con corrieri e Poste per spedizioni"},

                            {"origName":"INTERNAZIONALIZZAZIONE","nomeServizio":"INTERNAZIONALIZZAZIONE","x":396,"y":136,"selected":false,"classe":"viola","index":2,"descrizione":"Alla conquista dei mercati esteri con i servizi e i prodotti della propria impresa. Un’attività complessa che va pianificata nei minimi dettagli insieme a esperti e a imprenditori già affermati","descrizione_lunga":"Assistiamo il vostro percorso di espansione e di sviluppo sui mercati esteri. Analisi delle risorse tecniche, umane e finanziarie dell’azienda; assetto organizzativo interno; valutazione costi di avvio dell'iniziativa con previsione di ricavi e fonti di finanziamento. Conoscenza di leggi e contrattualistica; piano strategico di export. Creazione reti d’impresa, corsi di lingue."},
                            {"origName":"RICERCA FIERE E MERCATI","nomeServizio":"INTERNAZIONALIZZAZIONE","x":396,"y":136,"selected":false,"classe":"viola","index":2,"descrizione":"Alla conquista dei mercati esteri con i servizi e i prodotti della propria impresa. Un’attività complessa che va pianificata nei minimi dettagli insieme a esperti e a imprenditori già affermati","descrizione_lunga":"Assistiamo il vostro percorso di espansione e di sviluppo sui mercati esteri. Analisi delle risorse tecniche, umane e finanziarie dell’azienda; assetto organizzativo interno; valutazione costi di avvio dell'iniziativa con previsione di ricavi e fonti di finanziamento. Conoscenza di leggi e contrattualistica; piano strategico di export. Creazione reti d’impresa, corsi di lingue."},
                            {"origName":"CONSULENZA E ASSISTENZA","nomeServizio":"INTERNAZIONALIZZAZIONE","x":396,"y":136,"selected":false,"classe":"viola","index":2,"descrizione":"Alla conquista dei mercati esteri con i servizi e i prodotti della propria impresa. Un’attività complessa che va pianificata nei minimi dettagli insieme a esperti e a imprenditori già affermati","descrizione_lunga":"Assistiamo il vostro percorso di espansione e di sviluppo sui mercati esteri. Analisi delle risorse tecniche, umane e finanziarie dell’azienda; assetto organizzativo interno; valutazione costi di avvio dell'iniziativa con previsione di ricavi e fonti di finanziamento. Conoscenza di leggi e contrattualistica; piano strategico di export. Creazione reti d’impresa, corsi di lingue."},
                            {"origName":"SERVIZI TRADUZIONE","nomeServizio":"INTERNAZIONALIZZAZIONE","x":396,"y":136,"selected":false,"classe":"viola","index":2,"descrizione":"Alla conquista dei mercati esteri con i servizi e i prodotti della propria impresa. Un’attività complessa che va pianificata nei minimi dettagli insieme a esperti e a imprenditori già affermati","descrizione_lunga":"Assistiamo il vostro percorso di espansione e di sviluppo sui mercati esteri. Analisi delle risorse tecniche, umane e finanziarie dell’azienda; assetto organizzativo interno; valutazione costi di avvio dell'iniziativa con previsione di ricavi e fonti di finanziamento. Conoscenza di leggi e contrattualistica; piano strategico di export. Creazione reti d’impresa, corsi di lingue."},

                            {"origName":"SOCIAL MEDIA MARKETING","nomeServizio":"SOCIAL MEDIA MARKETING","x":174,"y":501,"selected":false,"classe":"viola","index":3,"descrizione":"Farsi conoscere è vitale per ogni impresa. Il modo oggi più semplice e meno oneroso è generare visibilità sui social, creare una comunità di clienti, saper raccontare bene una storia... la propria.","descrizione_lunga":"Incontri gratuiti e brevi corsi di approfondimento. Consulenza personalizzata nell’individuare il social network più adatto alla propria attività (facebook, linkedin, instagram, youtube, twitter, ecc.). Creazione e gestione di pagine social, consulenza e creazione grafiche per il web, servizi fotografici e video, storytelling aziendale. Studio di campagne promozionali."},
                            {"origName":"CREAZIONE PAGINE SOCIAL","nomeServizio":"SOCIAL MEDIA MARKETING","x":174,"y":501,"selected":false,"classe":"viola","index":3,"descrizione":"Farsi conoscere è vitale per ogni impresa. Il modo oggi più semplice e meno oneroso è generare visibilità sui social, creare una comunità di clienti, saper raccontare bene una storia... la propria.","descrizione_lunga":"Incontri gratuiti e brevi corsi di approfondimento. Consulenza personalizzata nell’individuare il social network più adatto alla propria attività (facebook, linkedin, instagram, youtube, twitter, ecc.). Creazione e gestione di pagine social, consulenza e creazione grafiche per il web, servizi fotografici e video, storytelling aziendale. Studio di campagne promozionali."},
                            {"origName":"GESTIONE PAGINE SOCIAL","nomeServizio":"SOCIAL MEDIA MARKETING","x":174,"y":501,"selected":false,"classe":"viola","index":3,"descrizione":"Farsi conoscere è vitale per ogni impresa. Il modo oggi più semplice e meno oneroso è generare visibilità sui social, creare una comunità di clienti, saper raccontare bene una storia... la propria.","descrizione_lunga":"Incontri gratuiti e brevi corsi di approfondimento. Consulenza personalizzata nell’individuare il social network più adatto alla propria attività (facebook, linkedin, instagram, youtube, twitter, ecc.). Creazione e gestione di pagine social, consulenza e creazione grafiche per il web, servizi fotografici e video, storytelling aziendale. Studio di campagne promozionali."},
                            {"origName":"CREAZIONE GRAFICA WEB","nomeServizio":"SOCIAL MEDIA MARKETING","x":174,"y":501,"selected":false,"classe":"viola","index":3,"descrizione":"Farsi conoscere è vitale per ogni impresa. Il modo oggi più semplice e meno oneroso è generare visibilità sui social, creare una comunità di clienti, saper raccontare bene una storia... la propria.","descrizione_lunga":"Incontri gratuiti e brevi corsi di approfondimento. Consulenza personalizzata nell’individuare il social network più adatto alla propria attività (facebook, linkedin, instagram, youtube, twitter, ecc.). Creazione e gestione di pagine social, consulenza e creazione grafiche per il web, servizi fotografici e video, storytelling aziendale. Studio di campagne promozionali."},
                            {"origName":"STUDIO CAMPAGNE PROMOZIONALI","nomeServizio":"SOCIAL MEDIA MARKETING","x":174,"y":501,"selected":false,"classe":"viola","index":3,"descrizione":"Farsi conoscere è vitale per ogni impresa. Il modo oggi più semplice e meno oneroso è generare visibilità sui social, creare una comunità di clienti, saper raccontare bene una storia... la propria.","descrizione_lunga":"Incontri gratuiti e brevi corsi di approfondimento. Consulenza personalizzata nell’individuare il social network più adatto alla propria attività (facebook, linkedin, instagram, youtube, twitter, ecc.). Creazione e gestione di pagine social, consulenza e creazione grafiche per il web, servizi fotografici e video, storytelling aziendale. Studio di campagne promozionali."},

                            {"origName":"RETI D'IMPRESA","nomeServizio":"RETI D'IMPRESA","x":268,"y":408,"selected":false,"classe":"viola","index":4,"descrizione":"Stipulare una rete tra imprese è un modello di business alternativo che consente alle PMI e alle micro imprese di competere a livello globale, salvaguardando la propria individualità.","descrizione_lunga":"Consulenza e assistenza nella costituzione e nella gestione di reti d’impresa, contrattualistica, gestione contabile, fiscale e del lavoro. Una soluzione per aumentare la competitività sul mercato, condividere conoscenze e competenze, sviluppare maggiore potenzialità innovativa, facilitare l’internazionalizzazione, certificare la qualità del processo produttivo, razionalizzare i costi di gestione."},
                            {"origName":"ASSISTENZA LEGISLATIVA/CONTRATTUALISTICA","nomeServizio":"RETI D'IMPRESA","x":268,"y":408,"selected":false,"classe":"viola","index":4,"descrizione":"Stipulare una rete tra imprese è un modello di business alternativo che consente alle PMI e alle micro imprese di competere a livello globale, salvaguardando la propria individualità.","descrizione_lunga":"Consulenza e assistenza nella costituzione e nella gestione di reti d’impresa, contrattualistica, gestione contabile, fiscale e del lavoro. Una soluzione per aumentare la competitività sul mercato, condividere conoscenze e competenze, sviluppare maggiore potenzialità innovativa, facilitare l’internazionalizzazione, certificare la qualità del processo produttivo, razionalizzare i costi di gestione."},
                            {"origName":"CERTIFICAZIONE QUALITÀ","nomeServizio":"RETI D'IMPRESA","x":268,"y":408,"selected":false,"classe":"viola","index":4,"descrizione":"Stipulare una rete tra imprese è un modello di business alternativo che consente alle PMI e alle micro imprese di competere a livello globale, salvaguardando la propria individualità.","descrizione_lunga":"Consulenza e assistenza nella costituzione e nella gestione di reti d’impresa, contrattualistica, gestione contabile, fiscale e del lavoro. Una soluzione per aumentare la competitività sul mercato, condividere conoscenze e competenze, sviluppare maggiore potenzialità innovativa, facilitare l’internazionalizzazione, certificare la qualità del processo produttivo, razionalizzare i costi di gestione."},
			]}
	},	
	computed: {
        filteredArticles: function () {
            var articles_array = this.articles,
             searchString = this.searchString;

            if(!searchString){
                return articles_array;
            }
            searchString = searchString.trim().toLowerCase();

            articles_array = articles_array.filter(function(item){
                if(item.origName.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            return articles_array;
        }
    },
	methods:{
		ritornaMappa : function(){
		 this.$emit('mappareturn');	
		},
		centraNellaMappa : function(nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga){
			this.$emit('centramappa',{nomeServizio,x,y,selected,classe,index,descrizione,descrizione_lunga});
			this.$forceUpdate();
			return;
		}			
	}	
});

Vue.component('desktoplist', {
	template:
	`<div class="col-lg-12">
		<div class="line-blu-separator">
			<div class="blu blue row">
				<div class="col-lg-12" v-on:click="apriDesc('blu')">
					<h5>Linea 1</h5>
					<span class="blu">ISTITUZIONALE E LOBBY</span>
					<template v-if="istoshow.length>0">
						<div v-if="istoshow[0].lineaApparte == 'blu'">
							<p>
							Creazione e sostegno all’impresa, supporto alle politiche associative, rappresentanza sindacale, finanziamenti, formazione, assistenza fiscale e del lavoro, consulenze, risparmi...siamo una grande, storica, autorevole Organizzazione di categoria, che da oltre 70 anni porta valore sul territorio e rappresenta migliaia di imprese del Terziario.			
							</p>
						</div>
					</template>					
				</div>
			</div>
		</div>

		<div class="line-blu-separator">
			<div class="blu verde row">
				<div class="col-lg-12" v-on:click="apriDesc('verde')">
					<h5>Linea 2</h5>
					<span class="blu">CONSULENZA E GESTIONE AZIENDALE</span>
					<template v-if="istoshow.length>0">
						<div v-if="istoshow[0].lineaApparte == 'verde'">
							<p class="blu">
							Servizi di consulenza e assistenza aziendale, fiscale e del lavoro per ditte individuali, società di persone e società di capitali. Costante aggiornamento e informazione su leggi e normative. Costante sostegno per avviare l’attività e per gestirla in modo corretto ed efficace in tutte le fasi della vita aziendale.							
							</p>
						</div>
					</template>					
				</div>
			</div>
		</div>

		<div class="line-blu-separator">
			<div class="blu gialla row">
				<div class="col-lg-12" v-on:click="apriDesc('gialla')">
					<h5>Linea 3</h5>
					<span class="blu">CAPITALE UMANO E FORMAZIONE</span>
					<template v-if="istoshow.length>0">
						<div v-if="istoshow[0].lineaApparte == 'gialla'">
							<p class="blu">
							In un mercato del lavoro sempre più competitivo, frenetico e mutevole, la formazione continua del personale e dell’imprenditore è essenziale. Attraverso specifici corsi è possibile conoscere le dinamiche sociali ed economiche, organizzare il lavoro per essere più produttivi, sviluppare potenzialità, affinare le competenze professionali.
							</p>
						</div>
					</template>					
				</div>
			</div>
		</div>		

		<div class="line-blu-separator">
			<div class="blu arancione row">
				<div class="col-lg-12" v-on:click="apriDesc('arancione')">
					<h5>Linea 4</h5>
					<span class="blu">FINANZIAMENTI E CONTRIBUTI</span>
					<template v-if="istoshow.length>0">
						<div v-if="istoshow[0].lineaApparte == 'arancione'">
							<p class="blu">
							Contare su contributi e finanziamenti è fondamentale per avviare e far crescere un’impresa. Vi aiutiamo a scegliere tra le opportunità di accesso al credito, anche attraverso la presentazione di bandi pubblici, regionali, nazionali ed europei. Newsletter periodica, consulenza, assistenza di professionisti del credito.							
							</p>
						</div>
					</template>					
				</div>
			</div>
		</div>

		<div class="line-blu-separator">
			<div class="blu viola row">
				<div class="col-lg-12" v-on:click="apriDesc('viola')">
					<h5>Linea 5</h5>
					<span class="blu">START UP E INNOVAZIONE</span>
					<template v-if="istoshow.length>0">
						<div v-if="istoshow[0].lineaApparte == 'viola'">
							<p class="blu">
							Ogni iniziativa imprenditoriale, sia essa una start up tecnologica o un’attività tradizionale, nasce da un’idea. Farla diventare un’impresa, promuoverla sui mercati italiano ed estero, svilupparla e vederla crescere è un percorso affascinante e complicato, che richiede assistenza qualificata e svariate competenze. Fare insieme a noi questo percorso è la scelta vincente.
							</p>
						</div>
					</template>					
				</div>
			</div>
		</div>									
	</div>`,
	
	props: ['toshow'],
	
	data: function(){
		return {}
	},
	computed: {
		istoshow() {
			return this.toshow
		}
    },
	methods:{
		apriDesc : function(propriety){
		 this.$emit('linebigger',{propriety});
		 this.istoshow[0].lineaApparte = propriety;
		}		
	}		
});